import { Fragment, useEffect, useRef, useState, type CSSProperties } from 'react';
import { useTranslation } from '../i18n';
import { pipelineStages } from '../content/pipeline';
import Reveal from './Reveal';

type Status = 'pending' | 'running' | 'done';

const initialStatuses = (): Status[] =>
  pipelineStages.map((_, index) => (index === 0 ? 'running' : 'pending'));

export default function Pipeline() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);
  const [statuses, setStatuses] = useState<Status[]>(initialStatuses);
  const [log, setLog] = useState<string[]>(() => [`$ ${pipelineStages[0].cmd}`]);
  const [done, setDone] = useState(false);
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setStatuses(pipelineStages.map(() => 'done'));
      setActive(pipelineStages.length - 1);
      setLog(
        pipelineStages
          .flatMap((stage) => [`$ ${stage.cmd}`, stage.log])
          .concat(`✓ ${t('pipeline.complete')}`),
      );
      setDone(true);
      return;
    }
    if (!visible || done) return;

    const stage = pipelineStages[active];
    if (!stage) return;

    const timer = window.setTimeout(() => {
      setStatuses((prev) => prev.map((status, index) => (index === active ? 'done' : status)));
      setLog((prev) => [...prev, stage.log]);

      if (active === pipelineStages.length - 1) {
        setLog((prev) => [...prev, `✓ ${t('pipeline.complete')}`]);
        setDone(true);
        return;
      }

      const next = active + 1;
      setActive(next);
      setStatuses((prev) => prev.map((status, index) => (index === next ? 'running' : status)));
      setLog((prev) => [...prev, `$ ${pipelineStages[next].cmd}`]);
    }, stage.duration);

    return () => clearTimeout(timer);
  }, [active, visible, done, reduceMotion, t]);

  useEffect(() => {
    if (!done || reduceMotion) return;
    const timer = window.setTimeout(() => {
      setActive(0);
      setStatuses(initialStatuses());
      setLog([`$ ${pipelineStages[0].cmd}`]);
      setDone(false);
    }, 3400);
    return () => clearTimeout(timer);
  }, [done, reduceMotion]);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [log]);

  const reset = () => {
    setActive(0);
    setStatuses(initialStatuses());
    setLog([`$ ${pipelineStages[0].cmd}`]);
    setDone(false);
  };

  const stage = pipelineStages[active] ?? pipelineStages[pipelineStages.length - 1];
  const stepNumber = String(Math.min(active + 1, pipelineStages.length)).padStart(2, '0');
  const total = String(pipelineStages.length).padStart(2, '0');

  return (
    <section id="pipeline" ref={sectionRef}>
      <div className="sec-top">
        <span>03 — {t('nav.pipeline')}</span>
        <h2>
          {t('kinetic.pipelineTitleA')} <em>{t('kinetic.pipelineTitleEm')}</em>
        </h2>
      </div>

      <p className="pipeline-lead">{t('kinetic.pipelineLead')}</p>

      <Reveal>
        <div className="pipeline-panel">
          <div className="pipeline-head">
            <span>// ci/cd pipeline</span>
            <span className="pipeline-status">
              <i aria-hidden="true" />
              {t('pipeline.demo')}
            </span>
          </div>

          <div className="pipeline-track">
            {pipelineStages.map((item, index) => {
              const status = statuses[index];
              const nextStatus = statuses[index + 1];
              const fill =
                nextStatus === 'done'
                  ? 100
                  : nextStatus === 'running'
                    ? 55
                    : status === 'done'
                      ? 100
                      : 0;

              return (
                <Fragment key={item.id}>
                  <div className={`pipe-node ${status}`}>
                    <div className="pipe-circle" aria-hidden="true">
                      {status === 'done' ? (
                        '✓'
                      ) : status === 'running' ? (
                        <span className="pipe-dot" />
                      ) : (
                        String(index + 1).padStart(2, '0')
                      )}
                    </div>
                    <div className="pipe-text">
                      <span className="pipe-label">{item.label}</span>
                      <span className="pipe-tool">{item.tool}</span>
                    </div>
                  </div>

                  {index < pipelineStages.length - 1 && (
                    <div className="pipe-link" aria-hidden="true">
                      <i style={{ '--fill': `${fill}%` } as CSSProperties} />
                    </div>
                  )}
                </Fragment>
              );
            })}
          </div>

          <div className="pipeline-body">
            <div className="pipe-detail">
              <span className="pipe-step">
                {t('pipeline.step')} {stepNumber} / {total}
              </span>
              <h3>{stage.label}</h3>
              <p>{t(`pipeline.steps.${stage.id}`)}</p>
              <code className="pipe-cmd">{stage.cmd}</code>
            </div>

            <div className="pipe-log" ref={logRef} aria-live="polite">
              {log.map((line, index) => (
                <div key={`${line}-${index}`} className={line.startsWith('$') ? 'cmd' : 'ok'}>
                  {line}
                </div>
              ))}
              {!done && <span className="pipe-cursor" aria-hidden="true" />}
            </div>
          </div>

          <div className="pipeline-foot">
            <span>main · HEAD</span>
            <button type="button" className="pipe-replay" onClick={reset}>
              {t('pipeline.replay')}
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

import { useTranslation } from '../i18n';
import Reveal from './Reveal';
import Stat from './Stat';

interface SkillCategory {
  name: string;
  tags: string[];
}

export default function About() {
  const { t } = useTranslation();
  const paragraphs = (t('about.paragraphs', { returnObjects: true }) as string[]).slice(0, 2);
  const categories = t('skills.categories', { returnObjects: true }) as SkillCategory[];
  const stack = categories.flatMap((category) => category.tags);

  return (
    <section id="perfil">
      <div className="sec-top">
        <span>01 — {t('nav.profile')}</span>
        <h2>
          {t('kinetic.aboutTitleA')} <em>{t('kinetic.aboutTitleEm')}</em>
        </h2>
      </div>

      <div className="about">
        <Reveal className="about-copy">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
          <p className="big-line" style={{ marginTop: 34 }}>
            {t('kinetic.aboutLead')}
          </p>
        </Reveal>

        <Reveal>
          <div className="stats">
            <Stat end={6} pad={2} label={t('kinetic.statProjects')} />
            <Stat end={50} suffix="k+" label={t('kinetic.statEtl')} />
            <Stat end={1} pad={2} label={t('kinetic.statAward')} />
            <Stat end={3} pad={2} label={t('kinetic.statYears')} />
          </div>
          <ul className="stack">
            {stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

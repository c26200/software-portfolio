import { useTranslation } from '../i18n';
import { useReveal } from '../hooks/useReveal';
import SectionHeader from './SectionHeader';

interface StudyItem {
  year: string;
  institution: string;
  program: string;
  note: string;
}

export default function Studies() {
  const { t } = useTranslation();
  const ref = useReveal<HTMLElement>();
  const items = t('studies.items', { returnObjects: true }) as StudyItem[];

  return (
    <section className="studies-section reveal" id="estudios" ref={ref}>
      <SectionHeader num={t('sections.studies.num')} title={t('sections.studies.title')} />
      <div className="studies-timeline">
        {items.map((item, index) => (
          <div className="study-item" key={index}>
            <p className="study-year">{item.year}</p>
            <h3 className="study-inst">{item.institution}</h3>
            <p className="study-program">{item.program}</p>
            <p className="study-note">{item.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

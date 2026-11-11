import { useTranslation } from 'react-i18next';
import { useReveal } from '../hooks/useReveal';
import SectionHeader from './SectionHeader';

interface SkillCategory {
  name: string;
  tags: string[];
}

export default function Skills() {
  const { t } = useTranslation();
  const ref = useReveal<HTMLElement>();
  const categories = t('skills.categories', { returnObjects: true }) as SkillCategory[];

  return (
    <section className="skills-section reveal" id="habilidades" ref={ref}>
      <SectionHeader num={t('sections.skills.num')} title={t('sections.skills.title')} />
      <div className="skills-grid">
        {categories.map((category) => (
          <div key={category.name}>
            <p className="skills-cat">{category.name}</p>
            <div className="skills-tags">
              {category.tags.map((tag) => (
                <span className="skill-tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

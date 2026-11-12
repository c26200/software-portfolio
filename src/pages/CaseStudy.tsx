import { Link, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { caseStudies, getCaseContent, getCaseStudy } from '../content/caseStudies';
import { getPostContent, posts } from '../content/blog';
import { projectImageSrcSet } from '../content/projects';
import { localizePath, pathLanguage } from '../i18n-paths';

export default function CaseStudy() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const language = pathLanguage(pathname);
  const study = slug ? getCaseStudy(slug) : undefined;

  if (!study) {
    return (
      <section className="blog-section">
        <div className="blog-container">
          <h1 className="blog-post-title">{t('blog.notFound')}</h1>
          <Link to={localizePath('/', language)} className="blog-back">
            {t('blog.back')}
          </Link>
        </div>
      </section>
    );
  }

  const copy = getCaseContent(study, language);
  const related = study.relatedPosts
    .map((postSlug) => posts.find((post) => post.slug === postSlug))
    .filter((post): post is NonNullable<typeof post> => Boolean(post));
  const otherStudies = caseStudies.filter((item) => item.slug !== study.slug).slice(0, 3);

  return (
    <section className="case-section">
      <article className="case-container">
        <p className="kicker">
          <i aria-hidden="true" />
          {t('caseStudy.kicker')} · {copy.category}
        </p>
        <h1 className="case-title">{copy.title}</h1>
        <p className="case-subtitle">{copy.subtitle}</p>

        <div className="case-meta-row">
          <ul className="case-stack" aria-label={t('projects.stack')}>
            {study.stack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
          <a className="case-code" href={study.href} target="_blank" rel="noopener noreferrer">
            {t('caseStudy.viewCode')} ↗
          </a>
        </div>

        <figure className="case-media">
          <img
            src={study.image}
            srcSet={projectImageSrcSet(study.image)}
            sizes="(max-width: 900px) 92vw, 1040px"
            alt={copy.title}
            width={1440}
            height={900}
          />
        </figure>

        <p className="case-summary">{copy.summary}</p>

        <dl className="case-metrics">
          {copy.metrics.map((metric) => (
            <div key={metric.label}>
              <dt>{metric.label}</dt>
              <dd>{metric.value}</dd>
            </div>
          ))}
        </dl>

        <div className="blog-prose case-prose">
          {copy.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              <div dangerouslySetInnerHTML={{ __html: section.html }} />
            </section>
          ))}

          <h2>{t('caseStudy.lessons')}</h2>
          <ul className="case-lessons">
            {copy.lessons.map((lesson) => (
              <li key={lesson}>{lesson}</li>
            ))}
          </ul>
        </div>

        {related.length > 0 && (
          <aside className="blog-related" aria-label={t('caseStudy.related')}>
            <p className="blog-related-label">{t('caseStudy.related')}</p>
            <ul>
              {related.map((post) => {
                const postCopy = getPostContent(post, language);
                return (
                  <li key={post.slug}>
                    <Link to={localizePath(`/blog/${post.slug}`, language)}>
                      <span>{postCopy.title}</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </aside>
        )}

        <nav className="case-others" aria-label={t('projects.other')}>
          <p className="blog-related-label">{t('projects.other')}</p>
          <ul>
            {otherStudies.map((item) => {
              const itemCopy = getCaseContent(item, language);
              return (
                <li key={item.slug}>
                  <Link to={localizePath(`/proyectos/${item.slug}`, language)}>
                    <span>{itemCopy.title.split(':')[0]}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Link to={`${localizePath('/', language)}#proyectos`} className="blog-back">
          {t('caseStudy.back')}
        </Link>
      </article>
    </section>
  );
}

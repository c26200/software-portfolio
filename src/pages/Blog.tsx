import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../i18n';
import { formatPostDate } from '../content/format';
import { getPostSummary, postIndex } from '../content/blog-index';
import { localizePath, pathLanguage } from '../i18n-paths';

export default function Blog() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const language = pathLanguage(pathname);

  return (
    <section className="blog-section">
      <div className="blog-container">
        <p className="kicker">
          <i aria-hidden="true" />
          Blog
        </p>
        <h1 className="blog-index-title">{t('blog.title')}</h1>

        <div className="blog-list">
          {postIndex.length === 0 ? (
            <p className="blog-empty">{t('blog.empty')}</p>
          ) : (
            postIndex.map((post) => {
              const copy = getPostSummary(post, language);
              return (
                <article className="blog-card" key={post.slug}>
                  <p className="blog-date">
                    <time dateTime={post.date}>{formatPostDate(post.date, language)}</time>
                  </p>
                  <Link to={localizePath(`/blog/${post.slug}`, language)} className="blog-link">
                    <h2 className="blog-title">{copy.title}</h2>
                  </Link>
                  <p className="blog-excerpt">{copy.excerpt}</p>
                  <Link to={localizePath(`/blog/${post.slug}`, language)} className="blog-readmore">
                    {t('blog.readMore')} →
                  </Link>
                </article>
              );
            })
          )}
        </div>

        <Link to={localizePath('/', language)} className="blog-back">
          {t('blog.back')}
        </Link>
      </div>
    </section>
  );
}

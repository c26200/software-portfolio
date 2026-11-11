import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { formatPostDate, posts } from '../content/blog';

export default function Blog() {
  const { t, i18n } = useTranslation();

  return (
    <section className="blog-section">
      <div className="blog-container">
        <p className="kicker">
          <i aria-hidden="true" />
          Blog
        </p>
        <h1 className="blog-index-title">{t('blog.title')}</h1>

        <div className="blog-list">
          {posts.length === 0 ? (
            <p className="blog-empty">Próximamente...</p>
          ) : (
            posts.map((post) => (
              <article className="blog-card" key={post.slug}>
                <p className="blog-date">
                  <time dateTime={post.date}>{formatPostDate(post.date, i18n.language)}</time>
                </p>
                <Link to={`/blog/${post.slug}`} className="blog-link">
                  <h2 className="blog-title">{post.title}</h2>
                </Link>
                <p className="blog-excerpt">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="blog-readmore">
                  {t('blog.readMore')} →
                </Link>
              </article>
            ))
          )}
        </div>

        <Link to="/" className="blog-back">
          {t('blog.back')}
        </Link>
      </div>
    </section>
  );
}

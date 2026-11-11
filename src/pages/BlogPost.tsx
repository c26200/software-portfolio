import { Link, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { buildToc, formatPostDate, getPostContent, posts } from '../content/blog';
import { localizePath, pathLanguage } from '../i18n-paths';

export default function BlogPost() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const language = pathLanguage(pathname);
  const post = posts.find((item) => item.slug === slug);
  const copy = post ? getPostContent(post, language) : undefined;

  if (!post || !copy) {
    return (
      <section className="blog-section">
        <div className="blog-container">
          <h1 className="blog-post-title">{t('blog.notFound')}</h1>
          <Link to={localizePath('/blog', language)} className="blog-back">
            {t('blog.back')}
          </Link>
        </div>
      </section>
    );
  }

  const related = posts.filter((item) => item.slug !== post.slug);
  const { html, toc } = buildToc(copy.html);

  return (
    <section className="blog-section">
      <article className="blog-container">
        <p className="blog-byline">
          <Link to={localizePath('/', language)} className="blog-author" rel="author">
            Carlos Gordillo
          </Link>
          <span aria-hidden="true"> · </span>
          <time dateTime={post.date}>
            {t('blog.publishedOn')} {formatPostDate(post.date, language)}
          </time>
        </p>
        <h1 className="blog-post-title">{copy.title}</h1>
        {toc.length > 0 && (
          <nav className="blog-toc" aria-label={t('blog.contents')}>
            <p className="blog-toc-label">{t('blog.contents')}</p>
            <ol>
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>{item.text}</a>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="blog-prose" dangerouslySetInnerHTML={{ __html: html }} />
        {related.length > 0 && (
          <aside className="blog-related" aria-label={t('blog.related')}>
            <p className="blog-related-label">{t('blog.related')}</p>
            <ul>
              {related.map((item) => {
                const itemCopy = getPostContent(item, language);
                return (
                  <li key={item.slug}>
                    <Link to={localizePath(`/blog/${item.slug}`, language)}>
                      <span>{itemCopy.title}</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </aside>
        )}
        <Link to={localizePath('/blog', language)} className="blog-back">
          {t('blog.back')}
        </Link>
      </article>
    </section>
  );
}

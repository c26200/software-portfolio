import { Link, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { formatPostDate, getPostContent, posts } from '../content/blog';
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

  return (
    <section className="blog-section">
      <article className="blog-container">
        <p className="blog-date">
          <time dateTime={post.date}>
            {t('blog.publishedOn')} {formatPostDate(post.date, language)}
          </time>
        </p>
        <h1 className="blog-post-title">{copy.title}</h1>
        <div className="blog-prose" dangerouslySetInnerHTML={{ __html: copy.html }} />
        <Link to={localizePath('/blog', language)} className="blog-back">
          {t('blog.back')}
        </Link>
      </article>
    </section>
  );
}

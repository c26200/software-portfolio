import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { formatPostDate, posts } from '../content/blog';

export default function BlogPost() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <section className="blog-section">
        <div className="blog-container">
          <h1 className="blog-post-title">Post no encontrado</h1>
          <Link to="/blog" className="blog-back">
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
            {t('blog.publishedOn')} {formatPostDate(post.date, i18n.language)}
          </time>
        </p>
        <h1 className="blog-post-title">{post.title}</h1>
        <div className="blog-prose" dangerouslySetInnerHTML={{ __html: post.html }} />
        <Link to="/blog" className="blog-back">
          {t('blog.back')}
        </Link>
      </article>
    </section>
  );
}

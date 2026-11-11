import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { formatPostDate, getPostContent, posts } from '../content/blog';
import { localizePath, pathLanguage } from '../i18n-paths';
import Reveal from './Reveal';

export default function LatestPosts() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const language = pathLanguage(pathname);

  return (
    <section id="blog">
      <div className="sec-top">
        <span>05 — {t('nav.blog')}</span>
        <h2>
          {t('kinetic.blogTitleA')} <em>{t('kinetic.blogTitleEm')}</em>
        </h2>
      </div>

      <div className="latest-head">
        <Reveal>
          <p className="latest-lead">{t('kinetic.blogLead')}</p>
        </Reveal>
        <Link to={localizePath('/blog', language)} className="latest-all">
          {t('kinetic.allPosts')} →
        </Link>
      </div>

      <div className="latest-list">
        {posts.map((post) => {
          const copy = getPostContent(post, language);
          return (
            <Link
              key={post.slug}
              to={localizePath(`/blog/${post.slug}`, language)}
              className="latest-card"
            >
              <time className="latest-date" dateTime={post.date}>
                {formatPostDate(post.date, language)}
              </time>
              <h3>{copy.title}</h3>
              <p>{copy.excerpt}</p>
              <span className="latest-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

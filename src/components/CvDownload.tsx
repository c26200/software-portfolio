import { useTranslation } from '../i18n';

const CV_BY_LANGUAGE = {
  es: { href: '/cv/carlos-gordillo-cv-es.pdf', file: 'Carlos_Gordillo_CV_ES.pdf' },
  en: { href: '/cv/carlos-gordillo-cv-en.pdf', file: 'Carlos_Gordillo_CV_EN.pdf' },
} as const;

interface CvDownloadProps {
  className?: string;
  short?: boolean;
}

/**
 * Language-aware CV download. Spanish pages serve the Spanish PDF and English
 * pages the English one, with a stable filename for the saved file.
 */
export default function CvDownload({ className = 'btn', short = false }: CvDownloadProps) {
  const { t, i18n } = useTranslation();
  const cv = CV_BY_LANGUAGE[i18n.language === 'en' ? 'en' : 'es'];

  return (
    <a
      className={className || undefined}
      href={cv.href}
      download={cv.file}
      type="application/pdf"
      aria-label={t('cv.aria')}
      title={t('cv.format')}
    >
      {short ? t('cv.downloadShort') : t('cv.download')}{' '}
      <span aria-hidden="true">↓</span>
    </a>
  );
}

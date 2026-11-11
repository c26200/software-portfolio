import { useTranslation } from 'react-i18next';

export default function LanguageSwitch() {
  const { i18n } = useTranslation();
  const current = i18n.language.split('-')[0];

  const change = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem('lang', language);
  };

  return (
    <div className="lang-switch">
      <button
        type="button"
        className={current === 'es' ? 'active' : ''}
        onClick={() => change('es')}
        aria-pressed={current === 'es'}
      >
        ES
      </button>
      <button
        type="button"
        className={current === 'en' ? 'active' : ''}
        onClick={() => change('en')}
        aria-pressed={current === 'en'}
      >
        EN
      </button>
    </div>
  );
}

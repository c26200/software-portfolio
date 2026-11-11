import { useTranslation } from 'react-i18next';

export default function Marquee() {
  const { t } = useTranslation();
  const items = t('kinetic.marquee', { returnObjects: true }) as string[];
  const row = (keyPrefix: string) =>
    items.map((item, index) => (
      <span key={`${keyPrefix}-${item}`}>
        {item}
        {index < items.length - 1 && <b aria-hidden="true"> —</b>}
      </span>
    ));

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row('a')}
        {row('b')}
      </div>
    </div>
  );
}

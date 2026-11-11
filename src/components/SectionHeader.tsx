interface SectionHeaderProps {
  num: string;
  title: string;
}

export default function SectionHeader({ num, title }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <p className="section-num">{num}</p>
      <h2 className="section-title">{title}</h2>
      <div className="section-rule" />
    </div>
  );
}

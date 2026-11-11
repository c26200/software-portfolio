interface StatProps {
  end: number;
  suffix?: string;
  pad?: number;
  label: string;
}

export default function Stat({ end, suffix = '', pad = 0, label }: StatProps) {
  const value = `${String(end).padStart(pad, '0')}${suffix}`;

  return (
    <div className="stat">
      <b>{value}</b>
      <span>{label}</span>
    </div>
  );
}

export type StepCardProps = {
  number: string;
  title: string;
  description: string;
};

export function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="rounded-2xl border border-black/8 p-8">
      <span className="font-display text-2xl font-semibold text-signal">{number}</span>
      <h3 className="mt-4 text-base font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-light">{description}</p>
    </div>
  );
}

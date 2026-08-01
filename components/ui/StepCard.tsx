export type StepCardProps = {
  number: string;
  index?: number;
  title: string;
  description: string;
};

export function StepCard({ number, title, description, index = 0 }: StepCardProps) {
  return (
    <div className={`rounded-2xl  shadow border-black/8 p-8 ${[0,3].includes(index) ? "col-span-6" : "col-span-4"}`}>
      <span className="font-display text-2xl font-semibold text-signal">{number}</span>
      <h3 className="mt-4 text-base font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-light">{description}</p>
    </div>
  );
}

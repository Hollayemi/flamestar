export type TrackFoundationItem = {
  number: string;
  description: string;
};

export type TrackFoundationProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: TrackFoundationItem[];
  className?: string;
};

const defaultItems: TrackFoundationItem[] = [
  {
    number: "01",
    description: "Capital preservation first, risk is managed before return is pursued.",
  },
  {
    number: "02",
    description: "A genuine fiduciary standard, your interests ahead of our own, always.",
  },
  {
    number: "03",
    description:
      "Institutional grade discipline, the research and risk frameworks used by the world's leading managers, applied to every mandate.",
  },
  {
    number: "04",
    description: "Complete transparency, clear reporting on performance, risk, and cost.",
  },
];

export function TrackFoundation({
  eyebrow = "Our Track",
  title = "Built on a foundation of discipline and trust",
  description = "As a firm, we ask to be measured not by a long history, but by the rigour of our process and the integrity of our promises. This is what defines the Flamestar approach from day one:",
  items = defaultItems,
  className = "",
}: TrackFoundationProps) {
  const [first, ...rest] = items;

  return (
    <section className={`mx-auto max-w-6xl px-6 py-20 lg:px-10 lg:py-10 ${className}`}>
      <span className="inline-flex rounded-full border border-black/10 bg-paper px-4 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-ink/70">
        {eyebrow}
      </span>

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-light">{description}</p>
        </div>

        {first && (
          <div className="border-l border-signal/25 pl-5">
            <p className="font-mono text-2xl font-semibold text-signal/60">{first.number}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink">{first.description}</p>
          </div>
        )}
      </div>

      {rest.length > 0 && (
        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          {rest.map((item) => (
            <div key={item.number} className="border-l border-signal/25 pl-5">
              <p className="font-mono text-2xl font-semibold text-signal/60">{item.number}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink">{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

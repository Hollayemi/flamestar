import Link from "next/link";

export type TrackRecordOverviewProps = {
  heading?: string;
  description?: string;
  points?: string[];
  cta?: { label: string; href: string };
  className?: string;
};

const defaultPoints = [
  "Strong lending portfolio performance",
  "Strategic real estate investments",
  "Diversified asset allocation",
];

export function TrackRecordOverview({
  heading = "Overview",
  description = "Our portfolio reflects a balanced mix of income-generating and growth-oriented assets.",
  points = defaultPoints,
  cta,
  className = "",
}: TrackRecordOverviewProps) {
  return (
    <section className={`mx-auto max-w-7xl px-6 py-16 lg:px-10 ${className}`}>
      <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-16">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{heading}</h2>

        <div>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-light sm:text-base">
            {description}
          </p>
          <ul className="mt-5 flex flex-col gap-2.5">
            {points.map((point) => (
              <li key={point} className="flex items-center gap-3 text-sm text-ink">
                <span className="h-3.5 w-1 shrink-0 rounded-full bg-flame" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {cta && (
        <div className="mt-14 flex justify-center">
          <Link
            href={cta.href}
            className="rounded-full border border-black/10 bg-paper px-4 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-ink/70 transition-colors hover:border-black/25"
          >
            {cta.label}
          </Link>
        </div>
      )}
    </section>
  );
}

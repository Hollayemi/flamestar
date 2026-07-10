import { PillarCard, type PillarCardProps } from "@/components/ui/PillarCard";

export type PillarsProps = {
  eyebrow?: string | null;
  title?: string;
  description?: string;
  pillars?: PillarCardProps[];
  className?: string;
};

const defaultPillars: PillarCardProps[] = [
  {
    number: "01",
    title: "Integrity",
    description:
      "Maintaining an uncompromising ethical standard and moral clarity in every engagement to ensure your interests always come first.",
  },
  {
    number: "02",
    title: "Discipline",
    description:
      "Applying a clinical, data-driven approach to every investment decision, remaining steadfast in our commitment to rigorous risk management.",
  },
  {
    number: "03",
    title: "Excellence",
    description:
      "Pursuing intellectual and operational perfection to deliver sophisticated strategies that exceed industry benchmarks and client expectations.",
  },
  {
    number: "04",
    title: "Transparency",
    description:
      "Providing high-fidelity reporting and honest market assessments to ensure complete alignment and clarity in our partnership.",
  },
  {
    number: "05",
    title: "Client-Centricity",
    description:
      "Operating as a dedicated fiduciary where every solution is bespoke and engineered specifically to meet your unique financial objectives.",
  },
];

export function Pillars({
  eyebrow = "Our Core Values",
  title = "The Pillars of Our Fiduciary Standard",
  description,
  pillars = defaultPillars,
  className = "",
}: PillarsProps) {
  const [firstRow, secondRow] = [pillars.slice(0, 3), pillars.slice(3)];

  return (
    <section className={`relative overflow-hidden ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-flame/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="flex flex-col items-center text-center">
          {eyebrow && (
            <span className="rounded-full border border-black/10 bg-paper px-4 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-ink/70">
              {eyebrow}
            </span>
          )}
          <h2 className="mt-6 max-w-2xl font-display text-2xl font-semibold text-ink sm:text-3xl">
            {title}
          </h2>
          {description && (
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-light sm:text-base">
              {description}
            </p>
          )}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {firstRow.map((pillar) => (
            <PillarCard key={pillar.number} {...pillar} />
          ))}
        </div>

        {secondRow.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {secondRow.map((pillar) => (
              <PillarCard key={pillar.number} {...pillar} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

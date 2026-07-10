import Link from "next/link";

export type InsightsValuePropsProps = {
  whyMatters?: {
    title?: string;
    description?: string;
    points?: string[];
  };
  nextSteps?: {
    title?: string;
    ctas?: { label: string; href: string }[];
  };
  className?: string;
};

const defaultWhyMatters = {
  title: "Why This Matters",
  description:
    "In today's fast-evolving financial environment, access to reliable, high-quality insights is a competitive advantage. Our insights are designed to:",
  points: [
    "Enhance your investment decision-making",
    "Identify emerging opportunities",
    "Mitigate risks through informed strategies",
  ],
};

const defaultNextSteps = {
  title: "Take the next step beyond insights.",
  ctas: [
    { label: "Speak to an Advisor", href: "/contact" },
    { label: "Download Investment Report", href: "/insights/reports" },
    { label: "Start Investing", href: "/contact" },
  ],
};

export function InsightsValueProps({
  whyMatters = defaultWhyMatters,
  nextSteps = defaultNextSteps,
  className = "",
}: InsightsValuePropsProps) {
  return (
    <section className={`mx-auto max-w-7xl px-6 py-10 lg:px-10 ${className}`}>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-paper-soft p-8">
          <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
            {whyMatters.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-light">
            {whyMatters.description}
          </p>
          <div className="mt-6 flex flex-col gap-3">
            {whyMatters.points?.map((point) => (
              <span
                key={point}
                className="rounded-lg bg-flame/10 px-4 py-3 text-sm text-ink"
              >
                {point}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-black/8 p-8">
          <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
            {nextSteps.title}
          </h3>
          <div className="mt-8 flex flex-col gap-3">
            {nextSteps.ctas?.map((cta) => (
              <Link
                key={cta.label}
                href={cta.href}
                className="rounded-full bg-flame py-3.5 text-center text-sm font-medium text-paper transition-colors hover:bg-flame-deep"
              >
                {cta.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

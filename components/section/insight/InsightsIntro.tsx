export type InsightsIntroProps = {
  heading?: string;
  paragraphs?: string[];
  className?: string;
};

const defaultParagraphs = [
  "At Flamestar Capital Ltd, we believe that informed investors make better decisions. Our Insights hub provides timely, relevant, and actionable intelligence across financial markets, economic trends, and investment opportunities.",
  "From macroeconomic outlooks to asset-specific analysis, our goal is to equip you with the clarity and confidence needed to navigate today's dynamic financial landscape.",
];

export function InsightsIntro({
  heading = "Introduction",
  paragraphs = defaultParagraphs,
  className = "",
}: InsightsIntroProps) {
  return (
    <section className={`mx-auto max-w-7xl px-6 py-16 lg:px-10 ${className}`}>
      <div className="grid gap-6 lg:grid-cols-[220px_1fr] lg:gap-16">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{heading}</h2>
        <div className="flex max-w-2xl flex-col gap-4 text-sm leading-relaxed text-muted-light sm:text-base">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

export type LegalIntroProps = {
  title?: string;
  paragraphs: string[];
  className?: string;
};

export function LegalIntro({ title = "Introduction", paragraphs, className = "" }: LegalIntroProps) {
  return (
    <section className={`mx-auto max-w-3xl px-6 py-16 lg:px-10 ${className}`}>
      <h2 className="text-center font-display text-2xl font-semibold text-ink sm:text-3xl">
        {title}
      </h2>
      <div className="mt-8 flex flex-col gap-5 text-sm leading-relaxed text-muted-light sm:text-base">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

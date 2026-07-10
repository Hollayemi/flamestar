import Link from "next/link";

export type CaseStudyHighlightProps = {
  title: string;
  description: string;
  href: string;
  ctaLabel?: string;
};

export function CaseStudyHighlight({
  title,
  description,
  href,
  ctaLabel = "Click to Read",
}: CaseStudyHighlightProps) {
  return (
    <div className="flex h-full flex-col justify-center rounded-2xl bg-signal/10 p-8">
      <h3 className="font-display text-xl font-semibold leading-snug text-ink sm:text-2xl">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-light">{description}</p>
      <Link
        href={href}
        className="mt-6 inline-flex w-fit items-center rounded-full border border-black/15 bg-paper px-5 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-ink transition-colors hover:border-black/30"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}

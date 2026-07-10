import Image from "next/image";
import Link from "next/link";

export type FeaturedInsightProps = {
  eyebrow?: string;
  image: string;
  title: string;
  description: string;
  cta?: { label: string; href: string };
  className?: string;
};

export function FeaturedInsight({
  eyebrow = "Featured Insight",
  image,
  title,
  description,
  cta,
  className = "",
}: FeaturedInsightProps) {
  return (
    <section className={`mx-auto max-w-7xl px-6 py-6 lg:px-10 ${className}`}>
      <div className="grid gap-8 rounded-2xl bg-paper-soft p-6 sm:p-8 lg:grid-cols-[320px_1fr] lg:items-center">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-paper">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 1024px) 320px, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-light">
            {eyebrow}
          </span>
          <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-ink sm:text-2xl">
            {title}
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-light">{description}</p>

          {cta && (
            <Link
              href={cta.href}
              className="mt-6 inline-flex items-center rounded-full border border-black/15 px-5 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-ink transition-colors hover:border-black/30"
            >
              {cta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

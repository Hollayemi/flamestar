import Image from "next/image";

export type CEOQuoteProps = {
  quote: string;
  name: string;
  title: string;
  photo: string;
  className?: string;
};

export function CEOQuote({ quote, name, title, photo, className = "" }: CEOQuoteProps) {
  return (
    <section className={`mx-auto max-w-7xl px-6 py-16 lg:px-10 ${className}`}>
      <span aria-hidden="true" className="font-display text-6xl leading-none text-flame/25">
        &ldquo;
      </span>

      <p className="mt-4 max-w-2xl font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl">
        {quote}
      </p>

      <div className="mt-8 flex items-center justify-between">
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-wide text-ink">{name}</p>
          <p className="mt-0.5 font-mono text-xs uppercase tracking-wide text-muted-light">
            {title}
          </p>
        </div>
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-paper-soft sm:h-24 sm:w-24">
          <Image src={photo} alt={name} fill sizes="96px" className="object-cover" />
        </div>
      </div>
    </section>
  );
}

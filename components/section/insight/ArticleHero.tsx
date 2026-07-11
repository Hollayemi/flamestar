import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export type ArticleHeroProps = {
  title: string;
  description?: string;
  backgroundImage: string;
  backHref?: string;
  backLabel?: string;
  className?: string;
};

export function ArticleHero({
  title,
  description,
  backgroundImage,
  backHref = "/insights",
  backLabel = "Go Back",
  className = "",
}: ArticleHeroProps) {
  return (
    <div className={`mx-auto max-w-7xl px-6 lg:px-10 ${className}`}>
      <section className="relative flex min-h-[420px] items-end overflow-hidden rounded-3xl bg-ink text-paper lg:min-h-[480px]">
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />

        <Link
          href={backHref}
          className="absolute left-6 top-6 z-10 inline-flex items-center gap-2 rounded-full border border-paper/25 bg-ink/40 px-4 py-2 text-xs font-medium uppercase tracking-wide text-paper backdrop-blur-sm transition-colors hover:border-paper/50 sm:left-10 sm:top-8"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {backLabel}
        </Link>

        <div className="relative z-10 flex flex-col gap-4 px-8 pb-10 pt-8 sm:px-10 lg:px-14 lg:pb-14">
          <h1 className="max-w-2xl font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="max-w-xl text-sm text-paper/70 sm:text-base">{description}</p>
          )}
        </div>
      </section>
    </div>
  );
}

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
    <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 ${className}`}>
      <section className="relative flex min-h-[400px] items-end overflow-hidden rounded-2xl bg-ink text-paper sm:min-h-[450px] lg:min-h-[500px] xl:min-h-[550px]">
        {/* Background Image */}
        <img
          src={backgroundImage}
          alt=""
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />

        {/* Gradient Overlay - stronger for better readability */}
        <div className="absolute inset-0 z-10 bg-ink/70" />

        {/* Back Button */}
        <Link
          href={backHref}
          className="absolute left-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-paper/25 bg-ink/40 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-paper backdrop-blur-sm transition-colors hover:border-paper/50 sm:left-6 sm:top-6 sm:px-4 sm:py-2"
        >
          <ArrowLeft className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          <span className="hidden sm:inline">{backLabel}</span>
          <span className="sm:hidden">Back</span>
        </Link>

        {/* Content */}
        <div className="relative z-20 w-full px-5 pb-6 pt-4 sm:px-8 sm:pb-8 lg:px-12 lg:pb-10 xl:px-14 xl:pb-12">
          <div className="max-w-3xl">
            <h1 className="font-display text-xl font-semibold leading-tight sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
              {title}
            </h1>
            {description && (
              <div className="mt-2 max-w-2xl text-xs text-paper/80 sm:mt-3 sm:text-sm md:text-base lg:text-lg">
                <p>
                  {description.length > 300
                    ? `${description.slice(0, 300)}...`
                    : description}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
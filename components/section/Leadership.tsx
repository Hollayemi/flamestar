import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArticleCard, type ArticleCardProps } from "@/components/ui/ArticleCard";

export type LeadershipQuote = {
  photo: string;
  quote: string;
  name: string;
  title: string;
};

export type LeadershipProps = {
  eyebrow?: string;
  title?: string;
  quote?: LeadershipQuote;
  newsroomTitle?: string;
  newsroomDescription?: string;
  articles?: ArticleCardProps[];
  className?: string;
};

const defaultQuote: LeadershipQuote = {
  photo: "/images/ceo-portrait.png",
  quote:
    "We founded Flamestar Capital on a simple conviction that investors deserve a manager who is disciplined in method, transparent in practice, and unwavering in putting their interests first. That is the standard we hold ourselves to every day.",
  name: "Yahaya Blessing",
  title: "CEO Flamestar Capital",
};

const defaultArticles: ArticleCardProps[] = [
  {
    image: "/images/news1.webp",
    category: "Building Wealth with Discipline: Why Process Beats Prediction",
    excerpt: "Markets are unpredictable; a good process is not. Here is why we trust discipline over forecasts.",
    date: "02/10/2025",
    readTime: "3 mins read",
    href: "/market-insights/insight",
  },
  {
    image: "/images/news1.webp",
    category: "The Nigerian Investment Landscape: Where We See Opportunity",
    excerpt: "A grounded look at the risks and opportunities shaping Nigerian markets today.",
    date: "02/10/2025",
    readTime: "3 mins read",
    href: "/market-insights/insight",
  },
  {
    image: "/images/news1.webp",
    category: "Understanding Risk: How We Protect Your Capital",
    excerpt: "Return matters - but not before risk. A plain language look at how we manage it.",
    date: "02/10/2025",
    readTime: "3 mins read",
    href: "/market-insights/insight",
  },
];

export function Leadership({
  eyebrow = "Our CEO",
  title = "Leadership you can trust",
  quote = defaultQuote,
  newsroomTitle = "Newsroom",
  newsroomDescription = "Stay up to date with market perspectives, firm announcements, and the ideas shaping how we invest.",
  articles = defaultArticles,
  className = "",
}: LeadershipProps) {
  return (
    <section className={`mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28 ${className}`}>
      <div className="flex flex-col items-center text-center">
        <span className="rounded-full border border-black/10 bg-paper px-4 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-ink/70">
          {eyebrow}
        </span>
        <h2 className="mt-6 font-display text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>
      </div>

      <div className="w-full flex justify-center">
        <div className="mt-14 flex flex-col gap-8 sm:flex-row sm:items-start">
          <div className="relative h-56 w-56 shrink-0 overflow-hidden rounded-3xl border border-black/10 bg-paper-soft sm:h-60 sm:w-60">
            <Image
              src={quote.photo}
              alt={quote.name}
              fill
              sizes="(min-width: 640px) 240px, 224px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-4 sm:pt-2">
            <p className="max-w-xl text-lg leading-relaxed text-muted-light sm:text-xl">
              &ldquo;{quote.quote}&rdquo;
            </p>
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-wide text-ink">
                {quote.name}
              </p>
              <p className="font-mono text-xs uppercase tracking-wide text-ink/60">{quote.title}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24 text-center">
        <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          {newsroomTitle}
        </h3>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-light sm:text-base">
          {newsroomDescription}
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.category} {...article} />
        ))}
      </div>

      <div className="mt-14 flex justify-center">
        <Link
          href="/market-insights"
          className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-ink-soft"
        >
          View All Articles
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
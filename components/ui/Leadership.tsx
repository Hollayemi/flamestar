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
  photo: "/images/ceo-portrait.jpg",
  quote:
    "Vision-driven investment professional with a track record of building scalable financial platforms and delivering strong portfolio performance.",
  name: "Yahaya Blessing",
  title: "CEO, Flamestar Capital",
};

const defaultArticles: ArticleCardProps[] = [
  {
    image: "/images/news-wealth-creation.jpg",
    category: "Wealth creation",
    excerpt: "A look at how disciplined capital allocation compounds into lasting wealth over time.",
    date: "02/10/2025",
    readTime: "3 mins read",
    href: "/insights/news",
  },
  {
    image: "/images/news-nigerian-opportunities.jpg",
    category: "Nigerian investment opportunities",
    excerpt: "Where we see the strongest risk-adjusted opportunities across the Nigerian market.",
    date: "02/10/2025",
    readTime: "3 mins read",
    href: "/insights/news",
  },
  {
    image: "/images/news-market-outlook.jpg",
    category: "Market Outlook",
    excerpt: "Our latest read on rates, liquidity, and positioning across the quarter ahead.",
    date: "02/10/2025",
    readTime: "3 mins read",
    href: "/insights/news",
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
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-flame">
          {eyebrow}
        </span>
        <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>

        <div className="mt-12 flex w-full max-w-xl flex-col items-center gap-6 rounded-3xl border border-black/6 bg-paper p-8 text-left shadow-[0_1px_2px_rgba(11,13,16,0.04),0_8px_24px_rgba(11,13,16,0.05)] sm:flex-row sm:items-center sm:p-10">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-paper-soft sm:h-20 sm:w-20">
            <Image src={quote.photo} alt={quote.name} fill sizes="80px" className="object-cover" />
          </div>
          <div>
            <p className="text-sm leading-relaxed text-ink/80 sm:text-base">
              &ldquo;{quote.quote}&rdquo;
            </p>
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-ink">
              {quote.name}
            </p>
            <p className="text-xs uppercase tracking-wide text-muted-light">{quote.title}</p>
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
          href="/insights/news"
          className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-ink-soft"
        >
          View All Articles
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}

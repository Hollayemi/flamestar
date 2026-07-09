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
    "Vision-driven investment professional with a track record of building scalable financial platforms and delivering strong portfolio performance.",
  name: "Yahaya Blessing",
  title: "CEO Flamestar Capital",
};

const defaultArticles: ArticleCardProps[] = [
  {
    image: "/images/news1.webp",
    category: "Wealth creation",
    excerpt: "A look at how disciplined capital allocation compounds into lasting wealth over time.",
    date: "02/10/2025",
    readTime: "3 mins read",
    href: "/insights/news",
  },
  {
    image: "/images/news1.webp",
    category: "Nigerian investment opportunities",
    excerpt: "Where we see the strongest risk-adjusted opportunities across the Nigerian market.",
    date: "02/10/2025",
    readTime: "3 mins read",
    href: "/insights/news",
  },
  {
    image: "/images/news1.webp",
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
import { ArticleCard, type ArticleCardProps } from "@/components/ui/ArticleCard";
import { CaseStudyHighlight, type CaseStudyHighlightProps } from "@/components/ui/CaseStudyHighlight";

export type CaseStudiesProps = {
  title?: string;
  description?: string;
  highlight?: CaseStudyHighlightProps;
  featured?: ArticleCardProps;
  articles?: ArticleCardProps[];
  className?: string;
};

const defaultHighlight: CaseStudyHighlightProps = {
  title: "A closer look at how we structure lasting portfolios.",
  description:
    "See how disciplined, risk-adjusted allocation across fixed income, equities, and real estate has translated into measurable outcomes for our clients.",
  href: "/market-insights/insight",
};

const defaultFeatured: ArticleCardProps = {
  image: "/images/record2.webp",
  category: "Market Outlook",
  excerpt: "Our latest read on rates, liquidity, and positioning across the quarter ahead.",
  date: "02/10/2025",
  readTime: "3 mins read",
  href: "/market-insights/insight",
};

const defaultArticles: ArticleCardProps[] = [
  {
    image: "/images/track_record.webp",
    category: "Wealth Creation for HNWIs",
    excerpt:
      "How a disciplined, multi-asset approach helped a high-net-worth client grow and protect their portfolio.",
    date: "02/10/2025",
    readTime: "3 mins read",
    href: "/market-insights/insight",
  },
  {
    image: "/images/record.jpg",
    category: "Structuring a Multi-Generational Trust",
    excerpt: "Building a trust structure designed to preserve and transfer wealth across generations.",
    date: "02/10/2025",
    readTime: "3 mins read",
    href: "/market-insights/insight",
  },
  {
    image: "/images/image4.webp",
    category: "Nigerian Investment Opportunities",
    excerpt: "Where we see the strongest risk-adjusted opportunities across the Nigerian market.",
    date: "02/10/2025",
    readTime: "3 mins read",
    href: "/market-insights/insight",
  },
];

export function CaseStudies({
  title = "Case Studies",
  description = "A look at how our disciplined, risk-adjusted approach has played out for real clients across wealth creation, trust structuring, and market positioning.",
  highlight = defaultHighlight,
  featured = defaultFeatured,
  articles = defaultArticles,
  className = "",
}: CaseStudiesProps) {
  return (
    <section className={`mx-auto max-w-7xl px-6 py-16 lg:px-10 ${className}`}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-light sm:text-base">{description}</p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <CaseStudyHighlight {...highlight} />
        <ArticleCard {...featured} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.category} {...article} />
        ))}
      </div>
    </section>
  );
}

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
  title: "How We Helped a Family Office Diversify Into Fixed Income",
  description:
    "A closer look at how we restructured a concentrated equity portfolio into a balanced, income-generating allocation within six months.",
  href: "/insights/news",
};

const defaultFeatured: ArticleCardProps = {
  image: "/images/case-study-market-outlook.jpg",
  category: "Market Outlook",
  excerpt: "Our latest read on rates, liquidity, and positioning across the quarter ahead.",
  date: "02/10/2025",
  readTime: "3 mins read",
  href: "/insights/news",
};

const defaultArticles: ArticleCardProps[] = [
  {
    image: "/images/news-wealth-creation.jpg",
    category: "Wealth Creation for HNWIs",
    excerpt:
      "How a disciplined, multi-asset approach helped a high-net-worth client grow and protect their portfolio.",
    date: "02/10/2025",
    readTime: "3 mins read",
    href: "/insights/news",
  },
  {
    image: "/images/news-wealth-creation-2.jpg",
    category: "Structuring a Multi-Generational Trust",
    excerpt: "Building a trust structure designed to preserve and transfer wealth across generations.",
    date: "02/10/2025",
    readTime: "3 mins read",
    href: "/insights/news",
  },
  {
    image: "/images/news-nigerian-opportunities.jpg",
    category: "Nigerian Investment Opportunities",
    excerpt: "Where we see the strongest risk-adjusted opportunities across the Nigerian market.",
    date: "02/10/2025",
    readTime: "3 mins read",
    href: "/insights/news",
  },
];

export function CaseStudies({
  title = "Case Studies",
  description = "Real examples of how our investment strategies have delivered measurable results for clients across different sectors and portfolio sizes.",
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

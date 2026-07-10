import type { ArticleCardProps } from "@/components/ui/ArticleCard";
import { HomeWrapper } from "@/components/wrapper";
import { Hero } from "@/components/section/Hero";
import { PhilosophyDetails } from "@/components/section/strategy/PhilosophyDetails";
import { RiskManagement } from "@/components/section/strategy/RiskManagement";
import { ArticleGrid } from "@/components/section/strategy/ArticleGrid";
import { InsightsIntro } from "@/components/section/insight/InsightsIntro";

const otherArticles: ArticleCardProps[] = [
  {
    image: "/images/news1.webp",
    category: "Wealth creation",
    excerpt:
      "How a disciplined, multi-asset approach helps clients grow and protect long-term wealth.",
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
    image: "/images/case-study-market-outlook.jpg",
    category: "Market Outlook",
    excerpt: "Our latest read on rates, liquidity, and positioning across the quarter ahead.",
    date: "02/10/2025",
    readTime: "3 mins read",
    href: "/insights/news",
  },
];

export default function StrategyPage() {
  return (
    <HomeWrapper>
      <Hero
        eyebrow="Investment Strategy"
        title="A Disciplined Approach to Wealth Creation"
        backgroundImage="/images/strategy.webp"
        size="tall"
        className="mt-4 lg:mt-2"
      />

      <InsightsIntro
        heading="Our Philosophy"
        paragraphs={[
          "Our philosophy integrates high-fidelity market intelligence with institutional-grade risk management and clinical execution to ensure capital resilience and consistent performance across all market regimes. By synthesizing deep fundamental research with a steadfast adherence to risk-mitigation frameworks, we transform complex market data into a disciplined engine for long-term wealth appreciation.",
        ]}
      />

      <PhilosophyDetails />
      <RiskManagement />

      <ArticleGrid
        description="Explore more perspectives on wealth creation, market opportunities, and the strategies shaping how we invest."
        articles={otherArticles}
      />

      <Hero
        title="Partner with a company that prioritizes capital preservation and strategic growth."
        primaryCta={{ label: "Invest Now", href: "/contact" }}
        size="compact"
        className="my-16 lg:my-20"
      />
    </HomeWrapper>
  );
}

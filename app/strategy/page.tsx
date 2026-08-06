import type { ArticleCardProps } from "@/components/ui/ArticleCard";
import { HomeWrapper } from "@/components/wrapper";
import { Hero, CallToAction } from "@/components/section/Hero";
import { PhilosophyDetails } from "@/components/section/strategy/PhilosophyDetails";
import { RiskManagement } from "@/components/section/strategy/RiskManagement";
import { ArticleGrid } from "@/components/section/strategy/ArticleGrid";
import { InsightsIntro } from "@/components/section/insight/InsightsIntro";
import { TrustSignals } from "@/components/ui/TrustSignals";

const otherArticles: ArticleCardProps[] = [
  {
    image: "/images/record.jpg",
    category: "Wealth creation",
    excerpt:
      "How a disciplined, multi-asset approach helps clients grow and protect long-term wealth.",
    date: "02/10/2025",
    readTime: "3 mins read",
    href: "/market-insights/insight",
  },
  {
    image: "/images/image4.webp",
    category: "Nigerian investment opportunities",
    excerpt: "Where we see the strongest risk-adjusted opportunities across the Nigerian market.",
    date: "02/10/2025",
    readTime: "3 mins read",
    href: "/market-insights/insight",
  },
  {
    image: "/images/record2.webp",
    category: "Market Outlook",
    excerpt: "Our latest read on rates, liquidity, and positioning across the quarter ahead.",
    date: "02/10/2025",
    readTime: "3 mins read",
    href: "/market-insights/insight",
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
      />

      <InsightsIntro
        heading="Our Philosophy"
        paragraphs={[
          "Our philosophy integrates high quality market intelligence with institutional-grade risk management and disciplined execution to protect capital and pursue consistent performance across market cycles. By combining deep fundamental research with a steadfast commitment to risk mitigation, we turn complex market data into a clear, disciplined process for long-term wealth creation.",
        ]}
      />

      <PhilosophyDetails />
      <RiskManagement />

      <ArticleGrid
        description="Explore more perspectives on wealth creation, market opportunities, and the strategies shaping how we invest."
        articles={otherArticles}
      />

      <CallToAction className="my-16 lg:my-20" />

      <TrustSignals
        signals={[
          { label: "Registered & Regulated by SEC Nigeria", image: "/images/sec.png" },
          { label: "Transparent reporting" },
          { label: "Risk-managed investment approach" },
        ]}
      />
    </HomeWrapper>
  );
}

import type { InsightArticle } from "@/components/ui/InsightCard";
import { HomeWrapper } from "@/components/wrapper";
import { Hero } from "@/components/section/Hero";
import { InsightsIntro } from "@/components/section/insight/InsightsIntro";
import { FeaturedInsight } from "@/components/section/insight/FeaturedInsight";
import { InsightsValueProps } from "@/components/section/insight/InsightsValueProps";
import { InsightCategory } from "@/components/section/insight/InsightCategory";
import { NewsletterSignup } from "@/components/section/insight/NewsletterSignup";

const dateAndReadTime = { date: "02/10/2025", readTime: "3 mins read" };
const categories: { title: string; description: string; articles: InsightArticle[] }[] = [
  {
    title: "Market Outlook",
    description: "Comprehensive analysis of economic trends, interest rates, inflation, and market movements shaping investment opportunities.",
    articles: [
      { title: "Nigerian Economic Outlook (Quarterly)", href: "/market-insights/insight", ...dateAndReadTime },
      {
        title: "Interest Rate Trends & Fixed Income Opportunities",
        href: "/market-insights/insight",
        ...dateAndReadTime,
      },
      { title: "Inflation Impact on Investment Portfolios", href: "/market-insights/insight", ...dateAndReadTime },
    ],
  },
  {
    title: "Investment Strategies",
    description:
      "Deep dives into portfolio structuring, asset allocation, and wealth-building approaches.",
    articles: [
      {
        title: "How to Build a Diversified Investment Portfolio",
        href: "/market-insights/insight",
        ...dateAndReadTime,
      },
      {
        title: "Fixed Income vs Equities: Where Should You Invest?",
        href: "/market-insights/insight",
        ...dateAndReadTime,
      },
      {
        title: "Risk Management Strategies for Long-Term Investors",
        href: "/market-insights/insight",
        ...dateAndReadTime,
      },
    ],
  },
  {
    title: "Real Estate Insights",
    description:
      "Expert perspectives on property investments, market trends, and high-yield opportunities.",
    articles: [
      {
        title: "Real Estate Investment Opportunities in Lagos",
        href: "/market-insights/insight",
        ...dateAndReadTime,
      },
      {
        title: "Off-Plan vs Completed Properties: Which is Better?",
        href: "/market-insights/insight",
        ...dateAndReadTime,
      },
      {
        title: "Maximizing ROI in Residential Developments",
        href: "/market-insights/insight",
        ...dateAndReadTime,
      },
    ],
  },
  {
    title: "Wealth & Financial Planning",
    description: "Guidance on wealth preservation, financial growth, and legacy planning.",
    articles: [
      { title: "How HNWIs Structure Their Wealth", href: "/market-insights/insight", ...dateAndReadTime },
      { title: "Building Generational Wealth in Nigeria", href: "/market-insights/insight", ...dateAndReadTime },
      {
        title: "Smart Investment Habits for Long-Term Success",
        href: "/market-insights/insight",
        ...dateAndReadTime,
      },
    ],
  },
  {
    title: "Flamestar Reports",
    description: "Exclusive reports and proprietary insights from Flamestar Capital.",
    articles: [
      { title: "Quarterly Investment Reports", href: "/market-insights/insightrts", ...dateAndReadTime },
      { title: "Portfolio Performance Reviews", href: "/market-insights/insightrts", ...dateAndReadTime },
      { title: "Market Intelligence Briefs", href: "/market-insights/insightrts", ...dateAndReadTime },
    ],
  },
];

export default function InsightsPage() {
  return (
    <HomeWrapper>
      <Hero
        eyebrow="Insight"
        title="Market Insights & Investment Intelligence (not just insights)"
        description="Stay ahead of the market with expert analysis, data-driven perspectives, and strategic insights designed to help you make informed investment decisions."
        backgroundImage="/images/market-insight.webp"
        size="tall"
        className="mt-4 lg:mt-2"
      />

      <InsightsIntro />

      <FeaturedInsight
        image="/images/insight.webp"
        title="Navigating Nigeria's Fixed Income Landscape in a High-Interest Rate Environment"
        description="An in-depth review of current yields, government securities, and how investors can optimize returns while managing risk."
        cta={{ label: "Read Full Report", href: "/market-insights/insight" }}
      />

      <InsightsValueProps />

      <div className="mx-auto flex max-w-7xl justify-center px-6 pt-14 lg:px-10">
        <span className="rounded-full border border-black/10 bg-paper px-4 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-ink/70">
          Other Insights
        </span>
      </div>

      {categories.map((category) => (
        <InsightCategory key={category.title} {...category} />
      ))}

      <NewsletterSignup className="pb-16 pt-6" />
    </HomeWrapper>
  );
}

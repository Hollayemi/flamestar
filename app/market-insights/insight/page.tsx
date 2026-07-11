import type { ArticleCardProps } from "@/components/ui/ArticleCard";
import { HomeWrapper } from "@/components/wrapper";
import { ArticleHero } from "@/components/section/insight/ArticleHero";
import { ArticleMeta } from "@/components/ui/ArticleMeta";
import { ArticleBlock, ArticleBody } from "@/components/section/insight/ArticleBody";
import { ArticleGrid } from "@/components/section/strategy/ArticleGrid";
import { Hero } from "@/components/section/Hero";
import { TrustSignals } from "@/components/ui/TrustSignals";

const contentBlocks: ArticleBlock[] = [
  { type: "heading", text: "Why Diversification Still Matters" },
  {
    type: "paragraph",
    text: "In a market defined by rapid shifts in rate expectations and liquidity conditions, spreading capital across uncorrelated asset classes remains one of the most reliable ways to protect a portfolio from any single point of failure.",
  },
  {
    type: "paragraph",
    text: "Our research team continues to see the strongest risk-adjusted outcomes in portfolios that blend fixed income, equities, real estate, and select alternatives, rather than concentrating in any one theme.",
  },
  {
    type: "quote",
    text: "The goal isn't to predict the market. It's to build a portfolio that performs well regardless of what the market decides to do next.",
  },
  {
    type: "image",
    src: "/images/news-wealth-creation.jpg",
    alt: "Illustration representing diversified wealth creation",
  },
  { type: "heading", text: "What This Means for Your Portfolio" },
  {
    type: "paragraph",
    text: "For most investors, this means resisting the urge to chase whichever asset class performed best last quarter, and instead sticking to an allocation designed around long-term goals and risk tolerance.",
  },
  {
    type: "paragraph",
    text: "It also means revisiting that allocation regularly — not to time the market, but to make sure it still reflects your circumstances as they evolve.",
  },
  {
    type: "paragraph",
    text: "We work closely with clients to stress-test their portfolios against a range of scenarios, so decisions are made from a position of clarity rather than reaction.",
  },
  {
    type: "paragraph",
    text: "If you'd like a second opinion on how your portfolio is currently positioned, our advisory team is available for a complimentary review.",
  },
];

const otherArticles: ArticleCardProps[] = [
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
  {
    image: "/images/news-wealth-creation-2.jpg",
    category: "Wealth Creation for HNWIs",
    excerpt:
      "How a disciplined, multi-asset approach helps high-net-worth clients grow and protect their portfolios.",
    date: "02/10/2025",
    readTime: "3 mins read",
    href: "/insights/news",
  },
];

export default function ArticlePage() {
  return (
    <HomeWrapper>
      <ArticleHero
        title="How to Build a Diversified Investment Portfolio"
        description="A practical look at why spreading capital across asset classes remains one of the most effective ways to manage risk."
        backgroundImage="/images/insight.webp"
        backHref="/insights"
        className="mt-4 lg:mt-6"
      />

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <ArticleMeta
          publishedDate="February 10, 2025"
          tags={[
            { label: "Financial" },
            { label: "Asset", active: true },
          ]}
          author="Flamestar Research Team"
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-16 lg:px-10">
        <ArticleBody blocks={contentBlocks} />
      </div>

      <ArticleGrid
        title="Other Articles"
        description="Explore more perspectives on wealth creation, market opportunities, and the strategies shaping how we invest."
        articles={otherArticles}
      />

      <Hero
        title="Partner with a company that prioritizes capital preservation and strategic growth."
        primaryCta={{ label: "Invest Now", href: "/contact" }}
        size="compact"
        className="my-16 lg:my-20"
      />

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


import { HomeWrapper } from "@/components/wrapper";
import { Hero } from "@/components/section/Hero";
import { InsightsIntro } from "@/components/section/insight/InsightsIntro";
import { FeaturedInsight } from "@/components/section/insight/FeaturedInsight";
import { InsightsValueProps } from "@/components/section/insight/InsightsValueProps";
import { InsightCategory } from "@/components/section/insight/InsightCategory";
import { NewsletterSignup } from "@/components/section/insight/NewsletterSignup";
import { TrustSignals } from "@/components/ui/TrustSignals";
import { categories } from "./data";



export default function InsightsPage() {
  return (
    <HomeWrapper>
      <Hero
        eyebrow="Insight"
        title="Market Insights & Investment Intelligence (not just insights)"
        description="Stay ahead of the market with expert analysis, data-driven perspectives, and strategic insights designed to help you make informed investment decisions."
        backgroundImage="/images/market-insight.webp"
        size="tall"
      />

      <InsightsIntro />

      <FeaturedInsight
        image="/images/insight.webp"
        title="Building Wealth with Discipline: Why Process Beats Prediction"
        description="Markets are unpredictable; a good process is not. Here is why we trust discipline over forecasts."
        cta={{ label: "Read Full Report", href: "/market-insights/building-wealth-with-discipline" }}
      />

      <InsightsValueProps />

      <div className="mx-auto flex max-w-7xl justify-center px-6 pt-14 lg:px-10">
        <span className="rounded-full border border-black/10 bg-paper px-4 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-ink/70">
          Other Insights
        </span>
      </div>

      {categories.map((category) => !category.hide ? (
        <InsightCategory key={category.title} {...category} />
      ): null )}

      <NewsletterSignup className="pb-16 pt-6" />

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

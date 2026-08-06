import { HomeWrapper } from "@/components/wrapper";
import { Hero, CallToAction } from "@/components/section/Hero";
import { Pillars } from "@/components/section/our_fund/Pillars";
import { StrategyShowcase } from "@/components/section/our_fund/StrategyShowcase";
import { TrustSignals } from "@/components/ui/TrustSignals";

const assetClasses = [
  {
    number: "01",
    title: "Real Estate Investment",
    description:
      "We facilitate access to exclusively structured real estate opportunities, meticulously selected for their potential to deliver robust yields and long-term capital appreciation.",
  },
  {
    number: "02",
    title: "Fixed Income Investments",
    description:
      "We provide a resilient foundation for capital preservation by engineering portfolios of high-grade government and corporate instruments designed to deliver secure, stable returns and consistent liquidity.",
  },
  {
    number: "03",
    title: "Equities Investment",
    description:
      "Our approach provides disciplined exposure to high-performing global and local equities, blending fundamental research with technical analysis to capture alpha across evolving market cycles.",
  },
];

export default function OurFundsPage() {
  return (
    <HomeWrapper>
      <Hero
        eyebrow="Our Funds"
        title="Resilient Portfolios for Complex Objectives."
        backgroundImage="/images/our_fund.webp"
        size="tall"
      />

      <Pillars
        eyebrow="What We Do"
        title="Precision Management Across the Global Asset Spectrum."
        description="We design and manage diversified portfolios across multiple asset classes to achieve optimal returns while managing risk exposure."
        pillars={assetClasses}
      />

      <StrategyShowcase />

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

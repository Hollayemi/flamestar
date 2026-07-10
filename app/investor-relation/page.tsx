import { HomeWrapper } from "@/components/wrapper";
import { Hero } from "@/components/section/Hero";
import { Pillars } from "@/components/section/investor-relation/Pillars";
import { InvestorResources } from "@/components/section/investor-relation/InvestorResources";
import { OnboardingProcess } from "@/components/section/investor-relation/OnboardingProcess";

const investorBenefits = [
  {
    number: "01",
    title: "Monthly performance reports",
    description:
      "Comprehensive data snapshots detailing month-over-month returns and portfolio health.",
  },
  {
    number: "02",
    title: "Quarterly portfolio reviews",
    description:
      "In-depth strategic evaluations and forensic analysis of asset performance and market positioning.",
  },
  {
    number: "03",
    title: "Direct access to investment advisors",
    description:
      "Priority communication channels for real-time consultation with our senior investment strategists.",
  },
];

export default function InvestorRelationsPage() {
  return (
    <HomeWrapper>
      <Hero
        eyebrow="Investor Relations"
        title="Transparency. Trust. Performance."
        backgroundImage="/images/investor-relations-hero.jpg"
        size="tall"
        className="mt-4 lg:mt-2"
      />

      <Pillars
        eyebrow={null}
        title="What Investors Get"
        description="A dedicated service suite designed to provide stakeholders with rigorous oversight and direct professional engagement."
        pillars={investorBenefits}
      />

      <InvestorResources />
      <OnboardingProcess />

      <Hero
        title="Partner with a company that prioritizes capital preservation and strategic growth."
        primaryCta={{ label: "Invest Now", href: "/contact" }}
        size="compact"
        className="my-16 lg:my-20"
      />
    </HomeWrapper>
  );
}

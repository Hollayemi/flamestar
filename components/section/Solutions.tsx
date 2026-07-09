import { Database, Globe, Landmark } from "lucide-react";
import { SolutionCard, type SolutionCardProps } from "@/components/ui/SolutionCard";

export type SolutionsProps = {
  title?: string;
  description?: string;
  solutions?: SolutionCardProps[];
  className?: string;
};

const defaultSolutions: SolutionCardProps[] = [
  {
    icon: Globe,
    title: "Investment Solutions",
    description:
      "Custom-engineered portfolios designed to align global asset allocation with your specific risk-return objectives.",
    ctaLabel: "Explore Investment Solutions",
    href: "/strategies",
  },
  {
    icon: Database,
    title: "Funds & Investment Schemes",
    description:
      "Professional investment vehicles providing streamlined access to institutional-grade diversification and high-conviction market segments.",
    ctaLabel: "Explore Funds & Investment Schemes",
    href: "/strategies/funds",
  },
  {
    icon: Landmark,
    title: "Advisory & Capital Solutions",
    description:
      "Strategic counsel and bespoke financing structures designed to optimize balance sheets and facilitate complex financial maneuvers.",
    ctaLabel: "Explore Advisory & Capital Solutions",
    href: "/advisory",
  },
];

export function Solutions({
  title = "Engineered Solutions for Capital Growth and Risk Mitigation",
  description = "Our investment strategies are designed to navigate the complexities of global markets, providing a structured approach to asset appreciation through technical precision and institutional rigor.",
  solutions = defaultSolutions,
  className = "",
}: SolutionsProps) {
  return (
    <section className={`mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28 ${className}`}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-light sm:text-base">
          {description}
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {solutions.map((solution) => (
          <SolutionCard key={solution.title} {...solution} />
        ))}
      </div>
    </section>
  );
}

import { StrategyRow, type StrategyRowProps } from "@/components/ui/StrategyRow";

export type StrategyShowcaseProps = {
  strategies?: StrategyRowProps[];
  className?: string;
};

const defaultStrategies: StrategyRowProps[] = [
  {
    title: "Investment Advisory",
    image: "/images/funds-advisory.jpg",
    paragraphs: [
      "We deliver high-fidelity, actionable intelligence that distills global market complexity into the strategic clarity required for informed, high-conviction decision-making across diverse asset classes.",
      "By synthesizing macroeconomic forecasting with proprietary technical analysis, we empower our clients to navigate shifting regulatory landscapes and volatile cycles with absolute confidence.",
    ],
  },
  {
    title: "Fixed Income Investments",
    image: "/images/funds-fixed-income.jpg",
    paragraphs: [
      "We provide a resilient foundation for capital preservation by engineering portfolios of high-grade government and corporate instruments designed to deliver secure, stable returns and consistent liquidity.",
      "This strategy serves as a critical ballast within the broader portfolio, utilizing active duration management and credit analysis to hedge against volatility while ensuring steady cash-flow generation.",
    ],
  },
  {
    title: "Equities Investment",
    image: "/images/funds-equities.jpg",
    paragraphs: [
      "Our approach provides disciplined exposure to high-performing global and local equities, blending rigorous fundamental research with active management to capture alpha in evolving market regimes.",
      "We prioritize the identification of market leaders with sustainable competitive moats, ensuring that every allocation balances aggressive capital appreciation with sophisticated downside protection.",
    ],
  },
  {
    title: "Real Estate Investment",
    image: "/images/funds-real-estate.jpg",
    paragraphs: [
      "We facilitate access to exclusively structured real estate opportunities, meticulously selected for their potential to deliver robust yields and long-term capital appreciation in high-barrier institutional markets.",
      "Our focus remains on tangible assets with strong underlying fundamentals, providing our clients with a powerful inflation hedge and a source of uncorrelated returns.",
    ],
  },
  {
    title: "Wealth Management",
    image: "/images/funds-wealth-management.jpg",
    paragraphs: [
      "Our firm provides a holistic architectural framework for wealth, integrating comprehensive financial planning and tactical asset allocation with sophisticated legacy and estate structuring for multi-generational impact.",
      "We move beyond simple portfolio management to oversee your entire financial ecosystem, ensuring that your capital is optimized for current liquidity needs while being fortified for future transfer.",
    ],
  },
];

export function StrategyShowcase({
  strategies = defaultStrategies,
  className = "",
}: StrategyShowcaseProps) {
  return (
    <section className={`mx-auto max-w-7xl px-6 py-16 lg:px-10 ${className}`}>
      <div className="flex flex-col gap-16 lg:gap-20">
        {strategies.map((strategy) => (
          <StrategyRow key={strategy.title} {...strategy} />
        ))}
      </div>
    </section>
  );
}

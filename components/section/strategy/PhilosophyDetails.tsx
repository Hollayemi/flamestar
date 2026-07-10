import { ChipListCard, type ChipListCardProps } from "@/components/ui/ChipListCard";

export type PhilosophyDetailsProps = {
  cards?: ChipListCardProps[];
  className?: string;
};

const defaultCards: ChipListCardProps[] = [
  {
    title: "Our Approach",
    description:
      "Our investment methodology is governed by a rigorous technical framework that prioritizes structural stability and evidence-based decision-making to ensure long-term portfolio resilience.",
    items: [
      "Capital Preservation First",
      "Risk-Adjusted Returns",
      "Diversification Across Asset Classes",
      "Long-Term Value Creation",
    ],
  },
  {
    title: "Asset Allocation Model",
    description:
      "A strategically balanced framework designed to optimize returns by layering defensive stability with high-conviction growth across diverse asset classes.",
    items: [
      "Fixed Income (Low Risk)",
      "Equities (Growth)",
      "Real Estate (Stability + Yield)",
      "Alternatives (High Return Opportunities)",
    ],
  },
];

export function PhilosophyDetails({ cards = defaultCards, className = "" }: PhilosophyDetailsProps) {
  return (
    <section className={`mx-auto max-w-7xl px-6 py-10 lg:px-10 ${className}`}>
      <div className="grid gap-6 lg:grid-cols-2">
        {cards.map((card) => (
          <ChipListCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  );
}

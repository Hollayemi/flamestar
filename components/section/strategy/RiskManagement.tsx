import { ChipListCard } from "@/components/ui/ChipListCard";

export type RiskManagementProps = {
  title?: string;
  description?: string;
  items?: string[];
  className?: string;
};

export function RiskManagement({
  title = "Risk Management",
  description = "A proactive, institutional-grade oversight system engineered to identify and mitigate market volatility through continuous, data-driven monitoring. The institutional-grade risk controls we employ includes the following:",
  items = ["Portfolio diversification", "Market analysis", "Continuous monitoring"],
  className = "",
}: RiskManagementProps) {
  return (
    <section className={`mx-auto max-w-7xl px-6 py-10 lg:px-10 ${className}`}>
      <ChipListCard title={title} description={description} items={items} layout="split" />
    </section>
  );
}

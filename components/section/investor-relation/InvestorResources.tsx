import { ClipboardList, Layers, Monitor } from "lucide-react";
import { ResourceCard, type ResourceCardProps } from "@/components/ui/ResourceCard";

export type InvestorResourcesProps = {
  title?: string;
  description?: string;
  resources?: ResourceCardProps[];
  className?: string;
};

const defaultResources: ResourceCardProps[] = [
  {
    icon: Layers,
    title: "Fund Brochures",
    description:
      "Detailed prospectuses outlining our investment mandates, structures, and objective frameworks.",
    span: true,
  },
  {
    icon: ClipboardList,
    title: "Investment Insights",
    description: "Proprietary commentary and white papers on emerging trends and asset class developments.",
  },
  {
    icon: Monitor,
    title: "Market Reports",
    description: "Macro-economic briefings providing high-fidelity analysis of global financial shifts.",
  },
];

export function InvestorResources({
  title = "Investor Resources",
  description = "A centralized library of institutional-grade intelligence and essential fund documentation.",
  resources = defaultResources,
  className = "",
}: InvestorResourcesProps) {
  return (
    <section className={`mx-auto max-w-7xl px-6 py-10 lg:px-10 ${className}`}>
      <div className="rounded-3xl border border-black/8 p-8 sm:p-10">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-12">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-light">{description}</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {resources.map((resource) => (
              <ResourceCard key={resource.title} {...resource} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { PerformanceChartCard } from "@/components/ui/PerformanceChartCard";

export type PerformanceChartsProps = {
  title?: string;
  description?: string;
  className?: string;
  id?: string;
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const aumPrimary = [42, 58, 52, 68, 74, 90];
const aumBaseline = [30, 38, 34, 44, 48, 56];
const roiPrimary = [20, 34, 28, 46, 42, 62];
const roiBaseline = [15, 22, 20, 28, 26, 34];

export function PerformanceCharts({
  title = "What makes our track record impressive",
  description = "Our portfolio reflects a balanced mix of income-generating and growth-oriented assets.",
  className = "",
  id = "performance-charts",
}: PerformanceChartsProps) {
  return (
    <section id={id} className={`mx-auto max-w-7xl px-6 py-16 lg:px-10 ${className}`}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-light sm:text-base">{description}</p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <PerformanceChartCard
          value="$10.8 B"
          label="Assets Under Management"
          categories={months}
          series={[
            { data: aumBaseline, color: "var(--color-muted-dark)", muted: true },
            { data: aumPrimary, color: "var(--color-signal)" },
          ]}
        />
        <PerformanceChartCard
          value="+184.2%"
          label="ROI Cumulative Growth"
          categories={months}
          series={[
            { data: roiBaseline, color: "var(--color-muted-dark)", muted: true },
            { data: roiPrimary, color: "var(--color-signal)" },
          ]}
        />
      </div>
    </section>
  );
}

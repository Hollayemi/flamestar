import { AxisChart, type ChartSeries } from "@/components/ui/AxisChart";

export type PerformanceChartCardProps = {
  value: string;
  label: string;
  categories: string[];
  series: ChartSeries[];
};

export function PerformanceChartCard({
  value,
  label,
  categories,
  series,
}: PerformanceChartCardProps) {
  return (
    <div className="rounded-2xl bg-paper-soft p-6 sm:p-7">
      <p className="font-display text-2xl font-semibold text-ink sm:text-3xl">{value}</p>
      <p className="mt-1 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-light">
        {label}
      </p>
      <div className="mt-6">
        <AxisChart categories={categories} series={series} />
      </div>
    </div>
  );
}

import { CircleCheck } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";

export type TrackRecordProps = {
  className?: string;
};

const highlightPoints = [
  "Proven Performance",
  "Measurable Impact",
  "Rapidly scaling client base",
  "Strong pipeline for institutional capital",
];

const trustSignals = [
  { label: "Registered & Regulated by SEC", icon: true },
  { label: "Transparent reporting", icon: false },
  { label: "Risk-managed investment approach", icon: false },
];

export function TrackRecord({ className = "" }: TrackRecordProps) {
  return (
    <section className={`mx-auto max-w-5xl px-6 py-20 lg:px-10 lg:py-28 ${className}`}>
      <h2 className="text-center font-display text-2xl font-semibold text-ink sm:text-3xl">
        Track Record
      </h2>

      <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col justify-center rounded-2xl bg-signal/10 p-8 lg:p-10">
          <h3 className="font-display text-xl font-semibold leading-snug text-ink sm:text-2xl">
            A Trajectory of Validated Success and Institutional Momentum
          </h3>
          <ul className="mt-6 space-y-3">
            {highlightPoints.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-ink/70">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-signal" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <StatCard
            value="$10.8B"
            label="Assets Under Management"
            chartImage="/images/wave1.png"
          />
          <StatCard
            value="+184.2%"
            label="ROI Cumulative Growth"
            chartImage="/images/wave2.png"
          />
        </div>
      </div>

      <div className="mt-14 flex flex-col items-center gap-4 border-t border-black/8 pt-8 text-sm text-muted-light sm:flex-row sm:justify-center sm:gap-0 sm:divide-x sm:divide-black/10">
        {trustSignals.map((signal) => (
          <span key={signal.label} className="flex items-center gap-2 px-6 first:pl-0 last:pr-0">
            {signal.icon && <CircleCheck className="h-4 w-4 text-signal" />}
            {signal.label}
          </span>
        ))}
      </div>
    </section>
  );
}

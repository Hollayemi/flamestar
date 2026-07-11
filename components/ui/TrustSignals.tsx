import type { LucideIcon } from "lucide-react";

export type TrustSignal = {
  label: string;
  image?: string;
};

export type TrustSignalsProps = {
  signals: TrustSignal[];
  className?: string;
};

export function TrustSignals({ signals, className = "" }: TrustSignalsProps) {
  return (
    <section className={`mx-auto max-w-6xl px-6 py-14 lg:px-10 ${className}`}>
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
        {signals.map((signal) => {
          
          return (
            <span
              key={signal.label}
              className="flex items-center gap-2 text-base font-medium text-ink"
            >
              {signal.label}
              {signal.image && (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-signal/10 text-signal">
                  <img
                    src={signal.image}
                    alt={signal.label}
                    className="h-5 w-5"
                  />
                </span>
              )}
            </span>
          );
        })}
      </div>
    </section>
  );
}

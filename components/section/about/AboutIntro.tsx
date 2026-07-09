import type { ReactNode } from "react";

export type AboutStat = {
  value: string;
  label: string;
};

export type AboutIntroProps = {
  heading?: string;
  description?: ReactNode;
  audience?: string[];
  stats?: AboutStat[];
  className?: string;
};

const defaultAudience = [
  "High Net Worth Individuals (HNWIs)",
  "Corporate Clients",
  "Institutional Investors",
];

const defaultStats: AboutStat[] = [
  { value: "$10.8B", label: "in payments processed in 2025*" },
  { value: "2 Years", label: "serving our clients" },
  { value: "97%", label: "of client satisfaction & retention" },
  { value: "45", label: "in team members & growing" },
];

export function AboutIntro({
  heading = "About Flamestar Capital",
  description,
  audience = defaultAudience,
  stats = defaultStats,
  className = "",
}: AboutIntroProps) {
  return (
    <section className={`mx-auto max-w-7xl px-6 py-20 lg:px-10 ${className}`}>
      <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-16">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{heading}</h2>

        <div>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-light sm:text-base">
            {description ?? (
              <>
                Flamestar Capital Ltd is a dynamic asset and portfolio management firm focused on
                delivering{" "}
                <strong className="font-semibold text-ink">
                  superior risk-adjusted returns
                </strong>{" "}
                through structured investment strategies. We serve:
              </>
            )}
          </p>
          <ul className="mt-5 flex flex-col gap-2.5">
            {audience.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-ink">
                <span className="h-4 w-2 shrink-0 rounded-[3px] bg-flame" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-black/8 pt-10 sm:grid-cols-4 sm:divide-x sm:divide-black/10">
        {stats.map((stat) => (
          <div key={stat.label} className="px-0 first:pl-0 sm:px-6">
            <p className="font-mono text-3xl font-semibold text-ink sm:text-4xl">{stat.value}</p>
            <p className="mt-1.5 text-xs text-muted-light">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

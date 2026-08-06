import type { ReactNode } from "react";

export type AboutIntroProps = {
  heading?: string;
  description?: ReactNode;
  audience?: string[];
  className?: string;
};

const defaultAudience = [
  "High Net Worth Individuals (HNWIs)",
  "Corporate Clients",
  "Institutional Investors",
  "Retail Investors",
];

export function AboutIntro({
  heading = "About Flamestar Capital",
  description,
  audience = defaultAudience,
  className = "",
}: AboutIntroProps) {
  return (
    <section className={`mx-auto max-w-7xl px-6 py-20 lg:px-10 ${className}`}>
      <div className="grid gap-8 lg:grid-cols-[380px_1fr] lg:gap-16">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{heading}</h2>

        <div>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-light sm:text-base">
            {description ?? (
              <>
                Flamestar Capital Limited is a modern fund and portfolio management firm dedicated to delivering considered, risk adjusted investment strategies. At Flamestar, we bring something increasingly rare to the market, a clean slate, a fiduciary first culture, and a commitment to transparency built into everything we do from day one. We serve:
              </>
            )}
          </p>
          <ul className="mt-5 flex flex-col gap-2.5">
            {audience.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-ink">
                <span className="h-3 w-1 shrink-0 rounded-[3px] bg-flame" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

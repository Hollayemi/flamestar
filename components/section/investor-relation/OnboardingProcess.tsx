import { StepCard, type StepCardProps } from "@/components/ui/StepCard";

export type OnboardingProcessProps = {
  title?: string;
  description?: string;
  steps?: StepCardProps[];
  className?: string;
};

const defaultSteps: StepCardProps[] = [
  {
    number: "01",
    title: "Consultation",
    description: "Initial deep-dive to define long-term goals and capital requirements.",
  },
  {
    number: "02",
    title: "Risk Profiling",
    description: "Quantitative assessment of volatility tolerance and liquidity needs.",
  },
  {
    number: "03",
    title: "Investment Structuring",
    description: "The architectural design of a bespoke portfolio tailored to your specific profile.",
  },
  {
    number: "04",
    title: "Portfolio Deployment",
    description: "Systematic execution and activation of capital into targeted market positions.",
  },
];

export function OnboardingProcess({
  title = "Onboarding Process",
  description = "A dedicated service suite designed to provide stakeholders with rigorous oversight and direct professional engagement.",
  steps = defaultSteps,
  className = "",
}: OnboardingProcessProps) {
  return (
    <section className={`mx-auto max-w-7xl px-6 py-16 lg:px-10 ${className}`}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-light sm:text-base">{description}</p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {steps.map((step) => (
          <StepCard key={step.number} {...step} />
        ))}
      </div>
    </section>
  );
}

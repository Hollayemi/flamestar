import type { Metadata } from "next";
import { HomeWrapper } from "@/components/wrapper";
import { Hero, CallToAction } from "@/components/section/Hero";

export const metadata: Metadata = {
  title: "Whistleblowing Policy | Flamestar Capital",
  description:
    "Flamestar Capital Limited's whistleblowing policy and how to confidentially report concerns.",
};

const REPORT_EMAIL = "complance@flamestarcapital.com";

const bulletPoints = [
  "Any report made as part of whistleblowing should be rooted in good faith and genuine concern. Such concerns may pertain to a wide range of issues, including but not limited to crimes, fraud, misconduct, and miscarriages of justice.",
  "In essence, whistleblowing serves as a vital mechanism for safeguarding the integrity and ethical standards within an organization, ensuring that issues of significant importance are brought to light for appropriate investigation and resolution.",
  "Flamestar Capital Limited has established a robust whistleblowing program, enabling all stakeholders, including customers, suppliers, vendors, employees, and other relevant parties, to confidentially report concerns when necessary.",
];

export default function WhistleblowingPolicyPage() {
  return (
    <HomeWrapper>
      <Hero
        eyebrow="Whistleblowing Policy"
        title="Turn insights into action"
        backgroundImage="/images/privacy.webp"
        size="tall"
      />

      <section className="mx-auto max-w-4xl px-6 py-16 lg:px-10">
        <h2 className="text-center font-display text-2xl font-semibold text-ink sm:text-3xl">
          Whistleblowing Policy
        </h2>

        <div className="mt-8 flex flex-col gap-5 text-sm leading-relaxed text-muted-light sm:text-base">
          <p>
            &ldquo;Whistleblowing&rdquo; is the act of disclosing information about perceived
            wrongdoing, misconduct, or unethical behaviour within an organization. Employees and
            other stakeholders can raise concerns about perceived impropriety encountered in the
            organization.
          </p>

          <ul className="list-disc space-y-4 pl-6 marker:text-flame">
            {bulletPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>

        <div
          id="how-to-report"
          className="mt-12 scroll-mt-28 rounded-2xl border border-black/8 bg-white p-6 sm:p-8"
        >
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-flame">
            How to Report
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-light sm:text-base">
            Send an email to{" "}
            <a
              href={`mailto:${REPORT_EMAIL}`}
              className="font-semibold text-ink underline underline-offset-4 hover:text-flame"
            >
              {REPORT_EMAIL}
            </a>
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-light sm:text-base">
            Please note that we are committed to fully respecting your confidentiality
          </p>
        </div>
      </section>

      <CallToAction className="my-16 lg:my-20" />
    </HomeWrapper>
  );
}
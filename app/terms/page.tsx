import { HomeWrapper } from "@/components/wrapper";
import { Hero, CallToAction } from "@/components/section/Hero";
import { LegalIntro } from "@/components/section/privacy/LegalIntro";
import { TrustSignals } from "@/components/ui/TrustSignals";

const termsParagraphs = [
  <>
    <strong className="font-semibold text-ink">Acceptance.</strong> By using this website you
    agree to these Terms. If you do not agree, please do not use the site.
  </>,
  <>
    <strong className="font-semibold text-ink">No investment advice.</strong> The content on this
    website is for general information only. It does not constitute investment, legal, or tax
    advice, nor an offer or solicitation to buy or sell any security or investment product. Any
    investment decision should be made only after obtaining professional advice suited to your
    circumstances.
  </>,
  <>
    <strong className="font-semibold text-ink">No guarantee.</strong> Investing involves risk,
    including possible loss of capital. Past performance is not indicative of future results.
    Flamestar Capital Limited does not guarantee any outcome or return.
  </>,
  <>
    <strong className="font-semibold text-ink">Intellectual property.</strong> All content on
    this site — text, graphics, logos, and images — is the property of Flamestar Capital Limited
    and may not be reproduced without written permission.
  </>,
  <>
    <strong className="font-semibold text-ink">Third-party links &amp; liability.</strong> We are
    not responsible for the content of third-party websites linked from this site, nor for any
    loss arising from reliance on information provided here, to the maximum extent permitted by
    law.
  </>,
  <>
    <strong className="font-semibold text-ink">Governing law.</strong> These Terms are governed
    by the laws of the Federal Republic of Nigeria.
  </>,
  <>
    <strong className="font-semibold text-ink">Changes.</strong> We may update these Terms from
    time to time; the current version will always appear on this page.
  </>,
];

const riskDisclosureParagraphs = [
  "All investments carry risk, including the possible loss of the capital invested. The value of investments can fall as well as rise, and you may get back less than you invested. Past performance is not a reliable indicator of future results. Different asset classes carry different risks; diversification can reduce but not eliminate risk. Any forward-looking statements reflect our current views and are not guarantees. Before investing, consider your objectives, financial situation, and risk tolerance, and seek independent professional advice. Flamestar Capital Limited is regulated by the Securities and Exchange Commission of Nigeria and does not guarantee any return.",
];

export default function TermsAndConditionsPage() {
  return (
    <HomeWrapper>
      <Hero
        eyebrow="Terms & Conditions"
        title="Turn insights into action"
        backgroundImage="/images/termsOfService.webp"
        size="tall"
        className="mt-4 lg:mt-2"
      />

      <LegalIntro title="Terms & Conditions" paragraphs={termsParagraphs} />
      <LegalIntro title="Risk Disclosure" paragraphs={riskDisclosureParagraphs} className="pt-0" />

      <CallToAction className="my-16 lg:my-20" />
      
      <TrustSignals
        signals={[
          { label: "Registered & Regulated by SEC Nigeria", image: "/images/sec.png" },
          { label: "Transparent reporting" },
          { label: "Risk-managed investment approach" },
        ]}
      />
    </HomeWrapper>
  );
}

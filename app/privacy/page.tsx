import { HomeWrapper } from "@/components/wrapper";
import { Hero, CallToAction } from "@/components/section/Hero";
import { LegalIntro } from "@/components/section/privacy/LegalIntro";
import { FAQSection } from "@/components/section/privacy/FAQSection";
import type { AccordionItem } from "@/components/ui/Accordion";

const introParagraphs = [
  <>
    <strong className="font-semibold text-ink">Who we are.</strong> Flamestar Capital Limited (“Flamestar,” “we,” “us”) is an investment management firm registered in Nigeria and regulated by the Securities and Exchange Commission. This policy explains how we handle personal information collected through this website.
  </>,
  <>
    <strong className="font-semibold text-ink">What we collect.</strong>When you contact us or request information, we collect the details you provide — such as your name, email address, phone number, investment interest, and message. We may also collect basic technical data (such as browser type and pages visited) to help us improve the site.
  </>,
  <>
    <strong className="font-semibold text-ink">How we use it.</strong> We use your information to respond to your enquiry, provide the services you request, meet our legal and regulatory obligations, and improve our website. We do not sell your personal information.
  </>,
  <>
    <strong className="font-semibold text-ink">Legal basis &amp; your rights.</strong> We process your data on the basis of your consent and our legitimate business interests, in line with the Nigeria Data Protection Act. You may request access to, correction of, or deletion of your personal data at any time by contacting us.
  </>,
  <>
    <strong className="font-semibold text-ink">Sharing &amp; security.</strong> We share personal data only with trusted service providers who help us operate, and only as necessary. We apply appropriate technical and organisational measures to protect your information.
  </>,
  <>
    <strong className="font-semibold text-ink">Cookies.</strong> This site may use cookies or similar technologies to function and to understand how visitors use it. You can control cookies through your browser settings.
  </>,
  <>
    <strong className="font-semibold text-ink">Contact.</strong>  For any privacy question or request, email info@flamestarcapital.com
  </>,
];

const faqItems: AccordionItem[] = [
  {
    question: "What we Collect",
    answer: [
      "Flamestar Capital Ltd. collects personal, professional, and financial data—including government IDs and transaction history—to manage accounts and satisfy Nigerian regulatory requirements.",
      'To prevent fraud, the app utilizes True Depth API technology to perform real-time "liveness" checks, verifying that the user is a live human rather than a recording.',
      "While biometric data is shared with specialized third parties for identity confirmation, it is strictly deleted once the verification process is complete. In addition to direct user input, the company automatically tracks technical metadata like IP addresses and device identifiers to monitor site interactions.",
      "Users retain the right to opt out of video capture, though doing so will likely limit their access to specific financial services and account features.",
    ],
  },
  {
    question: "Why We Collect Your Personal Information",
    answer: [
      "We collect personal information to open and manage your account, verify your identity in line with Nigerian regulatory requirements, process transactions, and provide the investment services you request.",
      "It also helps us detect and prevent fraud, meet our legal and reporting obligations, and improve the products and services we offer.",
    ],
  },
  {
    question: "What we do with the information we gather?",
    answer: [
      "The information we gather is used to manage your account, deliver the services you've signed up for, and communicate important updates about your investments.",
      "We do not sell your personal information. Where we share data with third parties, it is limited to service providers, regulators, or partners directly involved in delivering our services, and only to the extent required.",
    ],
  },
  {
    question: "Marketing",
    answer: [
      "With your consent, we may use your contact details to share market insights, product updates, and investment opportunities that may be relevant to you.",
      "You can opt out of marketing communications at any time by using the unsubscribe link in any email we send, or by contacting our Data Protection Officer directly.",
    ],
  },
  {
    question: "How We Collect Personal Information",
    answer: [
      "We collect personal information directly from you when you open an account, use our website or application, contact our support team, or visit our office.",
      "We may also collect technical information automatically, such as IP addresses, device identifiers, and usage data, to help us operate and secure our platforms.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <HomeWrapper>
      <Hero
        eyebrow="Privacy Policy"
        title="Turn insights into action"
        backgroundImage="/images/privacy.webp"
        size="tall"
        className="mt-4 lg:mt-2"
      />

      <LegalIntro paragraphs={introParagraphs} />

      <FAQSection
        items={faqItems}
        contact={{
          address: ["9A Oki Lane, Mende, Maryland, Lagos State"],
          email: "info@flamestarcapital.com",
          phone: "08122220683",
        }}
      />

      <CallToAction className="my-16 lg:my-20" />
    </HomeWrapper>
  );
}

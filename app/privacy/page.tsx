import { HomeWrapper } from "@/components/wrapper";
import { Hero } from "@/components/section/Hero";
import { LegalIntro } from "@/components/section/privacy/LegalIntro";
import { FAQSection } from "@/components/section/privacy/FAQSection";
import type { AccordionItem } from "@/components/ui/Accordion";

const introParagraphs = [
  'Flamestar Capital Limited treats personal information of users ("Users"/ "You"/ "Your") of the Flamestar Website "www.flamestarcapital.com.ng" and its other digital platforms (hereinafter called the "Site") as private and confidential.',
  'This Privacy Policy ("Policy") describes what personal information Flamestar Capital Ltd collects, what the Flamestar Capital Ltd does with it, how Flamestar Capital Ltd protects it and how Flamestar Capital Ltd maintains information collected from Users of the Site. We are a Data Controller – meaning that we determine the purposes for and manner in which Personal Data is processed or is to be processed.',
  'We believe strongly in fundamental privacy rights as embedded in Section 37 of the 1999 Constitution (as amended) (the Constitution). That is why we treat any data that relates to an identified or identifiable individual or that is linked or linkable to them by us as "personal data,". This means that data that directly identifies you — such as your name — is personal data, and also data that does not directly identify you, but that can reasonably be used to identify you — such as the serial number of your device — is personal data.',
  'This Privacy Policy covers how Flamestar Capital Ltd handles personal data whether you interact with us on our websites, through Flamestar Capital Ltd application or in person (including by phone or when visiting our office). This Privacy Policy is in accordance with the Nigerian Data Protection Act 2023 (NDPA), regulations, guidelines and directives made pursuant to the NDPA ("Applicable Laws") and is binding on all data subjects whose Personal Data we process.',
  "This Policy applies to usage of the Site as well as information contained on the Site, particularly, information related to products and services offered by Flamestar Capital Ltd.",
  "Flamestar Capital Ltd is committed to ensuring that Your privacy is protected. Should We ask You to provide certain information by which You can be identified when using this Website, then You can be assured that it will only be used in accordance with this Policy.",
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
          name: "Luna Artemis",
          email: "luna.artemis@flamestar.com",
          phone: "+234 (1) 250 0034",
        }}
      />

      <Hero
        title="Partner with a company that prioritizes capital preservation and strategic growth."
        primaryCta={{ label: "Invest Now", href: "/contact" }}
        backgroundImage="/images/cta.webp"
        size="compact"
        align="center"
        className="my-16 lg:my-20"
      />
    </HomeWrapper>
  );
}

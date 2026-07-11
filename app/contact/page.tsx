import { HomeWrapper } from "@/components/wrapper";
import { Hero } from "@/components/section/Hero";
import { ContactIntro } from "@/components/section/ContactIntro";
import { HelpOptions } from "@/components/section/HelpOptions";
import { TrustSignals } from "@/components/ui/TrustSignals";

export default function ContactPage() {
  return (
    <HomeWrapper>
      <Hero
        eyebrow="Contact Us"
        title="Let's Build Your Financial Future Together"
        backgroundImage="/images/contact.webp"
        size="tall"
        className="mt-4 lg:mt-2"
      />

      <ContactIntro />
      <HelpOptions />

      <Hero
        title="Partner with a company that prioritizes capital preservation and strategic growth."
        primaryCta={{ label: "Invest Now", href: "/contact" }}
        backgroundImage="/images/cta.webp"
        size="compact"
        align="center"
        className="my-16 lg:my-20"
      />

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

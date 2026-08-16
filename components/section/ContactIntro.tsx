import { Asterisk, Hexagon, Sparkle, Square } from "lucide-react";
import { ContactForm } from "@/components/ui/ContactForm";

export type ContactIntroProps = {
  title?: string;
  paragraphs?: string[];
  logos?: { name: string; icon: React.ComponentType<{ className?: string }> }[];
  className?: string;
};

const defaultParagraphs = [
  "Not sure where to start?",
  "Share a few details and a member of our team will reach out.",
  "We tailor our approach around what matters most to you, and we read every message, so thank you in advance for making it a good one.",
];

const defaultLogos: ContactIntroProps["logos"] = [
  { name: "Logoipsum", icon: Sparkle },
  { name: "Logoipsum", icon: Square },
  { name: "Logoipsum", icon: Hexagon },
  { name: "Logoipsum", icon: Asterisk },
];

export function ContactIntro({
  title = "Contact us today for clear, accurate answers to your most important questions.",
  paragraphs = defaultParagraphs,
  logos = defaultLogos,
  className = "",
}: ContactIntroProps) {
  return (
    <section className={`mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20 ${className}`}>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="max-w-md font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl">
            {title}
          </h2>

          <div className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-muted-light">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <ContactForm
          isConsultation
          buttonText="Schedule a Consultation"
          showSource
        />
      </div>
    </section>
  );
}

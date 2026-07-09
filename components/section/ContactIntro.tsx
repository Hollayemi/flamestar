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
  "Fill out yor information and our support staff will reach out to you. We tailor our services based on what matters to you.",
  "We read every message. So thanks in advance for making it a good one.",
];

const defaultLogos: ContactIntroProps["logos"] = [
  { name: "Logoipsum", icon: Sparkle },
  { name: "Logoipsum", icon: Square },
  { name: "Logoipsum", icon: Hexagon },
  { name: "Logoipsum", icon: Asterisk },
];

export function ContactIntro({
  title = "Contact us today and get answers to your profound questions.",
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

          <div className="mt-14">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-light">
              Trusted by various clients
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-6">
              {logos?.map((logo, index) => (
                <span
                  key={`${logo.name}-${index}`}
                  className="flex items-center gap-1.5 text-sm font-semibold text-ink/70"
                >
                  <logo.icon className="h-4 w-4" />
                  {logo.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}

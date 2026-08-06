"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, MapPin, MessageCircle, Phone, X } from "lucide-react";
import { useConsultation } from "@/lib/consultation-context";
import Link from "next/link";
import { constactInfo } from "../HelpOptions";

export type InsightsValuePropsProps = {
  whyMatters?: {
    title?: string;
    description?: string;
    points?: string[];
  };
  nextSteps?: {
    title?: string;
    ctas?: { label: string; href: string }[];
  };
  className?: string;
};

const defaultWhyMatters = {
  title: "Why This Matters",
  description:
    "In today's fast-evolving financial environment, access to reliable, high-quality insights is a competitive advantage. Our insights are designed to:",
  points: [
    "Enhance your investment decision-making",
    "Identify emerging opportunities",
    "Mitigate risks through informed strategies",
  ],
};

// TODO: replace with Flamestar Capital's real contact details
const ADVISOR_CONTACT = {
  phone: constactInfo.phoneNumber,
  phoneHref: constactInfo.phoneNumber,
  whatsapp: constactInfo.phoneNumber,
  whatsappHref: constactInfo.phoneNumber,
  email: constactInfo.email,
  address: constactInfo.address,
};

type Cta = {
  label: string;
  href?: string;
  action?: () => void;
};

export function InsightsValueProps({
  whyMatters = defaultWhyMatters,
  className = "",
}: InsightsValuePropsProps) {
  const { open: openConsultation } = useConsultation();
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);

  const nextSteps: { title: string; ctas: Cta[] } = {
    title: "Take the next step beyond insights.",
    ctas: [
      { label: "Speak to an Advisor", action: () => setIsAdvisorOpen(true) },
      { label: "Download Flamestar Brochure", href: "/documents/Flamestar Capital Client BrochureD.pdf" },
      { label: "Schedule Consultation", action: openConsultation },
    ],
  };

  return (
    <section className={`mx-auto max-w-7xl px-6 py-10 lg:px-10 ${className}`}>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-paper-soft border border-black/8 p-8">
          <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
            {whyMatters.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-light">
            {whyMatters.description}
          </p>
          <div className="mt-6 flex flex-col gap-3">
            {whyMatters.points?.map((point) => (
              <span
                key={point}
                className="rounded-lg bg-flame/10 px-4 py-3 text-sm text-ink"
              >
                {point}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-black/8 p-8">
          <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
            {nextSteps.title}
          </h3>
          <div className="mt-8 flex flex-col gap-3">
            {nextSteps.ctas.map((cta) =>
              cta.action ? (
                <button
                  key={cta.label}
                  type="button"
                  onClick={cta.action}
                  className="rounded-full bg-flame py-3.5 text-center text-sm font-medium text-paper transition-colors hover:bg-flame-deep"
                >
                  {cta.label}
                </button>
              ) : (
                <Link
                  key={cta.label}
                  href={cta.href ?? "#"}
                  target="_blank"
                  className="rounded-full bg-flame py-3.5 text-center text-sm font-medium text-paper transition-colors hover:bg-flame-deep"
                >
                  {cta.label}
                </Link>
              )
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isAdvisorOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-ink/50 px-4 backdrop-blur-sm sm:px-6"
            onClick={() => setIsAdvisorOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              role="dialog"
              aria-modal="true"
              aria-label="Speak to an advisor"
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl bg-paper p-6 shadow-2xl shadow-black/20 sm:p-9"
            >
              <button
                type="button"
                onClick={() => setIsAdvisorOpen(false)}
                aria-label="Close"
                className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-muted-light transition-colors hover:bg-paper-soft hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>

              <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                Speak to an Advisor
              </h3>
              <p className="mt-2 text-sm text-muted-light">
                Reach us directly through any of the channels below.
              </p>

              <div className="mt-7 flex flex-col gap-2">
                <ContactRow
                  icon={<Phone className="h-4 w-4" />}
                  label="Phone"
                  value={ADVISOR_CONTACT.phone}
                  href={`tel:${ADVISOR_CONTACT.phoneHref}`}
                />
                <ContactRow
                  icon={<MessageCircle className="h-4 w-4" />}
                  label="WhatsApp"
                  value={ADVISOR_CONTACT.whatsapp}
                  href={`https://wa.me/${ADVISOR_CONTACT.whatsappHref}`}
                  external
                />
                <ContactRow
                  icon={<Mail className="h-4 w-4" />}
                  label="Email"
                  value={ADVISOR_CONTACT.email}
                  href={`mailto:${ADVISOR_CONTACT.email}`}
                />
                <ContactRow
                  icon={<MapPin className="h-4 w-4" />}
                  label="Address"
                  value={ADVISOR_CONTACT.address}
                  href={`https://maps.google.com/?q=${encodeURIComponent(ADVISOR_CONTACT.address)}`}
                  external
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group flex items-center gap-4 rounded-xl border border-black/8 px-4 py-3.5 transition-colors hover:border-flame/40 hover:bg-flame/5"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-flame/10 text-flame">
        {icon}
      </span>
      <span className="flex flex-col">
        <span className="text-xs uppercase tracking-wide text-muted-light">{label}</span>
        <span className="text-sm font-medium text-ink group-hover:text-flame-deep">{value}</span>
      </span>
    </a>
  );
}
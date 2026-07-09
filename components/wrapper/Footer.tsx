"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUp, Flame, MapPin, Phone } from "lucide-react";
import { companyInfo, footerLinks, socialLinks } from "@/lib/navigation";
import { socialIconMap } from "@/components/ui/SocialIcons";
import { DotMap } from "@/components/ui/DotMap";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <DotMap tone="flame" />

      <div className="relative mx-auto max-w-7xl px-6 pb-28 pt-16 lg:px-10 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[auto_1fr_1fr_auto] lg:gap-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex h-fit items-center gap-2 text-sm font-medium text-paper/80 transition-colors hover:text-paper"
          >
            Back to top
            <motion.span
              className="flex h-7 w-7 items-center justify-center rounded-full border border-paper/20"
              whileHover={{ y: -2 }}
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </motion.span>
          </button>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-flame">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-paper/75 transition-colors hover:text-paper"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-flame">
              Location
            </h3>
            <div className="mt-4 space-y-3 text-sm text-paper/75">
              <div className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-paper/50" />
                <p>
                  {companyInfo.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-paper/50" />
                <a href={`tel:${companyInfo.phone}`} className="hover:text-paper">
                  {companyInfo.phone}
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-5 lg:items-end">
            <Link
              href="/contact"
              className="group flex items-center gap-2 rounded-full bg-signal px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-signal/90"
            >
              Schedule Consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = socialIconMap[social.label];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/15 text-paper/80 transition-colors hover:border-paper/40 hover:text-paper"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-paper/10 pt-6">
          <p className="text-xs leading-relaxed text-paper/50">
            <span className="font-medium text-paper/70">Disclaimer: </span>
            Investments carry risk. Flamestar Capital Ltd does not guarantee returns.
          </p>
        </div>

        <div className="mt-6 flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-flame" strokeWidth={2} fill="currentColor" />
            <span className="text-xs text-paper/60">
              © {new Date().getFullYear()} Flamestar Capital Ltd. All rights reserved.
            </span>
          </div>
          <span className="text-xs text-paper/40">
            Built by <span className="text-paper/60">DigitaHeart</span>
          </span>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[0.4em] left-0 right-0 select-none whitespace-nowrap text-center font-display text-[clamp(6rem,28vw,30rem)] font-bold leading-none text-paper/[0.05]"
      >
        Flamestar
      </span>
    </footer>
  );
}

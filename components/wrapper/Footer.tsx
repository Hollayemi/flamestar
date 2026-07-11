"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUp, Flame, MapPin, Phone, Heart } from "lucide-react";
import { companyInfo, footerLinks, socialLinks } from "@/lib/navigation";
import { socialIconMap } from "@/components/ui/SocialIcons";
import { DotMap } from "@/components/ui/DotMap";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-white text-black!">
      <div className="relative hidden md:block z-40 mx-auto max-w-7xl px-6 pb-28 pt-16 lg:px-10 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[auto_1fr_1fr_auto] lg:gap-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex h-fit items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            Back to top
            <motion.span
              className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200"
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
                    className="text-sm text-gray-600 transition-colors hover:text-gray-800"
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
            <div className="mt-4 space-y-3 text-sm text-black">
              <div className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-black" />
                <p>
                  {companyInfo.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-black" />
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
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-black text-black transition-colors hover:border-paper/40 hover:text-paper"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-black pt-6">
          <p className="text-xs leading-relaxed text-black">
            <span className="font-medium text-black">Disclaimer: </span>
            Investments carry risk. Flamestar Capital Ltd does not guarantee returns.
          </p>
        </div>

        <div className="mt-6 flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <img src="/images/icon.png" alt="Flamestar Capital Logo" className="h-6 w-6" />
            <span className="text-xs text-gray-600">
              © {new Date().getFullYear()} Flamestar Capital Ltd. All rights reserved.
            </span>
          </div>
          <span className="text-xs text-gray-400 flex items-center">
            Made with <Heart className="text-red-500 w-8 px-1" size={14} fill="currentColor" /> by <span className="text-gray-600 px-1">DigitaHeart</span>
          </span>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden space-y-8 px-4 py-10 pb-16">
        {/* Top Row */}
        <div className="flex items-start justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 text-sm text-gray-600"
          >
            Back to top
            <ArrowUp className="h-4 w-4" />
          </button>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 text-xs font-semibold text-white"
          >
            Schedule Consultation
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Two Columns */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-flame">
              Quick Links
            </h3>

            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-black"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-flame">
              Location
            </h3>

            <div className="space-y-2 text-sm text-gray-700">
              {companyInfo.addressLines.map((line) => (
                <p key={line}>{line}</p>
              ))}

              <a href={`tel:${companyInfo.phone}`}>
                {companyInfo.phone}
              </a>
            </div>

            <div className="mt-5 flex gap-3">
              {socialLinks.map((social) => {
                const Icon = socialIconMap[social.label];

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-700 hover:text-black"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-gray-200 pt-5">
          <p className="text-[11px] leading-relaxed text-gray-500">
            <span className="font-semibold">Disclaimer:</span> Investments carry
            risk. Flamestar Capital Ltd does not guarantee returns.
          </p>
        </div>

        {/* Bottom */}
        <div className="space-y-2 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <img
              src="/images/icon.png"
              alt="Flamestar"
              className="h-5 w-5"
            />
            <span>
              © {new Date().getFullYear()} Flamestar Capital Ltd. All rights
              reserved.
            </span>
          </div>

          <div className="flex items-center gap-1">
            Made with
            <Heart
              className="h-3.5 w-3.5 text-red-500"
              fill="currentColor"
            />
            by
            <span className="font-medium text-gray-700">
              DigitaHeart
            </span>
          </div>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[0.4em] z-10 left-0 right-0 opacity-40 select-none whitespace-nowrap text-center font-display text-[clamp(6rem,28vw,30rem)] font-bold leading-none text-gray-200"
      >
        Flamestar
      </span>
    </footer>
  );
}

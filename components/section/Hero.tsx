"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { DotMap } from "@/components/ui/DotMap";
import { useConsultation } from "@/lib/consultation-context";

export type HeroCta = {
  label: string;
  href: string;
  action?: any 
};

// ============ HERO COMPONENT ============

export type HeroProps = {
  /** Small label above the title, e.g. "About Us" */
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  primaryCta?: HeroCta;
  /** Rendered as a quiet underlined text link, e.g. "Download Investor Brochure" */
  secondaryCta?: HeroCta;
  /** If provided, renders as a photo hero with a dark scrim instead of the dot-map */
  backgroundImage?: string;
  /** Small caption under an image hero, e.g. photo credit */
  imageCredit?: [string, string?];
  align?: "left" | "center";
  /** "tall" for page heroes, "compact" for banner-style CTA sections */
  size?: "tall" | "compact";
  tone?: "flame" | "signal";
  className?: string;
};

const heroSizeClasses: Record<NonNullable<HeroProps["size"]>, string> = {
  tall: "min-h-[560px] lg:min-h-[620px] py-14 lg:py-16",
  compact: "min-h-[360px] py-14",
};

export function Hero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  backgroundImage,
  imageCredit,
  align,
  size = "tall",
  tone = "flame",
  className = "",
}: HeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const isImage = Boolean(backgroundImage);
  const isCentered = align ? align === "center" : !isImage;

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.12 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className={`mx-auto relative ${className}`}>
      <section
        className={`relative flex overflow-hidden md:rounded-3xl bg-ink text-paper ${isImage ? "items-end" : "items-center"
          } ${heroSizeClasses[size]}`}
      >
        {isImage ? (
          <>
            <Image
              src={backgroundImage as string}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/45 to-ink/10" />
          </>
        ) : (
          <DotMap tone={tone} />
        )}

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className={`relative z-10 flex w-full flex-col gap-5 px-8 pb-12 pt-8 sm:px-14 lg:px-20 lg:pb-14 ${isCentered
            ? "mx-auto max-w-5xl items-center text-center"
            : "max-w-3xl items-start text-left"
            }`}
        >
          {eyebrow && (
            <motion.span
              variants={item}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-200 mb-12"
            >
              {eyebrow}
            </motion.span>
          )}

          <motion.h1
            variants={item}
            className={`font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-3xl lg:text-5xl`}
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p variants={item} className="max-w-xl text-sm text-paper/70 sm:text-base">
              {description}
            </motion.p>
          )}

          {(primaryCta || secondaryCta) && (
            <motion.div
              variants={item}
              className={`mt-2 flex flex-wrap items-center gap-x-6 gap-y-3 ${isCentered ? "justify-center" : "justify-start"
                }`}
            >
              {primaryCta && (
                primaryCta.action ? (
                  <button
                    type="button"
                    onClick={primaryCta.action}
                    className="group inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 font-mono text-xs font-medium uppercase tracking-widest text-ink transition-colors hover:bg-paper-soft"
                  >
                    {primaryCta.label}
                    {isImage && (
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    )}
                  </button>
                ) : (
                  <Link
                    href={primaryCta.href}
                    className="group inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 font-mono text-xs font-medium uppercase tracking-widest text-ink transition-colors hover:bg-paper-soft"
                  >
                    {primaryCta.label}
                    {isImage && (
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    )}
                  </Link>
                )
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="text-sm font-medium text-paper/85 underline underline-offset-4 transition-colors hover:text-paper"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </motion.div>
          )}

        </motion.div>
      </section>
          {isImage && imageCredit && (
            <span  className="mt-4 text-xs text-paper/50 absolute bottom-6 right-4 sm:right-6">
              {imageCredit[0]}
              <br />
              {imageCredit[1]}
            </span>
          )}
    </div>
  );
}

// ============ CALL TO ACTION COMPONENT ============

export type CallToActionProps = { className?: string };



export function CallToAction({ className }: CallToActionProps) {
  const prefersReducedMotion = useReducedMotion();
  const { open } = useConsultation();

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.12 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className={`mx-auto md:px-4 ${className}`}>
      <section
        className={`relative flex overflow-hidden md:rounded-3xl bg-ink text-paper items-center min-h-70 py-14`}
      >
        <Image
          src={"/images/cta.webp"}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/45 to-ink/10" />
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className={`relative z-10 flex w-full flex-col gap-4 px-8 pb-12 pt-8 sm:px-14 lg:px-20 lg:pb-14 mx-auto max-w-4xl items-center text-center `}
        >
          <motion.h2
            variants={item}
            className={`font-display text-2xl font-semibold  tracking-tight leading-10 sm:text-3xl lg:text-3xl`}
          >
            Partner with a firm that puts capital preservation and your interests first.
          </motion.h2>


          <motion.div
            variants={item}
            className={`mt-2 flex flex-wrap items-center gap-x-6 gap-y-3 justify-center `}
          >
            <button
              onClick={open}
              className="group inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 font-mono text-xs font-medium uppercase tracking-widest text-ink transition-colors hover:bg-paper-soft"
            >
              Schedule Consultation
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
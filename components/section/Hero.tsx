"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { DotMap } from "@/components/ui/DotMap";

export type HeroCta = {
  label: string;
  href: string;
};

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
  imageCredit?: string;
  align?: "left" | "center";
  /** "tall" for page heroes, "compact" for banner-style CTA sections */
  size?: "tall" | "compact";
  tone?: "flame" | "signal";
  className?: string;
};

const sizeClasses: Record<NonNullable<HeroProps["size"]>, string> = {
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
  // Image heroes read naturally as bottom-left; dot-map heroes default to centered.
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
    <div className={`mx-auto md:px-4 ${className}`}>
      <section
        className={`relative flex overflow-hidden md:rounded-3xl bg-ink text-paper ${
          isImage ? "items-end" : "items-center"
        } ${sizeClasses[size]}`}
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
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/10" />
          </>
        ) : (
          <DotMap tone={tone} />
        )}

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className={`relative z-10 flex w-full flex-col gap-5 px-8 pb-12 pt-8 sm:px-10 lg:px-14 lg:pb-14 ${
            isCentered
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
              className={`mt-2 flex flex-wrap items-center gap-x-6 gap-y-3 ${
                isCentered ? "justify-center" : "justify-start"
              }`}
            >
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="group inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 font-mono text-xs font-medium uppercase tracking-widest text-ink transition-colors hover:bg-paper-soft"
                >
                  {primaryCta.label}
                  {isImage && (
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  )}
                </Link>
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

          {isImage && imageCredit && (
            <motion.span variants={item} className="mt-4 text-xs text-paper/50">
              {imageCredit}
            </motion.span>
          )}
        </motion.div>
      </section>
    </div>
  );
}


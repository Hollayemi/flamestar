"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export type SolutionCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  ctaLabel?: string;
  href: string;
};

export function SolutionCard({ icon: Icon, title, description, ctaLabel, href }: SolutionCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="flex h-full flex-col gap-4 rounded-2xl bg-paper-soft p-8"
    >
      <Icon className="h-7 w-7 text-signal" strokeWidth={1.5} />

      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>

      <p className="text-sm leading-relaxed text-muted-light">{description}</p>

      <Link
        href={href}
        className="mt-auto inline-flex w-fit items-center rounded-full border border-black/12 bg-paper px-5 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-ink transition-colors hover:border-black/25"
      >
        {ctaLabel ?? `Explore ${title}`}
      </Link>
    </motion.div>
  );
}

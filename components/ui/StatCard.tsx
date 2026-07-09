"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export type StatCardProps = {
  value: string;
  label: string;
  /** Path to the pre-rendered trend chart image, e.g. "/images/wave1.png" */
  chartImage: string;
};

export function StatCard({ value, label, chartImage }: StatCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="rounded-2xl bg-paper-soft p-6 sm:p-7"
    >
      <p className="font-display text-3xl font-semibold text-ink">{value}</p>
      <p className="mt-1 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-light">
        {label}
      </p>
      <div className="relative mt-5 h-36 w-full">
        <Image src={chartImage} alt="" fill className="object-cover object-bottom" />
      </div>
    </motion.div>
  );
}

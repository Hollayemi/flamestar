"use client";

import { motion, useReducedMotion } from "framer-motion";

export type PillarCardProps = {
  number: string;
  title: string;
  description: string;
};

export function PillarCard({ number, title, description }: PillarCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="flex flex-col gap-4 rounded-2xl bg-paper-soft p-8"
    >
      <span className="font-display text-2xl font-semibold text-signal">{number}</span>
      <h3 className="font-display text-base font-semibold text-ink">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-light">{description}</p>
    </motion.div>
  );
}

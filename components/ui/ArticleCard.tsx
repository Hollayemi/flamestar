"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export type ArticleCardProps = {
  image: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  href: string;
};

export function ArticleCard({ image, category, excerpt, date, readTime, href }: ArticleCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <Link href={href} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-paper-soft">
          <Image
            src={image}
            alt={category}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <h3 className="mt-4 font-display text-base font-semibold text-ink">{category}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-light">{excerpt}</p>
        <div className="mt-3 flex items-center justify-between text-xs text-muted-light/80">
          <span>{date}</span>
          <span className="uppercase tracking-wide">{readTime}</span>
        </div>
      </Link>
    </motion.div>
  );
}

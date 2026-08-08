"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export type TeamMember = {
  name: string;
  role: string;
  photo: string;
  bio?: string;
};

export type TeamMemberCardProps = TeamMember & {
  active?: boolean;
  tone?: "flame" | "signal";
};

export function TeamMemberCard({
  name,
  role,
  photo,
  bio,
  active = false,
  tone = "signal",
}: TeamMemberCardProps) {
  const [isOpen, setIsOpen] = useState(true);
  const ringColor = tone === "flame" ? "border-flame" : "border-signal";
  const accent = tone === "flame" ? "text-flame" : "text-signal";

  return (
    <div
      className={`relative h-80 w-full overflow-hidden rounded-2xl bg-ink border-2 transition-colors duration-300 ${
        active ? ringColor : "border-transparent"
      }`}
    >
      {/* Front face: photo + name/role */}
      <Image
        src={photo}
        alt={name}
        fill
        sizes="(min-width: 1024px) 33vw, 60vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/10 to-transparent" />

      {bio && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={`Read more about ${name}`}
          className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-opacity hover:bg-white/20 ${
            isOpen ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <Plus className="h-4 w-4" />
        </button>
      )}

      <div className="absolute bottom-0 left-0 px-4 py-4">
        <p className="text-sm font-semibold text-white">{name}</p>
        <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-white/60">
          {role}
        </p>
      </div>

      {/* Bio face: expands from the + button to fill the card, no page-level modal */}
      <AnimatePresence>
        {isOpen && bio && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0 flex flex-col bg-ink p-4"
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="pr-10">
              <p className="text-sm font-semibold text-white">{name}</p>
              <p className={`mt-0.5 font-mono text-[10px] uppercase tracking-wide ${accent}`}>
                {role}
              </p>
            </div>
            <p className="mt-4 overflow-y-auto text-xs leading-relaxed text-white/70">{bio}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

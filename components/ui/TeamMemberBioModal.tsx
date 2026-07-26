"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { TeamMember } from "@/components/ui/TeamMemberCard";

export type TeamMemberBioModalProps = {
  member: TeamMember | null;
  onClose: () => void;
  tone?: "flame" | "signal";
};

export function TeamMemberBioModal({ member, onClose, tone = "signal" }: TeamMemberBioModalProps) {
  const accent = tone === "flame" ? "text-flame" : "text-signal";

  return (
    <AnimatePresence>
      {member && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-ink/60 px-4 py-10 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-label={`About ${member.name}`}
            onClick={(event) => event.stopPropagation()}
            className="relative grid w-full max-w-2xl grid-cols-1 overflow-hidden rounded-3xl bg-paper shadow-2xl shadow-black/20 sm:grid-cols-[220px_1fr]"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-ink/40 text-white backdrop-blur-sm transition-colors hover:bg-ink/60"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative h-48 w-full sm:h-full">
              <Image src={member.photo} alt={member.name} fill className="object-cover" />
            </div>

            <div className="flex flex-col gap-3 p-6 sm:p-8">
              <div>
                <p className="font-display text-xl font-semibold text-ink">{member.name}</p>
                <p className={`mt-1 font-mono text-[11px] uppercase tracking-wide ${accent}`}>
                  {member.role}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-muted-light">{member.bio}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

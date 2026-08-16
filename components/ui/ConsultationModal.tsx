"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useConsultation } from "../../lib/consultation-context";
import { ContactForm } from "./ContactForm";

export function ConsultationModal() {
  const { isOpen, close } = useConsultation();

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);



  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-100 flex items-center overflow-hidden justify-center overflow-y-auto bg-ink/50 px-4  backdrop-blur-sm sm:px-6"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-label="Schedule a consultation"
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-xl max-h-[90vh] overflow-auto rounded-3xl bg-paper p-6 shadow-2xl shadow-black/20 sm:p-9"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-muted-light transition-colors hover:bg-paper-soft hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>

            <ContactForm
              isConsultation
              buttonText="Schedule a Consultation"
              showSource
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

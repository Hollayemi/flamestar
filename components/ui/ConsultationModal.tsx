"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { useConsultation } from "../../lib/consultation-context";

const MESSAGE_LIMIT = 200;

export function ConsultationModal() {
  const { isOpen, close } = useConsultation();
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Wire this up to your submission endpoint of choice.
    close();
  };

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

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <Field label="Name" required>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your full name"
                  className="w-full rounded-lg border border-black/10 bg-paper px-4 py-3 text-sm text-ink placeholder:text-muted-light focus:border-ink/30 focus:outline-none"
                />
              </Field>

              <Field label="Email Address" required>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your@company.com"
                  className="w-full rounded-lg border border-black/10 bg-paper px-4 py-3 text-sm text-ink placeholder:text-muted-light focus:border-ink/30 focus:outline-none"
                />
              </Field>

              <Field label="Phone Number" required>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Your phone number"
                  className="w-full rounded-lg border border-black/10 bg-paper px-4 py-3 text-sm text-ink placeholder:text-muted-light focus:border-ink/30 focus:outline-none"
                />
              </Field>

              <Field label="Investment Interest" required>
                <input
                  type="text"
                  name="investmentInterest"
                  required
                  placeholder="Where your investment goes"
                  className="w-full rounded-lg border border-black/10 bg-paper px-4 py-3 text-sm text-ink placeholder:text-muted-light focus:border-ink/30 focus:outline-none"
                />
              </Field>

              <Field label="Message" required>
                <div className="relative">
                  <textarea
                    name="message"
                    required
                    maxLength={MESSAGE_LIMIT}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="E.g., That engagement metal would floor didn't strategies leverage wheel pee believe."
                    rows={3}
                    className="w-full resize-none rounded-lg border border-black/10 bg-paper px-4 py-3 pb-6 text-sm text-ink placeholder:text-muted-light focus:border-ink/30 focus:outline-none"
                  />
                  <span className="pointer-events-none absolute bottom-2.5 right-3 text-xs text-muted-light">
                    {message.length}/{MESSAGE_LIMIT}
                  </span>
                </div>
              </Field>

              <Field label="How did you hear about us">
                <input
                  type="text"
                  name="source"
                  placeholder="E.g. Google, a colleague, or LinkedIn (Optional)"
                  className="w-full rounded-lg border border-black/10 bg-paper px-4 py-3 text-sm text-ink placeholder:text-muted-light focus:border-ink/30 focus:outline-none"
                />
              </Field>

              <label className="flex items-start gap-3 text-sm text-ink">
                <input
                  type="checkbox"
                  name="agree"
                  required
                  checked={agreed}
                  onChange={(event) => setAgreed(event.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-black/20 text-ink focus:ring-ink/30"
                />
                <span className="leading-relaxed text-muted-light">
                  I agree that Flamestar Capital may contact me about my enquiry. I have read and
                  accepted the{" "}
                  <Link href="/privacy" className="text-ink underline underline-offset-2">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              <button
                type="submit"
                className="mt-1 w-full rounded-xl bg-ink py-3.5 text-sm font-medium text-paper transition-colors hover:bg-ink-soft"
              >
                Schedule a Consultation
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm text-ink">
      <span>
        {label}
        {required && <span aria-hidden="true">*</span>}
      </span>
      {children}
    </label>
  );
}

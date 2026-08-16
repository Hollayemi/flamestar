"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

const MESSAGE_LIMIT = 200;

interface ContactFormProps {
  /** Custom submit handler - if provided, overrides the default API call */
  onSubmit?: (data: FormData) => Promise<void> | void;
  /** Whether to show the "How did you hear about us" field */
  showSource?: boolean;
  /** Whether to show the consultation-specific fields */
  isConsultation?: boolean;
  /** Custom button text */
  buttonText?: string;
  /** Success callback */
  onSuccess?: () => void;
  /** Error callback */
  onError?: (error: Error) => void;
}

export function ContactForm({
  onSubmit,
  showSource = true,
  isConsultation = false,
  buttonText = "Send Message",
  onSuccess,
  onError,
}: ContactFormProps) {
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    // If custom onSubmit is provided, use it
    if (onSubmit) {
      try {
        await onSubmit(formData);
        setStatus("success");
        form.reset();
        setMessage("");
        setAgreed(false);
        onSuccess?.();
        return;
      } catch (error) {
        setStatus("error");
        const message = error instanceof Error ? error.message : "Something went wrong. Please try again.";
        setErrorMessage(message);
        onError?.(error instanceof Error ? error : new Error(message));
        return;
      }
    }

    // Default submission to your API endpoint
    const payload = {
      formType: isConsultation ? "consultation" : "contact",
      formData: {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        ...(isConsultation && {
          investmentInterest: formData.get("investmentInterest"),
        }),
        message: formData.get("message"),
        source: formData.get("source") || undefined,
      },
    };

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
      setMessage("");
      setAgreed(false);
      onSuccess?.();

      // Reset success state after a delay
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    } catch (error) {
      setStatus("error");
      const message = error instanceof Error ? error.message : "Something went wrong. Please try again.";
      setErrorMessage(message);
      onError?.(error instanceof Error ? error : new Error(message));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-xl">
      <Field label="Name" required>
        <input
          type="text"
          name="name"
          required
          placeholder="Your full name"
          className="w-full rounded-lg border border-black/10 bg-paper px-4 py-3 text-sm text-ink placeholder:text-muted-light focus:border-ink/30 focus:outline-none dark:border-white/10 dark:bg-ink/5"
        />
      </Field>

      <Field label="Email Address" required>
        <input
          type="email"
          name="email"
          required
          placeholder="your@company.com"
          className="w-full rounded-lg border border-black/10 bg-paper px-4 py-3 text-sm text-ink placeholder:text-muted-light focus:border-ink/30 focus:outline-none dark:border-white/10 dark:bg-ink/5"
        />
      </Field>

      <Field label="Phone Number" required>
        <input
          type="tel"
          name="phone"
          required
          placeholder="Your phone number"
          className="w-full rounded-lg border border-black/10 bg-paper px-4 py-3 text-sm text-ink placeholder:text-muted-light focus:border-ink/30 focus:outline-none dark:border-white/10 dark:bg-ink/5"
        />
      </Field>

      {isConsultation && (
        <Field label="Investment Interest">
          <input
            type="text"
            name="investmentInterest"
            placeholder="Where your investment goes"
            className="w-full rounded-lg border border-black/10 bg-paper px-4 py-3 text-sm text-ink placeholder:text-muted-light focus:border-ink/30 focus:outline-none dark:border-white/10 dark:bg-ink/5"
          />
        </Field>
      )}

      <Field label="Message">
        <div className="relative">
          <textarea
            name="message"
            maxLength={MESSAGE_LIMIT}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Tell us about your inquiry..."
            rows={4}
            className="w-full resize-none rounded-lg border border-black/10 bg-paper px-4 py-3 pb-6 text-sm text-ink placeholder:text-muted-light focus:border-ink/30 focus:outline-none dark:border-white/10 dark:bg-ink/5"
          />
          <span className="pointer-events-none absolute bottom-2.5 right-3 text-xs text-muted-light">
            {message.length}/{MESSAGE_LIMIT}
          </span>
        </div>
      </Field>

      {showSource && (
        <Field label="How did you hear about us">
          <input
            type="text"
            name="source"
            placeholder="E.g. Google, a colleague, or LinkedIn (Optional)"
            className="w-full rounded-lg border border-black/10 bg-paper px-4 py-3 text-sm text-ink placeholder:text-muted-light focus:border-ink/30 focus:outline-none dark:border-white/10 dark:bg-ink/5"
          />
        </Field>
      )}

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

      {status === "error" && (
        <p className="text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      )}

      {status === "success" && (
        <p className="text-sm text-green-600" role="status">
          ✓ Your message was sent successfully!
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-1 w-full rounded-xl bg-ink py-3.5 text-sm font-medium text-white! transition-colors hover:bg-ink-soft disabled:cursor-not-allowed disabled:opacity-60 dark:bg-paper-200 dark:text-ink dark:hover:bg-paper-soft"
      >
        {status === "submitting"
          ? "Sending..."
          : status === "success"
          ? "✓ Sent"
          : buttonText}
      </button>
    </form>
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
        {required && <span aria-hidden="true" className="text-red-500 ml-0.5">*</span>}
      </span>
      {children}
    </label>
  );
}
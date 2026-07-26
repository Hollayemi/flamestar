"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

const MESSAGE_LIMIT = 200;

export function ContactForm() {
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Wire this up to your submission endpoint of choice.
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-gray-50 p-2 sm:p-8">
      <div className="flex flex-col gap-5">
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
              rows={4}
              className="w-full resize-none rounded-lg border border-black/10 bg-paper px-4 py-3 pb-6 text-sm text-ink placeholder:text-muted-light focus:border-ink/30 focus:outline-none"
            />
            <span className="pointer-events-none absolute bottom-2.5 right-3 text-xs text-muted-light">
              {message.length}/{MESSAGE_LIMIT}
            </span>
          </div>
        </Field>

        <Field label="How did you hear about us" required>
          <input
            type="text"
            name="source"
            required
            placeholder="E.g. Google, a colleague, or linkedin"
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
          className="mt-2 w-full rounded-full bg-ink py-3.5 text-sm font-medium text-paper transition-colors hover:bg-ink-soft"
        >
          Schedule a Consultation
        </button>
      </div>
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
        {required && <span aria-hidden="true">*</span>}
      </span>
      {children}
    </label>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { DotMap } from "@/components/ui/DotMap";

export type NewsletterSignupProps = {
  title?: string;
  description?: string;
  className?: string;
};

export function NewsletterSignup({
  title = "Get Market Insights Delivered to You",
  description = "Receive curated investment insights, market updates, and exclusive reports directly in your inbox.",
  className = "",
}: NewsletterSignupProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Wire this up to your newsletter provider of choice.
    setSubmitted(true);
  };

  return (
    <section className={`mx-auto max-w-7xl px-6 py-10 lg:px-10 ${className}`}>
      <div className="relative overflow-hidden rounded-3xl bg-ink p-8 text-paper sm:p-12">
        <DotMap tone="flame" />

        <div className="relative grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <h2 className="font-display text-xl font-semibold sm:text-2xl">{title}</h2>
            <p className="mt-3 max-w-sm text-sm text-paper/70">{description}</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-2 text-sm">
              <span>Name*</span>
              <input
                type="text"
                required
                placeholder="Your full name"
                className="rounded-lg bg-paper px-4 py-3 text-sm text-ink placeholder:text-muted-light focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span>Email Address*</span>
              <input
                type="email"
                required
                placeholder="your@company.com"
                className="rounded-lg bg-paper px-4 py-3 text-sm text-ink placeholder:text-muted-light focus:outline-none"
              />
            </label>
            <button
              type="submit"
              className="mt-1 rounded-full bg-flame py-3.5 text-sm font-medium text-paper transition-colors hover:bg-flame-deep"
            >
              {submitted ? "Subscribed" : "Subscribe Now"}
            </button>
          </form>
        </div>

        <div className="relative mt-10 border-t border-paper/10 pt-6">
          <p className="text-xs leading-relaxed text-paper/50">
            <span className="font-medium text-paper/70">Disclaimer: </span>
            All insights provided are for informational purposes only and do not constitute
            investment advice. Investors are encouraged to consult with professional advisors
            before making financial decisions.
          </p>
        </div>
      </div>
    </section>
  );
}

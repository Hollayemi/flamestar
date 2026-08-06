"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";

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
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      formType: "newsletter",
      formData: {
        name: formData.get("name"),
        email: formData.get("email"),
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
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <section className={`mx-auto max-w-5xl px-6 py-10 lg:px-10 ${className}`}>
      <div className="relative overflow-hidden rounded-3xl bg-ink p-8 text-paper sm:p-12">
        <Image
          src={"/images/cta.webp"}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />

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
                name="name"
                required
                placeholder="Your full name"
                className="rounded-lg bg-paper px-4 py-3 text-sm text-ink placeholder:text-muted-light focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span>Email Address*</span>
              <input
                type="email"
                name="email"
                required
                placeholder="your@company.com"
                className="rounded-lg bg-paper px-4 py-3 text-sm text-ink placeholder:text-muted-light focus:outline-none"
              />
            </label>

            {status === "error" && (
              <p className="text-xs text-red-300" role="alert">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-10 rounded-xl bg-flame py-3.5 text-sm font-medium text-paper transition-colors hover:bg-flame-deep disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? "Subscribing..." : status === "success" ? "Subscribed" : "Subscribe to Flamestar Market Pulse"}
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

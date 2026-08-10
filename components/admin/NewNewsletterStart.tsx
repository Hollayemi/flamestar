"use client";

import { useState } from "react";
import { FileText, LayoutTemplate } from "lucide-react";
import { NewsletterComposer, type NewsletterComposerInitialData } from "./NewsletterComposer";
import { marketPulseTemplate } from "@/lib/newsletter/marketPulseTemplate";

export function NewNewsletterStart() {
  const [choice, setChoice] = useState<"blank" | "template" | null>(null);

  if (choice === null) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">New Newsletter</h1>
          <p className="mt-1 text-sm text-muted-light">How would you like to start?</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setChoice("blank")}
            className="flex flex-col items-start gap-3 rounded-2xl border border-black/8 bg-paper p-6 text-left transition-colors hover:border-flame/40"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-paper-soft">
              <FileText className="h-5 w-5 text-ink/60" />
            </div>
            <div>
              <p className="font-display text-base font-semibold text-ink">Start Blank</p>
              <p className="mt-1 text-sm text-muted-light">
                An empty issue. Add sections one at a time.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setChoice("template")}
            className="flex flex-col items-start gap-3 rounded-2xl border border-black/8 bg-paper p-6 text-left transition-colors hover:border-flame/40"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-flame/10">
              <LayoutTemplate className="h-5 w-5 text-flame" />
            </div>
            <div>
              <p className="font-display text-base font-semibold text-ink">Use Template</p>
              <p className="mt-1 text-sm text-muted-light">
                Pre-filled with the Market Pulse format — snapshot table, global markets, portfolio
                insights, and strategy corner. Edit, reorder, or insert sections as needed.
              </p>
            </div>
          </button>
        </div>
      </div>
    );
  }

  const initialData: NewsletterComposerInitialData | undefined =
    choice === "template"
      ? {
          subject: marketPulseTemplate.subject,
          dateLine: marketPulseTemplate.dateLine,
          intro: marketPulseTemplate.intro,
          blocks: marketPulseTemplate.blocks,
        }
      : undefined;

  return <NewsletterComposer mode="create" initialData={initialData} />;
}

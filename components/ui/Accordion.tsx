"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

export type AccordionItem = {
  question: string;
  answer: string[];
};

export type AccordionProps = {
  items: AccordionItem[];
  defaultOpenIndex?: number | null;
};

export function Accordion({ items, defaultOpenIndex = 0 }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question} className="rounded-2xl border border-black/8 px-6 py-5">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-medium text-ink">{item.question}</span>
              {isOpen ? (
                <Minus className="h-4 w-4 shrink-0 text-ink" />
              ) : (
                <Plus className="h-4 w-4 shrink-0 text-ink" />
              )}
            </button>
            {isOpen && (
              <div className="mt-4 flex flex-col gap-3">
                {item.answer.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex} className="text-sm leading-relaxed text-muted-light">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

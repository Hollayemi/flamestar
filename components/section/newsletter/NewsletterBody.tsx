import type { NewsletterBlock } from "@/lib/newsletter/types";

export type NewsletterBodyProps = {
  blocks: NewsletterBlock[];
  className?: string;
};

function renderParagraphText(text: string) {
  const match = text.match(/^(FLAMESTAR VIEW:)\s*([\s\S]*)$/i);
  if (!match) return text;
  const [, label, rest] = match;
  return (
    <>
      <span className="font-semibold text-flame">{label}</span> {rest}
    </>
  );
}

export function NewsletterBody({ blocks, className = "" }: NewsletterBodyProps) {
  return (
    <div className={`mx-auto flex max-w-3xl flex-col gap-6 ${className}`}>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <div key={index} className="mt-4 flex flex-col gap-2">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-flame">
                  {block.text}
                </p>
                <div className="h-px bg-ink/10" />
              </div>
            );

          case "subheading":
            return (
              <h3 key={index} className="mt-2 font-display text-lg font-semibold text-ink sm:text-xl">
                {block.text}
              </h3>
            );

          case "paragraph":
            return (
              <p key={index} className="text-sm leading-relaxed text-muted-light sm:text-base">
                {renderParagraphText(block.text)}
              </p>
            );

          case "quote":
            return (
              <blockquote
                key={index}
                className="my-4 border-l-2 border-flame bg-paper-soft px-6 py-5 text-center font-display text-lg font-medium italic leading-snug text-ink sm:text-xl"
              >
                &ldquo;{block.text}&rdquo;
              </blockquote>
            );

          case "list":
            return (
              <ol key={index} className="flex flex-col gap-3">
                {block.items.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-flame text-xs font-semibold text-paper">
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-muted-light sm:text-base">{item}</span>
                  </li>
                ))}
              </ol>
            );

          case "table":
            return (
              <div key={index} className="overflow-hidden rounded-xl border border-black/10">
                {block.title && (
                  <p className="border-b border-black/10 bg-paper-soft px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/70">
                    {block.title}
                  </p>
                )}
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-ink text-paper">
                      <th className="px-4 py-2 font-mono text-[10px] font-medium uppercase tracking-wide">
                        Indicator
                      </th>
                      <th className="px-4 py-2 font-mono text-[10px] font-medium uppercase tracking-wide">
                        Value
                      </th>
                      <th className="px-4 py-2 font-mono text-[10px] font-medium uppercase tracking-wide">
                        Note
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/8">
                    {block.rows.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-paper" : "bg-paper-soft"}>
                        <td className="px-4 py-2.5 text-muted-light">{row.label}</td>
                        <td className="px-4 py-2.5 font-semibold text-ink">{row.value}</td>
                        <td className="px-4 py-2.5 text-xs text-muted-dark">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

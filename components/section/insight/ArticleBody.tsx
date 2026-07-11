import Image from "next/image";

export type ArticleBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string }
  | { type: "image"; src: string; alt?: string };

export type ArticleBodyProps = {
  blocks: ArticleBlock[];
  className?: string;
};

export function ArticleBody({ blocks, className = "" }: ArticleBodyProps) {
  return (
    <div className={`mx-auto flex max-w-3xl flex-col gap-6 ${className}`}>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <h2
                key={index}
                className="mt-4 w-fit font-display text-xl font-semibold text-ink underline decoration-flame/40 underline-offset-8 sm:text-2xl"
              >
                {block.text}
              </h2>
            );
          case "paragraph":
            return (
              <p key={index} className="text-sm leading-relaxed text-muted-light sm:text-base">
                {block.text}
              </p>
            );
          case "quote":
            return (
              <blockquote
                key={index}
                className="my-4 text-center font-display text-xl font-semibold leading-snug text-ink sm:text-2xl"
              >
                &ldquo;{block.text}&rdquo;
              </blockquote>
            );
          case "image":
            return (
              <div
                key={index}
                className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-paper-soft"
              >
                <Image
                  src={block.src}
                  alt={block.alt ?? ""}
                  fill
                  sizes="(min-width: 1024px) 768px, 100vw"
                  className="object-cover"
                />
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

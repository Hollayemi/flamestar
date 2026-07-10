import Link from "next/link";

export type InsightArticle = {
  title: string;
  date: string;
  readTime: string;
  href: string;
};

export function InsightCard({ title, date, readTime, href }: InsightArticle) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col bg-paper-soft justify-between rounded-2xl border border-black/8 p-6 transition-colors hover:border-black/20"
    >
      <h4 className="font-display text-base font-semibold leading-snug text-ink">{title}</h4>
      <div className="mt-8 flex items-center justify-between text-xs text-muted-light">
        <span>{date}</span>
        <span className="uppercase tracking-wide">{readTime}</span>
      </div>
    </Link>
  );
}

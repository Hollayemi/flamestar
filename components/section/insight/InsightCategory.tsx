import { InsightCard, type InsightArticle } from "@/components/ui/InsightCard";

export type InsightCategoryProps = {
  title: string;
  description: string;
  articles: InsightArticle[];
  className?: string;
};

export function InsightCategory({ title, description, articles, className = "" }: InsightCategoryProps) {
  return (
    <section className={`mx-auto max-w-7xl px-6 py-14 lg:px-10 ${className}`}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-light sm:text-base">{description}</p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {articles.map((article) => (
          <InsightCard key={article.title} {...article} />
        ))}
      </div>
    </section>
  );
}

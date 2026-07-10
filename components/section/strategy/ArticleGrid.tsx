import { ArticleCard, type ArticleCardProps } from "@/components/ui/ArticleCard";

export type ArticleGridProps = {
  title?: string;
  description?: string;
  articles: ArticleCardProps[];
  className?: string;
};

export function ArticleGrid({
  title = "Other Articles",
  description,
  articles,
  className = "",
}: ArticleGridProps) {
  return (
    <section className={`mx-auto max-w-7xl px-6 py-16 lg:px-10 ${className}`}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>
        {description && (
          <p className="mt-3 text-sm leading-relaxed text-muted-light sm:text-base">
            {description}
          </p>
        )}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.category} {...article} />
        ))}
      </div>
    </section>
  );
}

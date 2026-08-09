import { notFound } from "next/navigation";
import { HomeWrapper } from "@/components/wrapper";
import { ArticleHero } from "@/components/section/insight/ArticleHero";
import { ArticleMeta } from "@/components/ui/ArticleMeta";
import { ArticleBody } from "@/components/section/insight/ArticleBody";
import { CallToAction } from "@/components/section/Hero";
import { TrustSignals } from "@/components/ui/TrustSignals";
import { InsightCategory } from "@/components/section/insight/InsightCategory";
import { getPublishedInsightCategories, getPublishedPostBySlug } from "@/lib/blog/queries";

export const dynamic = "force-dynamic";

export default async function ArticlePage({ params }: { params: Promise<{ insight: string }> }) {
  const { insight } = await params;

  const [article, categories] = await Promise.all([
    getPublishedPostBySlug(insight),
    getPublishedInsightCategories(),
  ]);

  if (!article) {
    notFound();
  }

  return (
    <HomeWrapper>
      <ArticleHero
        title={article.title}
        description={article.description}
        backgroundImage={article.coverImage || "/images/insight.webp"}
        backHref="/market-insights"
      />

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <ArticleMeta
          publishedDate={article.publishedDate}
          tags={article.tags.map((label) => ({ label }))}
          author={article.author}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-16 lg:px-10">
        <ArticleBody blocks={article.content} />
      </div>

      {categories.map((category) => (
        <InsightCategory key={category.title} {...category} />
      ))}

      <CallToAction className="my-16 lg:my-20" />

      <TrustSignals
        signals={[
          { label: "Registered & Regulated by SEC Nigeria", image: "/images/sec.png" },
          { label: "Transparent reporting" },
          { label: "Risk-managed investment approach" },
        ]}
      />
    </HomeWrapper>
  );
}

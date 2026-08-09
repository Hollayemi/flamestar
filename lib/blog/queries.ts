import { dbConnect } from "@/lib/db/connect";
import { BlogPost, type BlogPostDoc } from "@/lib/db/models/BlogPost";
import { BLOG_CATEGORIES, categoryDescription } from "@/lib/blog/categories";
import type { ArticleBlock } from "@/components/section/insight/ArticleBody";

export type PublicInsightArticle = {
  title: string;
  href: string;
  date: string;
  readTime: string;
};

export type PublicInsightCategory = {
  title: string;
  description: string;
  articles: PublicInsightArticle[];
};

function formatDate(date: Date | string | undefined) {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function toPublicArticle(post: BlogPostDoc & { _id: unknown; slug: string }): PublicInsightArticle {
  return {
    title: post.title,
    href: `/market-insights/${post.slug}`,
    date: formatDate(post.publishedAt ?? post.createdAt),
    readTime: post.readTime || "3 mins read",
  };
}

/** Published posts grouped by category, in the standard category order (custom categories appended). */
export async function getPublishedInsightCategories(): Promise<PublicInsightCategory[]> {
  await dbConnect();
  const posts = await BlogPost.find({ status: "published" }).sort({ publishedAt: -1 }).lean();

  const byCategory = new Map<string, PublicInsightArticle[]>();
  for (const post of posts) {
    const list = byCategory.get(post.category) ?? [];
    list.push(toPublicArticle(post as BlogPostDoc & { _id: unknown; slug: string }));
    byCategory.set(post.category, list);
  }

  const orderedTitles = [
    ...BLOG_CATEGORIES.map((c) => c.title),
    ...[...byCategory.keys()].filter((t) => !BLOG_CATEGORIES.some((c) => c.title === t)),
  ];

  return orderedTitles
    .filter((title) => byCategory.has(title))
    .map((title) => ({
      title,
      description: categoryDescription(title) || "Latest articles in this category.",
      articles: byCategory.get(title) ?? [],
    }));
}

export type PublicArticleDetail = {
  title: string;
  description: string;
  category: string;
  author: string;
  coverImage: string;
  publishedDate: string;
  tags: string[];
  content: ArticleBlock[];
};

export async function getPublishedPostBySlug(slug: string): Promise<PublicArticleDetail | null> {
  await dbConnect();
  const post = await BlogPost.findOne({ slug, status: "published" }).lean();
  if (!post) return null;

  return {
    title: post.title,
    description: post.description || "",
    category: post.category,
    author: post.author || "Flamestar Capital",
    coverImage: post.coverImage || "",
    publishedDate: formatDate(post.publishedAt ?? post.createdAt),
    tags: post.tags ?? [],
    content: (post.content ?? []) as ArticleBlock[],
  };
}

export type PublicFeaturedInsight = {
  title: string;
  description: string;
  image: string;
  href: string;
};

/** Most recently published post, used for the "Featured Insight" banner. */
export async function getFeaturedInsight(): Promise<PublicFeaturedInsight | null> {
  await dbConnect();
  const post = await BlogPost.findOne({ status: "published" }).sort({ publishedAt: -1 }).lean();
  if (!post) return null;

  return {
    title: post.title,
    description: post.description || "",
    image: post.coverImage || "/images/insight.webp",
    href: `/market-insights/${post.slug}`,
  };
}

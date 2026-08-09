import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/db/connect";
import { BlogPost } from "@/lib/db/models/BlogPost";
import { BlogComposer } from "@/components/admin/BlogComposer";
import type { ArticleBlock } from "@/components/section/insight/ArticleBody";

export const dynamic = "force-dynamic";

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  await dbConnect();
  const post = await BlogPost.findById(id).lean();

  if (!post) {
    notFound();
  }

  return (
    <BlogComposer
      mode="edit"
      initialData={{
        id: post._id.toString(),
        title: post.title,
        slug: post.slug,
        category: post.category,
        description: post.description ?? "",
        coverImage: post.coverImage ?? "",
        author: post.author ?? "Flamestar Capital",
        readTime: post.readTime ?? "3 mins read",
        tags: post.tags ?? [],
        content: (post.content ?? []) as ArticleBlock[],
        status: post.status as "draft" | "published",
      }}
    />
  );
}

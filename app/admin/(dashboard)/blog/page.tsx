import Link from "next/link";
import { Plus } from "lucide-react";
import { dbConnect } from "@/lib/db/connect";
import { BlogPost } from "@/lib/db/models/BlogPost";
import { BlogTable } from "@/components/admin/BlogTable";

export const dynamic = "force-dynamic";

export default async function AdminBlogListPage() {
  await dbConnect();
  const posts = await BlogPost.find().sort({ updatedAt: -1 }).lean();

  const serialized = posts.map((post) => ({
    id: post._id.toString(),
    title: post.title,
    category: post.category,
    status: post.status,
    updatedAt: post.updatedAt ? new Date(post.updatedAt).toISOString() : "",
  }));

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Blog</h1>
          <p className="mt-1 text-sm text-muted-light">Manage Market Insights articles.</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-flame px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-flame-deep"
        >
          <Plus className="h-4 w-4" />
          New Post
        </Link>
      </div>

      <BlogTable initialPosts={serialized} />
    </div>
  );
}

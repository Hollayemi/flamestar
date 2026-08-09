"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Loader2 } from "lucide-react";

export type AdminBlogListItem = {
  id: string;
  title: string;
  category: string;
  status: "draft" | "published";
  updatedAt: string;
};

export function BlogTable({ initialPosts }: { initialPosts: AdminBlogListItem[] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
      } else {
        const data = await res.json().catch(() => null);
        alert(data?.error || "Failed to delete post.");
      }
    } finally {
      setDeletingId(null);
    }
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-black/8 bg-paper px-6 py-16 text-center">
        <p className="text-sm text-muted-light">No blog posts yet.</p>
        <Link
          href="/admin/blog/new"
          className="rounded-full bg-flame px-4 py-2 text-xs font-medium text-paper hover:bg-flame-deep"
        >
          Write your first post
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-black/8 bg-paper">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-black/8 bg-paper-soft">
            <th className="px-6 py-3 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-muted-light">
              Title
            </th>
            <th className="hidden px-6 py-3 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-muted-light sm:table-cell">
              Category
            </th>
            <th className="px-6 py-3 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-muted-light">
              Status
            </th>
            <th className="hidden px-6 py-3 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-muted-light md:table-cell">
              Updated
            </th>
            <th className="px-6 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-black/8">
          {posts.map((post) => (
            <tr key={post.id} className="transition-colors hover:bg-paper-soft">
              <td className="max-w-xs truncate px-6 py-4 font-medium text-ink">{post.title}</td>
              <td className="hidden px-6 py-4 text-muted-light sm:table-cell">{post.category}</td>
              <td className="px-6 py-4">
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide ${
                    post.status === "published"
                      ? "bg-signal/10 text-signal"
                      : "bg-paper-soft text-muted-light"
                  }`}
                >
                  {post.status}
                </span>
              </td>
              <td className="hidden px-6 py-4 text-muted-light md:table-cell">
                {post.updatedAt ? new Date(post.updatedAt).toLocaleDateString() : "—"}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/blog/${post.id}/edit`}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-paper-soft hover:text-ink"
                    aria-label="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    disabled={deletingId === post.id}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-flame/10 hover:text-flame disabled:opacity-50"
                    aria-label="Delete"
                  >
                    {deletingId === post.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

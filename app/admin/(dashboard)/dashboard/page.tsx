import Link from "next/link";
import { FileText, CheckCircle2, PenLine, ArrowRight } from "lucide-react";
import { dbConnect } from "@/lib/db/connect";
import { BlogPost } from "@/lib/db/models/BlogPost";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  await dbConnect();

  const [total, published, drafts, recent] = await Promise.all([
    BlogPost.countDocuments(),
    BlogPost.countDocuments({ status: "published" }),
    BlogPost.countDocuments({ status: "draft" }),
    BlogPost.find().sort({ updatedAt: -1 }).limit(5).lean(),
  ]);

  const stats = [
    { label: "Total Posts", value: total, icon: FileText },
    { label: "Published", value: published, icon: CheckCircle2 },
    { label: "Drafts", value: drafts, icon: PenLine },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex flex-col gap-1">
        <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Dashboard</h1>
        <p className="text-sm text-muted-light">
          Overview of your Market Insights content.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-2xl border border-black/8 bg-paper p-6">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-light">
                  {stat.label}
                </p>
                <Icon className="h-4 w-4 text-flame" />
              </div>
              <p className="mt-3 font-display text-3xl font-semibold text-ink">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-black/8 bg-paper">
        <div className="flex items-center justify-between border-b border-black/8 px-6 py-4">
          <h2 className="font-display text-base font-semibold text-ink">Recent Posts</h2>
          <Link
            href="/admin/blog"
            className="inline-flex items-center gap-1 text-xs font-medium text-flame hover:text-flame-deep"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
            <p className="text-sm text-muted-light">No posts yet.</p>
            <Link
              href="/admin/blog/new"
              className="rounded-full bg-flame px-4 py-2 text-xs font-medium text-paper hover:bg-flame-deep"
            >
              Write your first post
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-black/8">
            {recent.map((post) => (
              <li key={post._id.toString()}>
                <Link
                  href={`/admin/blog/${post._id.toString()}/edit`}
                  className="flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-paper-soft"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">{post.title}</p>
                    <p className="mt-0.5 text-xs text-muted-light">{post.category}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide ${
                      post.status === "published"
                        ? "bg-signal/10 text-signal"
                        : "bg-paper-soft text-muted-light"
                    }`}
                  >
                    {post.status}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Loader2, Eye, Download } from "lucide-react";

export type AdminNewsletterIssueListItem = {
  id: string;
  title: string;
  datePublished: string;
  pdfUrl: string;
  fileSize?: number;
};

function formatBytes(bytes?: number) {
  if (!bytes) return "";
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;
}

export function NewsletterIssueTable({
  initialIssues,
}: {
  initialIssues: AdminNewsletterIssueListItem[];
}) {
  const [issues, setIssues] = useState(initialIssues);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This removes the PDF permanently and cannot be undone.`)) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/newsletter/issues/${id}`, { method: "DELETE" });
      if (res.ok) {
        setIssues((prev) => prev.filter((i) => i.id !== id));
      } else {
        const data = await res.json().catch(() => null);
        alert(data?.error || "Failed to delete newsletter.");
      }
    } finally {
      setDeletingId(null);
    }
  }

  if (issues.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-black/8 bg-paper px-6 py-16 text-center">
        <p className="text-sm text-muted-light">No newsletters uploaded yet.</p>
        <Link
          href="/admin/newsletter/new"
          className="rounded-full bg-flame px-4 py-2 text-xs font-medium text-paper hover:bg-flame-deep"
        >
          Upload your first newsletter
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
            <th className="px-6 py-3 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-muted-light">
              Date Published
            </th>
            <th className="hidden px-6 py-3 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-muted-light sm:table-cell">
              Size
            </th>
            <th className="px-6 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-black/8">
          {issues.map((issue) => (
            <tr key={issue.id} className="transition-colors hover:bg-paper-soft">
              <td className="max-w-xs truncate px-6 py-4 font-medium text-ink">{issue.title}</td>
              <td className="px-6 py-4 text-muted-light">
                {issue.datePublished
                  ? new Date(issue.datePublished).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "—"}
              </td>
              <td className="hidden px-6 py-4 text-muted-light sm:table-cell">
                {formatBytes(issue.fileSize)}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <a
                    href={issue.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-paper-soft hover:text-ink"
                    aria-label="View PDF"
                  >
                    <Eye className="h-4 w-4" />
                  </a>
                  <a
                    href={issue.pdfUrl}
                    download
                    className="flex h-8 w-8 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-paper-soft hover:text-ink"
                    aria-label="Download PDF"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                  <Link
                    href={`/admin/newsletter/${issue.id}/edit`}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-paper-soft hover:text-ink"
                    aria-label="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(issue.id, issue.title)}
                    disabled={deletingId === issue.id}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-flame/10 hover:text-flame disabled:opacity-50"
                    aria-label="Delete"
                  >
                    {deletingId === issue.id ? (
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

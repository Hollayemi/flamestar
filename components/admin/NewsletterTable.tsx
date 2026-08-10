"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Loader2, Eye } from "lucide-react";

export type AdminNewsletterListItem = {
  id: string;
  subject: string;
  status: "draft" | "sending" | "sent" | "failed";
  updatedAt: string;
  sentAt?: string;
};

const statusStyles: Record<AdminNewsletterListItem["status"], string> = {
  draft: "bg-paper-soft text-muted-light",
  sending: "bg-signal/10 text-signal",
  sent: "bg-signal/10 text-signal",
  failed: "bg-flame/10 text-flame",
};

export function NewsletterTable({ initialCampaigns }: { initialCampaigns: AdminNewsletterListItem[] }) {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string, subject: string) {
    if (!confirm(`Delete "${subject}"? This cannot be undone.`)) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/newsletter/campaigns/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCampaigns((prev) => prev.filter((c) => c.id !== id));
      } else {
        const data = await res.json().catch(() => null);
        alert(data?.error || "Failed to delete campaign.");
      }
    } finally {
      setDeletingId(null);
    }
  }

  if (campaigns.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-black/8 bg-paper px-6 py-16 text-center">
        <p className="text-sm text-muted-light">No newsletters yet.</p>
        <Link
          href="/admin/newsletter/new"
          className="rounded-full bg-flame px-4 py-2 text-xs font-medium text-paper hover:bg-flame-deep"
        >
          Compose your first newsletter
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
              Subject
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
          {campaigns.map((c) => (
            <tr key={c.id} className="transition-colors hover:bg-paper-soft">
              <td className="max-w-xs truncate px-6 py-4 font-medium text-ink">{c.subject}</td>
              <td className="px-6 py-4">
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide ${statusStyles[c.status]}`}
                >
                  {c.status}
                </span>
              </td>
              <td className="hidden px-6 py-4 text-muted-light md:table-cell">
                {c.updatedAt ? new Date(c.updatedAt).toLocaleDateString() : "—"}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/newsletter/${c.id}/edit`}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-paper-soft hover:text-ink"
                    aria-label={c.status === "sent" ? "View" : "Edit"}
                  >
                    {c.status === "sent" ? <Eye className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
                  </Link>
                  {c.status !== "sending" && (
                    <button
                      onClick={() => handleDelete(c.id, c.subject)}
                      disabled={deletingId === c.id}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-flame/10 hover:text-flame disabled:opacity-50"
                      aria-label="Delete"
                    >
                      {deletingId === c.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

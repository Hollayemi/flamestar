"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Loader2,
  Heading1,
  Heading2,
  Pilcrow,
  Quote,
  ListOrdered,
  Table as TableIcon,
  Eye,
  EyeOff,
  Send,
} from "lucide-react";
import { renderNewsletterHTML } from "@/lib/newsletter/template";
import type { NewsletterBlock } from "@/lib/newsletter/types";

type LocalBlock = NewsletterBlock & { _key: string };

export type NewsletterComposerInitialData = {
  id?: string;
  subject: string;
  dateLine: string;
  intro: string;
  blocks: NewsletterBlock[];
  status?: "draft" | "sending" | "sent" | "failed";
  error?: string;
};

const today = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const emptyCampaign: NewsletterComposerInitialData = {
  subject: "",
  dateLine: today,
  intro: "",
  blocks: [],
};

let keyCounter = 0;
function newKey() {
  keyCounter += 1;
  return `nblock-${Date.now()}-${keyCounter}`;
}

function toLocalBlocks(blocks: NewsletterBlock[]): LocalBlock[] {
  return blocks.map((b) => ({ ...b, _key: newKey() }));
}

const blockTypeOptions: { type: NewsletterBlock["type"]; label: string; icon: typeof Heading1 }[] = [
  { type: "heading", label: "Section Heading", icon: Heading1 },
  { type: "subheading", label: "Subheading", icon: Heading2 },
  { type: "paragraph", label: "Paragraph", icon: Pilcrow },
  { type: "table", label: "Indicator Table", icon: TableIcon },
  { type: "list", label: "Numbered List", icon: ListOrdered },
  { type: "quote", label: "Quote", icon: Quote },
];

function blockDefaults(type: NewsletterBlock["type"]): NewsletterBlock {
  switch (type) {
    case "heading":
      return { type: "heading", text: "" };
    case "subheading":
      return { type: "subheading", text: "" };
    case "paragraph":
      return { type: "paragraph", text: "" };
    case "quote":
      return { type: "quote", text: "" };
    case "list":
      return { type: "list", items: [""] };
    case "table":
      return { type: "table", title: "", rows: [{ label: "", value: "", note: "" }] };
  }
}

export function NewsletterComposer({
  mode,
  initialData,
}: {
  mode: "create" | "edit";
  initialData?: NewsletterComposerInitialData;
}) {
  const router = useRouter();
  const base = initialData ?? emptyCampaign;
  const readOnly = base.status === "sent" || base.status === "sending";

  const [subject, setSubject] = useState(base.subject);
  const [dateLine, setDateLine] = useState(base.dateLine || today);
  const [intro, setIntro] = useState(base.intro);
  const [blocks, setBlocks] = useState<LocalBlock[]>(() => toLocalBlocks(base.blocks));
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState<string | null>(base.error ?? null);
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [campaignId, setCampaignId] = useState(base.id);
  const [status, setStatus] = useState(base.status ?? "draft");

  const previewBlocks = useMemo<NewsletterBlock[]>(
    () =>
      blocks.map((block) => {
        const { _key, ...rest } = block;
        void _key;
        return rest as NewsletterBlock;
      }),
    [blocks]
  );

  const previewHtml = useMemo(() => {
    if (typeof window === "undefined") return "";
    return renderNewsletterHTML({
      subject: subject || "Untitled Newsletter",
      dateLine,
      intro,
      blocks: previewBlocks,
      logoUrl: `${window.location.origin}/images/logo.png`,
    });
  }, [subject, dateLine, intro, previewBlocks]);

  function insertBlockAt(index: number, type: NewsletterBlock["type"]) {
    setBlocks((prev) => {
      const copy = [...prev];
      copy.splice(index, 0, { ...blockDefaults(type), _key: newKey() });
      return copy;
    });
  }

  function updateBlock(key: string, patch: Partial<NewsletterBlock>) {
    setBlocks((prev) =>
      prev.map((b) => (b._key === key ? ({ ...b, ...patch } as LocalBlock) : b))
    );
  }

  function removeBlock(key: string) {
    setBlocks((prev) => prev.filter((b) => b._key !== key));
  }

  function moveBlock(key: string, direction: -1 | 1) {
    setBlocks((prev) => {
      const index = prev.findIndex((b) => b._key === key);
      const target = index + direction;
      if (index === -1 || target < 0 || target >= prev.length) return prev;
      const copy = [...prev];
      [copy[index], copy[target]] = [copy[target], copy[index]];
      return copy;
    });
  }

  async function saveCampaign(): Promise<string | null> {
    setError(null);

    if (!subject.trim()) {
      setError("Subject is required.");
      return null;
    }

    setSaving(true);
    const payload = { subject: subject.trim(), dateLine, intro, blocks: previewBlocks };

    try {
      const url = campaignId
        ? `/api/admin/newsletter/campaigns/${campaignId}`
        : "/api/admin/newsletter/campaigns";
      const method = campaignId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Something went wrong. Please try again.");
        return null;
      }

      const id = data.campaign._id ?? data.campaign.id ?? campaignId;
      setCampaignId(id);
      return id;
    } catch {
      setError("Something went wrong. Please check your connection and try again.");
      return null;
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveDraft(e: FormEvent) {
    e.preventDefault();
    const id = await saveCampaign();
    if (id) {
      router.push("/admin/newsletter");
      router.refresh();
    }
  }

  async function handleSend(e: FormEvent) {
    e.preventDefault();

    if (
      !confirm(
        "This will send the campaign to your entire Zoho Campaigns mailing list right now. Continue?"
      )
    ) {
      return;
    }

    const id = await saveCampaign();
    if (!id) return;

    setSending(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/newsletter/campaigns/${id}/send`, { method: "POST" });
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Failed to send the campaign.");
        setStatus("failed");
        setSending(false);
        return;
      }

      setStatus("sent");
      router.push("/admin/newsletter");
      router.refresh();
    } catch {
      setError("Something went wrong while sending. Please check your connection and try again.");
      setSending(false);
    }
  }

  return (
    <form className="mx-auto flex max-w-6xl flex-col gap-6 pb-16">
      {error && (
        <p className="rounded-lg border border-flame/30 bg-flame/10 px-4 py-3 text-sm text-flame">
          {error}
        </p>
      )}

      {readOnly && (
        <p className="rounded-lg border border-signal/30 bg-signal/10 px-4 py-3 text-sm text-signal">
          This campaign has {status === "sent" ? "already been sent" : "sending in progress"} and is
          read-only.
        </p>
      )}

      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            {mode === "create" ? "New Newsletter" : "Edit Newsletter"}
          </h1>
          <p className="mt-1 text-sm text-muted-light">
            Compose a Flamestar Market Pulse issue and send it via Zoho Campaigns.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowPreview((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-xs font-medium text-ink/70 transition-colors hover:border-ink/30 hover:text-ink"
        >
          {showPreview ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          {showPreview ? "Hide Preview" : "Show Preview"}
        </button>
      </div>

      <div className={`grid grid-cols-1 gap-6 ${showPreview ? "lg:grid-cols-2" : ""}`}>
        <fieldset disabled={readOnly} className="flex flex-col gap-6 disabled:opacity-60">
          <div className="rounded-2xl border border-black/8 bg-paper p-6">
            <h2 className="mb-4 font-display text-sm font-semibold text-ink">Details</h2>
            <div className="flex flex-col gap-4">
              <Field label="Subject">
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className={inputClass}
                  placeholder="Flamestar Market Pulse — Week of ..."
                />
              </Field>

              <Field label="Date Line" hint="Shown under the header, e.g. Monday, August 3, 2026">
                <input value={dateLine} onChange={(e) => setDateLine(e.target.value)} className={inputClass} />
              </Field>

              <Field label="From the Desk (Intro)">
                <textarea
                  value={intro}
                  onChange={(e) => setIntro(e.target.value)}
                  className={`${inputClass} min-h-28 resize-y`}
                  placeholder="Dear Valued Client, the Nigerian market closed..."
                />
              </Field>
            </div>
          </div>

          <div className="rounded-2xl border border-black/8 bg-paper p-6">
            <h2 className="mb-4 font-display text-sm font-semibold text-ink">Newsletter Sections</h2>

            <div className="flex flex-col gap-3">
              <InsertDivider onInsert={(type) => insertBlockAt(0, type)} />
              {blocks.map((block, index) => (
                <div key={block._key} className="flex flex-col gap-3">
                  <BlockEditor
                    block={block}
                    index={index}
                    total={blocks.length}
                    onChange={(patch) => updateBlock(block._key, patch)}
                    onRemove={() => removeBlock(block._key)}
                    onMove={(dir) => moveBlock(block._key, dir)}
                  />
                  <InsertDivider onInsert={(type) => insertBlockAt(index + 1, type)} />
                </div>
              ))}

              {blocks.length === 0 && (
                <p className="rounded-xl border border-dashed border-black/12 px-4 py-8 text-center text-sm text-muted-light">
                  No sections yet. Add one below — headings, tables, and lists mirror the Market Pulse
                  format.
                </p>
              )}
            </div>
          </div>
        </fieldset>

        {showPreview && (
          <div className="rounded-2xl border border-black/8 bg-paper-soft p-4 lg:sticky lg:top-24 lg:h-fit">
            <h2 className="mb-3 px-2 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted-light">
              Live Preview
            </h2>
            <div className="overflow-hidden rounded-xl border border-black/8 bg-paper">
              <iframe
                title="Newsletter preview"
                srcDoc={previewHtml}
                className="h-[720px] w-full"
                sandbox=""
              />
            </div>
          </div>
        )}
      </div>

      {!readOnly && (
        <div className="sticky bottom-4 z-10 flex flex-wrap items-center justify-end gap-3 rounded-2xl border border-black/8 bg-paper p-4 shadow-lg shadow-black/5">
          <button
            type="button"
            onClick={handleSaveDraft}
            disabled={saving || sending}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 px-5 py-2.5 text-sm font-medium text-ink/70 transition-colors hover:border-ink/30 hover:text-ink disabled:opacity-60"
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            Save Draft
          </button>
          <button
            type="button"
            onClick={handleSend}
            disabled={saving || sending}
            className="inline-flex items-center gap-2 rounded-full bg-flame px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-flame-deep disabled:cursor-not-allowed disabled:opacity-60"
          >
            {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            {sending ? "Sending..." : "Send to Mailing List"}
          </button>
        </div>
      )}
    </form>
  );
}

const inputClass =
  "w-full rounded-xl border border-black/10 bg-paper px-4 py-2.5 text-sm text-ink placeholder:text-muted-dark outline-none transition-colors focus:border-flame/50";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium uppercase tracking-wide text-muted-light">{label}</label>
      {children}
      {hint && <p className="text-xs text-muted-dark">{hint}</p>}
    </div>
  );
}

function InsertDivider({ onInsert }: { onInsert: (type: NewsletterBlock["type"]) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="group relative flex items-center">
      <div className="h-px flex-1 bg-transparent transition-colors group-hover:bg-black/10" />
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`mx-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-ink/40 transition-all ${
          open
            ? "border-flame/50 bg-flame/10 text-flame opacity-100"
            : "border-black/10 opacity-0 hover:border-flame/40 hover:text-flame group-hover:opacity-100"
        }`}
        aria-label="Insert section here"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
      <div className="h-px flex-1 bg-transparent transition-colors group-hover:bg-black/10" />

      {open && (
        <div className="absolute left-1/2 top-7 z-10 flex -translate-x-1/2 flex-wrap justify-center gap-1.5 rounded-xl border border-black/10 bg-paper p-2 shadow-lg shadow-black/10">
          {blockTypeOptions.map((opt) => {
            const Icon = opt.icon;
            return (
              <button
                key={opt.type}
                type="button"
                onClick={() => {
                  onInsert(opt.type);
                  setOpen(false);
                }}
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-black/10 px-3 py-1.5 text-xs font-medium text-ink/70 transition-colors hover:border-flame/40 hover:text-flame"
              >
                <Icon className="h-3 w-3" />
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function BlockEditor({
  block,
  index,
  total,
  onChange,
  onRemove,
  onMove,
}: {
  block: LocalBlock;
  index: number;
  total: number;
  onChange: (patch: Partial<NewsletterBlock>) => void;
  onRemove: () => void;
  onMove: (direction: -1 | 1) => void;
}) {
  const typeLabel = blockTypeOptions.find((o) => o.type === block.type)?.label ?? block.type;

  return (
    <div className="rounded-xl border border-black/10 p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-muted-light">
          {index + 1}. {typeLabel}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onMove(-1)}
            disabled={index === 0}
            className="flex h-7 w-7 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-paper-soft hover:text-ink disabled:opacity-30"
            aria-label="Move up"
          >
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onMove(1)}
            disabled={index === total - 1}
            className="flex h-7 w-7 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-paper-soft hover:text-ink disabled:opacity-30"
            aria-label="Move down"
          >
            <ArrowDown className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="flex h-7 w-7 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-flame/10 hover:text-flame"
            aria-label="Remove block"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {block.type === "paragraph" || block.type === "quote" ? (
        <textarea
          value={block.text}
          onChange={(e) => onChange({ text: e.target.value })}
          className={`${inputClass} min-h-24 resize-y`}
          placeholder={block.type === "quote" ? "Quote text" : "Paragraph text"}
        />
      ) : block.type === "heading" || block.type === "subheading" ? (
        <input
          value={block.text}
          onChange={(e) => onChange({ text: e.target.value })}
          className={inputClass}
          placeholder={
            block.type === "heading" ? "e.g. 01 NIGERIAN MARKET SNAPSHOT" : "e.g. Fixed Income Watch"
          }
        />
      ) : block.type === "list" ? (
        <div className="flex flex-col gap-2">
          {block.items.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                value={item}
                onChange={(e) => {
                  const items = [...block.items];
                  items[i] = e.target.value;
                  onChange({ items });
                }}
                className={inputClass}
                placeholder={`Step ${i + 1}`}
              />
              <button
                type="button"
                onClick={() => onChange({ items: block.items.filter((_, idx) => idx !== i) })}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink/40 hover:bg-flame/10 hover:text-flame"
                aria-label="Remove item"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => onChange({ items: [...block.items, ""] })}
            className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full border border-black/10 px-3 py-1.5 text-xs font-medium text-ink/70 hover:border-flame/40 hover:text-flame"
          >
            <Plus className="h-3 w-3" />
            Add step
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <input
            value={block.title ?? ""}
            onChange={(e) => onChange({ title: e.target.value })}
            className={inputClass}
            placeholder="Table title, e.g. Key Market Indicators"
          />
          <div className="flex flex-col gap-2">
            {block.rows.map((row, i) => (
              <div key={i} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2">
                <input
                  value={row.label}
                  onChange={(e) => {
                    const rows = [...block.rows];
                    rows[i] = { ...rows[i], label: e.target.value };
                    onChange({ rows });
                  }}
                  className={inputClass}
                  placeholder="Indicator"
                />
                <input
                  value={row.value}
                  onChange={(e) => {
                    const rows = [...block.rows];
                    rows[i] = { ...rows[i], value: e.target.value };
                    onChange({ rows });
                  }}
                  className={inputClass}
                  placeholder="Value"
                />
                <input
                  value={row.note ?? ""}
                  onChange={(e) => {
                    const rows = [...block.rows];
                    rows[i] = { ...rows[i], note: e.target.value };
                    onChange({ rows });
                  }}
                  className={inputClass}
                  placeholder="Note"
                />
                <button
                  type="button"
                  onClick={() => onChange({ rows: block.rows.filter((_, idx) => idx !== i) })}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink/40 hover:bg-flame/10 hover:text-flame"
                  aria-label="Remove row"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => onChange({ rows: [...block.rows, { label: "", value: "", note: "" }] })}
            className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full border border-black/10 px-3 py-1.5 text-xs font-medium text-ink/70 hover:border-flame/40 hover:text-flame"
          >
            <Plus className="h-3 w-3" />
            Add row
          </button>
        </div>
      )}
    </div>
  );
}

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
  ImageIcon,
  Eye,
  EyeOff,
} from "lucide-react";
import { ArticleBody, type ArticleBlock } from "@/components/section/insight/ArticleBody";
import { BLOG_CATEGORIES } from "@/lib/blog/categories";
import { ImageUploadField } from "./ImageUploadField";

type LocalBlock = ArticleBlock & { _key: string };

export type BlogComposerInitialData = {
  id?: string;
  title: string;
  slug?: string;
  category: string;
  description: string;
  coverImage: string;
  author: string;
  readTime: string;
  tags: string[];
  content: ArticleBlock[];
  status: "draft" | "published";
};

const emptyPost: BlogComposerInitialData = {
  title: "",
  category: BLOG_CATEGORIES[0].title,
  description: "",
  coverImage: "",
  author: "Flamestar Capital",
  readTime: "3 mins read",
  tags: [],
  content: [],
  status: "draft",
};

let keyCounter = 0;
function newKey() {
  keyCounter += 1;
  return `block-${Date.now()}-${keyCounter}`;
}

function toLocalBlocks(blocks: ArticleBlock[]): LocalBlock[] {
  return blocks.map((b) => ({ ...b, _key: newKey() }));
}

const blockTypeOptions: { type: ArticleBlock["type"]; label: string; icon: typeof Heading1 }[] = [
  { type: "heading", label: "Heading", icon: Heading1 },
  { type: "subheading", label: "Subheading", icon: Heading2 },
  { type: "paragraph", label: "Paragraph", icon: Pilcrow },
  { type: "quote", label: "Quote", icon: Quote },
  { type: "image", label: "Image", icon: ImageIcon },
];

function blockDefaults(type: ArticleBlock["type"]): ArticleBlock {
  switch (type) {
    case "heading":
      return { type: "heading", text: "" };
    case "subheading":
      return { type: "subheading", text: "" };
    case "paragraph":
      return { type: "paragraph", text: "" };
    case "quote":
      return { type: "quote", text: "" };
    case "image":
      return { type: "image", src: "", alt: "" };
  }
}

export function BlogComposer({
  mode,
  initialData,
}: {
  mode: "create" | "edit";
  initialData?: BlogComposerInitialData;
}) {
  const router = useRouter();
  const base = initialData ?? emptyPost;

  const [title, setTitle] = useState(base.title);
  const [slug, setSlug] = useState(base.slug ?? "");
  const [category, setCategory] = useState(base.category);
  const [customCategory, setCustomCategory] = useState(
    BLOG_CATEGORIES.some((c) => c.title === base.category) ? "" : base.category
  );
  const [isCustomCategory, setIsCustomCategory] = useState(
    !BLOG_CATEGORIES.some((c) => c.title === base.category)
  );
  const [description, setDescription] = useState(base.description);
  const [coverImage, setCoverImage] = useState(base.coverImage);
  const [author, setAuthor] = useState(base.author);
  const [readTime, setReadTime] = useState(base.readTime);
  const [tagsInput, setTagsInput] = useState(base.tags.join(", "));
  const [blocks, setBlocks] = useState<LocalBlock[]>(() => toLocalBlocks(base.content));
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState<"draft" | "published" | null>(null);

  const previewBlocks = useMemo<ArticleBlock[]>(
    () =>
      blocks.map((block) => {
        const { _key, ...rest } = block;
        void _key;
        return rest as ArticleBlock;
      }),
    [blocks]
  );

  function addBlock(type: ArticleBlock["type"]) {
    setBlocks((prev) => [...prev, { ...blockDefaults(type), _key: newKey() }]);
  }

  function updateBlock(key: string, patch: Partial<ArticleBlock>) {
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

  async function handleSubmit(e: FormEvent, submitStatus: "draft" | "published") {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    const resolvedCategory = isCustomCategory ? customCategory.trim() : category;
    if (!resolvedCategory) {
      setError("Category is required.");
      return;
    }

    setSaving(submitStatus);

    const payload = {
      title: title.trim(),
      slug: slug.trim() || undefined,
      category: resolvedCategory,
      description,
      coverImage,
      author,
      readTime,
      tags: tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      content: previewBlocks,
      status: submitStatus,
    };

    try {
      const url = mode === "create" ? "/api/admin/blogs" : `/api/admin/blogs/${initialData?.id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Something went wrong. Please try again.");
        setSaving(null);
        return;
      }

      router.push("/admin/blog");
      router.refresh();
    } catch {
      setError("Something went wrong. Please check your connection and try again.");
      setSaving(null);
    }
  }

  return (
    <form className="mx-auto flex max-w-6xl flex-col gap-6 pb-16">
      {error && (
        <p className="rounded-lg border border-flame/30 bg-flame/10 px-4 py-3 text-sm text-flame">
          {error}
        </p>
      )}

      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            {mode === "create" ? "New Post" : "Edit Post"}
          </h1>
          <p className="mt-1 text-sm text-muted-light">
            Compose a Market Insights article using structured content blocks.
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
        <div className="flex flex-col gap-6">
          {/* Meta fields */}
          <div className="rounded-2xl border border-black/8 bg-paper p-6">
            <h2 className="mb-4 font-display text-sm font-semibold text-ink">Details</h2>
            <div className="flex flex-col gap-4">
              <Field label="Title">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={inputClass}
                  placeholder="Article title"
                />
              </Field>

              <Field label="Slug" hint="Leave blank to auto-generate from the title">
                <input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className={inputClass}
                  placeholder="auto-generated-from-title"
                />
              </Field>

              <Field label="Category">
                <select
                  value={isCustomCategory ? "__custom" : category}
                  onChange={(e) => {
                    if (e.target.value === "__custom") {
                      setIsCustomCategory(true);
                    } else {
                      setIsCustomCategory(false);
                      setCategory(e.target.value);
                    }
                  }}
                  className={inputClass}
                >
                  {BLOG_CATEGORIES.map((c) => (
                    <option key={c.title} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                  <option value="__custom">Custom category…</option>
                </select>
                {isCustomCategory && (
                  <input
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    className={`${inputClass} mt-2`}
                    placeholder="Enter a new category name"
                  />
                )}
              </Field>

              <Field label="Description" hint="Short summary used in listings">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`${inputClass} min-h-20 resize-y`}
                  placeholder="One or two sentence summary"
                />
              </Field>

              <Field label="Cover Image">
                <ImageUploadField value={coverImage} onChange={setCoverImage} />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Author">
                  <input value={author} onChange={(e) => setAuthor(e.target.value)} className={inputClass} />
                </Field>
                <Field label="Read Time">
                  <input
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    className={inputClass}
                    placeholder="3 mins read"
                  />
                </Field>
              </div>

              <Field label="Tags" hint="Comma separated">
                <input
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className={inputClass}
                  placeholder="Financial, Asset"
                />
              </Field>
            </div>
          </div>

          {/* Content blocks */}
          <div className="rounded-2xl border border-black/8 bg-paper p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-sm font-semibold text-ink">Article Content</h2>
            </div>

            <div className="flex flex-col gap-3">
              {blocks.map((block, index) => (
                <BlockEditor
                  key={block._key}
                  block={block}
                  index={index}
                  total={blocks.length}
                  onChange={(patch) => updateBlock(block._key, patch)}
                  onRemove={() => removeBlock(block._key)}
                  onMove={(dir) => moveBlock(block._key, dir)}
                />
              ))}

              {blocks.length === 0 && (
                <p className="rounded-xl border border-dashed border-black/12 px-4 py-8 text-center text-sm text-muted-light">
                  No content blocks yet. Add one below to start composing.
                </p>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-2 border-t border-black/8 pt-4">
              {blockTypeOptions.map((opt) => {
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.type}
                    type="button"
                    onClick={() => addBlock(opt.type)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-black/10 px-3.5 py-1.5 text-xs font-medium text-ink/70 transition-colors hover:border-flame/40 hover:text-flame"
                  >
                    <Plus className="h-3 w-3" />
                    <Icon className="h-3 w-3" />
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {showPreview && (
          <div className="rounded-2xl border border-black/8 bg-paper-soft p-6 lg:sticky lg:top-24 lg:h-fit">
            <h2 className="mb-4 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted-light">
              Live Preview
            </h2>
            <div className="rounded-xl bg-paper p-6">
              <h1 className="font-display text-xl font-semibold text-ink">{title || "Untitled article"}</h1>
              {description && <p className="mt-2 text-sm text-muted-light">{description}</p>}
              <div className="mt-6">
                <ArticleBody blocks={previewBlocks} />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="sticky bottom-4 z-10 flex flex-wrap items-center justify-end gap-3 rounded-2xl border border-black/8 bg-paper p-4 shadow-lg shadow-black/5">
        <button
          type="button"
          onClick={(e) => handleSubmit(e, "draft")}
          disabled={saving !== null}
          className="inline-flex items-center gap-2 rounded-full border border-black/10 px-5 py-2.5 text-sm font-medium text-ink/70 transition-colors hover:border-ink/30 hover:text-ink disabled:opacity-60"
        >
          {saving === "draft" && <Loader2 className="h-4 w-4 animate-spin" />}
          Save as Draft
        </button>
        <button
          type="button"
          onClick={(e) => handleSubmit(e, "published")}
          disabled={saving !== null}
          className="inline-flex items-center gap-2 rounded-full bg-flame px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-flame-deep disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving === "published" && <Loader2 className="h-4 w-4 animate-spin" />}
          Publish
        </button>
      </div>
    </form>
  );
}

const inputClass =
  "w-full rounded-xl border border-black/10 bg-paper px-4 py-2.5 text-sm text-ink placeholder:text-muted-dark outline-none transition-colors focus:border-flame/50";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium uppercase tracking-wide text-muted-light">{label}</label>
      {children}
      {hint && <p className="text-xs text-muted-dark">{hint}</p>}
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
  onChange: (patch: Partial<ArticleBlock>) => void;
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

      {block.type === "image" ? (
        <div className="flex flex-col gap-2">
          <ImageUploadField value={block.src} onChange={(url) => onChange({ src: url })} />
          <input
            value={block.alt ?? ""}
            onChange={(e) => onChange({ alt: e.target.value })}
            className={inputClass}
            placeholder="Alt text"
          />
        </div>
      ) : block.type === "paragraph" || block.type === "quote" ? (
        <textarea
          value={block.text}
          onChange={(e) => onChange({ text: e.target.value })}
          className={`${inputClass} min-h-24 resize-y`}
          placeholder={block.type === "quote" ? "Quote text" : "Paragraph text"}
        />
      ) : (
        <input
          value={block.text}
          onChange={(e) => onChange({ text: e.target.value })}
          className={inputClass}
          placeholder={block.type === "heading" ? "Heading text" : "Subheading text"}
        />
      )}
    </div>
  );
}
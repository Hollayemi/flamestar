"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, FileText, Loader2, X } from "lucide-react";

export type NewsletterIssueInitialData = {
  id: string;
  title: string;
  datePublished: string; // yyyy-mm-dd
  pdfUrl: string;
};

export function NewsletterUploadForm({
  mode,
  initialData,
}: {
  mode: "create" | "edit";
  initialData?: NewsletterIssueInitialData;
}) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [datePublished, setDatePublished] = useState(
    initialData?.datePublished ?? new Date().toISOString().slice(0, 10)
  );
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function handleFile(f: File | null | undefined) {
    if (!f) return;
    if (f.type !== "application/pdf") {
      setError("Only PDF files are supported.");
      return;
    }
    if (f.size > 25 * 1024 * 1024) {
      setError("PDF must be smaller than 25MB.");
      return;
    }
    setError(null);
    setFile(f);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!datePublished) {
      setError("Date published is required.");
      return;
    }
    if (mode === "create" && !file) {
      setError("Please choose a PDF file to upload.");
      return;
    }

    setSaving(true);

    const formData = new FormData();
    formData.set("title", title.trim());
    formData.set("datePublished", datePublished);
    if (file) formData.set("file", file);

    try {
      const url =
        mode === "create"
          ? "/api/admin/newsletter/issues"
          : `/api/admin/newsletter/issues/${initialData?.id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, { method, body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Something went wrong. Please try again.");
        setSaving(false);
        return;
      }

      router.push("/admin/newsletter");
      router.refresh();
    } catch {
      setError("Something went wrong. Please check your connection and try again.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-2xl flex-col gap-6 pb-16">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          {mode === "create" ? "Upload Newsletter" : "Edit Newsletter"}
        </h1>
        <p className="mt-1 text-sm text-muted-light">
          Add a newsletter PDF to the archive. Visitors can view and download it from the public
          Newsletter page.
        </p>
      </div>

      {error && (
        <p className="rounded-lg border border-flame/30 bg-flame/10 px-4 py-3 text-sm text-flame">
          {error}
        </p>
      )}

      <div className="rounded-2xl border border-black/8 bg-paper p-6">
        <div className="flex flex-col gap-4">
          <Field label="Title">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
              placeholder="Flamestar Market Pulse — Week of August 3, 2026"
            />
          </Field>

          <Field label="Date Published">
            <input
              type="date"
              value={datePublished}
              onChange={(e) => setDatePublished(e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label={mode === "create" ? "PDF File" : "Replace PDF (optional)"}>
            <label
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                handleFile(e.dataTransfer.files?.[0]);
              }}
              className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors ${
                dragOver ? "border-flame/60 bg-flame/5" : "border-black/12 hover:border-black/20"
              }`}
            >
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
              {file ? (
                <>
                  <FileText className="h-6 w-6 text-flame" />
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-ink">{file.name}</p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setFile(null);
                      }}
                      className="flex h-5 w-5 items-center justify-center rounded-full text-ink/40 hover:bg-flame/10 hover:text-flame"
                      aria-label="Remove file"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-light">{(file.size / (1024 * 1024)).toFixed(1)} MB</p>
                </>
              ) : (
                <>
                  <UploadCloud className="h-6 w-6 text-ink/40" />
                  <p className="text-sm text-ink/70">
                    Drag and drop a PDF, or <span className="font-medium text-flame">browse</span>
                  </p>
                  <p className="text-xs text-muted-light">PDF only, up to 25MB</p>
                </>
              )}
            </label>
            {mode === "edit" && !file && (
              <p className="mt-2 text-xs text-muted-light">
                Leave empty to keep the current PDF.{" "}
                <a
                  href={initialData?.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-flame hover:text-flame-deep"
                >
                  View current file
                </a>
              </p>
            )}
          </Field>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-flame px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-flame-deep disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {saving
            ? mode === "create"
              ? "Uploading..."
              : "Saving..."
            : mode === "create"
              ? "Upload Newsletter"
              : "Save Changes"}
        </button>
      </div>
    </form>
  );
}

const inputClass =
  "w-full rounded-xl border border-black/10 bg-paper px-4 py-2.5 text-sm text-ink placeholder:text-muted-dark outline-none transition-colors focus:border-flame/50";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium uppercase tracking-wide text-muted-light">{label}</label>
      {children}
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { UploadCloud, Loader2, X, ImageOff } from "lucide-react";

export function ImageUploadField({
  value,
  onChange,
  placeholder = "Drag and drop an image, or browse",
}: {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [broken, setBroken] = useState(false);

  async function handleFile(file: File | null | undefined) {
    if (!file) return;
    setError(null);

    if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type)) {
      setError("Only JPEG, PNG, WebP, or GIF images are supported.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError("Image must be smaller than 8MB.");
      return;
    }

    setUploading(true);
    setBroken(false);
    const formData = new FormData();
    formData.set("file", file);

    try {
      const res = await fetch("/api/admin/uploads/image", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Upload failed. Please try again.");
        return;
      }
      onChange(data.url);
    } catch {
      setError("Upload failed. Please check your connection and try again.");
    } finally {
      setUploading(false);
    }
  }

  if (value) {
    return (
      <div className="flex flex-col gap-2">
        <div className="relative overflow-hidden rounded-xl border border-black/10 bg-paper-soft">
          {broken ? (
            <div className="flex h-40 w-full items-center justify-center gap-2 text-muted-light">
              <ImageOff className="h-5 w-5" />
              <span className="text-xs">Image failed to load</span>
            </div>
          ) : (
            <div className="relative h-40 w-full">
              <Image
                src={value}
                alt=""
                fill
                className="object-cover"
                sizes="400px"
                onError={() => setBroken(true)}
                unoptimized
              />
            </div>
          )}
          <button
            type="button"
            onClick={() => {
              onChange("");
              setBroken(false);
            }}
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-ink/70 text-paper transition-colors hover:bg-flame"
            aria-label="Remove image"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-ink/50">
              <Loader2 className="h-5 w-5 animate-spin text-paper" />
            </div>
          )}
        </div>
        {error && <p className="text-xs text-flame">{error}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
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
        className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed px-4 py-6 text-center transition-colors ${
          dragOver ? "border-flame/60 bg-flame/5" : "border-black/12 hover:border-black/20"
        }`}
      >
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        {uploading ? (
          <Loader2 className="h-5 w-5 animate-spin text-flame" />
        ) : (
          <UploadCloud className="h-5 w-5 text-ink/40" />
        )}
        <p className="text-xs text-ink/70">
          {uploading ? "Uploading..." : placeholder}
        </p>
      </label>
      {error && <p className="text-xs text-flame">{error}</p>}
    </div>
  );
}
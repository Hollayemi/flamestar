export type ArticleMetaTag = {
  label: string;
  active?: boolean;
};

export type ArticleMetaProps = {
  publishedDate: string;
  tags: ArticleMetaTag[];
  author: string;
  className?: string;
};

export function ArticleMeta({ publishedDate, tags, author, className = "" }: ArticleMetaProps) {
  return (
    <div className={`mx-auto max-w-3xl divide-y divide-black/8 border-y border-black/8 ${className}`}>
      <MetaRow label="Published">
        <span className="text-sm text-ink">{publishedDate}</span>
      </MetaRow>

      <MetaRow label="Tag">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag.label}
              className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide ${
                tag.active ? "bg-signal/10 text-signal" : "bg-paper-soft text-muted-light"
              }`}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </MetaRow>

      <MetaRow label="Author">
        <span className="text-sm text-ink">{author}</span>
      </MetaRow>
    </div>
  );
}

function MetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-light">
        {label}
      </span>
      {children}
    </div>
  );
}

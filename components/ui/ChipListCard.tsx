export type ChipListCardProps = {
  title: string;
  description: string;
  items: string[];
  layout?: "stacked" | "split";
};

export function ChipListCard({ title, description, items, layout = "stacked" }: ChipListCardProps) {
  const chips = (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <span key={item} className="rounded-lg bg-flame/10 px-4 py-3 text-sm text-ink">
          {item}
        </span>
      ))}
    </div>
  );

  if (layout === "split") {
    return (
      <div className="rounded-2xl border border-black/8 p-8 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
          <div>
            <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">{title}</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-light sm:text-base">
              {description}
            </p>
          </div>
          {chips}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-black/8 p-8">
      <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-light">{description}</p>
      <div className="mt-6">{chips}</div>
    </div>
  );
}

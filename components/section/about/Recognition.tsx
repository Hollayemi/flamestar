export type RecognitionItem = {
  name: string;
  caption: string;
};

export type RecognitionProps = {
  title?: string;
  items?: RecognitionItem[];
  className?: string;
};

const defaultItems: RecognitionItem[] = [
  { name: "Forbes", caption: "Forbes: Top RIA Firms: 2025" },
  { name: "Inc.", caption: "Inc. 5000 Fastest-Growing Private Companies 2023" },
  { name: "Reuters", caption: "Top 50 Fastest Growing RIA Firms 2024" },
  { name: "Fortune", caption: "Top 100 RIA Firms 2023, 2021" },
  { name: "Entrepreneur", caption: "Nigeria's Top RIA Firms 2022, 2021" },
  { name: "The National", caption: "Inc. Best Workplaces - Top Financial Services 2022-2025" },
  { name: "Business Insider", caption: "Top Advisory Firms 2024" },
  { name: "MarketWatch", caption: "Top 50 ETF Power Users 2023" },
];

export function Recognition({
  title = "We're honoured to be recognised by some of the most respected names in the industry",
  items = defaultItems,
  className = "",
}: RecognitionProps) {
  return (
    <section className={`mx-auto max-w-7xl px-6 py-20 lg:px-10 ${className}`}>
      <h2 className="max-w-xl font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl">
        {title}
      </h2>

      <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
        {items.map((item) => (
          <div key={item.caption}>
            <p className="font-display text-lg font-semibold text-ink">{item.name}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-light">{item.caption}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

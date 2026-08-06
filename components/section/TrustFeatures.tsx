export type TrustFeatureItem = {
  title: string;
  description: string;
};

export type TrustFeaturesProps = {
  items?: TrustFeatureItem[];
  className?: string;
  total?: number
};

const defaultItems: TrustFeatureItem[] = [
  {
    title: "SEC Regulated",
    description: "Licensed by the Securities and Exchange Commission, Nigeria.",
  },
  {
    title: "Fiduciary Standard",
    description: "A duty of care written into everything we do",
  },
  {
    title: "Asset Classes",
    description: "Fixed income, equities, collectives investments and alternative investments.",
  },
  {
    title: "Fully Transparent",
    description: "Clear reporting on performance, risk, and cost always.",
  },
];

export function TrustFeatures({ items = defaultItems, className = "", total=4 }: TrustFeaturesProps) {
  return (
    <section className={`mx-auto max-w-6xl px-6 lg:px-0 ${className}`}>
      <div className={`grid grid-cols-1 gap-4  border-t border-black/8 sm:grid-cols-2 sm:border-t-0 lg:grid-cols-${total}`}>
        {items.map((item) => (
          <div key={item.title} className="px-0 py-6 first:pl-0 sm:px-8 border-t border-black/8">
            <h3 className="font-mono text-xl font-bold leading-tight text-ink sm:text-2xl">
              {item.title}
            </h3>
            <p className="mt-3 text-xs leading-relaxed text-muted-light">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

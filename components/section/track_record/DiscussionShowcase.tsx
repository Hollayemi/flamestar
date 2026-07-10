import Image from "next/image";
import Link from "next/link";

export type DiscussionPoint = {
  title: string;
  description: string;
  href: string;
};

export type DiscussionShowcaseProps = {
  image?: string;
  lead?: string;
  points?: DiscussionPoint[];
  className?: string;
};

const defaultPoints: DiscussionPoint[] = [
  {
    title: "Consistent Communication",
    description:
      "Regular, plain-language updates so clients always know how their portfolio is performing and why.",
    href: "/insights/news",
  },
  {
    title: "Data-Driven Decisions",
    description:
      "Every recommendation is backed by research, modeling, and a clear view of the risk being taken.",
    href: "/insights/news",
  },
  {
    title: "Long-Term Partnership",
    description:
      "We measure success over years, not quarters, and build strategies designed to compound with our clients.",
    href: "/insights/news",
  },
];

export function DiscussionShowcase({
  image = "/images/track-record-meeting.jpg",
  lead = "Our clients trust us to translate complex market conditions into clear, actionable strategy — sitting down together to align every decision with their long-term goals.",
  points = defaultPoints,
  className = "",
}: DiscussionShowcaseProps) {
  return (
    <section className={`mx-auto max-w-7xl px-6 py-16 lg:px-10 ${className}`}>
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-paper-soft">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1024px) 1200px, 100vw"
          className="object-cover"
        />
      </div>

      <p className="mt-10 max-w-3xl font-display text-xl font-semibold leading-snug text-ink sm:text-2xl">
        {lead}
      </p>

      <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
        {points.map((point) => (
          <div key={point.title}>
            <h3 className="text-sm font-semibold text-ink">{point.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-light">{point.description}</p>
            <Link
              href={point.href}
              className="mt-4 inline-flex items-center rounded-full border border-black/15 px-5 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-ink transition-colors hover:border-black/30"
            >
              Click to Read
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

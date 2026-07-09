import Image from "next/image";

export type MissionVisionProps = {
  missionLabel?: string;
  mission?: string;
  image?: string;
  visionLabel?: string;
  vision?: string;
  className?: string;
};

export function MissionVision({
  missionLabel = "Our Mission",
  mission = "To empower clients with smart, data-driven investment solutions that create sustainable wealth.",
  image = "/images/our-office.jpg",
  visionLabel = "Our Vision",
  vision = "To become a leading investment management firm in Africa, recognized for performance, integrity, and innovation.",
  className = "",
}: MissionVisionProps) {
  return (
    <section className={`mx-auto max-w-7xl px-2 py-10 lg:px-10 ${className}`}>
      <div className="rounded-3xl bg-paper-soft p-3 sm:p-12">
        <div className="md:flex gap-6 items-start">
          <span className="rounded-full border h-8! leading-8! border-black/10 bg-paper px-4  font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-ink/70">
            {missionLabel}
          </span>
          <p className="max-w-2xl font-display text-xl font-semibold leading-snug text-ink sm:text-2xl">
            {mission}
          </p>
        </div>

        <div className="relative mt-10 h-140 w-full md:w-2xl md:ml-40 overflow-hidden rounded-2xl bg-paper">
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1024px) 900px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="md:flex gap-6 items-start">
          <span className="mt-10 inline-block rounded-full border border-black/10 bg-paper px-4 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-ink/70">
            {visionLabel}
          </span>
          <p className="mt-6 max-w-2xl font-display text-xl font-semibold leading-snug text-ink sm:text-2xl">
            {vision}
          </p>
        </div>
      </div>
    </section>
  );
}

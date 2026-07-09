"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TeamMemberCard, type TeamMember } from "@/components/ui/TeamMemberCard";

export type TeamCarouselProps = {
  title: string;
  subtitle: string;
  members: TeamMember[];
  tone?: "flame" | "signal";
  className?: string;
};

export function TeamCarousel({
  title,
  subtitle,
  members,
  tone = "signal",
  className = "",
}: TeamCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    const card = cardRefs.current[index];
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
  }, []);

  // Keep the active index in sync when the person swipes/scrolls the track directly.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const { scrollLeft } = track;
        let closest = 0;
        let closestDistance = Infinity;
        cardRefs.current.forEach((card, index) => {
          if (!card) return;
          const distance = Math.abs(card.offsetLeft - scrollLeft);
          if (distance < closestDistance) {
            closestDistance = distance;
            closest = index;
          }
        });
        setActiveIndex(closest);
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, members.length - 1));
    setActiveIndex(clamped);
    scrollToIndex(clamped);
  };

  const accent = tone === "flame" ? "text-flame" : "text-signal";

  return (
    <section className={`mx-auto max-w-7xl px-6 lg:px-10 ${className}`}>
      <div className="sm:ml-20 md:ml-60">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>
        <p className={`mt-1 max-w-xl text-base sm:text-lg text-orange-400`}>{subtitle}</p>
      </div>
      <div className="mt-10 grid gap-8 lg:grid-cols-[200px_1fr]">
        <ul className="hidden md:flex flex-row gap-5  overflow-x-auto pb-2 lg:flex-col lg:gap-3 lg:overflow-visible lg:pb-0">
          {members.map((member, index) => (
            <li key={member.name} className="shrink-0">
              <button
                type="button"
                onClick={() => goTo(index)}
                className="flex items-center gap-2.5 text-left"
                aria-current={index === activeIndex}
              >
                <span
                  className={`h-2.5 w-2.5 shrink-0 rounded-full border transition-colors ${index === activeIndex ? "border-ink bg-ink" : "border-black/25 bg-transparent"
                    }`}
                />
                <span
                  className={`whitespace-nowrap text-sm transition-colors ${index === activeIndex ? "font-medium text-ink" : "text-muted-light"
                    }`}
                >
                  {member.name}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div>
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {members.map((member, index) => (
              <div
                key={member.name}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[calc((100%-3rem)/3)]"
              >
                <TeamMemberCard {...member} active={index === activeIndex} tone={tone} />
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {members.map((member, index) => (
                <span
                  key={member.name}
                  className={`h-1.5 rounded-full transition-all ${index === activeIndex ? "w-5 bg-ink" : "w-1.5 bg-black/15"
                    }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goTo(activeIndex - 1)}
                disabled={activeIndex === 0}
                aria-label="Previous team member"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/12 text-ink transition-colors hover:border-black/25 disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => goTo(activeIndex + 1)}
                disabled={activeIndex === members.length - 1}
                aria-label="Next team member"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/12 text-ink transition-colors hover:border-black/25 disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    const card = cardRefs.current[index];
    if (!track || !card) return;
    
    setIsScrolling(true);
    
    // Calculate the correct scroll position
    const trackRect = track.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    
    // Calculate how much to scroll to center the card in the viewport
    const scrollOffset = card.offsetLeft - (track.clientWidth / 2) + (card.clientWidth / 2);
    
    track.scrollTo({ 
      left: Math.max(0, scrollOffset), 
      behavior: "smooth" 
    });
    
    // Reset scrolling state after animation completes
    setTimeout(() => {
      setIsScrolling(false);
    }, 500);
  }, []);

  // Keep the active index in sync when the person swipes/scrolls the track directly.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    let timeoutId: any;

    const onScroll = () => {
      // Skip if we're programmatically scrolling
      if (isScrolling) return;
      
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const { scrollLeft } = track;
        const trackWidth = track.clientWidth;
        let closest = 0;
        let closestDistance = Infinity;
        
        cardRefs.current.forEach((card, index) => {
          if (!card) return;
          // Calculate the center of the card relative to the scroll position
          const cardCenter = card.offsetLeft + (card.clientWidth / 2);
          const viewportCenter = scrollLeft + (trackWidth / 2);
          const distance = Math.abs(cardCenter - viewportCenter);
          
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
      clearTimeout(timeoutId);
    };
  }, [isScrolling]);

  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, members.length - 1));
    setActiveIndex(clamped);
    scrollToIndex(clamped);
  }, [members.length, scrollToIndex]);

  const accent = tone === "flame" ? "text-flame" : "text-signal";

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(activeIndex - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(activeIndex + 1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, goTo]);

  return (
    <section className={`mx-auto max-w-7xl px-6 lg:px-10 ${className}`}>
      <div className="sm:ml-20 md:ml-60">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>
        <p className={`mt-1 max-w-xl text-lg sm:text-3xl text-[#EBB7B5]`}>{subtitle}</p>
      </div>
      <div className="mt-10 grid gap-8 lg:grid-cols-[200px_1fr]">
        <ul className="hidden md:flex flex-row gap-5 overflow-x-auto pb-2 lg:flex-col lg:gap-3 lg:overflow-visible lg:pb-0">
          {members.map((member, index) => (
            <li key={member.name} className="shrink-0">
              <button
                type="button"
                onClick={() => goTo(index)}
                className="flex items-center gap-2.5 text-left focus:outline-none"
                aria-current={index === activeIndex}
                onMouseDown={(e) => e.preventDefault()}
              >
                <span
                  className={`h-2.5 w-2.5 shrink-0 rounded-full border transition-colors ${
                    index === activeIndex ? "border-ink bg-ink" : "border-black/25 bg-transparent"
                  }`}
                />
                <span
                  className={`whitespace-nowrap text-sm transition-colors ${
                    index === activeIndex ? "font-medium text-ink" : "text-muted-light"
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
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {members.map((member, index) => (
              <div
                key={member.name}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="w-full shrink-0 snap-start sm:w-[46%] lg:w-[calc((100%-3rem)/3)]"
                style={{ scrollSnapAlign: "start" }}
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
                  className={`h-1.5 rounded-full transition-all ${
                    index === activeIndex ? "w-5 bg-ink" : "w-1.5 bg-black/15"
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
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/12 text-ink transition-colors hover:border-black/25 disabled:opacity-30 focus:outline-none"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => goTo(activeIndex + 1)}
                disabled={activeIndex === members.length - 1}
                aria-label="Next team member"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/12 text-ink transition-colors hover:border-black/25 disabled:opacity-30 focus:outline-none"
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
import { useState, useEffect, useRef } from "react";
import { PillarCard, type PillarCardProps } from "@/components/ui/PillarCard";
import { ChevronLeft, ChevronRight } from "lucide-react"; // or your preferred icon library

export type PillarsProps = {
  eyebrow?: string;
  title?: string;
  pillars?: PillarCardProps[];
  className?: string;
};

const defaultPillars: PillarCardProps[] = [
  {
    number: "01",
    title: "Integrity",
    description:
      "We hold to an uncompromising ethical standard. In every engagement, your interests come first clearly, consistently, and without exception.",
  },
  {
    number: "02",
    title: "Discipline",
    description:
      "We apply a clinical, data-driven approach to every decision, grounded in rigorous research and steadfast risk management.",
  },
  {
    number: "03",
    title: "Excellence",
    description:
      "We pursue the highest standard in everything we do, delivering sophisticated strategies executed with precision and care.",
  },
  {
    number: "04",
    title: "Transparency",
    description:
      "We communicate openly and report honestly on performance, on risk, and on cost, so you always know exactly where you stand.",
  },
  {
    number: "05",
    title: "Client-Centricity",
    description:
      "We operate as a dedicated fiduciary. Every strategy is engineered around your specific objectives, never a one-size-fits-all product.",
  },
];

export function Pillars({
  eyebrow = "Our Core Values",
  title = "The Pillars of Our Fiduciary Standard",
  pillars = defaultPillars,
  className = "",
}: PillarsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [firstRow, secondRow] = [pillars.slice(0, 3), pillars.slice(3)];
  const allPillars = [...firstRow, ...secondRow];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % allPillars.length);
      }, 4000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isMobile, allPillars.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % allPillars.length);
      }, 4000);
    }
  };

  const goToPrev = () => {
    goToSlide((currentIndex - 1 + allPillars.length) % allPillars.length);
  };

  const goToNext = () => {
    goToSlide((currentIndex + 1) % allPillars.length);
  };

  return (
    <section className={`relative overflow-hidden ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-90 w-175 -translate-x-1/2 translate-y-4/5 rounded-full bg-flame/7 blur-[120px]"
      />
      <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="flex flex-col items-center text-center">
          <span className="rounded-full border border-black/10 bg-paper px-4 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-ink/70">
            {eyebrow}
          </span>
          <h2 className="mt-6 font-display text-2xl font-semibold text-ink sm:text-3xl">
            {title}
          </h2>
        </div>

        {/* Desktop grid view */}
        <div className="mt-14 hidden grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:grid">
          {firstRow.map((pillar) => (
            <PillarCard key={pillar.number} {...pillar} />
          ))}
        </div>

        {secondRow.length > 0 && (
          <div className="mt-6 hidden grid-cols-1 gap-6 sm:grid-cols-2 sm:grid">
            {secondRow.map((pillar) => (
              <PillarCard key={pillar.number} {...pillar} />
            ))}
          </div>
        )}

        {/* Mobile slider view */}
        <div className="mt-10 sm:hidden">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {allPillars.map((pillar) => (
                <div key={pillar.number} className="w-full shrink-0 px-2">
                  <PillarCard {...pillar} />
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-between gap-4">


            <div className="flex gap-2 items-center">
              {allPillars.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${index === currentIndex
                      ? "w-6 bg-flame"
                      : "bg-ink/20 hover:bg-ink/40"
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                onClick={goToPrev}
                className="rounded-full border border-ink/20 p-2 transition-colors hover:bg-ink/5"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5 text-ink/70" />
              </button>
              <button
                onClick={goToNext}
                className="rounded-full border border-ink/20 p-2 transition-colors hover:bg-ink/5"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5 text-ink/70" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
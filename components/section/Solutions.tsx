import { useState, useEffect, useRef } from "react";
import { Database, Globe, Landmark, ChevronLeft, ChevronRight } from "lucide-react";
import { SolutionCard, type SolutionCardProps } from "@/components/ui/SolutionCard";

export type SolutionsProps = {
  title?: string;
  description?: string;
  solutions?: SolutionCardProps[];
  className?: string;
};

const defaultSolutions: SolutionCardProps[] = [
  {
    icon: Globe,
    title: "Investment Solutions",
    description:
      "Custom-engineered portfolios designed to align global asset allocation with your specific risk-return objectives.",
    ctaLabel: "Explore Investment Solutions",
    href: "/strategies",
  },
  {
    icon: Database,
    title: "Funds & Investment Schemes",
    description:
      "Professional investment vehicles providing streamlined access to institutional-grade diversification and high-conviction market segments.",
    ctaLabel: "Explore Funds & Investment Schemes",
    href: "/strategies/funds",
  },
  {
    icon: Landmark,
    title: "Advisory & Capital Solutions",
    description:
      "Strategic counsel and bespoke financing structures designed to optimize balance sheets and facilitate complex financial maneuvers.",
    ctaLabel: "Explore Advisory & Capital Solutions",
    href: "/advisory",
  },
];

export function Solutions({
  title = "Engineered Solutions for Capital Growth and Risk Mitigation",
  description = "Our investment strategies are designed to navigate the complexities of global markets, providing a structured approach to asset appreciation through technical precision and institutional rigor.",
  solutions = defaultSolutions,
  className = "",
}: SolutionsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

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
        setCurrentIndex((prev) => (prev + 1) % solutions.length);
      }, 4000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isMobile, solutions.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % solutions.length);
      }, 4000);
    }
  };

  const goToPrev = () => {
    goToSlide((currentIndex - 1 + solutions.length) % solutions.length);
  };

  const goToNext = () => {
    goToSlide((currentIndex + 1) % solutions.length);
  };

  return (
    <section className={`mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28 ${className}`}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-light sm:text-base">
          {description}
        </p>
      </div>

      {/* Desktop grid view */}
      <div className="mt-14 hidden grid-cols-1 gap-6 sm:grid sm:grid-cols-3">
        {solutions.map((solution) => (
          <SolutionCard key={solution.title} {...solution} />
        ))}
      </div>

      {/* Mobile slider view */}
      <div className="mt-10 sm:hidden">
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {solutions.map((solution) => (
              <div key={solution.title} className="w-full flex-shrink-0 px-2">
                <SolutionCard {...solution} />
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-6 flex items-center justify-between gap-4">


          <div className="flex gap-2">
            {solutions.map((_, index) => (
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
          <div className="flex items-center justify-center gap-4">
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
    </section>
  );
}
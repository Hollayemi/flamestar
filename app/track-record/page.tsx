import { HomeWrapper } from "@/components/wrapper";
import { Hero } from "@/components/section/Hero";
import { TrackRecordOverview } from "@/components/section/track_record/TrackRecordOverview";
import { PerformanceCharts } from "@/components/section/track_record/PerformanceCharts";
import { CaseStudies } from "@/components/section/track_record/CaseStudies";
import { DiscussionShowcase } from "@/components/section/track_record/DiscussionShowcase";

export default function TrackRecordPage() {
  return (
    <HomeWrapper>
      <Hero
        eyebrow="Track Record"
        title="Delivering Measurable Investment Performance"
        backgroundImage="/images/track-record.webp"
        size="tall"
        className="mt-4 lg:mt-2"
      />

      <TrackRecordOverview />
      <PerformanceCharts />
      <CaseStudies />
      <DiscussionShowcase />

      <Hero
        title="Partner with a company that prioritizes capital preservation and strategic growth."
        primaryCta={{ label: "Invest Now", href: "/contact" }}
        size="compact"
        className="my-16 lg:my-20"
      />
    </HomeWrapper>
  );
}

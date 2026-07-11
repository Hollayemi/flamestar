import { Award } from "lucide-react";
import { HomeWrapper } from "@/components/wrapper";
import { Hero } from "@/components/section/Hero";
import { TrackRecordOverview } from "@/components/section/track_record/TrackRecordOverview";
import { CaseStudies } from "@/components/section/track_record/CaseStudies";
import { TrustSignals } from "@/components/ui/TrustSignals";

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
      <CaseStudies />

      <TrustSignals
        signals={[
          { label: "Registered & Regulated by SEC Nigeria", image: "/images/sec.png" },
          { label: "Transparent reporting" },
          { label: "Risk-managed investment approach" },
        ]}
      />

      <Hero
        title="Partner with a company that prioritizes capital preservation and strategic growth."
        primaryCta={{ label: "Invest Now", href: "/contact" }}
        size="compact"
        className="my-16 lg:my-20"
      />
    </HomeWrapper>
  );
}

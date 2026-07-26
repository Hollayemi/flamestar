import { HomeWrapper } from "@/components/wrapper";
import { Hero, CallToAction } from "@/components/section/Hero";
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

      <CallToAction className="my-16 lg:my-20" />
    </HomeWrapper>
  );
}

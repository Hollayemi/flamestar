"use client"

import { HomeWrapper } from "@/components/wrapper";
import { Hero, CallToAction } from "@/components/section/Hero";
import { Pillars } from "@/components/section/Pillars";
import { Solutions } from "@/components/section/Solutions";
import { Leadership } from "@/components/section/Leadership";
import { TrustSignals } from "@/components/ui/TrustSignals";
import { useConsultation } from "@/lib/consultation-context";
import { TrackFoundation } from "@/components/section/TrackFoundation";
import { TrustFeatures } from "@/components/section/TrustFeatures";

export default function Home() {
  const { open } = useConsultation()
  return (
    <HomeWrapper>
      <Hero
        title="Empowering Your Financial Future Through Strategic Investment Management"
        description="Flamestar Capital is an SEC registered and regulated investment management firm built on transparency, discipline, and fiduciary care. We design considered strategies across fixed income, equities, and alternative investments to help you preserve capital and pursue consistent, long term growth."
        primaryCta={{ label: "SCHEDULE A CONSULTATION", href: "/contact", action: open }}
        secondaryCta={{ label: "Download Investor Brochure", href: "/brochure.pdf" }}
        backgroundImage="/images/bg.png"
        size="tall"
      />

      <div className="bg-white py-12">
        <div className="flex flex-col w-full md:flex-row justify-between">
          <p className="text-lg w-full text-gray-800 mb-8 px-8">
            We are a new generation of investment manager — and we believe that is a strength. Built for the way today's
            investors want to be served, Flamestar Capital pairs rigorous, data-driven analysis with a genuine fiduciary
            commitment, your interests, first and always. Whether you are an individual building lasting wealth, a corporate
            treasury seeking stability, or an institution pursuing risk adjusted returns, we partner with you with clarity,
            discipline, and complete transparency.
           </p>

        </div>
      </div>

      <TrustFeatures />

      <Pillars />
      <Solutions />
      <TrackFoundation />
      <Leadership />
      <CallToAction className="my-16 lg:my-20" />
      <TrustSignals
        signals={[
          { label: "Registered & Regulated by SEC Nigeria", image: "/images/sec.png" },
          { label: "Transparent reporting" },
          { label: "Risk-managed investment approach" },
        ]}
      />
    </HomeWrapper>
  );
}

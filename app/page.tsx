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

      <div className="bg-white max-w-7xl mx-auto py-12 px-6">
        <div className="flex flex-col w-full md:flex-row justify-between">
          <p className="text-lg w-full md:w-3/5 md:pr-20 text-gray-800 mb-8">
            We are your trusted partner on your financial journey. We specialize in providing tailored investment solutions designed to help you achieve your goals, and grow your wealth.
          </p>

          <div className="flex items-start w-full md:w-2/5 gap-5 lg:gap-8">
            <div className="w-1/3">
              <div className="text-2xl font-bold text-gray-900">$10.8B</div>
              <div className="text-sm text-gray-500">Assets Under Management</div>
            </div>
            <div className="w-1/3">
              <div className="text-2xl font-bold text-gray-900">2 Years</div>
              <div className="text-sm text-gray-500">Years in Service</div>
            </div>
            <div className="w-1/3">
              <div className="text-2xl font-bold text-gray-900">97%</div>
              <div className="text-sm text-gray-500">Retention Rate</div>
            </div>
          </div>
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

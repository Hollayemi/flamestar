"use client"

import { HomeWrapper } from "@/components/wrapper";
import { Hero } from "@/components/section/Hero";
import { Pillars } from "@/components/section/Pillars";
import { Solutions } from "@/components/section/Solutions";
import { TrackRecord } from "@/components/section/TrackRecord";
import { Leadership } from "@/components/section/Leadership";

export default function Home() {
  return (
    <HomeWrapper>
      <Hero
        eyebrow="Flamestar Capital"
        title="Empowering your financial future through strategic asset management."
        description="We provide disciplined, data-driven investment strategies across fixed income, equities, and alternative investments designed to preserve capital and deliver consistent returns."
        primaryCta={{ label: "Invest With Us", href: "/contact" }}
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
      <Pillars />
      <Solutions />
      <TrackRecord />
      <Leadership />
      <Hero
        title="Partner with a company that prioritizes capital preservation and strategic growth."
        primaryCta={{ label: "Invest Now", href: "/contact" }}
        size="compact"
        className="mx-6 my-20 lg:mx-10"
      />
    </HomeWrapper>
  );
}

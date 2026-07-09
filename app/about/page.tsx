import type { TeamMember } from "@/components/ui/TeamMemberCard";
import { HomeWrapper } from "@/components/wrapper";
import { Hero } from "@/components/section/Hero";
import { AboutIntro } from "@/components/section/about/AboutIntro";
import { MissionVision } from "@/components/section/about/MissionVision";
import { TeamCarousel } from "@/components/section/about/TeamCarousel";
import { Recognition } from "@/components/section/about/Recognition";

const leadershipTeam: TeamMember[] = [
  { name: "Randy Theophilus", role: "Chairman, Flamestar Capital", photo: "/images/user1.png" },
  { name: "Yetunde Rachael", role: "Head of Finance", photo: "/images/user2.png" },
  { name: "Badmus Adebayo", role: "Head of Innovation", photo: "/images/user3.png" },
  { name: "Mohammed Jimoh", role: "Head of Strategy", photo: "/images/user4.png" },
  { name: "Favor Nonso", role: "Head of Operations", photo: "/images/user5.png" },
];

const engineroomTeam: TeamMember[] = [
  { name: "Randy Theophilus", role: "R&D Manager", photo: "/images/user6.png" },
  { name: "Yetunde Rachael", role: "Compliance Officer", photo: "/images/user5.png" },
  { name: "Badmus Adebayo", role: "Product Manager", photo: "/images/user4.png" },
  { name: "Mohammed Jimoh", role: "Engineer", photo: "/images/user3.png" },
  { name: "Favor Nonso", role: "Designer", photo: "/images/user2.png" },
  { name: "Dada Joshua", role: "Engineer", photo: "/images/user1.png" },
  { name: "Anu Alabi", role: "Analyst", photo: "/images/user6.png" },
  { name: "Gbenga Ahmed", role: "Support Lead", photo: "/images/user5.png" },
];

export default function AboutPage() {
  return (
    <HomeWrapper>
      <Hero
        eyebrow="About Us"
        title="A New Standard in Africa for Fund/Portfolio and Asset Management"
        description="Flamestar Capital Ltd is an investment management company focused on delivering sustainable wealth solutions. We combine local market intelligence with global investment principles to help clients grow and preserve capital."
        backgroundImage="/images/about-zuma-rock.webp"
        imageCredit="Zuma Rock, Abuja, Nigeria. Image Courtesy of iStockphoto & Lingbeek"
        size="tall"
        className="mt-4 lg:mt-2"
      />

      <AboutIntro />
      <MissionVision />

      <div className="mx-auto flex max-w-7xl justify-center px-6 pt-10 lg:px-10">
        <span className="rounded-full border border-black/10 bg-paper px-4 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-ink/70">
          Meet The Team
        </span>
      </div>

      <TeamCarousel
        title="Leadership"
        subtitle="Ownership is the job at every level"
        members={leadershipTeam}
        tone="signal"
        className="mt-10 py-10"
      />

      <TeamCarousel
        title="Engineroom"
        subtitle="The amazing people keeping the boat running and making our clients happy"
        members={engineroomTeam}
        tone="flame"
        className="py-10"
      />

      <Recognition className="border-t border-black/8" />

      <Hero
        title="Partner with a company that prioritizes capital preservation and strategic growth."
        primaryCta={{ label: "Invest Now", href: "/contact" }}
        size="compact"
        className="my-16 lg:my-20"
      />
    </HomeWrapper>
  );
}

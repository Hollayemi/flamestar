import type { TeamMember } from "@/components/ui/TeamMemberCard";
import { HomeWrapper } from "@/components/wrapper";
import { Hero, CallToAction } from "@/components/section/Hero";
import { AboutIntro } from "@/components/section/about/AboutIntro";
import { MissionVision } from "@/components/section/about/MissionVision";
import { TeamCarousel } from "@/components/section/about/TeamCarousel";
import { TrustSignals } from "@/components/ui/TrustSignals";
import { TrustFeatureItem, TrustFeatures } from "@/components/section/TrustFeatures";
import Image from "next/image";


const leadershipTeam: TeamMember[] = [
  {
    name: "Yahaya Blessing Batare",
    role: "Chief Executive Officer",
    photo: "/images/ceo-portrait.png",
    bio: "Yahaya Blessing Batare is a performance driven finance executive with two decades experience across leading financial institutions, she has held senior positions in Treasury, Business Development, and Portfolio management. Known for her strategic vision, disciplined risk management, and unwavering integrity, she combines sharp financial acumen with a deep commitment to building businesses and creating value for clients and the wider public, a dependable, results-oriented leader trusted to deliver.",
  },
  {
    name: "Olushola Adegbite",
    role: "CHIEF FINANCE OFFICER",
    photo: "/images/olusola.png",
    bio: "Olushola Adegbite is  a Fellow of the Institute of Chartered Accountants of Nigeria (FCA) with over twenty-two years’ experience across financial management, internal audit, risk, and investment management, he has served as CFO and Head of Risk & Control at Resort Securities & Trust and built the internal audit and compliance function at St. Nicholas Hospital. IFRS-certified and a fellow across accounting and internal auditing bodies, he brings disciplined, principled leadership to safeguarding capital and driving sustainable value, a finance executive widely regarded as one of the best in his craft.",
  },
  {
    name: "Abiola Olayinka Alake",
    role: "CHIEF COMPLIANCE OFFICER",
    photo: "/images/alake.png",
    bio: "Abiola Olayinka Alake has nearly two decades experience in the Nigerian capital market, she has served as Chief Compliance Officer and Compliance Officer across several capital market firms, leading KYC/KYE due diligence, anti-money laundering controls, compliance audits, and regulatory reporting to the SEC and NGX. A registered SEC Sponsored Individual with a Bachelor of Science in Accounting, she is a meticulous, principled, and grounded professional dedicated to protecting clients, upholding regulatory standards, and safeguarding the integrity of every firm she serves.",
  },
  {
    name: "Faith Ozegbe",
    role: "HEAD PEOPLE OPERATIONS",
    photo: "/images/faith.png",
    bio: "Faith Ozegbe is a thoroughbred HR generalist with years’ of progressive experience across the full employee lifecycle, she has delivered recruitment, onboarding, employee relations, and HR operations support at The Concept Group and Medicano Resources, and holds a B.Sc. (Upper Division) from Delta State University. Recognised for her integrity, confidentiality, and commitment to a positive employee experience, and known for driving measurable efficiency gains, she is building the culture and systems that help Flamestar Capital attract, develop, and retain exceptional talent.",
  },
];

// const engineroomTeam: TeamMember[] = [
//   {
//     name: "Randy Theophilus",
//     role: "R&D Manager",
//     photo: "/images/user6.png",
//     bio: "Randy leads research and development for Flamestar's investment tools, testing new approaches to risk modeling and portfolio construction before they reach client accounts.",
//   },
//   {
//     name: "Yetunde Rachael",
//     role: "Compliance Officer",
//     photo: "/images/user5.png",
//     bio: "Yetunde keeps Flamestar aligned with SEC Nigeria's regulatory requirements, safeguarding the integrity of the firm's investment process and client reporting.",
//   },
//   {
//     name: "Badmus Adebayo",
//     role: "Product Manager",
//     photo: "/images/user4.png",
//     bio: "Badmus manages the roadmap for Flamestar's client-facing tools, working closely with the investment team to turn complex portfolio data into clear, actionable reporting.",
//   },
//   {
//     name: "Mohammed Jimoh",
//     role: "Engineer",
//     photo: "/images/user3.png",
//     bio: "Mohammed builds and maintains the systems that power Flamestar's portfolio monitoring and reporting infrastructure.",
//   },
//   {
//     name: "Favor Nonso",
//     role: "Designer",
//     photo: "/images/user2.png",
//     bio: "Favor shapes the way clients experience Flamestar's digital tools, designing clear, trustworthy interfaces for a complex financial product.",
//   },
//   {
//     name: "Dada Joshua",
//     role: "Engineer",
//     photo: "/images/user1.png",
//     bio: "Dada works across Flamestar's engineering stack, focused on the reliability and security of the systems clients depend on.",
//   },
//   {
//     name: "Anu Alabi",
//     role: "Analyst",
//     photo: "/images/user6.png",
//     bio: "Anu supports the investment team with data analysis and research, helping translate market signals into actionable portfolio insights.",
//   },
//   {
//     name: "Gbenga Ahmed",
//     role: "Support Lead",
//     photo: "/images/user5.png",
//     bio: "Gbenga leads client support at Flamestar, making sure every enquiry is met with clarity, care, and a fast response.",
//   },
// ];


export default function AboutPage() {
  const defaultItems: TrustFeatureItem[] = [
    {
      title: "SEC Regulated",
      description: "Licensed by the Securities and Exchange Commission, Nigeria.",
    },
    {
      title: "Asset Classes",
      description: "Fixed income, equities, collectives investments and alternative investments.",
    },
    {
      title: "Fiduciary Standard",
      description: "A duty of care written into everything we do",
    },
  ];
  return (
    <HomeWrapper>
      <Hero
        eyebrow="About Us"
        title="A New Standard in Africa for Fund/Portfolio and Asset Management"
        description="Flamestar Capital Ltd is an investment management company focused on delivering sustainable wealth solutions. We combine local market intelligence with global investment principles to help clients grow and preserve capital."
        backgroundImage="/images/about-zuma-rock.webp"
        imageCredit={["Zuma Rock, Abuja, Nigeria.", "Image Courtesy of iStockphoto & Lingbeek"]}
        size="tall"
      />

      <AboutIntro />

      <TrustFeatures items={defaultItems} total={3} />

      <MissionVision />

      <div className="mx-auto flex max-w-7xl justify-center px-6 pt-10 lg:px-10">
        <span className="rounded-full border border-black/10 bg-paper px-4 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-ink/70">
          Meet The Team
        </span>
      </div>

      <TeamCarousel
        title="Leadership"
        subtitle="Experienced, accountable, and personally invested in your success."
        members={leadershipTeam}
        tone="signal"
        className="mt-10 py-10"
      />
{/* 
      <TeamCarousel
        title="Engineroom"
        subtitle="The amazing people keeping the boat running and making our clients happy"
        members={engineroomTeam}
        tone="flame"
        className="py-10"
      /> */}


      <section className={`mx-auto max-w-7xl px-6 py-20 lg:px-10`}>
        <div className="flex flex-col md:flex-row items-center justify-evenly">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl mb-4">Held to institutional standards</h2>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-light sm:text-base">
              We operate to institutional standards of governance, compliance, and reporting. Flamestar Capital is registered and regulated by the Securities and Exchange Commission of Nigeria, and we maintain rigorous internal controls designed to protect our clients and their capital. As we grow, we will let our results and our client relationships speak for us.
            </p>
          </div>
          <Image src="/images/Award badge.png" alt="Award badge" width={900} height={900} className="w-60" />
        </div>
      </section>

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

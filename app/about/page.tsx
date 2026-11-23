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
    photo: "/images/team/member.webp",
    bio: "Blessing Yahaya is a seasoned financial services professional and business development executive with over 20 years of managerial experience across wealth management, investment services, financial advisory, leasing, retail finance, sales and marketing. She has held key leadership positions at reputable institutions, including Head of Wealth Management at Rosabon Financial Services and Head of Retail and Business Development at Sovereign Finance, with earlier roles at Royal Exchange Finance Company and DEAP Capital Management & Trust Plc. She holds an MSc in Marketing and Sales from Rome Business School, Italy, and a BSc in Chemistry from Adekunle Ajasin University, and is a member of the Chartered Institute of Personnel Management and the Portfolio and Debt Management Institute. Her leadership philosophy is anchored in sustainable growth, customer satisfaction, operational excellence, and the development of high-performing teams.",
  },
  {
    name: "Olushola Adegbite",
    role: "Chief Financial Officer",
    photo: "/images/team/adegbite.jpeg",
    bio: "Olushola Adegbite is a finance and governance executive with over 25 years of experience at the intersection of financial management, corporate governance, internal audit, risk management, and business strategy, spanning financial services, healthcare, telecommunications, and construction. His career began at Resort Securities & Trust Limited, where he rose from Head of Finance and Administration to Chief Financial Officer and also served as Acting Head of Risk and Control. He has since held senior roles at St. Nicholas Hospital, FiberOne Broadband, Dipote Nigeria Limited (Executive Director, Finance and Projects), and Kinlend Financial Services Limited (Managing Director). A Fellow of the Institute of Chartered Accountants of Nigeria (FCA) and the West African Association of Internal Auditors (FWAIA), he is also a Certified Forensic Auditor and Certified IFRS Practitioner. He holds a BSc in Accounting and an MBA in Operations Research from Obafemi Awolowo University, and has served on the Statutory Audit Committee of a publicly listed company and as Deputy Vice Chairman of ICAN, Lagos and District Society.",
  },
  {
    name: "Abiola Olayinka Alake",
    role: "Chief Compliance Officer",
    photo: "/images/team/member2.webp",
    bio: "Abiola Alake is a compliance professional with experience across financial services and capital market operations, combining a background in accounting, business development, and regulatory compliance. She has served as Chief Compliance Officer at Brook Securities Limited and as Compliance Officer at Forthright Securities and Investments and Century Securities, where she began her career as an Accounts Officer and Marketing Executive. Her expertise includes SEC and NGX compliance requirements, as well as Anti-Money Laundering and Combating the Financing of Terrorism (AML/CFT) compliance. She holds a BSc in Accounting from Adekunle Ajasin University, Ondo State, and an OND in Financial Studies from Osun State, and is a member of the Chartered Institute of Stockbrokers and the Chief Compliance Officers of Capital Market Operators in Nigeria.",
  },
  {
    name: "Remilekun Awosanya",
    role: "Head of Operations",
    photo: "/images/team/awosanya.jpeg", // TODO: add photo
    bio: "Remilekun Awosanya is an experienced investment and capital market operations professional with over 10 years of progressive experience in the Nigerian financial services industry, spanning investment operations, portfolio administration, fund management support, capital market transactions, regulatory compliance, client relationship management, and business development. Prior to joining Flamestar Capital Limited, he held senior operational and investment management positions at RichGreen Master's Capital Limited, The Brook Securities Limited, and Anchoria Investment & Securities Limited, and began his career at Lambeth Capital Limited. He has sound knowledge of the Nigerian capital market regulatory environment, with practical experience in SEC, NGX, CSCS, and FMAN operational frameworks. He holds an MBA from Ladoke Akintola University of Technology, a BSc in Business Administration from the University of Lagos, and an OND in Estate Management from the Federal Polytechnic Ilaro, alongside certifications in Six Sigma White Belt, Lean Project Management, Lean Fundamentals, and AI and Workspace Automation.",
  },
  {
    name: "Ismail Ayodeji Lawal",
    role: "Head, Wealth Management",
    photo: "/images/team/lawal.jpeg", // TODO: add photo
    bio: "Ismail Lawal is an elite wealth management executive and capital markets strategist with over 20 years of high-impact expertise across asset management, corporate treasury operations, and institutional trading. As Head of Wealth Management at Flamestar Capital Ltd, he supports clients with structured investment solutions and long-term wealth planning. He is an Authorized Dealing Clerk (ADC) of the Nigerian Exchange Limited (NGX) and an Associate Member of the Chartered Institute of Stockbrokers (CIS). Prior to Flamestar, he served as Business Manager at Optiva Capital Partners Ltd and held multi-tiered leadership roles at MBC Securities Limited, where he headed Business Development & Sales and Operations and supervised a fixed-income treasury portfolio exceeding N5 billion. He holds an MSc in Marketing & Communications from Rome Business School, Italy, an MBA in Financial Management from Lagos State University, and an HND in Accountancy from Rufus Giwa Polytechnic, Owo.",
  },
  {
    name: "Faith Ozegbe",
    role: "Head, People Operations",
    photo: "/images/team/member3.webp",
    bio: "Faith Ozegbe is a People Operations professional with experience spanning human resource management, employee relations, talent acquisition, and business administration. Her approach is centered on developing effective people practices, strengthening workforce capabilities, and aligning HR initiatives with business objectives to support a productive, engaged, and high-performing workforce. She has served as HR Admin/Employee Relations Executive at The Concept Group and HR Officer at Medicano Resources Limited, gaining practical insight into the connection between effective people management, operational efficiency, and business performance. She holds a BSc in Human Anatomy from Delta State University, Abraka, Nigeria.",
  },
];

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

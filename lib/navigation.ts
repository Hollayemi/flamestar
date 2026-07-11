export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = {
  label: string;
  href?: string;
  items?: NavLink[];
};

export const primaryNav: NavItem[] = [
  {
    label: "Our Firm",
    items: [
      { label: "About Us", href: "/about", description: "Info about our firm and what drives us" },
      { label: "Track Record", href: "/track-record", description: "Our Impact and what makes us special to investors" },
    ],
  },
  {
    label: "Strategies",
    items: [
      { label: "Our Funds", href: "/our-fund", description: "Analytical framework guiding our capital decisions" },
      { label: "Investment Strategy", href: "/strategy", description: "Institutional-grade vehicles built for strategic growth" },
    ],
  },
  {
    label: "Insights",
    items: [
      { label: "Market Insight", href: "/market-insights", description: "Macroeconomic analysis and proprietary research" },
      { label: "Investor Relation", href: "/investor-relation", description: "Portfolio reporting, resources, and onboarding portals" },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export const footerLinks: NavLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Investment Strategy", href: "/strategy" },
  { label: "Contact Us", href: "/contact" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export const companyInfo = {
  name: "Flamestar Capital Ltd",
  addressLines: ["9A Oki Lane, Mende,", "Maryland, Lagos State"],
  phone: "(801) 123 456 1289",
};

export const socialLinks = [
  { label: "X", href: "https://x.com/flamestarcapital" },
  { label: "Instagram", href: "https://instagram.com/flamestarcapital" },
  { label: "LinkedIn", href: "https://linkedin.com/company/flamestarcapital" },
  { label: "YouTube", href: "https://youtube.com/@flamestarcapital" },
] as const;

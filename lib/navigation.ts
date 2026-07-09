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
      { label: "Track Record", href: "/about/team", description: "Our Impact and what makes us special to investors" },
    ],
  },
  {
    label: "Strategies",
    items: [
      { label: "Fixed Income", href: "/strategies/fixed-income", description: "Capital preservation, steady yield" },
      { label: "Equities", href: "/strategies/equities", description: "Long-term growth across markets" },
      { label: "Alternative Investments", href: "/strategies/alternatives", description: "Diversified, uncorrelated returns" },
    ],
  },
  {
    label: "Insights",
    items: [
      { label: "Market Reports", href: "/insights/reports", description: "In-depth analysis, quarterly" },
      { label: "News", href: "/insights/news", description: "Announcements and firm updates" },
      { label: "Newsletter", href: "/insights/newsletter", description: "Curated insights in your inbox" },
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
  { label: "Investment Strategy", href: "/strategies" },
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

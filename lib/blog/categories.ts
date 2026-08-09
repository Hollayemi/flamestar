// Shared between the admin composer (dropdown) and the public market-insights
// page (section titles + descriptions). Falls back gracefully for any custom
// category typed in the admin panel that isn't in this list.
export const BLOG_CATEGORIES: { title: string; description: string }[] = [
  {
    title: "Market Outlook",
    description:
      "Comprehensive analysis of economic trends, interest rates, inflation, and market movements shaping investment opportunities.",
  },
  {
    title: "Investment Strategies",
    description: "Deep dives into portfolio structuring, asset allocation, and wealth-building approaches.",
  },
  {
    title: "Real Estate Insights",
    description: "Expert perspectives on property investments, market trends, and high-yield opportunities.",
  },
  {
    title: "Wealth & Financial Planning",
    description: "Guidance on wealth preservation, financial growth, and legacy planning.",
  },
  {
    title: "Flamestar Reports",
    description: "Exclusive reports and proprietary insights from Flamestar Capital.",
  },
];

export function categoryDescription(title: string) {
  return BLOG_CATEGORIES.find((c) => c.title === title)?.description ?? "";
}

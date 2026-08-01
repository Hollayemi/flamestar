import type { InsightArticle } from "@/components/ui/InsightCard";

type CategoryArticle = InsightArticle & {
    content?: Array<{ type: "heading" | "paragraph"; text: string }>;
};

export const dateAndReadTime = { date: "02/10/2025", readTime: "3 mins read" };
export const categories: { title: string; description: string; articles: CategoryArticle[]; hide?: boolean }[] = [
    {
        title: "Market Outlook",
        description: "Comprehensive analysis of economic trends, interest rates, inflation, and market movements shaping investment opportunities.",
        articles: [
            { title: "Nigerian Economic Outlook (Quarterly)", href: "/market-insights/insight", ...dateAndReadTime },
            {
                title: "Interest Rate Trends & Fixed Income Opportunities",
                href: "/market-insights/insight",
                ...dateAndReadTime,
            },
            { title: "Inflation Impact on Investment Portfolios", href: "/market-insights/insight", ...dateAndReadTime },
        ],
        hide: true,
    },
    {
        title: "Investment Strategies",
        description:
            "Deep dives into portfolio structuring, asset allocation, and wealth-building approaches.",
        articles: [
            {
                title: "How to Build a Diversified Investment Portfolio",
                href: "/market-insights/insight",
                ...dateAndReadTime,
            },
            {
                title: "Fixed Income vs Equities: Where Should You Invest?",
                href: "/market-insights/insight",
                ...dateAndReadTime,
            },
            {
                title: "Risk Management Strategies for Long-Term Investors",
                href: "/market-insights/insight",
                ...dateAndReadTime,
            },
        ],
        hide: true,
    },
    {
        title: "Real Estate Insights",
        description:
            "Expert perspectives on property investments, market trends, and high-yield opportunities.",
        articles: [
            {
                title: "Real Estate Investment Opportunities in Lagos",
                href: "/market-insights/insight",
                ...dateAndReadTime,
            },
            {
                title: "Off-Plan vs Completed Properties: Which is Better?",
                href: "/market-insights/insight",
                ...dateAndReadTime,
            },
            {
                title: "Maximizing ROI in Residential Developments",
                href: "/market-insights/insight",
                ...dateAndReadTime,
            },
        ],
        hide: true,
    },
    {
        title: "Wealth & Financial Planning",
        description: "Guidance on wealth preservation, financial growth, and legacy planning.",
        articles: [
            { title: "How HNWIs Structure Their Wealth", href: "/market-insights/insight", ...dateAndReadTime },
            { title: "Building Generational Wealth in Nigeria", href: "/market-insights/insight", ...dateAndReadTime },
            {
                title: "Smart Investment Habits for Long-Term Success",
                href: "/market-insights/insight",
                ...dateAndReadTime,
            },
        ],
        hide: true,
    },
    {
        title: "Flamestar Reports",
        description: "Exclusive reports and proprietary insights from Flamestar Capital.",
        articles: [
            {
                title: "Building Wealth with Discipline: Why Process Beats Prediction",
                href: "/market-insights/building-wealth-with-discipline",
                ...dateAndReadTime,
                content: [
                {type: "heading", text: "Markets are unpredictable; a good process is not. Here is why we trust discipline over forecasts."},
                {type: "paragraph", text: "No one can reliably predict where markets will go next quarter, and any manager who claims otherwise deserves a healthy dose of skepticism. What can be controlled is process, how capital is allocated, how risk is measured, and how decisions are made when emotions run high. At Flamestar Capital, we believe long-term wealth is built not by chasing predictions, but by applying a disciplined, repeatable framework through every market cycle. In this piece, we outline the principles that guide every portfolio we manage…"}
                ]
            },
            {
                title: "The Nigerian Investment Landscape: Where We See Opportunity",
                href: "/market-insights/the-nigerian-investment-landscape",
                ...dateAndReadTime,
                content: [
                {type: "heading", text: "A grounded look at the risks and opportunities shaping Nigerian markets today."},
                {type: "paragraph", text: "Nigeria's markets reward those who understand them and punish those who do not. Between fixed-income yields, a maturing equities market, and a growing set of alternative opportunities, there is real value to be found, but only with careful selection and disciplined risk management. In this article, we share how we read the current environment and where we believe patient, well-structured capital can work hardest…"}
                ]
            },
            {
                title: "Understanding Risk: How We Protect Your Capital",
                href: "/market-insights/understanding-risk", ...dateAndReadTime,
                content: [
                {type: "heading", text: "Return matters - but not before risk. A plain language looks at how we manage it."},
                {type: "paragraph", text: "Every investor wants strong returns, but seasoned investors know that returns mean little without a clear-eyed understanding of the risks taken to earn them. At Flamestar Capital, risk management is not an afterthought, it is the starting point of every decision. Here, in plain language, is how we think about risk, how we measure it, and the practical steps we take to protect your capital…"}
                ]
            },
        ],
    },
];
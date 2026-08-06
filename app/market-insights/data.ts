import type { InsightArticle } from "@/components/ui/InsightCard";

type CategoryArticle = InsightArticle & {
    content?: Array<{ type: "heading" | "paragraph" | "subheading"; text: string }>;
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
                    {type: "heading", text: "No one can reliably predict the markets, but a disciplined process can be repeated in every cycle."},
                    {type: "paragraph", text: "Every year, financial headlines fill with confident predictions: where interest rates will land, which sector will lead, when the next correction arrives. Some of these forecasts turn out to be right. Most do not. And here lies one of the most important truths in investing, a truth that shapes everything we do at Flamestar Capital, no one can reliably predict the markets, but anyone can commit to a disciplined process. Over time, it is the process, not the prediction, that builds lasting wealth."},
                    {type: "subheading", text: "The trouble with forecasts"},
                    {type: "paragraph", text: "Markets are driven by millions of decisions, unexpected events, and human emotions. That complexity makes short term movements genuinely unpredictable. A manager who bases a portfolio on a single bold forecast is, in effect, making a bet and when that bet is wrong, clients bear the cost. The uncomfortable reality is that being confident and being correct are not the same thing, and investing in the gap between them can be expensive."},
                    {type: "paragraph", text: "This is why we are skeptical of anyone, including ourselves, who claims to know exactly what the market will do next. Humility about the future is not a weakness. It is the starting point of sound investing."},
                    {type: "subheading", text: "What discipline looks like in practice"},
                    {type: "paragraph", text: "If we cannot control outcomes, what can we control? A great deal, as it turns out. We can control how capital is allocated across asset classes. We can control how much risk a portfolio carries. We can control the quality of our research, the rules we follow when markets turn volatile, and the discipline to stay invested through noise rather than react to it. These are the levers of long-term performance, and they are entirely within our hands."},
                    {type: "paragraph", text: "At Flamestar, this discipline is expressed through a few consistent principles, capital preservation first, so risk is managed before return is pursued, deliberate diversification, so no single position can undo a portfolio, and evidence-based decisions, so choices are grounded in research rather than emotion. None of these is glamorous. All of them compound."},
                    {type: "subheading", text: "Why process compounds"},
                    {type: "paragraph", text: "A good process has a quiet superpower, it can be repeated. A lucky prediction cannot be relied upon again, but a sound framework can be applied in every market cycle, in calm markets and turbulent ones, in the years when it feels easy and the years when it feels impossible. Applied consistently over time, that repeatability is what turns disciplined decisions into durable wealth."},
                    {type: "paragraph", text: "It also protects investors from their own instincts. The hardest moments when investing are emotional ones, the temptation to sell in a panic or chase a rally at its peak. A defined process acts as a steadying hand, keeping decisions anchored to evidence when feelings run high."},
                    {type: "subheading", text: "Our commitment to you"},
                    {type: "paragraph", text: "At Flamestar, we do not ask to be judged on a long track record. We ask to be judged on the rigour of our process and the integrity of our promises. We would rather be honest and disciplined than impressive and reckless, because we are managing something that matters, your capital, and your confidence in the future."}
                ]
            },
            {
                title: "The Nigerian Investment Landscape: Where We See Opportunity",
                href: "/market-insights/the-nigerian-investment-landscape",
                ...dateAndReadTime,
                content: [
                    {type: "heading", text: "A grounded look at the risks and opportunities shaping Nigerian markets — fixed income, equities, and alternatives — and how Flamestar Capital approaches them."},
                    {type: "paragraph", text: "Nigeria is a market of contrasts. It is home to Africa's largest economy and one of its youngest, fastest growing populations, yet it also tests investors with inflation, currency volatility, and shifting policy. For the disciplined investor, that combination is not a reason to stay away, it is precisely where careful, well-structured capital can find real value. The key is to understand the terrain before deploying a single naira."},
                    {type: "subheading", text: "Fixed income: a foundation of stability"},
                    {type: "paragraph", text: "For many Nigerian portfolios, fixed income instruments, government securities, treasury bills, and quality corporate debt, form the bedrock. In a high-yield environment, they can offer attractive, relatively predictable returns and a measure of stability against more volatile assets. The discipline lies in selection and timing, understanding the real return after inflation, matching maturities to a client's needs, and avoiding the temptation to reach for yield without regard to credit quality."},
                    {type: "subheading", text: "Equities: patience and selectivity"},
                    {type: "paragraph", text: "The Nigerian equities market is maturing, and it rewards investors who are selective and patient. Not every listed company is a sound investment, and broad market swings can obscure the difference between a temporary cheap business and a permanently troubled one. We favour careful, fundamentals driven selection, focusing on the quality of a company's earnings, governance, and competitive position, over chasing momentum. Equities are where long term growth is earned, but only for those willing to do the work and hold through cycles."},
                    {type: "subheading", text: "Alternatives: opportunity with discipline"},
                    {type: "paragraph", text: "Beyond traditional assets, a growing set of alternative opportunities, real estate, private credit, and structured products among them can offer diversification and higher potential returns. They also carry their own risks, lower liquidity, greater complexity, and the need for genuine expertise to evaluate them properly. Approached with discipline and appropriate sizing, alternatives can strengthen a portfolio; approached carelessly, they can concentrate on risk. The difference is rigour."},
                    {type: "subheading", text: "The thread that ties it together: risk management"},
                    {type: "paragraph", text: "Across all three, one principle governs our approach, diversification and disciplined risk management. No single asset class, sector, or position should be able to derail a portfolio. By combining fixed income stability, equities' growth, and alternatives' selective upside, each sized to a client's specific risk tolerance, we aim to build portfolios that are resilient across a range of market conditions, not just the favourable ones."},
                    {type: "subheading", text: "A local firm, an institutional standard"},
                    {type: "paragraph", text: "We believe Nigerian investors deserve a manager who understands the local market intimately and applies to it the same institutional grade discipline used by the world's leading firms. That is the standard Flamestar Capital was built to meet, combining on the ground insight with rigorous, transparent process."}
                ]
            },
            {
                title: "Understanding Risk: How We Protect Your Capital",
                href: "/market-insights/understanding-risk",
                ...dateAndReadTime,
                content: [
                    {type: "heading", text: "Return matters, but never before risk. A plain language look at how Flamestar Capital thinks about risk, measures it, and works to protect client capital."},
                    {type: "paragraph", text: "Ask most people what they want from an investment, and they will say strong returns. Ask a seasoned investor the same question, and the answer changes: they want strong returns for the risk taken. It is a small distinction with enormous consequences. Returns are only half the story; the risk behind them is the other half, and it is the half that too often goes unexamined until it is too late. At Flamestar Capital, risk management is not an afterthought bolted onto a strategy. It is the starting point of every decision we make."},
                    {type: "subheading", text: "What we mean by risk"},
                    {type: "paragraph", text: "Risk, in investing, is more than the chance of loss. It is volatility, how sharply values swing. It is concentration, how much depends on a single position or outcome. It is liquidity, how easily an asset can be turned back into cash when needed. And it is the erosion of purchasing power by inflation, a particularly important consideration in our market. A responsible manager holds all of these in view at once, rather than fixating on headline returns."},
                    {type: "subheading", text: "Capital preservation first"},
                    {type: "paragraph", text: "Our guiding principle is simple, preserve first, grow second. The mathematics of loss is unforgiving. A portfolio that falls 50% must then rise 100% simply to break even. Protecting capital on the downside is therefore not timidity; it is the foundation of long-term growth. By managing risk before chasing returns, we aim to keep our clients in a position to compound steadily over years, rather than recovering from avoidable setbacks."},
                    {type: "subheading", text: "How we manage it in practice"},
                    {type: "paragraph", text: "Discipline turns principle into practice through a few concrete habits. We diversify deliberately across asset classes, sectors, and instruments, so no single event can undo a portfolio. We analyze markets continuously, updating our view as conditions change rather than setting a strategy and forgetting it. And we monitor positions on an ongoing basis, so risks are identified and addressed early rather than discovered late. These are not dramatic actions, they are the steady, unglamorous work of protecting capital, done consistently."},
                    {type: "subheading", text: "Honesty about what risk is not"},
                    {type: "paragraph", text: "We will always be candid with our clients, risk can be managed, but it cannot be eliminated. All investment carries the possibility of loss, and any firm that promises otherwise should be treated with caution. What we can promise is that we will never take risks casually, never hide it, and never pursue return without first understanding what stands behind it. Transparency about risk is part of our fiduciary duty, and we take it seriously."},
                    {type: "subheading", text: "Risk you can understand"},
                    {type: "paragraph", text: "We believe you should always understand the risks in your own portfolio, in plain language, without jargon. Clear reporting on performance, risk, and cost is a core part of how we work, because informed clients make better long-term decisions and better partners."}
                ]
            },
        ],
    },
];
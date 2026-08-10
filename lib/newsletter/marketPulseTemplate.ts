import type { NewsletterBlock } from "./types";

export type NewsletterTemplateData = {
  subject: string;
  dateLine: string;
  intro: string;
  blocks: NewsletterBlock[];
};

/**
 * Starter content mirroring the Flamestar Market Pulse format (as sent
 * Monday, August 3, 2026). Selecting "Start with Template" in the composer
 * pre-fills this so the admin only has to update figures rather than
 * rebuild the structure each week.
 */
export const marketPulseTemplate: NewsletterTemplateData = {
  subject: "Flamestar Market Pulse — Week of August 3, 2026",
  dateLine: "Monday, August 3, 2026",
  intro:
    "Dear Valued Client, the Nigerian market closed the final week of July on a measured, reflective note. After a powerful monthlong advance, the NGX All-Share Index eased 0.84 percent to 245,283.68 points as investors locked in profits across banking, industrial and consumer names — a healthy pause rather than a change of trend. Even with the pullback, the Exchange added ₦11.11 trillion in July alone and holds a commanding 57.62 percent return for the year. The correction is the market catching its breath, not losing its nerve. Beneath the price action, the fundamentals that matter to long-term capital continue to firm. Headline inflation has now edged lower for a second straight month to 15.91 percent, the Central Bank held its policy rate steady at 26.5 percent for a second consecutive meeting, and the naira remains broadly stable around ₦1,368 to the dollar at the official window. Abroad, a divided US Federal Reserve again left rates on hold while Brent crude staged its strongest monthly rally since March. In the pages that follow, we translate these crosscurrents into what they mean for the disciplined Nigerian investor — and where we see opportunity in the second half.",
  blocks: [
    { type: "heading", text: "01 NIGERIAN MARKET SNAPSHOT" },
    {
      type: "paragraph",
      text: "Nigerian equities snapped a multi-week winning streak as profit-taking swept the bourse. The All-Share Index shed 0.84 percent week-on-week to 245,283.68 points from 247,357.40, trimming aggregate market value by roughly ₦1.26 trillion. Market capitalisation settled at ₦158.33 trillion, down 0.79 percent on the week but still up an extraordinary ₦11.11 trillion for the month of July. Trading was brisk, 5.12 billion shares worth ₦404.76 billion changed hands in 285,223 deals confirming that the retreat was orderly rotation, not distress. Banking counters, which had led the July charge on recapitalisation optimism, bore the brunt of the pullback, while pockets of insurance and telecoms held firm.",
    },
    {
      type: "table",
      title: "Key Market Indicators",
      rows: [
        { label: "NGX All-Share Index", value: "245,283.68 pts", note: "−0.84% w/w; +57.62% YTD" },
        { label: "Market Capitalisation", value: "₦158.33 trillion", note: "−0.79% w/w; +₦11.11tn in July" },
        { label: "USD/NGN (Official)", value: "₦1,368/$", note: "CBN window, as of 31 Jul" },
        { label: "USD/NGN (Parallel)", value: "≈₦1,405/$", note: "Band ₦1,400–1,420; seasonal demand" },
        { label: "CBN Monetary Policy Rate", value: "26.5%", note: "Held 21 Jul (306th MPC); CRR 45%" },
        { label: "Headline Inflation", value: "15.91%", note: "June 2026 (NBS); down from 15.93%" },
        { label: "Food Inflation", value: "17.52%", note: "June 2026; up from 16.96% (May)" },
        { label: "364-Day T-Bill Stop Rate", value: "17.35%", note: "29 Jul auction; ~6.8x oversubscribed" },
        { label: "Brent Crude", value: "≈$88/bbl", note: "+≈24% in July; strongest since March" },
        { label: "Nigeria Oil Output", value: "1.56 mbpd", note: "104% of OPEC quota; 74-month high" },
        { label: "Market Breadth", value: "Mixed", note: "Selective; banks led decliners" },
      ],
    },
    { type: "subheading", text: "Fixed Income Watch" },
    {
      type: "paragraph",
      text: "Demand at the long end of the curve remains ferocious. At the final July Treasury bill auction on 29 July, investors bid roughly ₦3.38 trillion for the 364-day tenor against just ₦500 billion on offer, an oversubscription of nearly seven times, allowing the CBN to guide the one-year stop rate down to 17.35 percent from 17.66 percent a fortnight earlier. Shorter 91- and 182-day tenors continue to attract muted interest as institutions crowd into the longer paper to lock in double-digit yields before rates drift lower. With inflation moderating and the policy rate on hold, the direction of travel for yields is gently downward — a window worth noting for clients still holding cash.",
    },

    { type: "heading", text: "02 GLOBAL MARKETS & NIGERIA IMPACT" },
    { type: "subheading", text: "US Federal Reserve Holds Again" },
    {
      type: "paragraph",
      text: "The Federal Open Market Committee voted 9–3 to keep the federal funds rate at 3.50–3.75 percent for a fifth consecutive meeting, with three regional presidents dissenting in favour of tighter policy to tame still-elevated inflation. The message was one of patience amid geopolitical uncertainty.",
    },
    {
      type: "paragraph",
      text: "FLAMESTAR VIEW: A Fed on hold keeps the yield gap between Nigerian and US assets wide, supporting carry-trade appetite for our high-yielding Treasury bills and OMO paper. So long as Washington resists cutting, foreign portfolio inflows into naira fixed income should remain a stabilising force for the currency. We watch the September meeting closely.",
    },
    { type: "subheading", text: "Oil's Strongest Month Since March" },
    {
      type: "paragraph",
      text: "Brent crude climbed to roughly $88 a barrel, capping a near-24 percent surge in July on Middle East supply fears. OPEC+ has signalled a further 188,000 barrel-per-day quota increase from August. Nigeria, encouragingly, pumped 1.56 million barrels per day in June — 104 percent of its OPEC quota and a 74-month high.",
    },
    {
      type: "paragraph",
      text: "FLAMESTAR VIEW: Firmer Brent plus improved volumes is a double tailwind for Nigeria's external accounts, FX reserves and fiscal position. It eases pressure on the naira and brightens the outlook for the 2026 budget. The caveat: rising crude also imports inflation risk through energy costs, which is precisely why the CBN is holding rates rather than easing.",
    },
    { type: "subheading", text: "Emerging Market Capital Flows" },
    {
      type: "paragraph",
      text: "With developed market policy rates stable and the dollar range-bound, global investors have kept a constructive tilt toward high-carry emerging markets. Nigeria's combination of double digit local yields, a more stable exchange rate and easing inflation places it firmly on the radar of yield-seeking foreign capital.",
    },
    {
      type: "paragraph",
      text: "FLAMESTAR VIEW: Renewed foreign participation is a quiet but powerful support for both the naira and the local bond market. We expect continued interest at the long end of the curve, reinforcing the downward drift in yields already visible at auction.",
    },
    { type: "subheading", text: "Structural / GDP Note" },
    {
      type: "paragraph",
      text: "Nigeria's economy expanded 3.89 percent year-on-year in Q1 2026, up from 3.13 percent a year earlier, with the non-oil economy contributing 96.08 percent of output and services growing 4.31 percent. Trade and real estate led the sectoral gains. This is a meaningful structural signal: growth is broadening beyond crude, and it is exactly this diversification that underpins the durability of the equity rally.",
    },

    { type: "heading", text: "03 PORTFOLIO & INVESTMENT INSIGHTS" },
    { type: "subheading", text: "Banking" },
    {
      type: "paragraph",
      text: "The banking index has returned roughly 66.7 percent year-to-date, powered by recapitalisation activity, robust half-year earnings and heavy institutional positioning. First HoldCo among the standouts. Last week's profit-taking hit banks hardest precisely because they had run furthest.",
    },
    {
      type: "paragraph",
      text: "FLAMESTAR VIEW: We remain constructive on well-capitalised tier-one banks. The recapitalisation drive is forcing scale, stronger balance sheets and, in time, richer dividends. Use pullbacks such as last week's to accumulate quality names rather than chase momentum.",
    },
    { type: "subheading", text: "Telecommunications" },
    {
      type: "paragraph",
      text: "Telecoms were the month's other engine, adding some ₦5.67 trillion in combined value as MTN Nigeria and Airtel Africa rallied on the NCC's approved 50 percent tariff adjustment and strong first-quarter results. Airtel Africa's market value reached about ₦21 trillion, with MTN Nigeria at ₦17.57 trillion.",
    },
    {
      type: "paragraph",
      text: "FLAMESTAR VIEW: The tariff reset transforms telecom economics after years of margin compression. With data demand structurally rising and pricing power restored, we view the sector as a core long-term holding for growth-oriented portfolios, mindful that valuations have already moved a long way.",
    },
    { type: "subheading", text: "Fixed Income" },
    {
      type: "paragraph",
      text: "One-year Treasury bills clearing near 17.35 percent against moderating 15.91 percent inflation offer an increasingly rare positive real return in local currency. Demand is intense and yields are edging lower, so the attractive entry points of early 2026 are gradually closing.",
    },
    {
      type: "paragraph",
      text: "FLAMESTAR VIEW: For clients with idle naira liquidity, this is a moment to act rather than wait. Laddering into 364-day bills now locks in double-digit yields before the easing cycle compresses them further. We favour a barbell of long T-bills for income and select equities for growth.",
    },
    { type: "subheading", text: "Real Estate" },
    {
      type: "paragraph",
      text: "Real estate was among the fastest-growing GDP segments in Q1, buoyed by resilient demand for prime Lagos and Abuja assets and by investors seeking a hard-asset hedge against currency risk. A more stable naira and cooling inflation improve the backdrop for both development and rental yields.",
    },
    {
      type: "paragraph",
      text: "FLAMESTAR VIEW: Prime, well-located Nigerian real estate remains a compelling store of value and an effective inflation hedge for HNWI portfolios. We favour income-generating assets in supply-constrained corridors over speculative land banking and see selective development finance as an attractive risk-adjusted play.",
    },

    { type: "heading", text: "04 WEALTH STRATEGY CORNER" },
    { type: "subheading", text: "Strategy of the Week: Buying the Pause — Discipline When Others Take Profit" },
    {
      type: "paragraph",
      text: "A week of profit-taking after a strong rally is not a warning; it is an invitation. The investors who compound wealth over decades are those who deploy method, not emotion, when the market pauses. This week's framework for turning a healthy correction into a positioning opportunity:",
    },
    {
      type: "list",
      items: [
        "Separate the pause from the trend. A 0.84 percent weekly dip against a 57.62 percent yearly gain is noise, not narrative. Anchor decisions to fundamentals — easing inflation, a stable rate and a stable naira — not to a single red week.",
        "Keep dry powder deliberately. Hold a cash reserve precisely so that pullbacks become buying windows. Liquidity is not idleness; it is optionality waiting for a discount.",
        "Ladder into the yield you can lock today. With 364-day bills near 17.35 percent and drifting lower, staggering purchases secures real returns before the easing cycle erodes them.",
        "Accumulate quality on weakness. Use dips in well-capitalised banks and pricing-empowered telecoms to build core positions — buy the business, not the momentum.",
        "Rebalance toward the diversified economy. With non-oil sectors driving 96 percent of GDP, tilt exposure to the structural winners — financials, telecoms, consumer and prime real estate.",
        "Review through the lens of goals. Match every position to a horizon and a purpose. The discerning investor measures success in decades, not weeks.",
      ],
    },
    {
      type: "quote",
      text: "The stock market is a device for transferring money from the impatient to the patient.",
    },
  ],
};

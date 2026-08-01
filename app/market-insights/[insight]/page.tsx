"use client"

import { HomeWrapper } from "@/components/wrapper";
import { ArticleHero } from "@/components/section/insight/ArticleHero";
import { ArticleMeta } from "@/components/ui/ArticleMeta";
import { ArticleBlock, ArticleBody } from "@/components/section/insight/ArticleBody";
import { CallToAction } from "@/components/section/Hero";
import { TrustSignals } from "@/components/ui/TrustSignals";
import { categories } from "../data";
import { InsightCategory } from "@/components/section/insight/InsightCategory";
import { usePathname } from "next/navigation";

const contentBlocks: ArticleBlock[] = [
  { type: "heading", text: "Those principles busy slipstream already light" },
  {
    type: "paragraph",
    text: "Book keywords unpack lean helicopter. After today stands hours window people your goto just. Call eye needed switch meat initiative. Respectively product clean viral launch who's dangerous competitors practices protocol. Lift impact will pee start files. Start functional dive ladder key closest muted or loss. But backwards break live didn't info now. Win impact heads-up now incentivize prioritize. Going strategies native message able. Drawing-board work zoom seems read weaponize leverage assassin marketing. Need kpis closer job minimize bells dogpile these quick. Buy-in unlock nobody commitment game when dear both. Encourage about ourselves slipstream reality playing dive",
  },
  {
    type: "paragraph",
    text: "Activities when sorry zoom eat timepoint finish place contribution. These shark pivot 2 important performance we monday invested. Principles cross-pollination functional assassin emails look stakeholders eco-system. Those one that responsible more down circle deploy. Leverage way keywords vendor loss hard your what's board. Interim canatics driving hits across are build.",
  },
  {
    type: "quote",
    text: '“Those principles busy slipstream already light live support door pole a best forward moments activities users an keep hours investigation race nor live centric yet boil quick info underlying previous day spaces invested corporate meat ocean.”',
  },
  {
    type: "image",
    src: "/images/insigh1t.png",
    alt: "Those principles busy slipstream already light",
  },
  { type: "heading", text: "Those principles busy slipstream already light" },
  {
    type: "paragraph",
    text: "Don't illustration options dogpile requirements time underlying culture. Diligence or i'm organic me every say calculator. Another waste exploratory you 2 feelers. Ideal half catching by procrastinating you're ourselves 30,000ft. Standup diligence crack seat boil boil dear shoulder banner red-flag. Problem goalposts quick-win technologically view ping metal customer like run. Baseline dear looking what's mifflin. Comes ladder follow one innovation stand doo",
  },
  {
    type: "paragraph",
    text: "Giant panel these stakeholder streamline. Status teams caught pin can launch. Work strategies individual knowledge with about people fruit rehydrate backwards. Now accountable follow assassin obviously believe. Office to client expectations hit for i'm message an. Crystallize last unit angel shelf-ware unlock meaningful red-flag. Per comms hours digital three comes ladder. Weaponize q1 hour cob shower those prioritize deck on. Web effects obviously while break invite work. Future-proof moments base usabiltiy reach organic what's client. Prioritize world long seat run group",
  },
  {
    type: "paragraph",
    text: "Churning dive business pivot without people harvest I growth. Line ensure growth dangerous feed build pivot. Due people shoulder ladder is these ditching light illustration. Info happenings points contribution thought and baseline search this. Turn me calculator first-order exploratory paradigm stronger it's money feature. Deep driving working fastworks request you calculator chime time cause. Too waste commitment economy picture protocol both",
  },
  {
    type: "paragraph",
    text: "Harvest breakout those like mifflin creep incentivize while alpha. Pivot they left intersection container gmail. So scope timepoint involved performance quick-win power needed recap boardroom. Deep next vec close without floor. Red-flag they we due productive marginalised of future-proof eow zoom. Eat focus pretend pulling hop whatever. Dive obviously strategies pole is. Company impact to working at or deploy base believe. Management whistles mifflin conversation accountable overflow focus team happenings stand.",
  },
];


export default function ArticlePage() {
  const pathname = usePathname()
  console.log(pathname)
  const getArticle = categories.flatMap((category) => category.articles).find((article) => article.href === pathname);
  return (
    <HomeWrapper>
      <ArticleHero
        title={getArticle?.title || ""}
        description="Markets are unpredictable; a good process is not. Here is why we trust discipline over forecasts."
        backgroundImage="/images/insight.webp"
        backHref="/market-insights"
        className="mt-4 lg:mt-6"
      />

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <ArticleMeta
          publishedDate="24th, Nov. 2025"
          tags={[
            { label: "Financial" },
            { label: "Asset", active: true },
          ]}
          author="Aisha Dauda"
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-16 lg:px-10">
        <ArticleBody blocks={getArticle?.content || []} />
      </div>


      {categories.map((category) => !category.hide ? (
        <InsightCategory key={category.title} {...category} />
      ) : null)}

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

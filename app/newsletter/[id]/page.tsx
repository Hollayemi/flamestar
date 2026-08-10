import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { HomeWrapper } from "@/components/wrapper";
import { NewsletterBody } from "@/components/section/newsletter/NewsletterBody";
import { NewsletterSignup } from "@/components/section/insight/NewsletterSignup";
import { getSentNewsletterById } from "@/lib/newsletter/queries";

export const dynamic = "force-dynamic";

export default async function NewsletterDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const newsletter = await getSentNewsletterById(id);

  if (!newsletter) {
    notFound();
  }

  return (
    <HomeWrapper>
      <div className="mx-auto max-w-3xl px-6 pt-12 lg:px-10">
        <Link
          href="/newsletter"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-light transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All issues
        </Link>

        <div className="mt-6 border-b border-black/10 pb-8">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-flame">
            Flamestar Market Pulse
          </p>
          <h1 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
            {newsletter.subject}
          </h1>
          {newsletter.dateLine && <p className="mt-2 text-sm text-muted-light">{newsletter.dateLine}</p>}
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-10 lg:px-10">
        {newsletter.intro && (
          <p className="mb-8 text-sm leading-relaxed text-ink sm:text-base">{newsletter.intro}</p>
        )}
        <NewsletterBody blocks={newsletter.blocks} />
      </div>

      <NewsletterSignup className="pb-16 pt-6" />
    </HomeWrapper>
  );
}

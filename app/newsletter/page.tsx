import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import { HomeWrapper } from "@/components/wrapper";
import { Hero } from "@/components/section/Hero";
import { getSentNewsletters } from "@/lib/newsletter/queries";

export const dynamic = "force-dynamic";

export default async function NewsletterArchivePage() {
  const newsletters = await getSentNewsletters();

  return (
    <HomeWrapper>
      <Hero
        eyebrow="Newsletter"
        title="Flamestar Market Pulse"
        description="Our weekly intelligence brief for the discerning investor, market snapshots, portfolio insights, and wealth strategy, archived for you to catch up on anytime."
        backgroundImage="/images/market-insight.webp"
      />

      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-10">
        {newsletters.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-black/12 px-6 py-20 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-paper-soft">
              <Mail className="h-5 w-5 text-muted-light" />
            </div>
            <p className="text-sm text-muted-light">No issues have been sent yet. Check back soon.</p>
          </div>
        ) : (
          <ul className="flex flex-col divide-y divide-black/8 rounded-2xl border border-black/8">
            {newsletters.map((n) => (
              <li key={n.id}>
                <Link
                  href={`/newsletter/${n.id}`}
                  className="flex items-center justify-between gap-4 px-6 py-5 transition-colors hover:bg-paper-soft"
                >
                  <div className="min-w-0">
                    <p className="truncate font-display text-base font-semibold text-ink sm:text-lg">
                      {n.subject}
                    </p>
                    <p className="mt-1 text-xs text-muted-light">
                      {n.dateLine ||
                        (n.sentAt
                          ? new Date(n.sentAt).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            })
                          : "")}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-ink/40" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </HomeWrapper>
  );
}

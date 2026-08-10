import Link from "next/link";
import { Plus } from "lucide-react";
import { dbConnect } from "@/lib/db/connect";
import { NewsletterCampaign } from "@/lib/db/models/NewsletterCampaign";
import { NewsletterTable } from "@/components/admin/NewsletterTable";

export const dynamic = "force-dynamic";

export default async function AdminNewsletterPage() {
  await dbConnect();
  const campaigns = await NewsletterCampaign.find().sort({ updatedAt: -1 }).lean();

  const serialized = campaigns.map((c) => ({
    id: c._id.toString(),
    subject: c.subject,
    status: c.status,
    updatedAt: c.updatedAt ? new Date(c.updatedAt).toISOString() : "",
    sentAt: c.sentAt ? new Date(c.sentAt).toISOString() : undefined,
  }));

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Newsletter</h1>
          <p className="mt-1 text-sm text-muted-light">
            Compose and send Flamestar Market Pulse issues via Zoho Campaigns.
          </p>
        </div>
        <Link
          href="/admin/newsletter/new"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-flame px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-flame-deep"
        >
          <Plus className="h-4 w-4" />
          New Newsletter
        </Link>
      </div>

      <NewsletterTable initialCampaigns={serialized} />
    </div>
  );
}

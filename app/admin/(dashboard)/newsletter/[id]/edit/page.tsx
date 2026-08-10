import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/db/connect";
import { NewsletterCampaign } from "@/lib/db/models/NewsletterCampaign";
import { NewsletterComposer } from "@/components/admin/NewsletterComposer";
import type { NewsletterBlock } from "@/lib/newsletter/types";

export const dynamic = "force-dynamic";

export default async function EditNewsletterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  await dbConnect();
  const campaign = await NewsletterCampaign.findById(id).lean();

  if (!campaign) {
    notFound();
  }

  return (
    <NewsletterComposer
      mode="edit"
      initialData={{
        id: campaign._id.toString(),
        subject: campaign.subject,
        dateLine: campaign.dateLine ?? "",
        intro: campaign.intro ?? "",
        blocks: (campaign.blocks ?? []) as NewsletterBlock[],
        status: campaign.status as "draft" | "sending" | "sent" | "failed",
        error: campaign.error ?? undefined,
      }}
    />
  );
}

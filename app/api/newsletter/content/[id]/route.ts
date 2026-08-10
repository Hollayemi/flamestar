import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/connect";
import { NewsletterCampaign } from "@/lib/db/models/NewsletterCampaign";
import { renderNewsletterHTML } from "@/lib/newsletter/template";
import { getSiteUrl } from "@/lib/zoho/config";
import type { NewsletterBlock } from "@/lib/newsletter/types";

export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  await dbConnect();
  const campaign = await NewsletterCampaign.findById(id).lean();

  // Only serve campaigns that are actually being sent (or already sent) —
  // drafts stay private even though the ID itself isn't easily guessable.
  if (!campaign || (campaign.status !== "sending" && campaign.status !== "sent")) {
    return new NextResponse("Not found", { status: 404 });
  }

  const html = renderNewsletterHTML({
    subject: campaign.subject,
    dateLine: campaign.dateLine || "",
    intro: campaign.intro || "",
    blocks: (campaign.blocks ?? []) as NewsletterBlock[],
    logoUrl: `${getSiteUrl()}/images/logo.png`,
  });

  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

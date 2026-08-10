import { dbConnect } from "@/lib/db/connect";
import { NewsletterCampaign } from "@/lib/db/models/NewsletterCampaign";
import type { NewsletterBlock } from "./types";

export type PublicNewsletterListItem = {
  id: string;
  subject: string;
  dateLine: string;
  sentAt: string;
};

export async function getSentNewsletters(): Promise<PublicNewsletterListItem[]> {
  await dbConnect();
  const campaigns = await NewsletterCampaign.find({ status: "sent" }).sort({ sentAt: -1 }).lean();

  return campaigns.map((c) => ({
    id: c._id.toString(),
    subject: c.subject,
    dateLine: c.dateLine || "",
    sentAt: c.sentAt ? new Date(c.sentAt).toISOString() : "",
  }));
}

export type PublicNewsletterDetail = {
  subject: string;
  dateLine: string;
  intro: string;
  blocks: NewsletterBlock[];
  sentAt: string;
};

export async function getSentNewsletterById(id: string): Promise<PublicNewsletterDetail | null> {
  await dbConnect();

  let campaign;
  try {
    campaign = await NewsletterCampaign.findOne({ _id: id, status: "sent" }).lean();
  } catch {
    // Invalid ObjectId format — treat as not found.
    return null;
  }
  if (!campaign) return null;

  return {
    subject: campaign.subject,
    dateLine: campaign.dateLine || "",
    intro: campaign.intro || "",
    blocks: (campaign.blocks ?? []) as NewsletterBlock[],
    sentAt: campaign.sentAt ? new Date(campaign.sentAt).toISOString() : "",
  };
}

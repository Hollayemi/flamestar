import { getZohoAccessToken } from "./token";
import { ZOHO_CAMPAIGNS_BASE, getZohoFromEmail, getZohoFromName, getZohoListKey } from "./config";

async function zohoFetch(path: string, params: Record<string, string>) {
  const token = await getZohoAccessToken();
  const url = `${ZOHO_CAMPAIGNS_BASE}/${path}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Zoho-oauthtoken ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(params).toString(),
  });

  const data = await res.json().catch(() => null);
  return { ok: res.ok, status: res.status, data };
}

export class ZohoCampaignsError extends Error {
  code?: string;
  constructor(message: string, code?: string) {
    super(message);
    this.name = "ZohoCampaignsError";
    this.code = code;
  }
}

/**
 * Adds (or updates) a contact on the configured Zoho Campaigns mailing list.
 * Re-subscribing an existing contact is treated as an update by Zoho, not an
 * error, so this is safe to call on every newsletter signup without checking
 * for duplicates first.
 */
export async function addSubscriberToZohoCampaigns(email: string, name?: string) {
  const contactinfo: Record<string, string> = { "Contact Email": email };
  if (name) contactinfo["First Name"] = name;

  const { ok, data } = await zohoFetch("json/listsubscribe", {
    resfmt: "JSON",
    listkey: getZohoListKey(),
    contactinfo: JSON.stringify(contactinfo),
    source: "Website Newsletter Form",
  });

  const code = data?.code;
  const status = data?.status;

  if (!ok || (status && status !== "success")) {
    throw new ZohoCampaignsError(data?.message || "Failed to add subscriber to Zoho Campaigns.", code);
  }

  return data;
}

export type NewsletterCampaignSummary = {
  campaignKey: string;
};

/**
 * Creates a Zoho Campaigns campaign targeting the configured mailing list.
 * `contentUrl` must be a publicly reachable URL — Zoho's servers fetch the
 * HTML from it when the campaign is created.
 */
export async function createZohoCampaign(options: {
  campaignName: string;
  subject: string;
  contentUrl: string;
}): Promise<NewsletterCampaignSummary> {
  const listDetails = JSON.stringify({ [getZohoListKey()]: [] });

  const { ok, data } = await zohoFetch("createCampaign", {
    resfmt: "JSON",
    campaignname: options.campaignName,
    from_email: getZohoFromEmail(),
    from_name: getZohoFromName(),
    subject: options.subject,
    list_details: listDetails,
    content_url: options.contentUrl,
  });

  if (!ok || !data?.campaignKey) {
    throw new ZohoCampaignsError(data?.message || "Failed to create Zoho campaign.", data?.code);
  }

  return { campaignKey: data.campaignKey };
}

/** Tells Zoho Campaigns to send an already-created campaign to its mailing list. */
export async function sendZohoCampaign(campaignKey: string) {
  const { ok, data } = await zohoFetch("sendcampaign", {
    resfmt: "JSON",
    campaignkey: campaignKey,
  });

  const response = data?.response ?? data;

  if (!ok || (response?.code && response.code !== "0" && response.code !== 200 && response.code !== "200")) {
    throw new ZohoCampaignsError(response?.message || "Failed to send Zoho campaign.", response?.code);
  }

  return response;
}

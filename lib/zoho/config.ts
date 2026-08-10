/**
 * Central place for Zoho Campaigns environment configuration.
 *
 * ZOHO_DC controls which Zoho data center your org lives in (this must match
 * where the Zoho Campaigns account was created — check the domain in your
 * browser when logged into campaigns.zoho.<dc>). Common values: "com" (US),
 * "eu", "in", "com.au", "jp".
 */
const DC = process.env.ZOHO_DC?.trim() || "com";

export const ZOHO_ACCOUNTS_BASE = `https://accounts.zoho.${DC}`;
export const ZOHO_CAMPAIGNS_BASE = `https://campaigns.zoho.${DC}/api/v1.1`;

function required(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set. Add it to your .env.local file.`);
  }
  return value;
}

export function getZohoClientId() {
  return required("ZOHO_CLIENT_ID");
}

export function getZohoClientSecret() {
  return required("ZOHO_CLIENT_SECRET");
}

export function getZohoRefreshToken() {
  return required("ZOHO_REFRESH_TOKEN");
}

export function getZohoListKey() {
  return required("ZOHO_CAMPAIGNS_LIST_KEY");
}

export function getZohoFromEmail() {
  return required("ZOHO_CAMPAIGNS_FROM_EMAIL");
}

export function getZohoFromName() {
  return process.env.ZOHO_CAMPAIGNS_FROM_NAME?.trim() || "Flamestar Capital";
}

/** Public base URL of this site, used to build the content_url Zoho fetches when creating a campaign. */
export function getSiteUrl() {
  return required("NEXT_PUBLIC_SITE_URL").replace(/\/$/, "");
}

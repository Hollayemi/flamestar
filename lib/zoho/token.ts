import { ZOHO_ACCOUNTS_BASE, getZohoClientId, getZohoClientSecret, getZohoRefreshToken } from "./config";

type CachedToken = { accessToken: string; expiresAt: number };

// Cached per server instance. Access tokens live ~1 hour; we refresh a
// little early to avoid edge-of-expiry failures.
let cache: CachedToken | null = null;

export async function getZohoAccessToken(): Promise<string> {
  if (cache && cache.expiresAt > Date.now()) {
    return cache.accessToken;
  }

  const params = new URLSearchParams({
    refresh_token: getZohoRefreshToken(),
    client_id: getZohoClientId(),
    client_secret: getZohoClientSecret(),
    grant_type: "refresh_token",
  });

  const res = await fetch(`${ZOHO_ACCOUNTS_BASE}/oauth/v2/token?${params.toString()}`, {
    method: "POST",
  });

  const data = await res.json();

  if (!res.ok || !data.access_token) {
    throw new Error(
      `Failed to refresh Zoho access token: ${data.error || res.statusText || "unknown error"}`
    );
  }

  const expiresInMs = (typeof data.expires_in === "number" ? data.expires_in : 3600) * 1000;
  cache = {
    accessToken: data.access_token,
    // Refresh 2 minutes before actual expiry.
    expiresAt: Date.now() + expiresInMs - 2 * 60 * 1000,
  };

  return cache.accessToken;
}

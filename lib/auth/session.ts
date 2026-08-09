import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken, type AdminSessionPayload } from "./jwt";

/** Reads and verifies the admin session from the request cookies. Returns null if absent/invalid. */
export async function getAdminSession(): Promise<AdminSessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

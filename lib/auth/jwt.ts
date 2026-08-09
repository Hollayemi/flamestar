import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "flamestar_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 8; // 8 hours

function getSecretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set. Add it to your .env.local file (see .env.example).");
  }
  return new TextEncoder().encode(secret);
}

export type AdminSessionPayload = {
  sub: string; // admin user id
  username: string;
  name: string;
};

export async function signSessionToken(payload: AdminSessionPayload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecretKey());
}

export async function verifySessionToken(token: string): Promise<AdminSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (typeof payload.sub !== "string" || typeof payload.username !== "string") return null;
    return {
      sub: payload.sub,
      username: payload.username as string,
      name: (payload.name as string) ?? "",
    };
  } catch {
    return null;
  }
}

export const SESSION_MAX_AGE = SESSION_DURATION_SECONDS;

/**
 * Creates (or updates) the admin user used to sign in to /admin/login.
 *
 * Usage:
 *   ADMIN_USERNAME=admin ADMIN_PASSWORD=change-me ADMIN_NAME="Jane Doe" node scripts/seed-admin.mjs
 *
 * Reads MONGODB_URI from .env.local automatically.
 */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { config as loadEnv } from "dotenv";

// Next.js convention: environment variables live in .env.local.
loadEnv({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;
const username = (process.env.ADMIN_USERNAME || "").trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD || "";
const name = process.env.ADMIN_NAME || "Admin";

async function main() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is not set. Add it to .env.local first.");
    process.exit(1);
  }
  if (!username || !password) {
    console.error(
      "Set ADMIN_USERNAME and ADMIN_PASSWORD environment variables before running this script.\n" +
        'Example: ADMIN_USERNAME=admin ADMIN_PASSWORD=change-me ADMIN_NAME="Jane Doe" node scripts/seed-admin.mjs'
    );
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);

  const AdminUser =
    mongoose.models.AdminUser ||
    mongoose.model(
      "AdminUser",
      new mongoose.Schema(
        {
          username: { type: String, required: true, unique: true, trim: true, lowercase: true },
          passwordHash: { type: String, required: true },
          name: { type: String, required: true, trim: true },
          role: { type: String, enum: ["admin"], default: "admin" },
          lastLoginAt: { type: Date },
        },
        { timestamps: true }
      )
    );

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await AdminUser.findOneAndUpdate(
    { username },
    { username, passwordHash, name, role: "admin" },
    { upsert: true, new: true }
  );

  console.log(`Admin user ready: ${user.username} (${user.name})`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/connect";
import { BlogPost } from "@/lib/db/models/BlogPost";
import { getAdminSession } from "@/lib/auth/session";
import { slugify } from "@/lib/blog/slug";

export async function GET(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  const status = request.nextUrl.searchParams.get("status");

  const posts =
    status === "draft" || status === "published"
      ? await BlogPost.find({ status }).sort({ updatedAt: -1 }).lean()
      : await BlogPost.find().sort({ updatedAt: -1 }).lean();
  return NextResponse.json({ posts });
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const title = typeof body?.title === "string" ? body.title.trim() : "";

    if (!title) {
      return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }
    if (!body?.category) {
      return NextResponse.json({ error: "Category is required." }, { status: 400 });
    }

    await dbConnect();

    const baseSlug = slugify(body.slug || title);
    if (!baseSlug) {
      return NextResponse.json({ error: "Could not generate a slug from the title." }, { status: 400 });
    }
    const slug = await uniqueSlug(baseSlug);

    const status = body.status === "published" ? "published" : "draft";

    const post = await BlogPost.create({
      title,
      slug,
      category: body.category,
      description: body.description || "",
      coverImage: body.coverImage || "",
      author: body.author || "Flamestar Capital",
      readTime: body.readTime || "3 mins read",
      tags: Array.isArray(body.tags) ? body.tags : [],
      content: Array.isArray(body.content) ? body.content : [],
      status,
      publishedAt: status === "published" ? new Date() : undefined,
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (err) {
    console.error("Create blog post error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

async function uniqueSlug(base: string) {
  let candidate = base;
  let suffix = 1;
  while (await BlogPost.exists({ slug: candidate })) {
    suffix += 1;
    candidate = `${base}-${suffix}`;
  }
  return candidate;
}

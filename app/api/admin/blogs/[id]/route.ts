import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/connect";
import { BlogPost } from "@/lib/db/models/BlogPost";
import { getAdminSession } from "@/lib/auth/session";
import { slugify } from "@/lib/blog/slug";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await dbConnect();
  const post = await BlogPost.findById(id).lean();
  if (!post) return NextResponse.json({ error: "Post not found." }, { status: 404 });
  return NextResponse.json({ post });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  try {
    const body = await request.json();
    await dbConnect();

    const post = await BlogPost.findById(id);
    if (!post) return NextResponse.json({ error: "Post not found." }, { status: 404 });

    if (typeof body.title === "string" && body.title.trim()) post.title = body.title.trim();
    if (typeof body.category === "string" && body.category) post.category = body.category;
    if (typeof body.description === "string") post.description = body.description;
    if (typeof body.coverImage === "string") post.coverImage = body.coverImage;
    if (typeof body.author === "string" && body.author) post.author = body.author;
    if (typeof body.readTime === "string" && body.readTime) post.readTime = body.readTime;
    if (Array.isArray(body.tags)) post.tags = body.tags;
    if (Array.isArray(body.content)) post.content = body.content;

    if (typeof body.slug === "string" && body.slug.trim()) {
      const desired = slugify(body.slug);
      if (desired && desired !== post.slug) {
        post.slug = await uniqueSlug(desired, id);
      }
    }

    if (body.status === "published" || body.status === "draft") {
      const wasPublished = post.status === "published";
      post.status = body.status;
      if (body.status === "published" && !wasPublished) {
        post.publishedAt = new Date();
      }
    }

    await post.save();
    return NextResponse.json({ post });
  } catch (err) {
    console.error("Update blog post error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await dbConnect();
  const deleted = await BlogPost.findByIdAndDelete(id);
  if (!deleted) return NextResponse.json({ error: "Post not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}

async function uniqueSlug(base: string, excludeId: string) {
  let candidate = base;
  let suffix = 1;
  while (await BlogPost.exists({ slug: candidate, _id: { $ne: excludeId } })) {
    suffix += 1;
    candidate = `${base}-${suffix}`;
  }
  return candidate;
}

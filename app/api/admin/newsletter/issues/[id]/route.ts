import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/connect";
import { NewsletterIssue } from "@/lib/db/models/NewsletterIssue";
import { getAdminSession } from "@/lib/auth/session";
import { deleteNewsletterPdf, uploadNewsletterPdf } from "@/lib/cloudinary/client";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await dbConnect();
  const issue = await NewsletterIssue.findById(id).lean();
  if (!issue) return NextResponse.json({ error: "Newsletter not found." }, { status: 404 });
  return NextResponse.json({ issue });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  try {
    const formData = await request.formData();
    const title = formData.get("title");
    const datePublished = formData.get("datePublished");
    const file = formData.get("file");

    await dbConnect();
    const issue = await NewsletterIssue.findById(id);
    if (!issue) return NextResponse.json({ error: "Newsletter not found." }, { status: 404 });

    if (typeof title === "string" && title.trim()) issue.title = title.trim();
    if (typeof datePublished === "string" && datePublished) issue.datePublished = new Date(datePublished);

    if (file instanceof File && file.size > 0) {
      if (file.type !== "application/pdf") {
        return NextResponse.json({ error: "Only PDF files are supported." }, { status: 400 });
      }
      const MAX_BYTES = 25 * 1024 * 1024;
      if (file.size > MAX_BYTES) {
        return NextResponse.json({ error: "PDF must be smaller than 25MB." }, { status: 400 });
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const uploaded = await uploadNewsletterPdf(buffer, file.name);

      const oldPublicId = issue.pdfPublicId;
      issue.pdfUrl = uploaded.url;
      issue.pdfPublicId = uploaded.publicId;
      issue.fileSize = uploaded.bytes;

      await issue.save();

      // Best-effort cleanup of the replaced file — don't fail the request if this errors.
      deleteNewsletterPdf(oldPublicId).catch((err) =>
        console.error("Failed to delete replaced newsletter PDF from Cloudinary:", err)
      );
    } else {
      await issue.save();
    }

    return NextResponse.json({ issue });
  } catch (err) {
    console.error("Update newsletter issue error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await dbConnect();

  const issue = await NewsletterIssue.findByIdAndDelete(id);
  if (!issue) return NextResponse.json({ error: "Newsletter not found." }, { status: 404 });

  try {
    await deleteNewsletterPdf(issue.pdfPublicId);
  } catch (err) {
    console.error("Failed to delete newsletter PDF from Cloudinary:", err);
  }

  return NextResponse.json({ ok: true });
}

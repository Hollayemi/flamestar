import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/connect";
import { NewsletterIssue } from "@/lib/db/models/NewsletterIssue";
import { getAdminSession } from "@/lib/auth/session";
import { uploadNewsletterPdf } from "@/lib/cloudinary/client";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  const issues = await NewsletterIssue.find().sort({ datePublished: -1 }).lean();
  return NextResponse.json({ issues });
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await request.formData();
    const title = formData.get("title");
    const datePublished = formData.get("datePublished");
    const file = formData.get("file");

    if (typeof title !== "string" || !title.trim()) {
      return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }
    if (typeof datePublished !== "string" || !datePublished) {
      return NextResponse.json({ error: "Date published is required." }, { status: 400 });
    }
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "A PDF file is required." }, { status: 400 });
    }
    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF files are supported." }, { status: 400 });
    }

    const MAX_BYTES = 25 * 1024 * 1024; // 25MB
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "PDF must be smaller than 25MB." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploaded = await uploadNewsletterPdf(buffer, file.name);

    await dbConnect();
    const issue = await NewsletterIssue.create({
      title: title.trim(),
      datePublished: new Date(datePublished),
      pdfUrl: uploaded.url,
      pdfPublicId: uploaded.publicId,
      fileSize: uploaded.bytes,
    });

    return NextResponse.json({ issue }, { status: 201 });
  } catch (err) {
    console.error("Create newsletter issue error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

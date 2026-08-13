import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/db/connect";
import { NewsletterIssue } from "@/lib/db/models/NewsletterIssue";
import { NewsletterUploadForm } from "@/components/admin/NewsletterUploadForm";

export const dynamic = "force-dynamic";

export default async function EditNewsletterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  await dbConnect();
  const issue = await NewsletterIssue.findById(id).lean();

  if (!issue) {
    notFound();
  }

  return (
    <NewsletterUploadForm
      mode="edit"
      initialData={{
        id: issue._id.toString(),
        title: issue.title,
        datePublished: issue.datePublished ? new Date(issue.datePublished).toISOString().slice(0, 10) : "",
        pdfUrl: issue.pdfUrl,
      }}
    />
  );
}

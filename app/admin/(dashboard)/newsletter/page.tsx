import Link from "next/link";
import { Plus } from "lucide-react";
import { dbConnect } from "@/lib/db/connect";
import { NewsletterIssue } from "@/lib/db/models/NewsletterIssue";
import { NewsletterIssueTable } from "@/components/admin/NewsletterIssueTable";

export const dynamic = "force-dynamic";

export default async function AdminNewsletterPage() {
  await dbConnect();
  const issues = await NewsletterIssue.find().sort({ datePublished: -1 }).lean();

  const serialized = issues.map((issue) => ({
    id: issue._id.toString(),
    title: issue.title,
    datePublished: issue.datePublished ? new Date(issue.datePublished).toISOString() : "",
    pdfUrl: issue.pdfUrl,
    fileSize: issue.fileSize ?? undefined,
  }));

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Newsletter</h1>
          <p className="mt-1 text-sm text-muted-light">
            Upload newsletter PDFs to the public archive.
          </p>
        </div>
        <Link
          href="/admin/newsletter/new"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-flame px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-flame-deep"
        >
          <Plus className="h-4 w-4" />
          Upload Newsletter
        </Link>
      </div>

      <NewsletterIssueTable initialIssues={serialized} />
    </div>
  );
}

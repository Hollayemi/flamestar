import { Mail, Eye, Download, FileText } from "lucide-react";
import { HomeWrapper } from "@/components/wrapper";
import { Hero } from "@/components/section/Hero";
import { dbConnect } from "@/lib/db/connect";
import { NewsletterIssue } from "@/lib/db/models/NewsletterIssue";
import { toDownloadUrl } from "@/lib/cloudinary/client";

export const dynamic = "force-dynamic";

function formatBytes(bytes?: number) {
  if (!bytes) return "";
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;
}

export default async function NewsletterArchivePage() {
  await dbConnect();
  const issues = await NewsletterIssue.find().sort({ datePublished: -1 }).lean();

  return (
    <HomeWrapper>
      <Hero
        eyebrow="Newsletter"
        title="Flamestar Market Pulse"
        description="Our newsletter archive, market snapshots, portfolio insights, and wealth strategy, available to view or download anytime."
        backgroundImage="/images/market-insight.webp"
      />

      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-10">
        {issues.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-black/12 px-6 py-20 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-paper-soft">
              <Mail className="h-5 w-5 text-muted-light" />
            </div>
            <p className="text-sm text-muted-light">No issues have been published yet. Check back soon.</p>
          </div>
        ) : (
          <ul className="flex flex-col gap-4">
            {issues.map((issue) => (
              <li
                key={issue._id.toString()}
                className="flex flex-col gap-4 rounded-2xl border border-black/8 bg-paper p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-flame/10">
                    <FileText className="h-5 w-5 text-flame" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-base font-semibold text-ink sm:text-lg">
                      {issue.title}
                    </p>
                    <p className="mt-1 text-xs text-muted-light">
                      {issue.datePublished
                        ? new Date(issue.datePublished).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })
                        : ""}
                      {issue.fileSize ? ` · ${formatBytes(issue.fileSize)}` : ""}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2 sm:ml-4">
                  <a
                    href={issue.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-black/10 px-4 py-2 text-xs font-medium text-ink/70 transition-colors hover:border-ink/30 hover:text-ink"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    View
                  </a>
                  <a
                    href={toDownloadUrl(issue.pdfUrl)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-flame px-4 py-2 text-xs font-medium text-paper transition-colors hover:bg-flame-deep"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </HomeWrapper>
  );
}

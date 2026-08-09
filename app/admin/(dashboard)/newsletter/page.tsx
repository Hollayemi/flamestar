import { Mail } from "lucide-react";

export default function AdminNewsletterPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Newsletter</h1>
        <p className="mt-1 text-sm text-muted-light">Newsletter management is coming soon.</p>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-black/12 bg-paper px-6 py-24 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-paper-soft">
          <Mail className="h-5 w-5 text-muted-light" />
        </div>
        <p className="text-sm text-muted-light">Nothing here yet.</p>
      </div>
    </div>
  );
}

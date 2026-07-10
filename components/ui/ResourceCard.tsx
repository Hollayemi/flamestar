import type { LucideIcon } from "lucide-react";

export type ResourceCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  span?: boolean;
};

export function ResourceCard({ icon: Icon, title, description, span = false }: ResourceCardProps) {
  return (
    <div className={`rounded-2xl border border-black/8 bg-paper p-6 ${span ? "sm:col-span-2" : ""}`}>
      <Icon className="h-6 w-6 text-signal" strokeWidth={1.75} />
      <h4 className="mt-4 text-base font-semibold text-ink">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-muted-light">{description}</p>
    </div>
  );
}

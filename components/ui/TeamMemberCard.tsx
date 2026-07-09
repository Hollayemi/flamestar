import Image from "next/image";

export type TeamMember = {
  name: string;
  role: string;
  photo: string;
};

export type TeamMemberCardProps = TeamMember & {
  active?: boolean;
  tone?: "flame" | "signal";
};

export function TeamMemberCard({
  name,
  role,
  photo,
  active = false,
  tone = "signal",
}: TeamMemberCardProps) {
  const ringColor = tone === "flame" ? "border-flame" : "border-signal";

  return (
    <div
      className={`overflow-hidden rounded-2xl border-2 transition-colors duration-300 ${active ? ringColor : "border-transparent"
        }`}
    >
      <div className="relative aspect-[4/5] w-full bg-paper-soft">
        <Image
          src={photo}
          alt={name}
          fill
          sizes="(min-width: 1024px) 33vw, 60vw"
          className="object-cover"
        />
        <div className="absolute bottom-4 left-4 px-3 py-2.5">
          <p className="text-sm text-white font-semibold">{name}</p>
          <p className="mt-0.5 text-[10px] uppercase tracking-wide text-muted-light">{role}</p>
        </div>
      </div>
    </div>
  );
}

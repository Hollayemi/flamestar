import Image from "next/image";
import Link from "next/link";
import { LogoutButton } from "./LogoutButton";

export function AdminHeader({ name, username }: { name: string; username: string }) {
  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-black/8 bg-paper px-4 sm:px-6">
      <div className="flex flex-1 items-center">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="Flamestar Capital" width={900} height={900} className="w-28 sm:w-32" />
        </Link>
      </div>

      <div className="flex flex-1 justify-center">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-light">
          Admin
        </span>
      </div>

      <div className="flex flex-1 items-center justify-end gap-3 sm:gap-4">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium leading-tight text-ink">{name}</p>
          <p className="text-xs leading-tight text-muted-light">@{username}</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-flame/10 font-display text-sm font-semibold text-flame">
          {name.trim().charAt(0).toUpperCase() || "A"}
        </div>
        <LogoutButton />
      </div>
    </header>
  );
}

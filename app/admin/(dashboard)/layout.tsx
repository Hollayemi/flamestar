import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/session";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminMobileNav } from "@/components/admin/AdminMobileNav";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();

  // Belt-and-braces: proxy.ts already redirects unauthenticated requests,
  // but this keeps the layout safe if rendered in any other context.
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader name={session.name} username={session.username} />
      <AdminMobileNav />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 px-4 py-6 sm:px-8 sm:py-8">{children}</main>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, ChevronDown, Flame, Menu, X } from "lucide-react";
import { primaryNav, type NavItem } from "@/lib/navigation";
import Image from "next/image";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openDesktop, setOpenDesktop] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobile, setOpenMobile] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${scrolled
        ? "bg-paper/90 backdrop-blur-md border-b border-black/8"
        : "bg-transparent border-b border-transparent"
        }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-6 md:px-0 py-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
            <Image src="/images/logo.png" alt="logo" className="w-40" width={900} height={900} />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex ml-10">
            {primaryNav.map((item) => (
              <div
                key={item.label}
                className="relative text-black"
                onMouseEnter={() => item.items && setOpenDesktop(item.label)}
                onMouseLeave={() => item.items && setOpenDesktop(null)}
              >
                {item.items ? (
                  <button
                    className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-ink/80 transition-colors hover:text-ink"
                    aria-expanded={openDesktop === item.label}
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${openDesktop === item.label ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href ?? "#"}
                    className="block rounded-full px-4 py-2 text-sm font-medium text-ink/80 transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                )}

                <AnimatePresence>
                  {item.items && openDesktop === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.16, ease: "easeOut" }}
                      className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3"
                    >
                      <div className="overflow-hidden rounded-2xl border border-black/8 bg-paper shadow-xl shadow-black/5">
                        {item.items.map((link) => (
                          <div className="relative" key={link.href}>
                            <Link
                              key={link.href}
                              href={link.href}
                              className="block px-5 py-3 transition-colors hover:bg-paper-soft"
                            >
                              <span className="block text-sm font-medium text-ink">
                                {link.label}
                              </span>
                              {link.description && (
                                <span className="mt-0.5 block text-xs text-muted-light">
                                  {link.description}
                                </span>
                              )}
                            </Link>
                            <ChevronRight size={16} className="absolute right-2 top-6 -translate-x-1/2 -translate-y-1.5 text-gray-500" />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 bg-gray-50 transition-colors hover:border-ink hover:bg-gray-200 hover:text-paper lg:block"
          >
            Client Login
          </Link>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden border-t border-black/8 bg-paper lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {primaryNav.map((item) => (
                <MobileNavItem
                  key={item.label}
                  item={item}
                  open={openMobile === item.label}
                  onToggle={() =>
                    setOpenMobile((v) => (v === item.label ? null : item.label))
                  }
                  onNavigate={() => setMobileOpen(false)}
                />
              ))}
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-full bg-ink px-5 py-3 text-center text-sm font-medium text-paper"
              >
                Client Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileNavItem({
  item,
  open,
  onToggle,
  onNavigate,
}: {
  item: NavItem;
  open: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  if (!item.items) {
    return (
      <Link
        href={item.href ?? "#"}
        onClick={onNavigate}
        className="rounded-lg px-3 py-3 text-base font-medium text-ink"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="rounded-lg">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-3 py-3 text-base font-medium text-ink"
        aria-expanded={open}
      >
        {item.label}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden pl-3"
          >
            {item.items.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onNavigate}
                className="block rounded-lg px-3 py-2 text-sm text-muted-light"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

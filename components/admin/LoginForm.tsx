"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Unable to sign in. Please try again.");
        setLoading(false);
        return;
      }

      router.push(from && from.startsWith("/admin") ? from : "/admin/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please check your connection and try again.");
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12">
      <Image
        src="/images/market-insight.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-ink/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/40" />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Image src="/images/logo.png" alt="Flamestar Capital" width={900} height={900} className="w-40" />
        </div>

        <div className="rounded-3xl border border-paper/15 bg-ink/50 p-8 shadow-2xl shadow-black/40 backdrop-blur-md sm:p-10">
          <div className="mb-7 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-paper/20 bg-paper/5 px-3.5 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-paper/70">
              <Lock className="h-3 w-3" />
              Admin Access
            </span>
            <h1 className="mt-4 font-display text-2xl font-semibold text-paper sm:text-3xl">
              Sign in to the dashboard
            </h1>
            <p className="mt-2 text-sm text-paper/60">
              Enter your credentials to manage Market Insights content.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="username" className="text-xs font-medium uppercase tracking-wide text-paper/60">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="rounded-xl border border-paper/15 bg-paper/5 px-4 py-3 text-sm text-paper placeholder:text-paper/30 outline-none transition-colors focus:border-flame/60 focus:bg-paper/10"
                placeholder="e.g. admin"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-xs font-medium uppercase tracking-wide text-paper/60">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-paper/15 bg-paper/5 px-4 py-3 pr-11 text-sm text-paper placeholder:text-paper/30 outline-none transition-colors focus:border-flame/60 focus:bg-paper/10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-paper/40 transition-colors hover:text-paper/80"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-lg border border-flame/30 bg-flame/10 px-3 py-2 text-sm text-flame">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-flame px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-flame-deep disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-paper/40">
          Flamestar Capital &middot; Internal Admin Panel
        </p>
      </div>
    </div>
  );
}

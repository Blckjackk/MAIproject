"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { GraduationCap, ArrowRight, ShieldCheck, Sparkles } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("admin@mai-institute.id")
  const [password, setPassword] = useState("admin123")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      router.push("/dashboard")
    }, 300)
  }

  return (
    <div className="flex min-h-screen flex-1 flex-col items-center justify-center bg-slate-50 p-6 dark:bg-zinc-950">
      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="mb-6 flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md ring-4 ring-primary/10">
            <GraduationCap className="h-7 w-7" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">MAI Institute</h1>
            <p className="text-sm font-medium text-muted-foreground">Admin Monitoring Dashboard</p>
            <p className="mt-0.5 text-xs text-muted-foreground/80">Beasiswa Bintang Mandiri Angkatan 6 (BBM 6)</p>
          </div>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-foreground">Masuk Admin</h2>
              <p className="text-xs text-muted-foreground">Akun demo sudah otomatis terisi</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" /> Demo Mode
            </span>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground" htmlFor="email">
                Email Admin
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground" htmlFor="password">
                Kata Sandi
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow active:scale-[0.99] disabled:opacity-70"
            >
              {isLoading ? "Memproses..." : "Masuk ke Dashboard"}
              {!isLoading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          {/* Direct 1-Click bypass button */}
          <div className="mt-4 border-t border-border/60 pt-4 text-center">
            <Link
              href="/dashboard"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-muted/50 py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              Langsung Masuk Tanpa Login (1-Klik Preview)
            </Link>
          </div>

          <div className="mt-5 rounded-lg border border-blue-200 bg-blue-50/70 p-3 text-[11px] text-blue-800 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300">
            <strong>Info Spesifikasi (TBD-01):</strong> Metode autentikasi final (Google Workspace SSO atau email/password khusus admin) sedang menunggu keputusan MAI. Di tahap prototipe ini, tombol langsung aktif.
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Sesuai spesifikasi, Beswan dan Mentor tidak memiliki akun atau dashboard.
        </p>
      </div>
    </div>
  )
}

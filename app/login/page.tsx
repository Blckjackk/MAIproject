"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowRight, ShieldCheck, Sparkles, Lock, Mail } from "lucide-react"
import { MaiInstituteLogo, BintangMandiriBadge, MandiriAmalInsaniBadge } from "@/components/mai-logo"

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
    }, 400)
  }

  return (
    <div className="relative flex min-h-screen flex-1 flex-col items-center justify-center bg-[#F6F8FB] p-6 overflow-hidden">
      {/* Decorative Geometric Motifs in Background (MAI Style) */}
      <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[#1769AA]/5 blur-3xl pointer-events-none" />
      <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-[#27A9A5]/10 blur-3xl pointer-events-none" />

      {/* Subtle geometric pattern top right */}
      <div className="absolute right-10 top-10 opacity-20 hidden md:block pointer-events-none select-none">
        <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
          <rect x="10" y="10" width="30" height="30" rx="6" fill="#12345B" />
          <rect x="50" y="10" width="30" height="30" rx="6" fill="#F5C928" />
          <rect x="10" y="50" width="30" height="30" rx="6" fill="#27A9A5" />
          <rect x="50" y="50" width="30" height="30" rx="6" fill="#F28C28" />
        </svg>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Brand & Partner Badges */}
        <div className="mb-6 flex flex-col items-center gap-3">
          <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-2xl border border-[#E5EAF1] shadow-xs">
            <MaiInstituteLogo />
            <div className="h-6 w-px bg-slate-200" />
            <MandiriAmalInsaniBadge />
          </div>
          <BintangMandiriBadge />
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-[#E5EAF1] bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between border-b border-[#E5EAF1] pb-4">
            <div>
              <h2 className="text-base font-bold text-[#12345B]">Masuk Dashboard Admin</h2>
              <p className="text-xs text-[#64748B]">Monitoring Beasiswa Bintang Mandiri 6</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 border border-emerald-200">
              <ShieldCheck className="h-3.5 w-3.5" /> Khusus Admin
            </span>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#172033]" htmlFor="email">
                Email Akun Admin
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-[#64748B]" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@mai-institute.id"
                  className="w-full rounded-lg border border-[#E5EAF1] bg-white pl-9 pr-3 py-2.5 text-sm text-[#172033] focus:border-[#1769AA] focus:outline-none focus:ring-2 focus:ring-[#1769AA]/20"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#172033]" htmlFor="password">
                Kata Sandi
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-[#64748B]" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-[#E5EAF1] bg-white pl-9 pr-3 py-2.5 text-sm text-[#172033] focus:border-[#1769AA] focus:outline-none focus:ring-2 focus:ring-[#1769AA]/20"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#12345B] hover:bg-[#1769AA] py-2.5 text-sm font-semibold text-white shadow-xs transition-all active:scale-[0.99] disabled:opacity-70"
            >
              {isLoading ? "Mengalihkan..." : "Masuk ke Dashboard"}
              {!isLoading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          {/* Direct 1-Click bypass button */}
          <div className="mt-4 border-t border-[#E5EAF1] pt-4 text-center">
            <Link
              href="/dashboard"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#E5EAF1] bg-[#F6F8FB] hover:bg-[#EFF4FA] py-2.5 text-xs font-semibold text-[#12345B] transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#F28C28]" />
              Masuk Langsung (1-Klik Mode Pratinjau)
            </Link>
          </div>

          <div className="mt-5 rounded-lg border border-[#1769AA]/20 bg-[#EFF4FA] p-3 text-[11px] text-[#12345B]">
            <strong>Catatan Desain & Autentikasi (TBD-01):</strong> Mekanisme autentikasi final (Google Workspace MAI atau password internal) menunggu konfirmasi stakeholder. Tombol demo langsung aktif.
          </div>
        </div>

        <p className="mt-5 text-center text-[11px] text-[#64748B]">
          Sesuai spesifikasi, Beswan dan Mentor tidak memiliki akun di sistem ini.
        </p>
      </div>
    </div>
  )
}

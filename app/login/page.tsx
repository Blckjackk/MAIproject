"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowRight, Lock, Mail } from "lucide-react"
import { MaiInstituteLogo } from "@/components/mai-logo"

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
    <div className="flex min-h-screen flex-1 flex-col items-center justify-center bg-[#F8F9FA] p-6">
      <div className="w-full max-w-sm">
        {/* Brand Header */}
        <div className="mb-6 flex flex-col items-center text-center">
          <MaiInstituteLogo />
          <p className="mt-3 text-xs font-medium text-[#5F6368]">
            Sistem Monitoring Beasiswa Bintang Mandiri Angkatan 6
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-xl border border-[#DADCE0] bg-white p-8 shadow-xs">
          <div className="mb-6">
            <h1 className="text-lg font-semibold text-[#202124]">Masuk Admin</h1>
            <p className="text-xs text-[#5F6368] mt-1">
              Gunakan kredensial pengelola MAI Institute untuk melanjutkan
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-[#202124]" htmlFor="email">
                Email
              </label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-[#5F6368]" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@mai-institute.id"
                  className="w-full rounded-lg border border-[#DADCE0] bg-white pl-9 pr-3 py-2 text-xs text-[#202124] placeholder-[#5F6368] focus:border-[#1A73E8] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-[#202124]" htmlFor="password">
                Kata Sandi
              </label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-[#5F6368]" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-[#DADCE0] bg-white pl-9 pr-3 py-2 text-xs text-[#202124] placeholder-[#5F6368] focus:border-[#1A73E8] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#1A73E8] py-2 text-xs font-medium text-white transition-colors hover:bg-[#1557B0] disabled:opacity-50"
            >
              <span>{isLoading ? "Mengalihkan..." : "Masuk ke Dashboard"}</span>
              {!isLoading && <ArrowRight className="h-3.5 w-3.5" />}
            </button>
          </form>

          {/* Quick Preview Link */}
          <div className="mt-4 border-t border-[#E8EAED] pt-4 text-center">
            <Link
              href="/dashboard"
              className="inline-flex w-full items-center justify-center rounded-lg border border-[#DADCE0] bg-white py-2 text-xs font-medium text-[#3C4043] transition-colors hover:bg-[#F8F9FA]"
            >
              Masuk Langsung (Mode Pratinjau)
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-[11px] text-[#5F6368]">
          Portal ini hanya diperuntukkan bagi admin operasional BBM 6.
        </p>
      </div>
    </div>
  )
}

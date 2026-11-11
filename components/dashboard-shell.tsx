"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  MapPin,
  Star,
  CheckSquare,
  BookOpen,
  UserCheck,
  Database,
  Settings,
  RefreshCw,
  Bell,
  LogOut,
  ChevronRight,
  Check,
  X,
  Shield,
  Layers,
} from "lucide-react"
import { cn } from "cn"
import { MaiInstituteLogo, BintangMandiriBadge, MandiriAmalInsaniBadge } from "@/components/mai-logo"

interface NavGroup {
  groupName: string
  items: {
    href: string
    label: string
    icon: React.ElementType
    badge?: string
    badgeColor?: string
  }[]
}

const navGroups: NavGroup[] = [
  {
    groupName: "Ringkasan",
    items: [
      { href: "/dashboard", label: "Dashboard Utama", icon: LayoutDashboard },
    ],
  },
  {
    groupName: "Monitoring Kegiatan",
    items: [
      { href: "/dashboard/pembinaan-nasional", label: "Pembinaan Nasional", icon: BookOpen, badge: "6 Komponen", badgeColor: "bg-[#27A9A5]/10 text-[#0f6c6a]" },
      { href: "/dashboard/mentorship", label: "Mentorship", icon: UserCheck, badge: "1 Form", badgeColor: "bg-[#1769AA]/10 text-[#1769AA]" },
      { href: "/dashboard/penugasan", label: "Penugasan BA", icon: CheckSquare, badge: "Validasi", badgeColor: "bg-[#F28C28]/10 text-[#b5580a]" },
      { href: "/dashboard/prestasi", label: "Prestasi Beswan", icon: Star, badge: "Sep–Nov", badgeColor: "bg-[#F5C928]/20 text-[#856404]" },
    ],
  },
  {
    groupName: "Data & Master",
    items: [
      { href: "/dashboard/data-beswan", label: "Data Beswan", icon: Users, badge: "121", badgeColor: "bg-slate-100 text-slate-700" },
      { href: "/dashboard/wilayah", label: "Wilayah & Mentor", icon: MapPin, badge: "8 Kelompok", badgeColor: "bg-slate-100 text-slate-700" },
      { href: "/dashboard/integrasi-data", label: "Integrasi Sheets", icon: Database, badge: "SRC 1-3", badgeColor: "bg-emerald-50 text-emerald-700" },
      { href: "/dashboard/pengaturan", label: "Pengaturan & TBD", icon: Settings },
    ],
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-full w-64 flex-col border-r border-[#E5EAF1] bg-white shadow-xs">
      {/* Brand Header */}
      <div className="flex flex-col gap-2.5 border-b border-[#E5EAF1] px-5 py-4 bg-gradient-to-b from-[#F6F8FB] to-white">
        <MaiInstituteLogo />
        <div className="flex items-center justify-between pt-1">
          <BintangMandiriBadge />
          <span className="text-[10px] font-mono font-medium text-[#64748B]">2025/2026</span>
        </div>
      </div>

      {/* Nav Groups */}
      <nav className="flex-1 overflow-y-auto px-3.5 py-4 space-y-5">
        {navGroups.map((group) => (
          <div key={group.groupName}>
            <p className="mb-1.5 px-2.5 text-[10px] font-bold uppercase tracking-wider text-[#64748B]/80">
              {group.groupName}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive =
                  item.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(item.href)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-all",
                        isActive
                          ? "bg-[#12345B] text-white shadow-xs font-semibold"
                          : "text-[#172033] hover:bg-[#EFF4FA] hover:text-[#12345B]"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-4 w-4 shrink-0 transition-colors",
                          isActive ? "text-white" : "text-[#64748B] group-hover:text-[#1769AA]"
                        )}
                      />
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge && (
                        <span
                          className={cn(
                            "rounded px-1.5 py-0.5 text-[9px] font-bold tracking-tight",
                            isActive ? "bg-white/20 text-white" : item.badgeColor
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                      {isActive && <ChevronRight className="h-3.5 w-3.5 text-white/70" />}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer / Admin Account Card */}
      <div className="border-t border-[#E5EAF1] p-3.5 bg-[#F6F8FB]/50">
        <div className="flex items-center gap-3 rounded-lg border border-[#E5EAF1] bg-white p-2.5 shadow-2xs">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#12345B] text-xs font-bold text-white shadow-2xs">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-xs font-bold text-[#172033]">Admin BBM 6</p>
            <p className="truncate text-[10px] text-[#64748B]">admin@mai-institute.id</p>
          </div>
          <Link
            href="/login"
            title="Keluar dari Dashboard"
            className="text-[#64748B] hover:text-[#DC2626] transition-colors p-1 rounded hover:bg-slate-100"
          >
            <LogOut className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </aside>
  )
}

export function DashboardHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const [isSyncing, setIsSyncing] = useState(false)
  const [showSyncSuccess, setShowSyncSuccess] = useState(false)
  const [showNotificationPopover, setShowNotificationPopover] = useState(false)

  const handleSync = () => {
    setIsSyncing(true)
    setTimeout(() => {
      setIsSyncing(false)
      setShowSyncSuccess(true)
      setTimeout(() => setShowSyncSuccess(false), 3500)
    }, 1200)
  }

  return (
    <header className="relative flex items-center justify-between border-b border-[#E5EAF1] bg-white px-6 py-3.5 shadow-2xs">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold text-[#12345B] tracking-tight">{title}</h1>
        </div>
        {subtitle && <p className="text-xs text-[#64748B] mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {/* Source Status Indicator */}
        <div className="hidden sm:flex items-center gap-2 rounded-full border border-[#E5EAF1] bg-[#F6F8FB] px-3 py-1 text-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-medium text-[#172033]">
            Sheets: <strong className="text-emerald-700 font-semibold">2 / 3 Aktif</strong>
          </span>
        </div>

        {showSyncSuccess && (
          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 animate-in fade-in">
            <Check className="h-3.5 w-3.5" /> Sinkronisasi selesai
          </span>
        )}

        {/* Sync Button in MAI Navy/Blue */}
        <button
          onClick={handleSync}
          disabled={isSyncing}
          className="flex items-center gap-2 rounded-lg bg-[#12345B] hover:bg-[#1769AA] px-3 py-1.5 text-xs font-semibold text-white transition-all shadow-2xs active:scale-95 disabled:opacity-60"
        >
          <RefreshCw className={cn("h-3.5 w-3.5", isSyncing && "animate-spin")} />
          {isSyncing ? "Membaca..." : "Sinkronisasi"}
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotificationPopover(!showNotificationPopover)}
            className="relative rounded-lg border border-[#E5EAF1] bg-white p-2 text-[#64748B] hover:bg-[#F6F8FB] hover:text-[#12345B] transition-colors"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#DC2626] text-[9px] font-bold text-white ring-2 ring-white">
              3
            </span>
          </button>

          {showNotificationPopover && (
            <div className="absolute right-0 top-11 z-50 w-80 rounded-xl border border-[#E5EAF1] bg-white p-4 shadow-xl animate-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-[#E5EAF1] pb-2.5">
                <p className="text-xs font-bold text-[#12345B]">Pemberitahuan Sistem</p>
                <button onClick={() => setShowNotificationPopover(false)} className="text-[#64748B] hover:text-[#172033]">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="mt-2 divide-y divide-[#E5EAF1]/70 text-xs">
                <div className="py-2.5">
                  <p className="font-semibold text-[#172033]">24 Tugas Menunggu Validasi</p>
                  <p className="text-[10px] text-[#64748B] mt-0.5">Penugasan Brand Ambassador membutuhkan keputusan admin.</p>
                </div>
                <div className="py-2.5">
                  <p className="font-semibold text-[#F28C28]">8 NID Asing di Spreadsheet SRC-01</p>
                  <p className="text-[10px] text-[#64748B] mt-0.5">Respons form perlu dipetakan ke master beswan.</p>
                </div>
                <div className="py-2.5">
                  <p className="font-semibold text-[#DC2626]">Koneksi Spreadsheet Prestasi (SRC-03) Gagal</p>
                  <p className="text-[10px] text-[#64748B] mt-0.5">Izin akses service account Viewer belum diberikan di Google Drive.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

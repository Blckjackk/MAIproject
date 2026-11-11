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
} from "lucide-react"
import { cn } from "cn"
import { MaiInstituteLogo } from "@/components/mai-logo"

interface NavGroup {
  groupName: string
  items: {
    href: string
    label: string
    icon: React.ElementType
  }[]
}

const navGroups: NavGroup[] = [
  {
    groupName: "RINGKASAN",
    items: [
      { href: "/dashboard", label: "Dashboard Utama", icon: LayoutDashboard },
    ],
  },
  {
    groupName: "MONITORING KEGIATAN",
    items: [
      { href: "/dashboard/pembinaan-nasional", label: "Pembinaan Nasional", icon: BookOpen },
      { href: "/dashboard/mentorship", label: "Mentorship", icon: UserCheck },
      { href: "/dashboard/penugasan", label: "Penugasan BA", icon: CheckSquare },
      { href: "/dashboard/prestasi", label: "Prestasi Beswan", icon: Star },
    ],
  },
  {
    groupName: "DATA & MASTER",
    items: [
      { href: "/dashboard/data-beswan", label: "Data Beswan", icon: Users },
      { href: "/dashboard/wilayah", label: "Wilayah & Mentor", icon: MapPin },
      { href: "/dashboard/integrasi-data", label: "Integrasi Sheets", icon: Database },
      { href: "/dashboard/pengaturan", label: "Pengaturan", icon: Settings },
    ],
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-full w-[256px] shrink-0 flex-col border-r border-[#E8EAED] bg-[#FFFFFF]">
      {/* Branding Header */}
      <div className="flex flex-col border-b border-[#E8EAED] px-6 py-5">
        <MaiInstituteLogo />
        <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-medium text-[#5F6368]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#27A9A5]" />
          <span>BBM Angkatan 6 (2025/2026)</span>
        </div>
      </div>

      {/* Nav Groups */}
      <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-6">
        {navGroups.map((group) => (
          <div key={group.groupName}>
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-[#70757A]">
              {group.groupName}
            </p>
            <ul className="space-y-1">
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
                        "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-[#E8F0FE] text-[#1967D2] font-semibold"
                          : "text-[#3C4043] hover:bg-[#F1F3F4] hover:text-[#202124]"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-4.5 w-4.5 shrink-0 transition-colors",
                          isActive ? "text-[#1967D2]" : "text-[#5F6368] group-hover:text-[#202124]"
                        )}
                      />
                      <span className="flex-1 truncate">{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Admin Profile Footer */}
      <div className="border-t border-[#E8EAED] p-4">
        <div className="flex items-center gap-3 px-2 py-1.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F0FE] text-xs font-semibold text-[#1967D2]">
            AM
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-xs font-semibold text-[#202124]">Admin MAI</p>
            <p className="truncate text-[11px] text-[#5F6368]">admin@mai-institute.id</p>
          </div>
          <Link
            href="/login"
            title="Keluar"
            className="text-[#5F6368] hover:text-[#D93025] transition-colors p-1.5 rounded-md hover:bg-[#F1F3F4]"
          >
            <LogOut className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </aside>
  )
}

export function DashboardHeader({
  title,
  subtitle,
  actions,
}: {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}) {
  const [isSyncing, setIsSyncing] = useState(false)
  const [showSyncSuccess, setShowSyncSuccess] = useState(false)
  const [showNotificationPopover, setShowNotificationPopover] = useState(false)

  const handleSync = () => {
    setIsSyncing(true)
    setTimeout(() => {
      setIsSyncing(false)
      setShowSyncSuccess(true)
      setTimeout(() => setShowSyncSuccess(false), 3000)
    }, 1000)
  }

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#E8EAED] bg-[#FFFFFF] px-8">
      <div>
        <h1 className="text-xl font-semibold text-[#202124] tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-[#5F6368] mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {actions}

        {showSyncSuccess && (
          <span className="inline-flex items-center gap-1 rounded-md bg-[#E6F4EA] px-2.5 py-1 text-xs font-medium text-[#137333] transition-all">
            <Check className="h-3.5 w-3.5" /> Sinkronisasi selesai
          </span>
        )}

        {/* Sync Button — Visually secondary as requested */}
        <button
          onClick={handleSync}
          disabled={isSyncing}
          className="flex items-center gap-1.5 rounded-lg border border-[#DADCE0] bg-[#FFFFFF] px-3 py-1.5 text-xs font-medium text-[#3C4043] transition-colors hover:bg-[#F8F9FA] hover:text-[#202124] disabled:opacity-50"
        >
          <RefreshCw className={cn("h-3.5 w-3.5 text-[#5F6368]", isSyncing && "animate-spin text-[#1967D2]")} />
          <span>{isSyncing ? "Menyinkronkan..." : "Sinkronisasi"}</span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotificationPopover(!showNotificationPopover)}
            className="relative flex h-8 w-8 items-center justify-center rounded-full text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#202124] transition-colors"
          >
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#D93025]" />
          </button>

          {showNotificationPopover && (
            <div className="absolute right-0 top-11 z-50 w-76 rounded-xl border border-[#DADCE0] bg-[#FFFFFF] p-4 shadow-lg">
              <div className="flex items-center justify-between border-b border-[#E8EAED] pb-2.5">
                <p className="text-xs font-semibold text-[#202124]">Notifikasi</p>
                <button
                  onClick={() => setShowNotificationPopover(false)}
                  className="text-[#5F6368] hover:text-[#202124]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-2 divide-y divide-[#F1F3F4] text-xs">
                <div className="py-2.5">
                  <p className="font-medium text-[#202124]">24 Tugas Menunggu Validasi</p>
                  <p className="text-[11px] text-[#5F6368] mt-0.5">Penugasan Brand Ambassador perlu ditinjau admin.</p>
                </div>
                <div className="py-2.5">
                  <p className="font-medium text-[#B06000]">8 NID Perlu Pemetaan di SRC-01</p>
                  <p className="text-[11px] text-[#5F6368] mt-0.5">Ditemukan respons form dengan NID di luar master.</p>
                </div>
                <div className="py-2.5">
                  <p className="font-medium text-[#D93025]">Izin Baca SRC-03 Gagal</p>
                  <p className="text-[11px] text-[#5F6368] mt-0.5">Service account belum ditambahkan sebagai Viewer.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

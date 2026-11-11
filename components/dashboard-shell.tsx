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
  GraduationCap,
  RefreshCw,
  Bell,
  LogOut,
  ChevronRight,
  Check,
  X,
  ExternalLink,
} from "lucide-react"
import { cn } from "cn"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/pembinaan-nasional", label: "Pembinaan Nasional", icon: BookOpen },
  { href: "/dashboard/mentorship", label: "Mentorship", icon: UserCheck },
  { href: "/dashboard/penugasan", label: "Penugasan Brand Ambassador", icon: CheckSquare },
  { href: "/dashboard/prestasi", label: "Prestasi Beswan", icon: Star },
  { href: "/dashboard/data-beswan", label: "Data Beswan", icon: Users },
  { href: "/dashboard/wilayah", label: "Wilayah & Mentor", icon: MapPin },
  { href: "/dashboard/integrasi-data", label: "Integrasi Data", icon: Database },
  { href: "/dashboard/pengaturan", label: "Pengaturan", icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-full w-64 flex-col border-r border-border bg-sidebar">
      {/* Logo / Header */}
      <div className="flex items-center gap-3 border-b border-border px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-2xs">
          <GraduationCap className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-bold leading-tight text-sidebar-foreground">MAI Institute</p>
          <p className="text-[11px] text-muted-foreground">Admin Monitoring BBM 6</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Menu Navigasi
        </p>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-2xs font-semibold"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1 truncate">{item.label}</span>
                  {isActive && <ChevronRight className="h-3.5 w-3.5 opacity-60" />}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-xs font-semibold text-sidebar-foreground">Admin MAI</p>
            <p className="truncate text-[10px] text-muted-foreground">admin@mai-institute.id</p>
          </div>
          <Link
            href="/login"
            title="Keluar"
            className="text-muted-foreground hover:text-destructive transition-colors p-1 rounded hover:bg-muted"
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
    <header className="relative flex items-center justify-between border-b border-border bg-background px-6 py-4">
      <div>
        <h1 className="text-lg font-bold text-foreground leading-tight">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-2.5">
        {showSyncSuccess && (
          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 animate-in fade-in">
            <Check className="h-3.5 w-3.5" /> Sinkronisasi selesai
          </span>
        )}

        <button
          onClick={handleSync}
          disabled={isSyncing}
          className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground transition-all hover:bg-muted hover:border-foreground/20 active:scale-95 disabled:opacity-50 shadow-2xs"
        >
          <RefreshCw className={cn("h-3.5 w-3.5 text-muted-foreground", isSyncing && "animate-spin text-primary")} />
          {isSyncing ? "Membaca Sheets..." : "Sinkronisasi"}
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotificationPopover(!showNotificationPopover)}
            className="relative rounded-lg border border-border bg-background p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground ring-2 ring-background">
              3
            </span>
          </button>

          {showNotificationPopover && (
            <div className="absolute right-0 top-11 z-50 w-80 rounded-xl border border-border bg-card p-4 shadow-xl animate-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-border pb-2.5">
                <p className="text-xs font-bold text-foreground">Notifikasi Monitoring</p>
                <button onClick={() => setShowNotificationPopover(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="mt-2 divide-y divide-border/60 text-xs">
                <div className="py-2">
                  <p className="font-semibold text-foreground">24 Tugas Menunggu Validasi</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Penugasan Brand Ambassador perlu diperiksa admin.</p>
                </div>
                <div className="py-2">
                  <p className="font-semibold text-amber-600">8 NID Tidak Dikenal di SRC-01</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Respons form perlu pemetaan di tab Integrasi Data.</p>
                </div>
                <div className="py-2">
                  <p className="font-semibold text-red-600">SRC-03 Akses Ditolak</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Spreadsheet Prestasi belum dibagikan ke service account.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

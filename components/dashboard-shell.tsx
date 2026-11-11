"use client"

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
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <GraduationCap className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <p className="text-sm font-semibold leading-tight text-sidebar-foreground">MAI Institute</p>
          <p className="text-xs text-muted-foreground">Admin Dashboard</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Menu Utama</p>
        <ul className="space-y-0.5">
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
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  {isActive && <ChevronRight className="h-3 w-3 opacity-60" />}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-xs font-medium text-sidebar-foreground">Admin MAI</p>
            <p className="truncate text-[10px] text-muted-foreground">admin@mai-institute.id</p>
          </div>
          <button className="text-muted-foreground hover:text-destructive transition-colors">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}

export function DashboardHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="flex items-center justify-between border-b border-border bg-background px-6 py-4">
      <div>
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">
        <button
          className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Sinkronisasi
        </button>
        <button className="relative rounded-lg border border-border bg-background p-1.5 text-muted-foreground hover:bg-muted">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-destructive text-[8px] font-bold text-white">3</span>
        </button>
      </div>
    </header>
  )
}


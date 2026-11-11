import { DashboardHeader } from "@/components/dashboard-shell"
import {
  kpiDashboard,
  sumberDataList,
  rekapPembinaanWilayah,
} from "@/lib/mock-data"
import {
  Users,
  BookOpen,
  UserCheck,
  CheckSquare,
  Star,
  AlertTriangle,
  Clock,
  TrendingUp,
  CircleAlert,
  CircleCheck,
  CircleX,
} from "lucide-react"

function KpiCard({
  label,
  value,
  sub,
  icon: Icon,
  color = "default",
  href,
}: {
  label: string
  value: string | number
  sub?: string
  icon: React.ElementType
  color?: "default" | "green" | "amber" | "red" | "blue"
  href?: string
}) {
  const colorMap = {
    default: "text-foreground bg-muted/40",
    green: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40",
    amber: "text-amber-600 bg-amber-50 dark:bg-amber-950/40",
    red: "text-red-600 bg-red-50 dark:bg-red-950/40",
    blue: "text-blue-600 bg-blue-50 dark:bg-blue-950/40",
  }

  const content = (
    <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-xs hover:shadow-sm transition-shadow">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${colorMap[color]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="mt-1 text-2xl font-bold leading-none text-foreground">{value}</p>
        {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
      </div>
    </div>
  )

  if (href) {
    return <a href={href}>{content}</a>
  }
  return content
}

function StatusBadge({ status }: { status: string }) {
  if (status === "Terhubung") return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
      <CircleCheck className="h-3 w-3" /> Terhubung
    </span>
  )
  if (status === "Gagal") return (
    <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-950/40 dark:text-red-400">
      <CircleX className="h-3 w-3" /> Gagal
    </span>
  )
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
      <CircleAlert className="h-3 w-3" /> {status}
    </span>
  )
}

export default function DashboardPage() {
  const kpi = kpiDashboard

  return (
    <div className="flex flex-col flex-1 overflow-y-auto">
      <DashboardHeader
        title="Dashboard"
        subtitle="Beasiswa Bintang Mandiri Angkatan 6 — Ringkasan Program"
      />

      <div className="flex-1 space-y-6 p-6">
        {/* KPI Cards */}
        <section>
          <h2 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">Ringkasan Program</h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <KpiCard
              label="Total Beswan"
              value={kpi.totalBeswan}
              sub={`Target: ${kpi.targetBeswan} — ⚠ Perlu verifikasi master`}
              icon={Users}
              color="blue"
              href="/dashboard/data-beswan"
            />
            <KpiCard
              label="Rata-rata Kehadiran Pembinaan"
              value={`${kpi.rataRataKehadiranPembinaan}%`}
              sub="Dari 5 komponen utama"
              icon={BookOpen}
              color="green"
              href="/dashboard/pembinaan-nasional"
            />
            <KpiCard
              label="Rata-rata Kehadiran Mentorship"
              value={`${kpi.rataRataKehadiranMentorship}%`}
              sub="Seluruh periode aktif"
              icon={UserCheck}
              color="green"
              href="/dashboard/mentorship"
            />
            <KpiCard
              label="Tugas Diterima"
              value={`${kpi.persentaseTugasDiterima}%`}
              sub="Valid completion rate"
              icon={CheckSquare}
              color="blue"
              href="/dashboard/penugasan"
            />
          </div>
        </section>

        {/* Needs Attention Row */}
        <section>
          <h2 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">Perlu Tindakan Admin</h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <KpiCard
              label="Menunggu Validasi"
              value={kpi.jumlahMenungguValidasi}
              sub="Tugas yang belum diperiksa"
              icon={Clock}
              color="amber"
              href="/dashboard/penugasan"
            />
            <KpiCard
              label="Belum Mengumpulkan"
              value={kpi.jumlahBelumMengumpulkan}
              sub="Beswan tanpa submission"
              icon={AlertTriangle}
              color="red"
              href="/dashboard/penugasan"
            />
            <KpiCard
              label="NID Bermasalah"
              value={kpi.jumlahNidBermasalah}
              sub="NID tidak dikenal / duplikat"
              icon={AlertTriangle}
              color="red"
              href="/dashboard/integrasi-data"
            />
            <KpiCard
              label="Prestasi Dilaporkan"
              value={kpi.jumlahPrestasi}
              sub="Sejak September 2026"
              icon={Star}
              color="blue"
              href="/dashboard/prestasi"
            />
          </div>
        </section>

        {/* Rekap Wilayah + Status Sumber */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Rekap Pembinaan per Wilayah */}
          <div className="lg:col-span-3 rounded-xl border border-border bg-card shadow-xs">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Rekap Kehadiran Pembinaan per Wilayah</h3>
                <p className="text-xs text-muted-foreground">5 komponen utama (tidak termasuk Opening Program)</p>
              </div>
              <a href="/dashboard/pembinaan-nasional" className="text-xs font-medium text-primary hover:underline">Lihat detail →</a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Wilayah</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-muted-foreground">Mentor</th>
                    <th className="px-3 py-3 text-right text-xs font-semibold text-muted-foreground">Beswan</th>
                    <th className="px-5 py-3 text-right text-xs font-semibold text-muted-foreground">Kehadiran</th>
                  </tr>
                </thead>
                <tbody>
                  {rekapPembinaanWilayah.map((w) => (
                    <tr key={w.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3 text-xs font-medium text-foreground">{w.wilayah.split("–")[0].trim()}</td>
                      <td className="px-3 py-3 text-xs text-muted-foreground">{w.mentor}</td>
                      <td className="px-3 py-3 text-right text-xs text-foreground">{w.jumlahBeswan}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                            <div
                              className={`h-full rounded-full ${w.persentase >= 75 ? "bg-emerald-500" : w.persentase >= 50 ? "bg-amber-500" : "bg-red-500"}`}
                              style={{ width: `${w.persentase}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-foreground w-10 text-right">{w.persentase}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Status Sumber Data */}
          <div className="lg:col-span-2 rounded-xl border border-border bg-card shadow-xs">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Status Integrasi Data</h3>
                <p className="text-xs text-muted-foreground">Terakhir: {kpi.waktuSinkronisasiTerakhir}</p>
              </div>
              <a href="/dashboard/integrasi-data" className="text-xs font-medium text-primary hover:underline">Detail →</a>
            </div>
            <div className="divide-y divide-border/50">
              {sumberDataList.map((src) => (
                <div key={src.id} className="px-5 py-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-foreground truncate">{src.nama}</p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground leading-relaxed">{src.kegunaan}</p>
                    </div>
                    <StatusBadge status={src.statusKoneksi} />
                  </div>
                  {src.statusKoneksi === "Terhubung" && (
                    <div className="mt-2 flex gap-3 text-[10px] text-muted-foreground">
                      <span>{src.jumlahBaris} baris</span>
                      <span>·</span>
                      <span className="text-emerald-600">{src.jumlahDipetakan} dipetakan</span>
                      {src.jumlahNidTidakDikenal > 0 && (
                        <>
                          <span>·</span>
                          <span className="text-red-600">{src.jumlahNidTidakDikenal} NID asing</span>
                        </>
                      )}
                    </div>
                  )}
                  {src.pesanError && (
                    <p className="mt-2 text-[10px] text-red-600 leading-relaxed">{src.pesanError}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trend section placeholder */}
        <div className="rounded-xl border border-border bg-card shadow-xs p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-foreground">Tren Kehadiran Mentorship per Periode</h3>
          </div>
          <div className="flex items-end justify-around gap-2 h-32 px-4">
            {[62, 70, 68, 74, 72, null].map((val, i) => (
              <div key={i} className="flex flex-col items-center gap-1 flex-1">
                {val !== null ? (
                  <>
                    <span className="text-[10px] font-semibold text-foreground">{val}%</span>
                    <div className="w-full rounded-t-sm bg-primary/80" style={{ height: `${(val / 100) * 100}px` }} />
                  </>
                ) : (
                  <>
                    <span className="text-[10px] text-muted-foreground">–</span>
                    <div className="w-full rounded-t-sm bg-muted border-2 border-dashed border-border" style={{ height: "40px" }} />
                  </>
                )}
                <span className="text-[10px] text-muted-foreground">#{i + 1}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[10px] text-muted-foreground text-center">Mentoring #6 belum berlangsung. Data dari sumber Google Sheets aktif.</p>
        </div>
      </div>
    </div>
  )
}


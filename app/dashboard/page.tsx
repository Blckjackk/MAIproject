import { DashboardHeader } from "@/components/dashboard-shell"
import {
  kpiDashboard,
  sumberDataList,
  rekapPembinaanWilayah,
  periodeMentorship,
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
  ExternalLink,
  ArrowUpRight,
  ShieldAlert,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

function KpiCard({
  label,
  value,
  sub,
  icon: Icon,
  accentColor = "blue",
  href,
}: {
  label: string
  value: string | number
  sub?: string
  icon: React.ElementType
  accentColor?: "navy" | "blue" | "teal" | "amber" | "red" | "green"
  href?: string
}) {
  const colorMap = {
    navy: "text-[#12345B] bg-[#12345B]/10 border-[#12345B]/20",
    blue: "text-[#1769AA] bg-[#1769AA]/10 border-[#1769AA]/20",
    teal: "text-[#27A9A5] bg-[#27A9A5]/10 border-[#27A9A5]/20",
    amber: "text-[#F28C28] bg-[#F28C28]/10 border-[#F28C28]/20",
    red: "text-[#DC2626] bg-[#DC2626]/10 border-[#DC2626]/20",
    green: "text-emerald-700 bg-emerald-50 border-emerald-200",
  }

  const content = (
    <div className="group relative flex flex-col justify-between rounded-xl border border-[#E5EAF1] bg-white p-5 shadow-xs transition-all hover:border-[#1769AA]/40 hover:shadow-md">
      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold text-[#64748B]">{label}</span>
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg border ${colorMap[accentColor]} transition-transform group-hover:scale-105`}>
          <Icon className="h-4.5 w-4.5" />
        </div>
      </div>
      <div className="mt-3">
        <p className="text-2xl font-black text-[#12345B] tracking-tight">{value}</p>
        {sub && <p className="mt-1 text-[11px] text-[#64748B] leading-tight">{sub}</p>}
      </div>
      {href && (
        <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-[#1769AA] group-hover:underline">
          <span>Buka modul</span>
          <ArrowUpRight className="h-3 w-3" />
        </div>
      )}
    </div>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }
  return content
}

function StatusBadge({ status }: { status: string }) {
  if (status === "Terhubung") return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200">
      <CircleCheck className="h-3 w-3" /> Terhubung
    </span>
  )
  if (status === "Gagal") return (
    <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 text-[11px] font-semibold text-red-700 border border-red-200">
      <CircleX className="h-3 w-3" /> Akses Gagal
    </span>
  )
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800 border border-amber-200">
      <CircleAlert className="h-3 w-3" /> {status}
    </span>
  )
}

export default function DashboardPage() {
  const kpi = kpiDashboard

  return (
    <div className="flex flex-col flex-1 overflow-y-auto bg-[#F6F8FB]">
      <DashboardHeader
        title="Dashboard Overview"
        subtitle="Sistem Monitoring Terpadu Beasiswa Bintang Mandiri Angkatan 6 (BBM 6)"
      />

      <div className="flex-1 space-y-6 p-6">
        {/* Welcome Banner inspired by MAI Brand Guidelines */}
        <div className="relative overflow-hidden rounded-2xl border border-[#12345B]/10 bg-gradient-to-r from-[#12345B] via-[#154675] to-[#1769AA] p-6 text-white shadow-md">
          {/* Subtle geometric & education motifs in background */}
          <div className="absolute -right-8 -top-12 h-56 w-56 rounded-full bg-[#27A9A5]/15 blur-2xl pointer-events-none" />
          <div className="absolute right-12 bottom-0 opacity-10 pointer-events-none select-none">
            <svg width="220" height="120" viewBox="0 0 220 120" fill="none">
              <polygon points="50,10 90,30 90,75 50,95 10,75 10,30" stroke="white" strokeWidth="2" />
              <polygon points="130,20 170,40 170,85 130,105 90,85 90,40" stroke="white" strokeWidth="2" />
              <polygon points="170,10 210,30 210,75 170,95 130,75 130,30" stroke="white" strokeWidth="2" />
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="h-3.5 w-3.5 text-[#F5C928]" />
              <span>Program BBM 6 · MAI Institute & Mandiri Amal Insani</span>
            </div>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-white">
              Selamat Datang, Admin Monitoring MAI
            </h2>
            <p className="mt-1.5 text-xs text-white/80 leading-relaxed">
              Dashboard ini menyajikan rekapitulasi data 120 peserta Beasiswa Bintang Mandiri secara otomatis dari <strong>Google Sheets</strong> (sumber data utama) tanpa memerlukan database SQL terpisah.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
              <span className="rounded-md bg-white/20 px-2.5 py-1 font-semibold text-white">
                Basis Data: Google Sheets Terpadu
              </span>
              <span className="text-white/70">·</span>
              <span className="text-white/80">
                Pembaruan Terakhir: <strong>{kpi.waktuSinkronisasiTerakhir}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* KPI Row 1: Key Performance Metrics */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#12345B]">
              Capaian & Kehadiran Program
            </h3>
            <span className="text-[11px] text-[#64748B]">Diperbarui dari respons Google Forms</span>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <KpiCard
              label="Total Beswan Terdaftar"
              value={kpi.totalBeswan}
              sub={`Target: ${kpi.targetBeswan} — ⚠ 121 NID pada daftar (TBD-03)`}
              icon={Users}
              accentColor="navy"
              href="/dashboard/data-beswan"
            />
            <KpiCard
              label="Presensi Binnas"
              value={`${kpi.rataRataKehadiranPembinaan}%`}
              sub="Rata-rata 5 komponen utama (OP terpisah)"
              icon={BookOpen}
              accentColor="blue"
              href="/dashboard/pembinaan-nasional"
            />
            <KpiCard
              label="Presensi Mentorship"
              value={`${kpi.rataRataKehadiranMentorship}%`}
              sub="1 Google Form untuk seluruh periode"
              icon={UserCheck}
              accentColor="teal"
              href="/dashboard/mentorship"
            />
            <KpiCard
              label="Penyelesaian Tugas (Valid)"
              value={`${kpi.persentaseTugasDiterima}%`}
              sub="Hanya status Diterima (bukan sekadar kumpul)"
              icon={CheckSquare}
              accentColor="amber"
              href="/dashboard/penugasan"
            />
          </div>
        </section>

        {/* KPI Row 2: Perlu Tindakan Admin */}
        <section>
          <div className="mb-3 flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-[#F28C28]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#12345B]">
              Perlu Tindakan & Pemeriksaan Admin
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <KpiCard
              label="Tugas Menunggu Validasi"
              value={kpi.jumlahMenungguValidasi}
              sub="Submission masuk yang belum diperiksa"
              icon={Clock}
              accentColor="amber"
              href="/dashboard/penugasan"
            />
            <KpiCard
              label="Belum Mengumpulkan"
              value={kpi.jumlahBelumMengumpulkan}
              sub="Kewajiban penugasan tanpa berkas"
              icon={AlertTriangle}
              accentColor="red"
              href="/dashboard/penugasan"
            />
            <KpiCard
              label="NID Bermasalah / Duplikat"
              value={kpi.jumlahNidBermasalah}
              sub="NID tidak cocok atau respons duplikat"
              icon={AlertTriangle}
              accentColor="red"
              href="/dashboard/integrasi-data"
            />
            <KpiCard
              label="Prestasi Terlaporkan"
              value={kpi.jumlahPrestasi}
              sub="Laporan prestasi beswan sejak September"
              icon={Star}
              accentColor="teal"
              href="/dashboard/prestasi"
            />
          </div>
        </section>

        {/* Section: Rekap Wilayah + Status Spreadsheet */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Rekap Pembinaan per Wilayah */}
          <div className="lg:col-span-3 rounded-2xl border border-[#E5EAF1] bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E5EAF1] pb-3.5">
              <div>
                <h4 className="text-sm font-bold text-[#12345B]">Rekap Kehadiran Binnas per Wilayah</h4>
                <p className="text-[11px] text-[#64748B]">8 Wilayah/Kelompok Mentor Beasiswa Bintang Mandiri</p>
              </div>
              <Link href="/dashboard/pembinaan-nasional" className="text-xs font-semibold text-[#1769AA] hover:underline">
                Rincian Lengkap →
              </Link>
            </div>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[#E5EAF1] text-[#64748B]">
                    <th className="py-2.5 text-left font-semibold">Wilayah</th>
                    <th className="py-2.5 text-left font-semibold">Mentor</th>
                    <th className="py-2.5 text-right font-semibold">Beswan</th>
                    <th className="py-2.5 text-right font-semibold">Kehadiran</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5EAF1]/50">
                  {rekapPembinaanWilayah.map((w) => (
                    <tr key={w.id} className="hover:bg-[#F6F8FB] transition-colors">
                      <td className="py-2.5 font-semibold text-[#172033]">{w.wilayah.split("–")[0].trim()}</td>
                      <td className="py-2.5 text-[#64748B]">{w.mentor}</td>
                      <td className="py-2.5 text-right font-medium text-[#172033]">{w.jumlahBeswan}</td>
                      <td className="py-2.5">
                        <div className="flex items-center justify-end gap-2.5">
                          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className={`h-full rounded-full ${
                                w.persentase >= 80 ? "bg-[#27A9A5]" : w.persentase >= 70 ? "bg-[#1769AA]" : "bg-[#F28C28]"
                              }`}
                              style={{ width: `${w.persentase}%` }}
                            />
                          </div>
                          <span className="font-bold text-[#12345B] w-8 text-right">{w.persentase}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Status Koneksi Google Sheets */}
          <div className="lg:col-span-2 rounded-2xl border border-[#E5EAF1] bg-white p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#E5EAF1] pb-3.5">
                <div>
                  <h4 className="text-sm font-bold text-[#12345B]">Status Sumber Data</h4>
                  <p className="text-[11px] text-[#64748B]">3 Spreadsheet Google Sheets Terhubung</p>
                </div>
                <Link href="/dashboard/integrasi-data" className="text-xs font-semibold text-[#1769AA] hover:underline">
                  Kelola →
                </Link>
              </div>

              <div className="mt-3 divide-y divide-[#E5EAF1]/60">
                {sumberDataList.map((src) => (
                  <div key={src.id} className="py-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-[#172033] truncate">{src.nama}</p>
                        <p className="text-[10px] text-[#64748B] mt-0.5">{src.kegunaan}</p>
                      </div>
                      <StatusBadge status={src.statusKoneksi} />
                    </div>
                    {src.statusKoneksi === "Terhubung" && (
                      <div className="mt-1.5 flex gap-2.5 text-[10px] text-[#64748B]">
                        <span>{src.jumlahBaris} Baris</span>
                        <span>·</span>
                        <span className="text-emerald-700 font-semibold">{src.jumlahDipetakan} Terpetakan</span>
                        {src.jumlahNidTidakDikenal > 0 && (
                          <>
                            <span>·</span>
                            <span className="text-red-600 font-semibold">{src.jumlahNidTidakDikenal} NID Asing</span>
                          </>
                        )}
                      </div>
                    )}
                    {src.pesanError && (
                      <p className="mt-1 text-[10px] text-[#DC2626] leading-tight">
                        {src.pesanError}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-[#27A9A5]/30 bg-[#27A9A5]/5 p-3 text-[11px] text-[#0f6c6a]">
              <strong>Prinsip Arsitektur:</strong> Data operasional dibaca langsung dari Google Sheets. Keputusan validasi admin disimpan persisten kembali ke tab administrasi Google Sheets.
            </div>
          </div>
        </div>

        {/* Tren Kehadiran Mentorship per Periode */}
        <div className="rounded-2xl border border-[#E5EAF1] bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1769AA]/10 text-[#1769AA]">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#12345B]">Perkembangan Kehadiran Mentorship Lintas Pertemuan</h4>
                <p className="text-[11px] text-[#64748B]">Seluruh pertemuan dicatat dalam 1 Google Form & Spreadsheet yang sama</p>
              </div>
            </div>
            <Link href="/dashboard/mentorship" className="text-xs font-semibold text-[#1769AA] hover:underline">
              Kelola Periode →
            </Link>
          </div>

          <div className="flex items-end justify-around gap-3 h-36 px-4 pt-4 border-t border-[#E5EAF1]">
            {[
              { label: "Mentoring #1", val: 68, month: "Januari" },
              { label: "Mentoring #2", val: 72, month: "Februari" },
              { label: "Mentoring #3", val: 70, month: "Maret" },
              { label: "Mentoring #4", val: 78, month: "April" },
              { label: "Mentoring #5", val: 75, month: "Mei (Aktif)" },
              { label: "Mentoring #6", val: null, month: "Juni (Rencana)" },
            ].map((p, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
                {p.val !== null ? (
                  <>
                    <span className="text-[11px] font-bold text-[#12345B]">{p.val}%</span>
                    <div
                      className="w-full max-w-[54px] rounded-t-md bg-gradient-to-t from-[#12345B] to-[#1769AA] shadow-2xs transition-all hover:opacity-90"
                      style={{ height: `${(p.val / 100) * 110}px` }}
                    />
                  </>
                ) : (
                  <>
                    <span className="text-[10px] text-[#64748B] font-semibold">–</span>
                    <div
                      className="w-full max-w-[54px] rounded-t-md border-2 border-dashed border-[#E5EAF1] bg-[#F6F8FB]"
                      style={{ height: "45px" }}
                    />
                  </>
                )}
                <span className="text-[10px] font-semibold text-[#172033] mt-1">{p.label}</span>
                <span className="text-[9px] text-[#64748B]">{p.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

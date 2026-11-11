"use client"

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
  Clock,
  AlertTriangle,
  Star,
  ArrowRight,
  CircleCheck,
  CircleAlert,
  CircleX,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"

function KpiCard({
  label,
  value,
  sub,
  href,
}: {
  label: string
  value: string | number
  sub?: string
  href?: string
}) {
  const content = (
    <div className="group flex flex-col justify-between rounded-xl border border-[#E8EAED] bg-white p-5 transition-all hover:border-[#1A73E8]/40 hover:shadow-xs">
      <div>
        <p className="text-xs font-medium text-[#5F6368]">{label}</p>
        <p className="mt-2 text-3xl font-semibold text-[#202124] tracking-tight">{value}</p>
      </div>
      {sub && <p className="mt-2 text-xs text-[#5F6368]">{sub}</p>}
      {href && (
        <div className="mt-3 flex items-center gap-1 text-xs font-medium text-[#1A73E8] group-hover:underline">
          <span>Lihat rincian</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      )}
    </div>
  )

  if (href) {
    return <Link href={href} className="block">{content}</Link>
  }
  return content
}

export default function DashboardPage() {
  const kpi = kpiDashboard

  return (
    <div className="flex flex-col flex-1 overflow-y-auto bg-[#F8F9FA]">
      <DashboardHeader
        title="Ringkasan Program"
        subtitle="Sistem Monitoring Terpadu Beasiswa Bintang Mandiri Angkatan 6 (BBM 6)"
      />

      <div className="flex-1 space-y-8 p-8 max-w-7xl">
        {/* KPI Row 1: Capaian Utama */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#202124]">
              Capaian & Kehadiran Utama
            </h2>
            <span className="text-xs text-[#5F6368]">
              Sinkronisasi terakhir: {kpi.waktuSinkronisasiTerakhir}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <KpiCard
              label="Total Beswan Terdaftar"
              value={kpi.totalBeswan}
              sub={`Target: ${kpi.targetBeswan} — 121 NID pada data master`}
              href="/dashboard/data-beswan"
            />
            <KpiCard
              label="Presensi Binnas"
              value={`${kpi.rataRataKehadiranPembinaan}%`}
              sub="Rata-rata 5 komponen utama"
              href="/dashboard/pembinaan-nasional"
            />
            <KpiCard
              label="Presensi Mentorship"
              value={`${kpi.rataRataKehadiranMentorship}%`}
              sub="Pertemuan 1–5 aktif"
              href="/dashboard/mentorship"
            />
            <KpiCard
              label="Tugas Disetujui"
              value={`${kpi.persentaseTugasDiterima}%`}
              sub="Status Diterima oleh admin"
              href="/dashboard/penugasan"
            />
          </div>
        </div>

        {/* KPI Row 2: Perhatian & Tindakan Admin */}
        <div>
          <h2 className="mb-3 text-sm font-semibold text-[#202124]">
            Perhatian & Tindakan Admin
          </h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <KpiCard
              label="Tugas Menunggu Validasi"
              value={kpi.jumlahMenungguValidasi}
              sub="Perlu peninjauan admin"
              href="/dashboard/penugasan"
            />
            <KpiCard
              label="Tugas Belum Mengumpulkan"
              value={kpi.jumlahBelumMengumpulkan}
              sub="Kewajiban penugasan tanpa berkas"
              href="/dashboard/penugasan"
            />
            <KpiCard
              label="NID Bermasalah"
              value={kpi.jumlahNidBermasalah}
              sub="Perlu pemetaan manual"
              href="/dashboard/integrasi-data"
            />
            <KpiCard
              label="Prestasi Terlaporkan"
              value={kpi.jumlahPrestasi}
              sub="Sejak September 2026"
              href="/dashboard/prestasi"
            />
          </div>
        </div>

        {/* Grid: Rekap Wilayah + Sumber Data */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Rekap Pembinaan per Wilayah */}
          <div className="lg:col-span-3 rounded-xl border border-[#E8EAED] bg-white p-6">
            <div className="flex items-center justify-between border-b border-[#E8EAED] pb-4">
              <div>
                <h3 className="text-sm font-semibold text-[#202124]">Kehadiran per Wilayah</h3>
                <p className="text-xs text-[#5F6368] mt-0.5">8 Wilayah pendampingan mentor BBM 6</p>
              </div>
              <Link
                href="/dashboard/pembinaan-nasional"
                className="text-xs font-medium text-[#1A73E8] hover:underline"
              >
                Lihat Semua
              </Link>
            </div>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[#E8EAED] text-[#5F6368]">
                    <th className="py-3 text-left font-medium">Wilayah</th>
                    <th className="py-3 text-left font-medium">Mentor</th>
                    <th className="py-3 text-right font-medium">Beswan</th>
                    <th className="py-3 text-right font-medium">Tingkat Kehadiran</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8EAED]">
                  {rekapPembinaanWilayah.map((w) => (
                    <tr key={w.id} className="hover:bg-[#F8F9FA] transition-colors">
                      <td className="py-3 font-medium text-[#202124]">{w.wilayah.split("–")[0].trim()}</td>
                      <td className="py-3 text-[#5F6368]">{w.mentor}</td>
                      <td className="py-3 text-right text-[#202124]">{w.jumlahBeswan}</td>
                      <td className="py-3">
                        <div className="flex items-center justify-end gap-2.5">
                          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-[#F1F3F4]">
                            <div
                              className="h-full rounded-full bg-[#1A73E8]"
                              style={{ width: `${w.persentase}%` }}
                            />
                          </div>
                          <span className="font-semibold text-[#202124] w-8 text-right">{w.persentase}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Status Koneksi Google Sheets */}
          <div className="lg:col-span-2 rounded-xl border border-[#E8EAED] bg-white p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#E8EAED] pb-4">
                <div>
                  <h3 className="text-sm font-semibold text-[#202124]">Status Sumber Data</h3>
                  <p className="text-xs text-[#5F6368] mt-0.5">Google Sheets sebagai sumber data tunggal</p>
                </div>
                <Link
                  href="/dashboard/integrasi-data"
                  className="text-xs font-medium text-[#1A73E8] hover:underline"
                >
                  Kelola
                </Link>
              </div>

              <div className="mt-4 divide-y divide-[#E8EAED]">
                {sumberDataList.map((src) => (
                  <div key={src.id} className="py-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-medium text-[#202124] truncate">{src.nama}</p>
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                          src.statusKoneksi === "Terhubung"
                            ? "text-[#137333]"
                            : src.statusKoneksi === "Gagal"
                            ? "text-[#C5221F]"
                            : "text-[#B06000]"
                        }`}
                      >
                        {src.statusKoneksi === "Terhubung" ? (
                          <CircleCheck className="h-3 w-3" />
                        ) : src.statusKoneksi === "Gagal" ? (
                          <CircleX className="h-3 w-3" />
                        ) : (
                          <CircleAlert className="h-3 w-3" />
                        )}
                        {src.statusKoneksi}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-[#5F6368]">
                      <span>{src.jumlahBaris} baris</span>
                      <span>·</span>
                      <span>{src.jumlahDipetakan} terpetakan</span>
                      {src.jumlahNidTidakDikenal > 0 && (
                        <>
                          <span>·</span>
                          <span className="text-[#C5221F]">{src.jumlahNidTidakDikenal} NID asing</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 border-t border-[#E8EAED] pt-4 text-xs text-[#5F6368]">
              Data disinkronkan secara langsung dari Google Spreadsheet tanpa perantara basis data SQL terpisah.
            </div>
          </div>
        </div>

        {/* Tren Kehadiran Mentorship */}
        <div className="rounded-xl border border-[#E8EAED] bg-white p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-semibold text-[#202124]">Tren Kehadiran Mentorship</h3>
              <p className="text-xs text-[#5F6368] mt-0.5">Pertemuan 1 hingga 5 (1 Google Form terpadu)</p>
            </div>
            <Link
              href="/dashboard/mentorship"
              className="text-xs font-medium text-[#1A73E8] hover:underline"
            >
              Kelola Periode
            </Link>
          </div>

          <div className="flex items-end justify-between gap-4 h-36 px-4 pt-4 border-t border-[#E8EAED]">
            {[
              { label: "Pertemuan 1", val: 68, month: "Januari" },
              { label: "Pertemuan 2", val: 72, month: "Februari" },
              { label: "Pertemuan 3", val: 70, month: "Maret" },
              { label: "Pertemuan 4", val: 78, month: "April" },
              { label: "Pertemuan 5", val: 75, month: "Mei (Aktif)" },
              { label: "Pertemuan 6", val: null, month: "Juni (Rencana)" },
            ].map((p, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
                {p.val !== null ? (
                  <>
                    <span className="text-xs font-medium text-[#202124]">{p.val}%</span>
                    <div
                      className="w-full max-w-[48px] rounded-t-sm bg-[#1A73E8] transition-all hover:bg-[#1557B0]"
                      style={{ height: `${(p.val / 100) * 100}px` }}
                    />
                  </>
                ) : (
                  <>
                    <span className="text-xs text-[#5F6368]">—</span>
                    <div
                      className="w-full max-w-[48px] rounded-t-sm border border-dashed border-[#DADCE0] bg-[#F8F9FA]"
                      style={{ height: "36px" }}
                    />
                  </>
                )}
                <span className="text-xs font-medium text-[#202124] mt-1">{p.label}</span>
                <span className="text-[11px] text-[#5F6368]">{p.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

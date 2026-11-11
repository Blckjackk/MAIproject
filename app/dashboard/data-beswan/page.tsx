"use client"

import { useState, useMemo } from "react"
import { DashboardHeader } from "@/components/dashboard-shell"
import { masterBeswan, dataPenugasan, dataPrestasi, periodeMentorship } from "@/lib/mock-data"
import type { Beswan } from "@/lib/mock-data"
import {
  AlertTriangle,
  CheckCircle,
  Search,
  Filter,
  X,
  ExternalLink,
  BookOpen,
  UserCheck,
  CheckSquare,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

export default function DataBeswanPage() {
  const [search, setSearch] = useState("")
  const [selectedWilayah, setSelectedWilayah] = useState("Semua Wilayah")
  const [selectedStatus, setSelectedStatus] = useState("Semua Status")
  const [page, setPage] = useState(1)
  const pageSize = 15

  const [activeBeswan, setActiveBeswan] = useState<Beswan | null>(null)

  // Filter list
  const filteredData = useMemo(() => {
    return masterBeswan.filter((b) => {
      const matchSearch =
        b.nama.toLowerCase().includes(search.toLowerCase()) ||
        b.nid.includes(search) ||
        b.universitas.toLowerCase().includes(search.toLowerCase())
      const matchWilayah = selectedWilayah === "Semua Wilayah" || b.wilayah === selectedWilayah
      const matchStatus = selectedStatus === "Semua Status" || b.status === selectedStatus
      return matchSearch && matchWilayah && matchStatus
    })
  }, [search, selectedWilayah, selectedStatus])

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1
  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize
    return filteredData.slice(start, start + pageSize)
  }, [filteredData, page])

  // Get participant detail history
  const beswanTasks = useMemo(() => {
    if (!activeBeswan) return []
    return dataPenugasan.filter((t) => t.nid === activeBeswan.nid)
  }, [activeBeswan])

  const beswanPrestasi = useMemo(() => {
    if (!activeBeswan) return []
    return dataPrestasi.filter((p) => p.nid === activeBeswan.nid)
  }, [activeBeswan])

  return (
    <div className="flex flex-col flex-1 overflow-y-auto">
      <DashboardHeader
        title="Data Beswan"
        subtitle="Pusat penelusuran master peserta Beasiswa Bintang Mandiri Angkatan 6"
      />

      <div className="flex-1 space-y-6 p-6">
        {/* Warning: 121 vs 120 */}
        <div className="flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-300">
          <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
          <div>
            <strong>Perhatian Verifikasi Data Master:</strong> Total daftar NID adalah <strong>121 NID unik</strong>, sedangkan brief menyebutkan <strong>120 beswan</strong>. Seluruh 121 NID terdaftar di bawah ini dan NID diproses sebagai tipe teks/string tanpa konversi format.
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[260px] flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              placeholder="Cari berdasarkan NID, nama, universitas..."
              className="w-full rounded-lg border border-border bg-background pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={selectedWilayah}
              onChange={(e) => {
                setSelectedWilayah(e.target.value)
                setPage(1)
              }}
              className="rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option>Semua Wilayah</option>
              <option>Wilayah 1 – Jakarta Utara</option>
              <option>Wilayah 2 – Jakarta Selatan</option>
              <option>Wilayah 3 – Jakarta Barat</option>
              <option>Wilayah 4 – Jakarta Timur</option>
              <option>Wilayah 5 – Jakarta Pusat</option>
              <option>Wilayah 6 – Bekasi</option>
              <option>Wilayah 7 – Bogor</option>
              <option>Wilayah 8 – Tangerang</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value)
                setPage(1)
              }}
              className="rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option>Semua Status</option>
              <option>Aktif</option>
              <option>Perlu Pemeriksaan</option>
            </select>

            {(search || selectedWilayah !== "Semua Wilayah" || selectedStatus !== "Semua Status") && (
              <button
                onClick={() => {
                  setSearch("")
                  setSelectedWilayah("Semua Wilayah")
                  setSelectedStatus("Semua Status")
                  setPage(1)
                }}
                className="rounded-lg border border-border px-2.5 py-2 text-xs font-medium text-muted-foreground hover:bg-muted"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Master Beswan Table */}
        <div className="rounded-xl border border-border bg-card shadow-xs">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Daftar Master Beswan</h3>
              <p className="text-xs text-muted-foreground">Klik tombol profil untuk melihat ringkasan seluruh riwayat aktivitas</p>
            </div>
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
              {filteredData.length} Peserta Ditemukan
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="px-5 py-3 text-left font-semibold text-muted-foreground">NID</th>
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">No.</th>
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Nama Peserta</th>
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Perguruan Tinggi</th>
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Wilayah</th>
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Mentor</th>
                  <th className="px-3 py-3 text-center font-semibold text-muted-foreground">Status Data</th>
                  <th className="px-5 py-3 text-center font-semibold text-muted-foreground">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-muted-foreground">
                      Tidak ada peserta yang cocok dengan kriteria pencarian.
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((b) => (
                    <tr key={b.nid} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3 font-mono font-bold text-foreground">{b.nid}</td>
                      <td className="px-3 py-3 font-mono text-muted-foreground">{b.nomorBeswan}</td>
                      <td className="px-3 py-3 font-medium text-foreground">{b.nama}</td>
                      <td className="px-3 py-3 text-muted-foreground">{b.universitas}</td>
                      <td className="px-3 py-3 text-muted-foreground">{b.wilayah.split("–")[0].trim()}</td>
                      <td className="px-3 py-3 text-muted-foreground">{b.mentor}</td>
                      <td className="px-3 py-3 text-center">
                        {b.status === "Aktif" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                            <CheckCircle className="h-3 w-3" /> Aktif
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
                            <AlertTriangle className="h-3 w-3" /> Perlu Periksa
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-center">
                        <button
                          onClick={() => setActiveBeswan(b)}
                          className="rounded-md border border-border bg-background px-3 py-1 font-medium text-foreground hover:bg-muted hover:border-foreground/20 transition-all shadow-2xs"
                        >
                          Lihat Detail
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-border px-5 py-3 text-xs text-muted-foreground">
            <span>
              Menampilkan {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filteredData.length)} dari {filteredData.length} beswan
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className="flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-foreground transition-colors hover:bg-muted disabled:opacity-40"
              >
                <ChevronLeft className="h-3.5 w-3.5" /> Sebelumnya
              </button>
              <span className="px-2 font-medium text-foreground">
                Hal {page} / {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                className="flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-foreground transition-colors hover:bg-muted disabled:opacity-40"
              >
                Selanjutnya <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide-over Profile Drawer (Spec 7.6 & 11) */}
      {activeBeswan && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in">
          <div className="flex h-full w-full max-w-xl flex-col bg-card shadow-2xl border-l border-border animate-in slide-in-from-right duration-200">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-border p-6 bg-muted/20">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-primary">{activeBeswan.nid}</span>
                  <span className="text-xs text-muted-foreground">· Beswan #{activeBeswan.nomorBeswan}</span>
                </div>
                <h2 className="mt-1 text-xl font-bold text-foreground">{activeBeswan.nama}</h2>
                <p className="text-xs text-muted-foreground">{activeBeswan.universitas}</p>
              </div>
              <button
                onClick={() => setActiveBeswan(null)}
                className="rounded-lg border border-border p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Tabs / Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Wilayah & Mentor */}
              <div className="grid grid-cols-2 gap-3 rounded-lg border border-border p-4 bg-background">
                <div>
                  <p className="text-[11px] text-muted-foreground">Kelompok / Wilayah</p>
                  <p className="font-medium text-xs text-foreground mt-0.5">{activeBeswan.wilayah}</p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground">Mentor Pendamping</p>
                  <p className="font-medium text-xs text-foreground mt-0.5">{activeBeswan.mentor}</p>
                </div>
              </div>

              {/* Rekap Pembinaan Nasional */}
              <div className="rounded-lg border border-border p-4 bg-background space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <h4>Pembinaan Nasional</h4>
                </div>
                <div className="rounded-md bg-blue-50 dark:bg-blue-950/40 p-2.5 text-[11px] text-blue-700 dark:text-blue-300">
                  Opening Program: <span className="font-semibold">Hadir</span> (terpisah dari perhitungan 5 komponen utama)
                </div>
                <div className="grid grid-cols-5 gap-2 text-center text-xs">
                  <div className="p-2 rounded bg-muted/40 border border-border">
                    <p className="text-[10px] text-muted-foreground">P. Awal</p>
                    <p className="font-bold text-emerald-600 mt-1">Hadir</p>
                  </div>
                  <div className="p-2 rounded bg-muted/40 border border-border">
                    <p className="text-[10px] text-muted-foreground">Pre-Test</p>
                    <p className="font-bold text-emerald-600 mt-1">Hadir</p>
                  </div>
                  <div className="p-2 rounded bg-muted/40 border border-border">
                    <p className="text-[10px] text-muted-foreground">Post-Test</p>
                    <p className="font-bold text-emerald-600 mt-1">Hadir</p>
                  </div>
                  <div className="p-2 rounded bg-muted/40 border border-border">
                    <p className="text-[10px] text-muted-foreground">P. Evaluasi</p>
                    <p className="font-bold text-emerald-600 mt-1">Hadir</p>
                  </div>
                  <div className="p-2 rounded bg-muted/40 border border-border">
                    <p className="text-[10px] text-muted-foreground">P. Akhir</p>
                    <p className="font-bold text-muted-foreground mt-1">–</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-border">
                  <span className="text-muted-foreground">Status Kehadiran Binnas:</span>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-semibold text-emerald-700">
                    Hadir Full (4/4 terlaksana)
                  </span>
                </div>
              </div>

              {/* Rekap Mentorship */}
              <div className="rounded-lg border border-border p-4 bg-background space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <UserCheck className="h-4 w-4 text-primary" />
                  <h4>Riwayat Mentorship (1 Form Terpadu)</h4>
                </div>
                <div className="divide-y divide-border/60 text-xs">
                  {periodeMentorship.slice(0, 5).map((p) => (
                    <div key={p.id} className="flex items-center justify-between py-2">
                      <div>
                        <span className="font-medium text-foreground">{p.nama}</span>
                        <p className="text-[10px] text-muted-foreground">PM, Pre-Test & Post-Test Hadir</p>
                      </div>
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                        Hadir
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Riwayat Penugasan */}
              <div className="rounded-lg border border-border p-4 bg-background space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <CheckSquare className="h-4 w-4 text-primary" />
                    <h4>Penugasan Brand Ambassador</h4>
                  </div>
                  <span className="text-xs text-muted-foreground">{beswanTasks.length} tugas</span>
                </div>
                <div className="space-y-2 text-xs">
                  {beswanTasks.map((t) => (
                    <div key={t.id} className="flex items-center justify-between p-2.5 rounded-md border border-border bg-card">
                      <div>
                        <p className="font-medium text-foreground">{t.kategori}</p>
                        {t.catatanAdmin && (
                          <p className="text-[10px] text-muted-foreground mt-0.5">Catatan: {t.catatanAdmin}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {t.linkBukti && (
                          <a
                            href={t.linkBukti}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline text-[11px] inline-flex items-center gap-1"
                          >
                            Bukti <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            t.statusValidasi === "Diterima"
                              ? "bg-emerald-50 text-emerald-700"
                              : t.statusValidasi === "Menunggu Validasi"
                              ? "bg-amber-50 text-amber-700"
                              : t.statusValidasi === "Tidak Diterima"
                              ? "bg-red-50 text-red-700"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {t.statusValidasi}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prestasi */}
              {beswanPrestasi.length > 0 && (
                <div className="rounded-lg border border-border p-4 bg-background space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Star className="h-4 w-4 text-amber-500" />
                    <h4>Prestasi yang Dilaporkan</h4>
                  </div>
                  <div className="space-y-2 text-xs">
                    {beswanPrestasi.map((p) => (
                      <div key={p.id} className="p-2.5 rounded-md border border-border bg-card">
                        <p className="font-medium text-foreground">{p.judul}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          {p.tingkat} · {p.penyelenggara} ({p.bulanPelaporan})
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

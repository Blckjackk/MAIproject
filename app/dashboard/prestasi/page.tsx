"use client"

import { useState, useMemo } from "react"
import { DashboardHeader } from "@/components/dashboard-shell"
import { dataPrestasi, masterWilayah } from "@/lib/mock-data"
import { ExternalLink, Star, Search, Filter } from "lucide-react"

const BULAN = ["Semua Bulan", "September 2026", "Oktober 2026", "November 2026"]

export default function PrestasiPage() {
  const [selectedBulan, setSelectedBulan] = useState("Semua Bulan")
  const [selectedWilayah, setSelectedWilayah] = useState("Semua Wilayah")
  const [search, setSearch] = useState("")

  const filteredPrestasi = useMemo(() => {
    return dataPrestasi.filter((p) => {
      const matchSearch =
        p.nama.toLowerCase().includes(search.toLowerCase()) ||
        p.nid.includes(search) ||
        p.judul.toLowerCase().includes(search.toLowerCase()) ||
        p.kategori.toLowerCase().includes(search.toLowerCase())
      const matchBulan = selectedBulan === "Semua Bulan" || p.bulanPelaporan === selectedBulan
      const matchWilayah = selectedWilayah === "Semua Wilayah" || p.wilayah === selectedWilayah
      return matchSearch && matchBulan && matchWilayah
    })
  }, [search, selectedBulan, selectedWilayah])

  const totalPrestasi = filteredPrestasi.length
  const internasional = filteredPrestasi.filter((p) => p.tingkat === "Internasional").length
  const nasional = filteredPrestasi.filter((p) => p.tingkat === "Nasional").length
  const uniqueBeswan = new Set(filteredPrestasi.map((p) => p.nid)).size

  const perWilayah = masterWilayah.map((w) => ({
    ...w,
    jumlahPrestasi: filteredPrestasi.filter((p) => p.wilayah === w.wilayah).length,
  }))

  return (
    <div className="flex flex-col flex-1 overflow-y-auto">
      <DashboardHeader
        title="Prestasi Beswan"
        subtitle="Rekap prestasi berdasarkan wilayah dan bulan pelaporan — mulai September 2026"
      />

      <div className="flex-1 space-y-6 p-6">
        <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-xs text-blue-800 dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-300">
          <strong>Sumber Data Prestasi (Spec 10.2 & TBD-07, TBD-08):</strong> Data dari SRC-01 (spreadsheet utama awal) dan SRC-03 (pendataan prestasi terbaru) dikonsolidasikan tanpa duplikasi. Rekap bulanan default menggunakan bulan pelaporan.
        </div>

        {/* KPI */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
            <p className="text-xs font-medium text-muted-foreground">Total Prestasi Tersaring</p>
            <p className="mt-1 text-3xl font-bold text-foreground">{totalPrestasi}</p>
            <p className="mt-1 text-xs text-muted-foreground">Sejak September 2026</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
            <p className="text-xs font-medium text-muted-foreground">Tingkat Internasional</p>
            <p className="mt-1 text-3xl font-bold text-purple-600">{internasional}</p>
            <p className="mt-1 text-xs text-muted-foreground">Kompetisi global</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
            <p className="text-xs font-medium text-muted-foreground">Tingkat Nasional</p>
            <p className="mt-1 text-3xl font-bold text-blue-600">{nasional}</p>
            <p className="mt-1 text-xs text-muted-foreground">Kompetisi nasional</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
            <p className="text-xs font-medium text-muted-foreground">Beswan Berprestasi</p>
            <p className="mt-1 text-3xl font-bold text-emerald-600">{uniqueBeswan}</p>
            <p className="mt-1 text-xs text-muted-foreground">Peserta unik</p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-medium text-muted-foreground mr-1">Bulan:</span>
            {BULAN.map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBulan(b)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  selectedBulan === b
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : "border border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {b}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2 flex-wrap">
            <select
              value={selectedWilayah}
              onChange={(e) => setSelectedWilayah(e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option>Semua Wilayah</option>
              {masterWilayah.map((w) => (
                <option key={w.id} value={w.wilayah}>
                  {w.wilayah.split("–")[0].trim()}
                </option>
              ))}
            </select>

            <div className="relative min-w-[200px]">
              <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari prestasi, nama, NID..."
                className="w-full rounded-lg border border-border bg-background pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Rekap per Wilayah */}
          <div className="rounded-xl border border-border bg-card shadow-xs">
            <div className="border-b border-border px-5 py-4">
              <h3 className="text-sm font-semibold text-foreground">Prestasi per Wilayah</h3>
              <p className="text-xs text-muted-foreground">Distribusi pencapaian</p>
            </div>
            <ul className="divide-y divide-border/50">
              {perWilayah.map((w) => (
                <li key={w.id} className="flex items-center justify-between px-5 py-3 hover:bg-muted/30 transition-colors">
                  <div>
                    <p className="text-xs font-medium text-foreground">{w.wilayah.split("–")[0].trim()}</p>
                    <p className="text-[10px] text-muted-foreground">{w.mentor}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">{w.jumlahPrestasi}</span>
                    <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Daftar Prestasi */}
          <div className="lg:col-span-2 rounded-xl border border-border bg-card shadow-xs">
            <div className="border-b border-border px-5 py-4">
              <h3 className="text-sm font-semibold text-foreground">Daftar Pencapaian Prestasi</h3>
              <p className="text-xs text-muted-foreground">Tercatat {filteredPrestasi.length} prestasi</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border bg-muted/20">
                    <th className="px-5 py-3 text-left font-semibold text-muted-foreground">NID · Nama</th>
                    <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Judul Prestasi</th>
                    <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Tingkat</th>
                    <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Bulan Lapor</th>
                    <th className="px-3 py-3 text-center font-semibold text-muted-foreground">Bukti</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPrestasi.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-muted-foreground">
                        Tidak ada prestasi yang sesuai dengan filter yang dipilih.
                      </td>
                    </tr>
                  ) : (
                    filteredPrestasi.map((p) => (
                      <tr key={p.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="px-5 py-3">
                          <p className="font-mono font-bold text-foreground">{p.nid}</p>
                          <p className="font-medium text-foreground">{p.nama}</p>
                          <p className="text-[10px] text-muted-foreground">{p.wilayah.split("–")[0].trim()}</p>
                        </td>
                        <td className="px-3 py-3">
                          <p className="font-medium text-foreground leading-tight">{p.judul}</p>
                          <p className="text-muted-foreground mt-0.5">{p.kategori} · {p.penyelenggara}</p>
                        </td>
                        <td className="px-3 py-3">
                          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            p.tingkat === "Internasional" ? "bg-purple-50 text-purple-700 dark:bg-purple-950/40" :
                            p.tingkat === "Nasional" ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40" :
                            "bg-muted text-muted-foreground"
                          }`}>{p.tingkat}</span>
                        </td>
                        <td className="px-3 py-3 text-muted-foreground">{p.bulanPelaporan}</td>
                        <td className="px-3 py-3 text-center">
                          {p.linkBukti ? (
                            <a href={p.linkBukti} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-primary hover:underline">
                              Sertifikat <ExternalLink className="h-3 w-3" />
                            </a>
                          ) : (
                            <span className="text-muted-foreground">–</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="border-t border-border px-5 py-3 text-xs text-muted-foreground">
              Menampilkan {filteredPrestasi.length} prestasi · Sumber: Gabungan SRC-01 & SRC-03
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

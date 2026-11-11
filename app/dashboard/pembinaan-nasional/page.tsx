"use client"

import { useState, useMemo } from "react"
import { DashboardHeader } from "@/components/dashboard-shell"
import { masterBeswan, rekapPembinaanWilayah } from "@/lib/mock-data"
import { BookOpen, CircleCheck, CircleX, Search, Filter } from "lucide-react"

type StatusPembinaan = "Hadir Full" | "Hadir Sebagian" | "Tidak Hadir"

function getStatus(hadir: number): StatusPembinaan {
  if (hadir === 5) return "Hadir Full"
  if (hadir >= 3) return "Hadir Sebagian"
  return "Tidak Hadir"
}

function StatusBadge({ status }: { status: StatusPembinaan }) {
  const map: Record<StatusPembinaan, string> = {
    "Hadir Full": "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
    "Hadir Sebagian": "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
    "Tidak Hadir": "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
  }
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${map[status]}`}>
      {status}
    </span>
  )
}

function ComponentBadge({ hadir }: { hadir: boolean | null }) {
  if (hadir === null) return <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] text-muted-foreground font-semibold">–</span>
  return hadir
    ? <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"><CircleCheck className="h-3.5 w-3.5" /></span>
    : <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-400"><CircleX className="h-3.5 w-3.5" /></span>
}

function getMockKomponen(nid: string) {
  const seed = parseInt(nid.slice(-3))
  return {
    opening: seed % 4 !== 0,
    presensiAwal: seed % 7 !== 0,
    preTest: seed % 5 !== 0,
    postTest: seed % 9 !== 0,
    openingEval: seed % 6 !== 0,
    presensiAkhir: null, // belum dilaksanakan
  }
}

function countHadir(k: ReturnType<typeof getMockKomponen>) {
  return [k.presensiAwal, k.preTest, k.postTest, k.openingEval, k.presensiAkhir].filter((x) => x === true).length
}

export default function PembinaanNasionalPage() {
  const [search, setSearch] = useState("")
  const [selectedWilayah, setSelectedWilayah] = useState("Semua Wilayah")

  const beswan = useMemo(() => {
    return masterBeswan.map((b) => {
      const k = getMockKomponen(b.nid)
      const hadir = countHadir(k)
      return { ...b, komponen: k, hadir, status: getStatus(hadir) }
    })
  }, [])

  const filteredBeswan = useMemo(() => {
    return beswan.filter((b) => {
      const matchSearch =
        b.nama.toLowerCase().includes(search.toLowerCase()) ||
        b.nid.includes(search) ||
        b.universitas.toLowerCase().includes(search.toLowerCase())
      const matchWilayah = selectedWilayah === "Semua Wilayah" || b.wilayah === selectedWilayah
      return matchSearch && matchWilayah
    })
  }, [beswan, search, selectedWilayah])

  const totalHadirFull = filteredBeswan.filter((b) => b.status === "Hadir Full").length
  const totalSebagian = filteredBeswan.filter((b) => b.status === "Hadir Sebagian").length
  const totalTidakHadir = filteredBeswan.filter((b) => b.status === "Tidak Hadir").length

  return (
    <div className="flex flex-col flex-1 overflow-y-auto">
      <DashboardHeader
        title="Pembinaan Nasional"
        subtitle="Rekap kehadiran 6 komponen — Opening Program ditampilkan terpisah"
      />

      <div className="flex-1 space-y-6 p-6">
        {/* Info Banner */}
        <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-xs text-blue-800 dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-300">
          <strong>Aturan Bisnis (Spec D-09 & D-10):</strong> Opening Program dipisahkan dan <strong>tidak dimasukkan</strong> ke perhitungan persentase lima komponen utama. Komponen utama: Presensi Awal, Pre-Test, Post-Test, Presensi Evaluasi, dan Presensi Akhir. Status: 0–2 hadir = Tidak Hadir, 3–4 hadir = Hadir Sebagian, 5 hadir = Hadir Full. Tanda <strong>–</strong> menunjukkan komponen belum dilaksanakan dan tidak dimasukkan ke penyebut.
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
            <p className="text-xs font-medium text-muted-foreground">Hadir Full (5/5 Komponen)</p>
            <p className="mt-1 text-3xl font-bold text-emerald-600">{totalHadirFull}</p>
            <p className="mt-1 text-xs text-muted-foreground">{Math.round((totalHadirFull / (filteredBeswan.length || 1)) * 100)}% dari peserta</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
            <p className="text-xs font-medium text-muted-foreground">Hadir Sebagian (3–4/5 Komponen)</p>
            <p className="mt-1 text-3xl font-bold text-amber-600">{totalSebagian}</p>
            <p className="mt-1 text-xs text-muted-foreground">Tercatat aktif</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
            <p className="text-xs font-medium text-muted-foreground">Tidak Hadir (0–2/5 Komponen)</p>
            <p className="mt-1 text-3xl font-bold text-red-600">{totalTidakHadir}</p>
            <p className="mt-1 text-xs text-muted-foreground">Kurang dari batas minimum</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
            <p className="text-xs font-medium text-muted-foreground">Total Peserta Tersaring</p>
            <p className="mt-1 text-3xl font-bold text-foreground">{filteredBeswan.length}</p>
            <p className="mt-1 text-xs text-muted-foreground">Beswan BBM 6</p>
          </div>
        </div>

        {/* Rekap per Wilayah */}
        <div className="rounded-xl border border-border bg-card shadow-xs">
          <div className="border-b border-border px-5 py-4">
            <h3 className="text-sm font-semibold text-foreground">Rekap per Wilayah / Kelompok Mentor</h3>
            <p className="text-xs text-muted-foreground">Persentase dihitung dari total hadir valid / total kesempatan terlaksana</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="px-5 py-3 text-left font-semibold text-muted-foreground">Wilayah</th>
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Mentor Pendamping</th>
                  <th className="px-3 py-3 text-right font-semibold text-muted-foreground">Beswan</th>
                  <th className="px-3 py-3 text-right font-semibold text-muted-foreground">Hadir Valid</th>
                  <th className="px-3 py-3 text-right font-semibold text-muted-foreground">Kesempatan</th>
                  <th className="px-5 py-3 text-right font-semibold text-muted-foreground">Persentase</th>
                </tr>
              </thead>
              <tbody>
                {rekapPembinaanWilayah.map((w) => (
                  <tr key={w.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3 font-medium text-foreground">{w.wilayah}</td>
                    <td className="px-3 py-3 text-muted-foreground">{w.mentor}</td>
                    <td className="px-3 py-3 text-right font-medium">{w.jumlahBeswan}</td>
                    <td className="px-3 py-3 text-right text-emerald-600 font-semibold">{w.totalHadirValid}</td>
                    <td className="px-3 py-3 text-right text-muted-foreground">{w.totalKesempatan}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
                          <div
                            className={`h-full rounded-full ${w.persentase >= 75 ? "bg-emerald-500" : w.persentase >= 50 ? "bg-amber-500" : "bg-red-500"}`}
                            style={{ width: `${w.persentase}%` }}
                          />
                        </div>
                        <span className="font-semibold text-foreground w-10 text-right">{w.persentase}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabel per Individu */}
        <div className="rounded-xl border border-border bg-card shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Detail Per Peserta</h3>
              <p className="text-xs text-muted-foreground">OP = Opening Program (terpisah, tidak masuk % lima komponen)</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative min-w-[200px]">
                <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari NID / nama..."
                  className="w-full rounded-lg border border-border bg-background pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <select
                value={selectedWilayah}
                onChange={(e) => setSelectedWilayah(e.target.value)}
                className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-ring"
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
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="px-5 py-3 text-left font-semibold text-muted-foreground">NID</th>
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Nama Peserta</th>
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Wilayah</th>
                  <th className="px-3 py-3 text-center font-semibold text-primary">OP (Terpisah)</th>
                  <th className="px-2 py-3 text-center font-semibold text-muted-foreground">P. Awal</th>
                  <th className="px-2 py-3 text-center font-semibold text-muted-foreground">Pre-Test</th>
                  <th className="px-2 py-3 text-center font-semibold text-muted-foreground">Post-Test</th>
                  <th className="px-2 py-3 text-center font-semibold text-muted-foreground">P. Evaluasi</th>
                  <th className="px-2 py-3 text-center font-semibold text-muted-foreground">P. Akhir</th>
                  <th className="px-3 py-3 text-center font-semibold text-muted-foreground">Hadir / 5</th>
                  <th className="px-5 py-3 text-center font-semibold text-muted-foreground">Status Akhir</th>
                </tr>
              </thead>
              <tbody>
                {filteredBeswan.slice(0, 30).map((b) => (
                  <tr key={b.nid} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3 font-mono font-bold text-foreground">{b.nid}</td>
                    <td className="px-3 py-3 font-medium text-foreground">{b.nama}</td>
                    <td className="px-3 py-3 text-muted-foreground">{b.wilayah.split("–")[0].trim()}</td>
                    <td className="px-3 py-3 text-center bg-primary/5">
                      <ComponentBadge hadir={b.komponen.opening} />
                    </td>
                    <td className="px-2 py-3 text-center"><ComponentBadge hadir={b.komponen.presensiAwal} /></td>
                    <td className="px-2 py-3 text-center"><ComponentBadge hadir={b.komponen.preTest} /></td>
                    <td className="px-2 py-3 text-center"><ComponentBadge hadir={b.komponen.postTest} /></td>
                    <td className="px-2 py-3 text-center"><ComponentBadge hadir={b.komponen.openingEval} /></td>
                    <td className="px-2 py-3 text-center"><ComponentBadge hadir={b.komponen.presensiAkhir} /></td>
                    <td className="px-3 py-3 text-center font-bold text-foreground">{b.hadir}/5</td>
                    <td className="px-5 py-3 text-center"><StatusBadge status={b.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-border px-5 py-3 text-xs text-muted-foreground">
            Menampilkan {Math.min(30, filteredBeswan.length)} dari {filteredBeswan.length} beswan · Data dari SRC-01
          </div>
        </div>
      </div>
    </div>
  )
}

import { DashboardHeader } from "@/components/dashboard-shell"
import { dataPrestasi, masterWilayah } from "@/lib/mock-data"
import { ExternalLink, Star } from "lucide-react"

const BULAN = ["September 2026", "Oktober 2026", "November 2026"]

export default function PrestasiPage() {
  const totalPrestasi = dataPrestasi.length
  const perWilayah = masterWilayah.map((w) => ({
    ...w,
    jumlahPrestasi: dataPrestasi.filter((p) => p.wilayah === w.wilayah).length,
  }))

  return (
    <div className="flex flex-col flex-1 overflow-y-auto">
      <DashboardHeader
        title="Prestasi Beswan"
        subtitle="Rekap prestasi berdasarkan wilayah dan bulan pelaporan — mulai September 2026"
      />

      <div className="flex-1 space-y-6 p-6">
        <div className="rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30 px-4 py-3 text-xs text-blue-700 dark:text-blue-300">
          <strong>Sumber data:</strong> Prestasi dari SRC-01 (spreadsheet utama) dan SRC-03 (spreadsheet prestasi) digabungkan tanpa duplikasi. <strong>TBD-07:</strong> Alur verifikasi prestasi admin belum dikonfirmasi — tidak ada validasi wajib sampai diputuskan. <strong>TBD-08:</strong> Rekap bulan menggunakan bulan pelaporan (default).
        </div>

        {/* KPI */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
            <p className="text-xs text-muted-foreground">Total Prestasi</p>
            <p className="mt-1 text-3xl font-bold text-foreground">{totalPrestasi}</p>
            <p className="mt-1 text-xs text-muted-foreground">Sejak September 2026</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
            <p className="text-xs text-muted-foreground">Tingkat Internasional</p>
            <p className="mt-1 text-3xl font-bold text-foreground">{dataPrestasi.filter((p) => p.tingkat === "Internasional").length}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
            <p className="text-xs text-muted-foreground">Tingkat Nasional</p>
            <p className="mt-1 text-3xl font-bold text-foreground">{dataPrestasi.filter((p) => p.tingkat === "Nasional").length}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
            <p className="text-xs text-muted-foreground">Beswan Berprestasi</p>
            <p className="mt-1 text-3xl font-bold text-foreground">{new Set(dataPrestasi.map((p) => p.nid)).size}</p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-3 flex-wrap">
          <label className="text-sm font-medium text-foreground">Bulan:</label>
          <div className="flex gap-2">
            <button className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">Semua</button>
            {BULAN.map((b) => (
              <button key={b} className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted transition-colors">{b}</button>
            ))}
          </div>
          <select className="ml-auto rounded-lg border border-border bg-background px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-ring">
            <option>Semua Wilayah</option>
            {masterWilayah.map((w) => <option key={w.id}>{w.wilayah}</option>)}
          </select>
          <input
            type="text"
            placeholder="Cari NID / nama..."
            className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Rekap per Wilayah */}
          <div className="rounded-xl border border-border bg-card shadow-xs">
            <div className="border-b border-border px-5 py-4">
              <h3 className="text-sm font-semibold text-foreground">Prestasi per Wilayah</h3>
            </div>
            <ul className="divide-y divide-border/50">
              {perWilayah.map((w) => (
                <li key={w.id} className="flex items-center justify-between px-5 py-3">
                  <div>
                    <p className="text-xs font-medium text-foreground">{w.wilayah.split("–")[0].trim()}</p>
                    <p className="text-[10px] text-muted-foreground">{w.mentor}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">{w.jumlahPrestasi}</span>
                    <Star className="h-3.5 w-3.5 text-amber-400" />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Daftar Prestasi */}
          <div className="lg:col-span-2 rounded-xl border border-border bg-card shadow-xs">
            <div className="border-b border-border px-5 py-4">
              <h3 className="text-sm font-semibold text-foreground">Daftar Prestasi</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-5 py-3 text-left font-semibold text-muted-foreground">NID · Nama</th>
                    <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Prestasi</th>
                    <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Tingkat</th>
                    <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Bulan Lapor</th>
                    <th className="px-3 py-3 text-center font-semibold text-muted-foreground">Bukti</th>
                  </tr>
                </thead>
                <tbody>
                  {dataPrestasi.map((p) => (
                    <tr key={p.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3">
                        <p className="font-mono text-muted-foreground">{p.nid}</p>
                        <p className="font-medium text-foreground">{p.nama}</p>
                        <p className="text-[10px] text-muted-foreground">{p.wilayah.split("–")[0].trim()}</p>
                      </td>
                      <td className="px-3 py-3">
                        <p className="font-medium text-foreground leading-tight">{p.judul}</p>
                        <p className="text-muted-foreground">{p.kategori} · {p.penyelenggara}</p>
                      </td>
                      <td className="px-3 py-3">
                        <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          p.tingkat === "Internasional" ? "bg-purple-50 text-purple-700 dark:bg-purple-950/40" :
                          p.tingkat === "Nasional" ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40" :
                          "bg-muted text-muted-foreground"
                        }`}>{p.tingkat}</span>
                      </td>
                      <td className="px-3 py-3 text-muted-foreground">{p.bulanPelaporan}</td>
                      <td className="px-3 py-3 text-center">
                        {p.linkBukti ? (
                          <a href={p.linkBukti} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        ) : (
                          <span className="text-muted-foreground">–</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-border px-5 py-3 text-xs text-muted-foreground">
              Menampilkan {dataPrestasi.length} prestasi · Sumber: SRC-01 & SRC-03 (SRC-03 sedang offline)
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


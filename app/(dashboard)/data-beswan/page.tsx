import { DashboardHeader } from "@/components/dashboard-shell"
import { masterBeswan } from "@/lib/mock-data"
import { AlertTriangle, CheckCircle } from "lucide-react"

export default function DataBeswanPage() {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto">
      <DashboardHeader
        title="Data Beswan"
        subtitle="Pusat penelusuran master peserta Beasiswa Bintang Mandiri Angkatan 6"
      />

      <div className="flex-1 space-y-6 p-6">
        {/* Warning: 121 vs 120 */}
        <div className="rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30 px-4 py-3 text-xs text-amber-800 dark:text-amber-300">
          <AlertTriangle className="inline h-3.5 w-3.5 mr-1.5" />
          <strong>Perlu verifikasi:</strong> Daftar NID awal memuat <strong>121 NID unik</strong>, sementara brief menyebut total <strong>120 beswan</strong>. Admin MAI perlu mengonfirmasi apakah ada NID berlebih atau total peserta memang 121.
        </div>

        {/* Filter + Search */}
        <div className="flex items-center gap-3 flex-wrap">
          <input
            type="text"
            placeholder="Cari NID atau nama beswan..."
            className="flex-1 min-w-48 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <select className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
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
          <select className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
            <option>Semua Status</option>
            <option>Aktif</option>
            <option>Perlu Pemeriksaan</option>
          </select>
        </div>

        {/* Tabel master beswan */}
        <div className="rounded-xl border border-border bg-card shadow-xs">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Master Beswan</h3>
              <p className="text-xs text-muted-foreground">NID disimpan sebagai teks/string — tidak dikonversi ke angka</p>
            </div>
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">{masterBeswan.length} ditampilkan dari 121</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-5 py-3 text-left font-semibold text-muted-foreground">NID</th>
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">No. Beswan</th>
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Nama</th>
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Universitas</th>
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Wilayah</th>
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Mentor</th>
                  <th className="px-5 py-3 text-center font-semibold text-muted-foreground">Status</th>
                  <th className="px-5 py-3 text-center font-semibold text-muted-foreground">Profil</th>
                </tr>
              </thead>
              <tbody>
                {masterBeswan.map((b) => (
                  <tr key={b.nid} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-2.5 font-mono font-semibold text-foreground">{b.nid}</td>
                    <td className="px-3 py-2.5 font-mono text-muted-foreground">{b.nomorBeswan}</td>
                    <td className="px-3 py-2.5 font-medium text-foreground">{b.nama}</td>
                    <td className="px-3 py-2.5 text-muted-foreground">{b.universitas}</td>
                    <td className="px-3 py-2.5 text-muted-foreground">{b.wilayah.split("–")[0].trim()}</td>
                    <td className="px-3 py-2.5 text-muted-foreground">{b.mentor}</td>
                    <td className="px-5 py-2.5 text-center">
                      {b.status === "Aktif" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950/40">
                          <CheckCircle className="h-3 w-3" /> Aktif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-950/40">
                          <AlertTriangle className="h-3 w-3" /> Perlu Periksa
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-2.5 text-center">
                      <button className="rounded-md border border-border px-3 py-1 text-xs font-medium text-foreground hover:bg-muted transition-colors">
                        Lihat
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-border px-5 py-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>Menampilkan {masterBeswan.length} dari 121 beswan · Sumber: MASTER_BESWAN (SRC-01)</span>
            <div className="flex items-center gap-2">
              <button className="rounded-md border border-border px-3 py-1 hover:bg-muted transition-colors">← Prev</button>
              <span className="px-2">1 / 7</span>
              <button className="rounded-md border border-border px-3 py-1 hover:bg-muted transition-colors">Next →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


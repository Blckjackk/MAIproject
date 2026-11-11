import { DashboardHeader } from "@/components/dashboard-shell"
import { sumberDataList } from "@/lib/mock-data"
import { RefreshCw, AlertTriangle, CircleCheck, CircleX, CircleAlert, ExternalLink } from "lucide-react"

const dataIssues = [
  { id: "ISS-001", kategori: "NID Tidak Dikenal", sumber: "SRC-01", tab: "RESPON_PEMBINAAN_NASIONAL", baris: 42, nilaiNid: "60104", pesan: "NID '60104' tidak ditemukan dalam master beswan setelah normalisasi" },
  { id: "ISS-002", kategori: "NID Tidak Dikenal", sumber: "SRC-01", tab: "RESPON_MENTORSHIP", baris: 87, nilaiNid: "602XXX", pesan: "NID '602XXX' mengandung karakter non-numerik" },
  { id: "ISS-003", kategori: "Respons Duplikat", sumber: "SRC-01", tab: "RESPON_PEMBINAAN_NASIONAL", baris: 125, nilaiNid: "601001", pesan: "NID 601001 memiliki 2 respons untuk Presensi Awal dengan timestamp berbeda — perlu keputusan admin (TBD-06)" },
  { id: "ISS-004", kategori: "NID Kosong", sumber: "SRC-02", tab: "Sheet1", baris: 203, nilaiNid: "(kosong)", pesan: "Kolom NID kosong, respons tidak dapat dipetakan ke beswan manapun" },
  { id: "ISS-005", kategori: "Kolom Tidak Dikenal", sumber: "SRC-01", tab: "RESPON_MENTORSHIP", baris: null, nilaiNid: "–", pesan: "Kolom 'Periode Mentorship' tidak cocok dengan nilai konfigurasi. Kemungkinan ada perubahan opsi Google Form" },
]

function StatusIcon({ status }: { status: string }) {
  if (status === "Terhubung") return <CircleCheck className="h-4 w-4 text-emerald-500" />
  if (status === "Gagal") return <CircleX className="h-4 w-4 text-red-500" />
  return <CircleAlert className="h-4 w-4 text-amber-500" />
}

function KategoriBadge({ kategori }: { kategori: string }) {
  const map: Record<string, string> = {
    "NID Tidak Dikenal": "bg-red-50 text-red-700 dark:bg-red-950/40",
    "NID Kosong": "bg-red-50 text-red-700 dark:bg-red-950/40",
    "Respons Duplikat": "bg-amber-50 text-amber-700 dark:bg-amber-950/40",
    "Kolom Tidak Dikenal": "bg-purple-50 text-purple-700 dark:bg-purple-950/40",
  }
  return <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${map[kategori] ?? "bg-muted text-muted-foreground"}`}>{kategori}</span>
}

export default function IntegrasiDataPage() {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto">
      <DashboardHeader
        title="Integrasi Data"
        subtitle="Status koneksi Google Sheets, kualitas data, dan daftar pengecualian"
      />

      <div className="flex-1 space-y-6 p-6">
        {/* Info Banner */}
        <div className="rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30 px-4 py-3 text-xs text-blue-700 dark:text-blue-300">
          <strong>Arsitektur:</strong> Dashboard membaca data dari Google Sheets secara read-only. Data respons mentah <strong>tidak pernah dihapus atau dimodifikasi</strong>. Data bermasalah ditampilkan di halaman ini untuk pemeriksaan admin.
        </div>

        {/* Sumber Data */}
        <div className="rounded-xl border border-border bg-card shadow-xs">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h3 className="text-sm font-semibold text-foreground">Status Sumber Data</h3>
            <button className="flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              <RefreshCw className="h-3.5 w-3.5" />
              Sinkronisasi Sekarang
            </button>
          </div>
          <div className="divide-y divide-border/50">
            {sumberDataList.map((src) => (
              <div key={src.id} className="px-5 py-5">
                <div className="flex items-start gap-4">
                  <StatusIcon status={src.statusKoneksi} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h4 className="text-sm font-semibold text-foreground">{src.nama}</h4>
                      <span className="font-mono text-xs text-muted-foreground">{src.id}</span>
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        src.statusKoneksi === "Terhubung" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40" :
                        "bg-red-50 text-red-700 dark:bg-red-950/40"
                      }`}>{src.statusKoneksi}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{src.kegunaan}</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">Dibaca terakhir: {src.waktuBacaTerakhir}</p>

                    {src.statusKoneksi === "Terhubung" && (
                      <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-4 text-xs">
                        <div>
                          <p className="text-muted-foreground">Total baris</p>
                          <p className="font-semibold text-foreground">{src.jumlahBaris}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Berhasil dipetakan</p>
                          <p className="font-semibold text-emerald-600">{src.jumlahDipetakan}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">NID tidak dikenal</p>
                          <p className={`font-semibold ${src.jumlahNidTidakDikenal > 0 ? "text-red-600" : "text-foreground"}`}>{src.jumlahNidTidakDikenal}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Potensi duplikat</p>
                          <p className={`font-semibold ${src.jumlahDuplikat > 0 ? "text-amber-600" : "text-foreground"}`}>{src.jumlahDuplikat}</p>
                        </div>
                      </div>
                    )}

                    {src.pesanError && (
                      <div className="mt-3 rounded-lg border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30 px-3 py-2.5">
                        <p className="text-xs font-semibold text-red-700 dark:text-red-400">Error:</p>
                        <p className="mt-0.5 text-xs text-red-600 dark:text-red-400">{src.pesanError}</p>
                        <p className="mt-1.5 text-xs text-red-500">Tindakan: Buka spreadsheet &gt; Share &gt; tambahkan service account email dengan akses Viewer.</p>
                        <a
                          href={`https://docs.google.com/spreadsheets/d/1y5e9t1eDeYsPIHDcm1kSAEUN6ZhEsd_P_XK-U9gWELk/edit`}
                          target="_blank" rel="noopener noreferrer"
                          className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-red-700 hover:underline"
                        >
                          <ExternalLink className="h-3 w-3" /> Buka Spreadsheet SRC-03
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daftar Pengecualian */}
        <div className="rounded-xl border border-border bg-card shadow-xs">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Daftar Pengecualian & Data Bermasalah</h3>
              <p className="text-xs text-muted-foreground">Data ini tidak dihapus — ditampilkan untuk pemeriksaan admin</p>
            </div>
            <div className="flex items-center gap-2">
              <select className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-ring">
                <option>Semua Kategori</option>
                <option>NID Tidak Dikenal</option>
                <option>NID Kosong</option>
                <option>Respons Duplikat</option>
                <option>Kolom Tidak Dikenal</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-5 py-3 text-left font-semibold text-muted-foreground">ID Isu</th>
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Kategori</th>
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Sumber</th>
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Tab</th>
                  <th className="px-3 py-3 text-right font-semibold text-muted-foreground">Baris</th>
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Nilai NID</th>
                  <th className="px-5 py-3 text-left font-semibold text-muted-foreground">Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {dataIssues.map((issue) => (
                  <tr key={issue.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3 font-mono font-medium text-foreground">{issue.id}</td>
                    <td className="px-3 py-3"><KategoriBadge kategori={issue.kategori} /></td>
                    <td className="px-3 py-3 font-mono text-muted-foreground">{issue.sumber}</td>
                    <td className="px-3 py-3 font-mono text-muted-foreground text-[10px]">{issue.tab}</td>
                    <td className="px-3 py-3 text-right text-muted-foreground">{issue.baris ?? "–"}</td>
                    <td className="px-3 py-3 font-mono text-foreground">{issue.nilaiNid}</td>
                    <td className="px-5 py-3 text-muted-foreground leading-relaxed max-w-xs">{issue.pesan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-border px-5 py-3 text-xs text-muted-foreground flex items-center gap-2">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
            <span>{dataIssues.length} isu ditemukan — tidak ada data yang dihapus secara otomatis</span>
          </div>
        </div>
      </div>
    </div>
  )
}


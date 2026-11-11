import { DashboardHeader } from "@/components/dashboard-shell"
import { dataPenugasan } from "@/lib/mock-data"
import { CheckSquare, ExternalLink, Clock, XCircle, CheckCircle2, Minus } from "lucide-react"

type StatusValidasi = "Diterima" | "Tidak Diterima" | "Menunggu Validasi" | "Belum Mengumpulkan"

function StatusBadge({ status }: { status: StatusValidasi }) {
  const map: Record<StatusValidasi, { cls: string; icon: React.ReactNode }> = {
    "Diterima": {
      cls: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40",
      icon: <CheckCircle2 className="h-3 w-3" />,
    },
    "Tidak Diterima": {
      cls: "bg-red-50 text-red-700 dark:bg-red-950/40",
      icon: <XCircle className="h-3 w-3" />,
    },
    "Menunggu Validasi": {
      cls: "bg-amber-50 text-amber-700 dark:bg-amber-950/40",
      icon: <Clock className="h-3 w-3" />,
    },
    "Belum Mengumpulkan": {
      cls: "bg-muted text-muted-foreground",
      icon: <Minus className="h-3 w-3" />,
    },
  }
  const { cls, icon } = map[status]
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${cls}`}>
      {icon} {status}
    </span>
  )
}

const KATEGORI = ["MAI Foundation", "Mentorship", "MAI Wilayah", "Pembinaan Nasional", "Tugas Tambahan"] as const

export default function PenugasanPage() {
  const diterima = dataPenugasan.filter((d) => d.statusValidasi === "Diterima").length
  const menunggu = dataPenugasan.filter((d) => d.statusValidasi === "Menunggu Validasi").length
  const tidakDiterima = dataPenugasan.filter((d) => d.statusValidasi === "Tidak Diterima").length
  const belumMengumpulkan = dataPenugasan.filter((d) => d.statusValidasi === "Belum Mengumpulkan").length
  const total = dataPenugasan.length

  return (
    <div className="flex flex-col flex-1 overflow-y-auto">
      <DashboardHeader
        title="Penugasan Brand Ambassador"
        subtitle="Rekap pengumpulan dan validasi tugas per kategori"
      />

      <div className="flex-1 space-y-6 p-6">
        {/* Info Banner */}
        <div className="rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30 px-4 py-3 text-xs text-amber-800 dark:text-amber-300">
          <strong>TBD-04:</strong> Frekuensi kewajiban tugas rutin (sekali selama program, per bulan, atau per kegiatan) belum ditetapkan. Penyebut persentase penyelesaian akan disesuaikan setelah keputusan ini dikonfirmasi.
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { label: "Diterima (Valid)", value: diterima, sub: `${Math.round((diterima / total) * 100)}% valid completion`, color: "text-emerald-600" },
            { label: "Menunggu Validasi", value: menunggu, sub: "Perlu diperiksa admin", color: "text-amber-600" },
            { label: "Tidak Diterima", value: tidakDiterima, sub: "Revisi diperlukan", color: "text-red-600" },
            { label: "Belum Mengumpulkan", value: belumMengumpulkan, sub: "Belum ada submission", color: "text-muted-foreground" },
          ].map((c) => (
            <div key={c.label} className="rounded-xl border border-border bg-card p-5 shadow-xs">
              <p className="text-xs text-muted-foreground">{c.label}</p>
              <p className={`mt-1 text-3xl font-bold ${c.color}`}>{c.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{c.sub}</p>
            </div>
          ))}
        </div>

        {/* Rekap per kategori */}
        <div className="rounded-xl border border-border bg-card shadow-xs">
          <div className="border-b border-border px-5 py-4">
            <h3 className="text-sm font-semibold text-foreground">Rekap per Kategori Tugas</h3>
            <p className="text-xs text-muted-foreground">Tugas Tambahan tidak masuk penyebut kewajiban rutin</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-5 py-3 text-left font-semibold text-muted-foreground">Kategori</th>
                  <th className="px-3 py-3 text-right font-semibold text-muted-foreground">Diterima</th>
                  <th className="px-3 py-3 text-right font-semibold text-muted-foreground">Menunggu</th>
                  <th className="px-3 py-3 text-right font-semibold text-muted-foreground">Tidak Diterima</th>
                  <th className="px-3 py-3 text-right font-semibold text-muted-foreground">Belum Kumpul</th>
                  <th className="px-5 py-3 text-right font-semibold text-muted-foreground">Submission Rate</th>
                </tr>
              </thead>
              <tbody>
                {KATEGORI.map((kat) => {
                  const sub = dataPenugasan.filter((d) => d.kategori === kat)
                  const dtr = sub.filter((d) => d.statusValidasi === "Diterima").length
                  const mng = sub.filter((d) => d.statusValidasi === "Menunggu Validasi").length
                  const tdk = sub.filter((d) => d.statusValidasi === "Tidak Diterima").length
                  const blm = sub.filter((d) => d.statusValidasi === "Belum Mengumpulkan").length
                  const rate = sub.length > 0 ? Math.round(((sub.length - blm) / sub.length) * 100) : 0
                  return (
                    <tr key={kat} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3 font-medium text-foreground">
                        {kat}
                        {kat === "Tugas Tambahan" && (
                          <span className="ml-2 rounded-full border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">opsional</span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-right text-emerald-600 font-semibold">{dtr}</td>
                      <td className="px-3 py-3 text-right text-amber-600">{mng}</td>
                      <td className="px-3 py-3 text-right text-red-600">{tdk}</td>
                      <td className="px-3 py-3 text-right text-muted-foreground">{blm}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                            <div className={`h-full rounded-full ${rate >= 75 ? "bg-emerald-500" : rate >= 50 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${rate}%` }} />
                          </div>
                          <span className="font-semibold text-foreground w-10 text-right">{rate}%</span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Daftar submission menunggu validasi */}
        <div className="rounded-xl border border-border bg-card shadow-xs">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Semua Submission</h3>
              <p className="text-xs text-muted-foreground">Klik "Validasi" untuk memeriksa dan memberikan keputusan</p>
            </div>
            <div className="flex items-center gap-2">
              <select className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-ring">
                <option>Semua Status</option>
                <option>Menunggu Validasi</option>
                <option>Diterima</option>
                <option>Tidak Diterima</option>
                <option>Belum Mengumpulkan</option>
              </select>
              <select className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-ring">
                <option>Semua Kategori</option>
                {KATEGORI.map((k) => <option key={k}>{k}</option>)}
              </select>
              <input
                type="text"
                placeholder="Cari NID / nama..."
                className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-5 py-3 text-left font-semibold text-muted-foreground">NID</th>
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Nama</th>
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Kategori</th>
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Wilayah</th>
                  <th className="px-3 py-3 text-center font-semibold text-muted-foreground">Bukti</th>
                  <th className="px-3 py-3 text-center font-semibold text-muted-foreground">Dikumpulkan</th>
                  <th className="px-3 py-3 text-center font-semibold text-muted-foreground">Status</th>
                  <th className="px-5 py-3 text-center font-semibold text-muted-foreground">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dataPenugasan.slice(0, 20).map((d) => (
                  <tr key={d.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-2.5 font-mono font-medium text-foreground">{d.nid}</td>
                    <td className="px-3 py-2.5 font-medium text-foreground">{d.nama}</td>
                    <td className="px-3 py-2.5 text-muted-foreground">{d.kategori}</td>
                    <td className="px-3 py-2.5 text-muted-foreground">{d.wilayah.split("–")[0].trim()}</td>
                    <td className="px-3 py-2.5 text-center">
                      {d.linkBukti ? (
                        <a href={d.linkBukti} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      ) : (
                        <span className="text-muted-foreground">–</span>
                      )}
                    </td>
                    <td className="px-3 py-2.5 text-center text-muted-foreground">{d.submittedAt ?? "–"}</td>
                    <td className="px-3 py-2.5 text-center"><StatusBadge status={d.statusValidasi as StatusValidasi} /></td>
                    <td className="px-5 py-2.5 text-center">
                      {d.statusValidasi === "Menunggu Validasi" && (
                        <div className="flex items-center justify-center gap-1.5">
                          <button className="rounded-md bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors">Terima</button>
                          <button className="rounded-md bg-red-50 px-2.5 py-1 text-[10px] font-semibold text-red-700 hover:bg-red-100 transition-colors">Tolak</button>
                        </div>
                      )}
                      {d.statusValidasi !== "Menunggu Validasi" && (
                        <button className="rounded-md border border-border px-2.5 py-1 text-[10px] font-medium text-muted-foreground hover:bg-muted transition-colors">Detail</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-border px-5 py-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>Menampilkan 20 dari {dataPenugasan.length} submission · Validasi tersimpan ke Google Sheets tab VALIDASI_PENUGASAN</span>
            <div className="flex items-center gap-2">
              <button className="rounded-md border border-border px-3 py-1 hover:bg-muted transition-colors">← Prev</button>
              <span>Hal. 1</span>
              <button className="rounded-md border border-border px-3 py-1 hover:bg-muted transition-colors">Next →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


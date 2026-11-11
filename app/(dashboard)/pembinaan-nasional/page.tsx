import { DashboardHeader } from "@/components/dashboard-shell"
import { masterBeswan, rekapPembinaanWilayah } from "@/lib/mock-data"
import { BookOpen, CircleCheck, CircleX, Users } from "lucide-react"

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
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${map[status]}`}>
      {status}
    </span>
  )
}

function ComponentBadge({ hadir }: { hadir: boolean | null }) {
  if (hadir === null) return <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] text-muted-foreground">–</span>
  return hadir
    ? <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"><CircleCheck className="h-3.5 w-3.5" /></span>
    : <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-red-600"><CircleX className="h-3.5 w-3.5" /></span>
}

// Simulasi data komponen per beswan (dalam implementasi real ini dari Google Sheets)
function getMockKomponen(nid: string) {
  const seed = parseInt(nid.slice(-3))
  return {
    opening: seed % 3 !== 0,
    presensiAwal: seed % 7 !== 0 ? true : false,
    preTest: seed % 5 !== 0 ? true : false,
    postTest: seed % 11 !== 0 ? true : null, // null = belum dilaksanakan
    openingEval: seed % 9 !== 0 ? true : false,
    presensiAkhir: null, // belum dilaksanakan
  }
}

function countHadir(k: ReturnType<typeof getMockKomponen>) {
  return [k.presensiAwal, k.preTest, k.postTest, k.openingEval, k.presensiAkhir]
    .filter((x) => x === true).length
}

export default function PembinaanNasionalPage() {
  const beswan = masterBeswan.map((b) => {
    const k = getMockKomponen(b.nid)
    const hadir = countHadir(k)
    return { ...b, komponen: k, hadir, status: getStatus(hadir) }
  })

  const totalHadir = beswan.filter((b) => b.status === "Hadir Full").length
  const sebagian = beswan.filter((b) => b.status === "Hadir Sebagian").length
  const tidakHadir = beswan.filter((b) => b.status === "Tidak Hadir").length

  return (
    <div className="flex flex-col flex-1 overflow-y-auto">
      <DashboardHeader
        title="Pembinaan Nasional"
        subtitle="Rekap kehadiran 6 komponen — Opening Program ditampilkan terpisah"
      />

      <div className="flex-1 space-y-6 p-6">
        {/* Info Banner */}
        <div className="rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30 px-4 py-3 text-xs text-blue-700 dark:text-blue-300">
          <strong>Aturan perhitungan:</strong> Opening Program tidak masuk persentase. Lima komponen utama: Presensi Awal, Pre-Test, Post-Test, Presensi Opening Evaluasi, dan Presensi Akhir. Status: 0–2 hadir = Tidak Hadir · 3–4 hadir = Hadir Sebagian · 5 hadir = Hadir Full. Komponen bertanda <strong>–</strong> belum dilaksanakan dan tidak masuk penyebut.
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { label: "Hadir Full (5/5)", value: totalHadir, color: "bg-emerald-50 text-emerald-700" },
            { label: "Hadir Sebagian (3–4/5)", value: sebagian, color: "bg-amber-50 text-amber-700" },
            { label: "Tidak Hadir (0–2/5)", value: tidakHadir, color: "bg-red-50 text-red-700" },
            { label: "Total Beswan", value: beswan.length, color: "bg-muted text-foreground" },
          ].map((c) => (
            <div key={c.label} className={`rounded-xl border border-border bg-card p-5 shadow-xs`}>
              <p className="text-xs text-muted-foreground">{c.label}</p>
              <p className="mt-1 text-3xl font-bold text-foreground">{c.value}</p>
              <div className={`mt-2 h-1 w-full rounded-full overflow-hidden bg-muted`}>
                <div className={`h-full rounded-full ${c.color.split(" ")[0]}`} style={{ width: `${(c.value / beswan.length) * 100}%` }} />
              </div>
            </div>
          ))}
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
                <tr className="border-b border-border">
                  <th className="px-5 py-3 text-left font-semibold text-muted-foreground">Wilayah</th>
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Mentor</th>
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
                    <td className="px-3 py-3 text-right">{w.jumlahBeswan}</td>
                    <td className="px-3 py-3 text-right text-emerald-600 font-medium">{w.totalHadirValid}</td>
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
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Detail Per Peserta</h3>
              <p className="text-xs text-muted-foreground">OP = Opening Program (tidak masuk %)</p>
            </div>
            <div className="flex items-center gap-2">
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
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Wilayah</th>
                  <th className="px-3 py-3 text-center font-semibold text-muted-foreground">OP</th>
                  <th className="px-2 py-3 text-center font-semibold text-muted-foreground">P.Awal</th>
                  <th className="px-2 py-3 text-center font-semibold text-muted-foreground">Pre-T</th>
                  <th className="px-2 py-3 text-center font-semibold text-muted-foreground">Post-T</th>
                  <th className="px-2 py-3 text-center font-semibold text-muted-foreground">P.OE</th>
                  <th className="px-2 py-3 text-center font-semibold text-muted-foreground">P.Akhir</th>
                  <th className="px-3 py-3 text-center font-semibold text-muted-foreground">Hadir</th>
                  <th className="px-5 py-3 text-center font-semibold text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {beswan.map((b) => (
                  <tr key={b.nid} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-2.5 font-mono font-medium text-foreground">{b.nid}</td>
                    <td className="px-3 py-2.5 font-medium text-foreground">{b.nama}</td>
                    <td className="px-3 py-2.5 text-muted-foreground">{b.wilayah.split("–")[0].trim()}</td>
                    <td className="px-3 py-2.5 text-center"><ComponentBadge hadir={b.komponen.opening} /></td>
                    <td className="px-2 py-2.5 text-center"><ComponentBadge hadir={b.komponen.presensiAwal} /></td>
                    <td className="px-2 py-2.5 text-center"><ComponentBadge hadir={b.komponen.preTest} /></td>
                    <td className="px-2 py-2.5 text-center"><ComponentBadge hadir={b.komponen.postTest} /></td>
                    <td className="px-2 py-2.5 text-center"><ComponentBadge hadir={b.komponen.openingEval} /></td>
                    <td className="px-2 py-2.5 text-center"><ComponentBadge hadir={b.komponen.presensiAkhir} /></td>
                    <td className="px-3 py-2.5 text-center font-semibold text-foreground">{b.hadir}/5</td>
                    <td className="px-5 py-2.5 text-center"><StatusBadge status={b.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-border px-5 py-3 text-xs text-muted-foreground">
            Menampilkan {beswan.length} dari 121 beswan · Data dari SRC-01 · Diperbarui: 11 Nov 2026, 12:45 WIB
          </div>
        </div>
      </div>
    </div>
  )
}


import { DashboardHeader } from "@/components/dashboard-shell"
import { masterBeswan, periodeMentorship } from "@/lib/mock-data"
import { CircleCheck, CircleX, Plus } from "lucide-react"

type StatusPeriode = "Direncanakan" | "Berlangsung" | "Selesai" | "Ditutup"

function PeriodeBadge({ status }: { status: StatusPeriode }) {
  const map: Record<StatusPeriode, string> = {
    "Berlangsung": "bg-blue-50 text-blue-700 dark:bg-blue-950/40",
    "Selesai": "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40",
    "Ditutup": "bg-muted text-muted-foreground",
    "Direncanakan": "bg-amber-50 text-amber-700 dark:bg-amber-950/40",
  }
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${map[status]}`}>{status}</span>
}

function ComponentDot({ hadir }: { hadir: boolean | null }) {
  if (hadir === null) return <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] text-muted-foreground">–</span>
  return hadir
    ? <CircleCheck className="h-4.5 w-4.5 text-emerald-500" />
    : <CircleX className="h-4.5 w-4.5 text-red-400" />
}

function getMockMentorshipData(nid: string, periodeId: string) {
  const seed = parseInt(nid.slice(-3)) + parseInt(periodeId.slice(1))
  if (periodeId === "P6") return { pm: null, preTest: null, postTest: null } // belum berlangsung
  return {
    pm: seed % 7 !== 0,
    preTest: seed % 5 !== 0,
    postTest: seed % 11 !== 0,
  }
}

function getStatusMentorship(d: { pm: boolean | null; preTest: boolean | null; postTest: boolean | null }) {
  const hadir = [d.pm, d.preTest, d.postTest].filter((x) => x === true).length
  if (d.pm === null) return null
  return hadir >= 2 ? "Hadir" : "Tidak Hadir"
}

export default function MentorshipPage() {
  const selectedPeriode = "P5"
  const periode = periodeMentorship.find((p) => p.id === selectedPeriode)!

  const data = masterBeswan.map((b) => {
    const mk = getMockMentorshipData(b.nid, selectedPeriode)
    return { ...b, ...mk, statusPertemuan: getStatusMentorship(mk) }
  })

  const totalHadir = data.filter((d) => d.statusPertemuan === "Hadir").length
  const totalTidakHadir = data.filter((d) => d.statusPertemuan === "Tidak Hadir").length

  return (
    <div className="flex flex-col flex-1 overflow-y-auto">
      <DashboardHeader
        title="Mentorship"
        subtitle="Rekap kehadiran per pertemuan — 1 Google Form & 1 Spreadsheet untuk semua periode"
      />

      <div className="flex-1 space-y-6 p-6">
        <div className="rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30 px-4 py-3 text-xs text-blue-700 dark:text-blue-300">
          <strong>Arsitektur:</strong> Semua periode Mentorship menggunakan <strong>satu Google Form</strong> dan <strong>satu Google Spreadsheet</strong>. Periode baru ditambahkan sebagai pilihan di Google Form yang sama. Penambahan periode di dashboard tidak membuat Form/Spreadsheet baru.
        </div>

        {/* Daftar Periode */}
        <div className="rounded-xl border border-border bg-card shadow-xs">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h3 className="text-sm font-semibold text-foreground">Konfigurasi Periode Mentorship</h3>
            <button className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              <Plus className="h-3.5 w-3.5" />
              Tambah Periode
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-5 py-3 text-left font-semibold text-muted-foreground">#</th>
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Nama Periode</th>
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Bulan/Tahun</th>
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Nilai di Google Form</th>
                  <th className="px-3 py-3 text-center font-semibold text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {periodeMentorship.map((p) => (
                  <tr key={p.id} className={`border-b border-border/50 last:border-0 transition-colors ${p.id === selectedPeriode ? "bg-primary/5" : "hover:bg-muted/30"}`}>
                    <td className="px-5 py-3 font-mono font-semibold text-foreground">{p.nomor}</td>
                    <td className="px-3 py-3 font-medium text-foreground">{p.nama}</td>
                    <td className="px-3 py-3 text-muted-foreground">{p.bulanTahun}</td>
                    <td className="px-3 py-3 font-mono text-muted-foreground">{p.nilaiForms}</td>
                    <td className="px-3 py-3 text-center"><PeriodeBadge status={p.status as StatusPeriode} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Filter + KPI Periode Terpilih */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-foreground">Periode:</label>
          <select className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
            {periodeMentorship.map((p) => (
              <option key={p.id} value={p.id} selected={p.id === selectedPeriode}>{p.nama}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { label: "Hadir (≥2 komponen)", value: totalHadir, color: "text-emerald-600" },
            { label: "Tidak Hadir (0–1 komponen)", value: totalTidakHadir, color: "text-red-600" },
            { label: "Persentase Kehadiran", value: `${Math.round((totalHadir / data.length) * 100)}%`, color: "text-foreground" },
            { label: "Total Beswan Periode Ini", value: data.length, color: "text-foreground" },
          ].map((c) => (
            <div key={c.label} className="rounded-xl border border-border bg-card p-5 shadow-xs">
              <p className="text-xs text-muted-foreground">{c.label}</p>
              <p className={`mt-1 text-3xl font-bold ${c.color}`}>{c.value}</p>
            </div>
          ))}
        </div>

        {/* Tabel detail per beswan */}
        <div className="rounded-xl border border-border bg-card shadow-xs">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Detail Per Peserta — {periode.nama}</h3>
              <p className="text-xs text-muted-foreground">PM = Presensi Mentorship · 2–3 komponen hadir = Hadir Pertemuan</p>
            </div>
            <input
              type="text"
              placeholder="Cari NID / nama..."
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-5 py-3 text-left font-semibold text-muted-foreground">NID</th>
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Nama</th>
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Wilayah</th>
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Mentor</th>
                  <th className="px-3 py-3 text-center font-semibold text-muted-foreground">PM</th>
                  <th className="px-3 py-3 text-center font-semibold text-muted-foreground">Pre-Test</th>
                  <th className="px-3 py-3 text-center font-semibold text-muted-foreground">Post-Test</th>
                  <th className="px-5 py-3 text-center font-semibold text-muted-foreground">Status Pertemuan</th>
                </tr>
              </thead>
              <tbody>
                {data.map((b) => (
                  <tr key={b.nid} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-2.5 font-mono font-medium text-foreground">{b.nid}</td>
                    <td className="px-3 py-2.5 font-medium text-foreground">{b.nama}</td>
                    <td className="px-3 py-2.5 text-muted-foreground">{b.wilayah.split("–")[0].trim()}</td>
                    <td className="px-3 py-2.5 text-muted-foreground">{b.mentor}</td>
                    <td className="px-3 py-2.5 text-center"><ComponentDot hadir={b.pm} /></td>
                    <td className="px-3 py-2.5 text-center"><ComponentDot hadir={b.preTest} /></td>
                    <td className="px-3 py-2.5 text-center"><ComponentDot hadir={b.postTest} /></td>
                    <td className="px-5 py-2.5 text-center">
                      {b.statusPertemuan === null ? (
                        <span className="text-muted-foreground">–</span>
                      ) : b.statusPertemuan === "Hadir" ? (
                        <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">Hadir</span>
                      ) : (
                        <span className="inline-flex rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700">Tidak Hadir</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-border px-5 py-3 text-xs text-muted-foreground">
            Menampilkan {data.length} dari 121 beswan · Periode: {periode.nama} · Data dari SRC-01 & SRC-02
          </div>
        </div>
      </div>
    </div>
  )
}


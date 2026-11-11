"use client"

import { useState, useMemo } from "react"
import { DashboardHeader } from "@/components/dashboard-shell"
import { dataPenugasan as initialData } from "@/lib/mock-data"
import type { Penugasan, StatusValidasi } from "@/lib/mock-data"
import {
  CheckSquare,
  ExternalLink,
  Clock,
  XCircle,
  CheckCircle2,
  Minus,
  Search,
  Filter,
  X,
  Send,
  Check,
  AlertCircle,
  FileSpreadsheet,
} from "lucide-react"

function StatusBadge({ status }: { status: StatusValidasi }) {
  const map: Record<StatusValidasi, { cls: string; icon: React.ReactNode }> = {
    "Diterima": {
      cls: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
      icon: <CheckCircle2 className="h-3 w-3" />,
    },
    "Tidak Diterima": {
      cls: "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
      icon: <XCircle className="h-3 w-3" />,
    },
    "Menunggu Validasi": {
      cls: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
      icon: <Clock className="h-3 w-3" />,
    },
    "Belum Mengumpulkan": {
      cls: "bg-muted text-muted-foreground",
      icon: <Minus className="h-3 w-3" />,
    },
  }
  const { cls, icon } = map[status]
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${cls}`}>
      {icon} {status}
    </span>
  )
}

const KATEGORI = ["MAI Foundation", "Mentorship", "MAI Wilayah", "Pembinaan Nasional", "Tugas Tambahan"] as const

export default function PenugasanPage() {
  const [tasks, setTasks] = useState<Penugasan[]>(initialData)
  const [search, setSearch] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("Semua Status")
  const [selectedKategori, setSelectedKategori] = useState("Semua Kategori")
  const [validatingTask, setValidatingTask] = useState<Penugasan | null>(null)
  const [validationDecision, setValidationDecision] = useState<"Diterima" | "Tidak Diterima">("Diterima")
  const [adminNote, setAdminNote] = useState("")
  const [showSuccessToast, setShowSuccessToast] = useState(false)

  // Calculations
  const diterima = tasks.filter((d) => d.statusValidasi === "Diterima").length
  const menunggu = tasks.filter((d) => d.statusValidasi === "Menunggu Validasi").length
  const tidakDiterima = tasks.filter((d) => d.statusValidasi === "Tidak Diterima").length
  const belumMengumpulkan = tasks.filter((d) => d.statusValidasi === "Belum Mengumpulkan").length
  const total = tasks.length

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchSearch =
        t.nama.toLowerCase().includes(search.toLowerCase()) ||
        t.nid.includes(search) ||
        t.wilayah.toLowerCase().includes(search.toLowerCase())
      const matchStatus = selectedStatus === "Semua Status" || t.statusValidasi === selectedStatus
      const matchKategori = selectedKategori === "Semua Kategori" || t.kategori === selectedKategori
      return matchSearch && matchStatus && matchKategori
    })
  }, [tasks, search, selectedStatus, selectedKategori])

  const openValidationModal = (task: Penugasan, decision: "Diterima" | "Tidak Diterima") => {
    setValidatingTask(task)
    setValidationDecision(decision)
    setAdminNote(task.catatanAdmin || (decision === "Diterima" ? "Tugas memenuhi standar penugasan." : "Format atau lampiran belum sesuai panduan."))
  }

  const handleSaveValidation = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validatingTask) return

    setTasks((prev) =>
      prev.map((item) => {
        if (item.id === validatingTask.id) {
          return {
            ...item,
            statusValidasi: validationDecision,
            catatanAdmin: adminNote,
            validasiAt: "Baru saja",
          }
        }
        return item
      })
    )

    setValidatingTask(null)
    setShowSuccessToast(true)
    setTimeout(() => setShowSuccessToast(false), 4000)
  }

  return (
    <div className="flex flex-col flex-1 overflow-y-auto">
      <DashboardHeader
        title="Penugasan Brand Ambassador"
        subtitle="Rekap pengumpulan dan validasi tugas beasiswa"
      />

      <div className="flex-1 space-y-6 p-6">
        {/* Success Alert */}
        {showSuccessToast && (
          <div className="flex items-center gap-2 rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300 animate-in fade-in">
            <Check className="h-4 w-4 text-emerald-600" />
            Keputusan validasi berhasil disimpan! Status & catatan tersinkronisasi ke tab Google Sheets <code>VALIDASI_PENUGASAN</code>.
          </div>
        )}

        {/* Info Banner */}
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-300">
          <strong>Aturan Validasi (Spec 9.5 & TBD-04):</strong> Submission yang masuk tidak otomatis berstatus selesai sah sebelum divalidasi admin. Hanya tugas berstatus <strong>Diterima</strong> yang masuk ke <em>Valid Completion Rate</em>. Frekuensi kewajiban rutin (sekali / per bulan) masih berstatus TBD-04.
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
            <p className="text-xs font-medium text-muted-foreground">Diterima (Sah / Valid)</p>
            <p className="mt-1 text-3xl font-bold text-emerald-600">{diterima}</p>
            <p className="mt-1 text-xs text-muted-foreground">{Math.round((diterima / total) * 100)}% valid completion rate</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
            <p className="text-xs font-medium text-muted-foreground">Menunggu Validasi</p>
            <p className="mt-1 text-3xl font-bold text-amber-600">{menunggu}</p>
            <p className="mt-1 text-xs text-muted-foreground">Perlu diperiksa admin</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
            <p className="text-xs font-medium text-muted-foreground">Tidak Diterima</p>
            <p className="mt-1 text-3xl font-bold text-red-600">{tidakDiterima}</p>
            <p className="mt-1 text-xs text-muted-foreground">Revisi / perbaikan</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
            <p className="text-xs font-medium text-muted-foreground">Belum Mengumpulkan</p>
            <p className="mt-1 text-3xl font-bold text-muted-foreground">{belumMengumpulkan}</p>
            <p className="mt-1 text-xs text-muted-foreground">Dari total {total} kewajiban</p>
          </div>
        </div>

        {/* Rekap per Kategori */}
        <div className="rounded-xl border border-border bg-card shadow-xs">
          <div className="border-b border-border px-5 py-4">
            <h3 className="text-sm font-semibold text-foreground">Rekap per Kategori Tugas</h3>
            <p className="text-xs text-muted-foreground">Tugas Tambahan tidak dihitung ke penyebut kewajiban rutin</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="px-5 py-3 text-left font-semibold text-muted-foreground">Kategori Penugasan</th>
                  <th className="px-3 py-3 text-right font-semibold text-muted-foreground">Diterima</th>
                  <th className="px-3 py-3 text-right font-semibold text-muted-foreground">Menunggu</th>
                  <th className="px-3 py-3 text-right font-semibold text-muted-foreground">Tidak Diterima</th>
                  <th className="px-3 py-3 text-right font-semibold text-muted-foreground">Belum Kumpul</th>
                  <th className="px-5 py-3 text-right font-semibold text-muted-foreground">Submission Rate</th>
                </tr>
              </thead>
              <tbody>
                {KATEGORI.map((kat) => {
                  const sub = tasks.filter((d) => d.kategori === kat)
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
                      <td className="px-3 py-3 text-right font-bold text-emerald-600">{dtr}</td>
                      <td className="px-3 py-3 text-right font-semibold text-amber-600">{mng}</td>
                      <td className="px-3 py-3 text-right font-semibold text-red-600">{tdk}</td>
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

        {/* Tabel Validasi Penugasan */}
        <div className="rounded-xl border border-border bg-card shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Daftar Submission Tugas</h3>
              <p className="text-xs text-muted-foreground">Pilih "Terima" atau "Tolak" untuk melakukan validasi dengan catatan admin</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
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
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option>Semua Status</option>
                <option>Menunggu Validasi</option>
                <option>Diterima</option>
                <option>Tidak Diterima</option>
                <option>Belum Mengumpulkan</option>
              </select>

              <select
                value={selectedKategori}
                onChange={(e) => setSelectedKategori(e.target.value)}
                className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option>Semua Kategori</option>
                {KATEGORI.map((k) => (
                  <option key={k}>{k}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="px-5 py-3 text-left font-semibold text-muted-foreground">NID</th>
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Nama Peserta</th>
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Kategori</th>
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Wilayah</th>
                  <th className="px-3 py-3 text-center font-semibold text-muted-foreground">Link Bukti</th>
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Waktu Submit</th>
                  <th className="px-3 py-3 text-center font-semibold text-muted-foreground">Status</th>
                  <th className="px-5 py-3 text-center font-semibold text-muted-foreground">Validasi Admin</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.slice(0, 25).map((d) => (
                  <tr key={d.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3 font-mono font-bold text-foreground">{d.nid}</td>
                    <td className="px-3 py-3 font-medium text-foreground">{d.nama}</td>
                    <td className="px-3 py-3 text-muted-foreground">{d.kategori}</td>
                    <td className="px-3 py-3 text-muted-foreground">{d.wilayah.split("–")[0].trim()}</td>
                    <td className="px-3 py-3 text-center">
                      {d.linkBukti ? (
                        <a
                          href={d.linkBukti}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                        >
                          Lihat File <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        <span className="text-muted-foreground">–</span>
                      )}
                    </td>
                    <td className="px-3 py-3 text-muted-foreground">{d.submittedAt ?? "–"}</td>
                    <td className="px-3 py-3 text-center">
                      <StatusBadge status={d.statusValidasi} />
                    </td>
                    <td className="px-5 py-3 text-center">
                      {d.statusValidasi === "Menunggu Validasi" ? (
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => openValidationModal(d, "Diterima")}
                            className="rounded bg-emerald-600 px-2.5 py-1 text-[11px] font-semibold text-white shadow-2xs hover:bg-emerald-700 transition-colors"
                          >
                            Terima
                          </button>
                          <button
                            onClick={() => openValidationModal(d, "Tidak Diterima")}
                            className="rounded bg-red-600 px-2.5 py-1 text-[11px] font-semibold text-white shadow-2xs hover:bg-red-700 transition-colors"
                          >
                            Tolak
                          </button>
                        </div>
                      ) : d.statusValidasi !== "Belum Mengumpulkan" ? (
                        <button
                          onClick={() => openValidationModal(d, d.statusValidasi as "Diterima" | "Tidak Diterima")}
                          className="rounded border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:bg-muted transition-colors"
                        >
                          Ubah Status
                        </button>
                      ) : (
                        <span className="text-muted-foreground">–</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-border px-5 py-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>Menampilkan {Math.min(25, filteredTasks.length)} dari {filteredTasks.length} data tersaring</span>
            <span className="font-mono text-[11px]">Tab Google Sheets: VALIDASI_PENUGASAN</span>
          </div>
        </div>
      </div>

      {/* Modal Dialog Validasi Admin (Spec 9.4) */}
      {validatingTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-border pb-4">
              <div>
                <h3 className="text-base font-bold text-foreground">Formulir Validasi Tugas</h3>
                <p className="text-xs text-muted-foreground">NID {validatingTask.nid} · {validatingTask.nama}</p>
              </div>
              <button
                onClick={() => setValidatingTask(null)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveValidation} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 rounded-lg border border-border p-3 bg-muted/20">
                <div>
                  <p className="text-muted-foreground">Kategori Tugas</p>
                  <p className="font-semibold text-foreground mt-0.5">{validatingTask.kategori}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Kelompok / Wilayah</p>
                  <p className="font-semibold text-foreground mt-0.5">{validatingTask.wilayah}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">Tautan Bukti Pengerjaan</p>
                  {validatingTask.linkBukti ? (
                    <a
                      href={validatingTask.linkBukti}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 font-medium text-primary hover:underline"
                    >
                      Buka Tautan Tugas di Tab Baru <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <span className="text-muted-foreground">Tidak ada link terlampir</span>
                  )}
                </div>
              </div>

              <div>
                <label className="font-medium text-foreground block mb-1.5">Keputusan Validasi</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setValidationDecision("Diterima")}
                    className={`flex items-center justify-center gap-2 rounded-lg border p-2.5 font-semibold transition-all ${
                      validationDecision === "Diterima"
                        ? "border-emerald-600 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-500/20"
                        : "border-border text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4" /> Diterima (Valid)
                  </button>
                  <button
                    type="button"
                    onClick={() => setValidationDecision("Tidak Diterima")}
                    className={`flex items-center justify-center gap-2 rounded-lg border p-2.5 font-semibold transition-all ${
                      validationDecision === "Tidak Diterima"
                        ? "border-red-600 bg-red-50 text-red-700 ring-2 ring-red-500/20"
                        : "border-border text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <XCircle className="h-4 w-4" /> Tidak Diterima (Revisi)
                  </button>
                </div>
              </div>

              <div>
                <label className="font-medium text-foreground block mb-1">Catatan / Alasan Admin</label>
                <textarea
                  rows={3}
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  placeholder="Masukkan catatan feedback atau alasan penolakan..."
                  className="w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setValidatingTask(null)}
                  className="rounded-lg border border-border px-3 py-2 font-medium text-muted-foreground hover:bg-muted"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-xs"
                >
                  <Send className="h-3.5 w-3.5" /> Simpan Keputusan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState, useMemo } from "react"
import { DashboardHeader } from "@/components/dashboard-shell"
import { dataPenugasan as initialData } from "@/lib/mock-data"
import { exportToCsv } from "@/lib/export-csv"
import type { Penugasan, StatusValidasi } from "@/lib/mock-data"
import {
  ExternalLink,
  Search,
  Download,
  X,
  Check,
} from "lucide-react"

function StatusIndicator({ status }: { status: StatusValidasi }) {
  if (status === "Diterima") {
    return (
      <span className="inline-flex items-center rounded-md bg-[#E6F4EA] px-2 py-0.5 text-xs font-medium text-[#137333]">
        Diterima
      </span>
    )
  }
  if (status === "Menunggu Validasi") {
    return (
      <span className="inline-flex items-center rounded-md bg-[#FEF7E0] px-2 py-0.5 text-xs font-medium text-[#B06000]">
        Menunggu
      </span>
    )
  }
  if (status === "Tidak Diterima") {
    return (
      <span className="inline-flex items-center rounded-md bg-[#FCE8E6] px-2 py-0.5 text-xs font-medium text-[#C5221F]">
        Ditolak
      </span>
    )
  }
  return (
    <span className="inline-flex items-center rounded-md bg-[#F1F3F4] px-2 py-0.5 text-xs font-medium text-[#5F6368]">
      Belum Kumpul
    </span>
  )
}

const KATEGORI = ["Semua Kategori", "MAI Foundation", "Mentorship", "MAI Wilayah", "Pembinaan Nasional", "Tugas Tambahan"] as const

export default function PenugasanPage() {
  const [tasks, setTasks] = useState<Penugasan[]>(initialData)
  const [search, setSearch] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("Semua Status")
  const [selectedKategori, setSelectedKategori] = useState<string>("Semua Kategori")
  const [validatingTask, setValidatingTask] = useState<Penugasan | null>(null)
  const [validationDecision, setValidationDecision] = useState<"Diterima" | "Tidak Diterima">("Diterima")
  const [adminNote, setAdminNote] = useState("")
  const [showToast, setShowToast] = useState(false)

  // KPI Calculations
  const diterima = tasks.filter((d) => d.statusValidasi === "Diterima").length
  const menunggu = tasks.filter((d) => d.statusValidasi === "Menunggu Validasi").length
  const tidakDiterima = tasks.filter((d) => d.statusValidasi === "Tidak Diterima").length
  const belumMengumpulkan = tasks.filter((d) => d.statusValidasi === "Belum Mengumpulkan").length

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchSearch =
        t.nama.toLowerCase().includes(search.toLowerCase()) ||
        t.nid.includes(search) ||
        (t.judulTugas || "").toLowerCase().includes(search.toLowerCase()) ||
        t.wilayah.toLowerCase().includes(search.toLowerCase())
      const matchStatus = selectedStatus === "Semua Status" || t.statusValidasi === selectedStatus
      const matchKategori = selectedKategori === "Semua Kategori" || t.kategori === selectedKategori
      return matchSearch && matchStatus && matchKategori
    })
  }, [tasks, search, selectedStatus, selectedKategori])

  const openValidationModal = (task: Penugasan) => {
    setValidatingTask(task)
    setValidationDecision(task.statusValidasi === "Tidak Diterima" ? "Tidak Diterima" : "Diterima")
    setAdminNote(task.catatanAdmin || (task.statusValidasi === "Diterima" ? "Sesuai dengan ketentuan penugasan." : ""))
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
            validasiAt: "Hari ini",
          }
        }
        return item
      })
    )

    setValidatingTask(null)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleExportCsv = () => {
    const exportData = filteredTasks.map((t) => ({
      ID_Tugas: t.id,
      NID: t.nid,
      Nama_Beswan: t.nama,
      Wilayah: t.wilayah,
      Kategori: t.kategori,
      Judul_Tugas: t.judulTugas,
      Status_Validasi: t.statusValidasi,
      Tautan_Berkas: t.linkBerkas || "—",
      Catatan_Admin: t.catatanAdmin || "—",
      Waktu_Validasi: t.validasiAt || "—",
    }))
    exportToCsv(exportData, `validasi-penugasan-${new Date().toISOString().slice(0, 10)}.csv`)
  }

  return (
    <div className="flex flex-col flex-1 overflow-y-auto bg-[#F8F9FA]">
      <DashboardHeader
        title="Penugasan Brand Ambassador"
        subtitle="Monitoring pengumpulan dan keputusan verifikasi administratif tugas"
        actions={
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 rounded-lg border border-[#DADCE0] bg-white px-3 py-1.5 text-xs font-medium text-[#3C4043] hover:bg-[#F8F9FA] hover:text-[#202124] transition-colors"
          >
            <Download className="h-3.5 w-3.5 text-[#5F6368]" />
            <span>Ekspor CSV</span>
          </button>
        }
      />

      <div className="flex-1 space-y-8 p-8 max-w-7xl">
        {showToast && (
          <div className="flex items-center gap-2 rounded-lg bg-[#E6F4EA] border border-[#CEEAD6] px-4 py-3 text-xs font-medium text-[#137333] transition-all">
            <Check className="h-4 w-4" />
            <span>Keputusan validasi berhasil disimpan dan dicatat ke data penugasan.</span>
          </div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-xl border border-[#E8EAED] bg-white p-5">
            <p className="text-xs font-medium text-[#5F6368]">Disetujui (Valid)</p>
            <p className="mt-2 text-3xl font-semibold text-[#137333] tracking-tight">{diterima}</p>
            <p className="mt-1 text-xs text-[#5F6368]">Dihitung sebagai penyelesaian</p>
          </div>
          <div className="rounded-xl border border-[#E8EAED] bg-white p-5">
            <p className="text-xs font-medium text-[#5F6368]">Menunggu Validasi</p>
            <p className="mt-2 text-3xl font-semibold text-[#B06000] tracking-tight">{menunggu}</p>
            <p className="mt-1 text-xs text-[#5F6368]">Perlu peninjauan admin</p>
          </div>
          <div className="rounded-xl border border-[#E8EAED] bg-white p-5">
            <p className="text-xs font-medium text-[#5F6368]">Ditolak</p>
            <p className="mt-2 text-3xl font-semibold text-[#C5221F] tracking-tight">{tidakDiterima}</p>
            <p className="mt-1 text-xs text-[#5F6368]">Belum memenuhi kriteria</p>
          </div>
          <div className="rounded-xl border border-[#E8EAED] bg-white p-5">
            <p className="text-xs font-medium text-[#5F6368]">Belum Mengumpulkan</p>
            <p className="mt-2 text-3xl font-semibold text-[#5F6368] tracking-tight">{belumMengumpulkan}</p>
            <p className="mt-1 text-xs text-[#5F6368]">Kewajiban tanpa submission</p>
          </div>
        </div>

        {/* Tabel Penugasan */}
        <div className="rounded-xl border border-[#E8EAED] bg-white overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8EAED] p-5">
            <div>
              <h2 className="text-sm font-semibold text-[#202124]">Daftar Pengumpulan Penugasan</h2>
              <p className="text-xs text-[#5F6368] mt-0.5">
                Menampilkan {filteredTasks.length} berkas penugasan
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#5F6368]" />
                <input
                  type="text"
                  placeholder="Cari NID, nama, judul tugas..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg border border-[#DADCE0] bg-white pl-9 pr-3 py-1.5 text-xs text-[#202124] placeholder-[#5F6368] focus:border-[#1A73E8] focus:outline-none"
                />
              </div>

              <select
                value={selectedKategori}
                onChange={(e) => setSelectedKategori(e.target.value)}
                className="rounded-lg border border-[#DADCE0] bg-white px-3 py-1.5 text-xs text-[#202124] focus:border-[#1A73E8] focus:outline-none"
              >
                {KATEGORI.map((kat) => (
                  <option key={kat} value={kat}>
                    {kat}
                  </option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="rounded-lg border border-[#DADCE0] bg-white px-3 py-1.5 text-xs text-[#202124] focus:border-[#1A73E8] focus:outline-none"
              >
                <option>Semua Status</option>
                <option value="Diterima">Diterima</option>
                <option value="Menunggu Validasi">Menunggu Validasi</option>
                <option value="Tidak Diterima">Tidak Diterima</option>
                <option value="Belum Mengumpulkan">Belum Mengumpulkan</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#E8EAED] bg-[#F8F9FA] text-[#5F6368]">
                  <th className="py-3 px-5 text-left font-medium">NID</th>
                  <th className="py-3 px-5 text-left font-medium">Nama Beswan</th>
                  <th className="py-3 px-4 text-left font-medium">Kategori</th>
                  <th className="py-3 px-5 text-left font-medium">Judul Penugasan</th>
                  <th className="py-3 px-4 text-left font-medium">Tautan Berkas</th>
                  <th className="py-3 px-4 text-left font-medium">Status Validasi</th>
                  <th className="py-3 px-5 text-right font-medium">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8EAED]">
                {filteredTasks.map((t) => (
                  <tr key={t.id} className="hover:bg-[#F8F9FA] transition-colors">
                    <td className="py-3.5 px-5 font-mono text-[#202124] font-medium">{t.nid}</td>
                    <td className="py-3.5 px-5 font-medium text-[#202124]">{t.nama}</td>
                    <td className="py-3.5 px-4 text-[#5F6368]">{t.kategori}</td>
                    <td className="py-3.5 px-5 text-[#202124] max-w-xs truncate">{t.judulTugas}</td>
                    <td className="py-3.5 px-4">
                      {t.linkBerkas ? (
                        <a
                          href={t.linkBerkas}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-[#1A73E8] hover:underline"
                        >
                          <span>Buka Berkas</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        <span className="text-[#5F6368]">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusIndicator status={t.statusValidasi} />
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      {t.statusValidasi === "Belum Mengumpulkan" ? (
                        <span className="text-[11px] text-[#5F6368]">Menunggu Berkas</span>
                      ) : (
                        <button
                          onClick={() => openValidationModal(t)}
                          className="rounded-md border border-[#DADCE0] bg-white px-2.5 py-1 text-xs font-medium text-[#1A73E8] hover:bg-[#F8F9FA] transition-colors"
                        >
                          Tinjau
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Validasi Admin */}
      {validatingTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#E8EAED] pb-3">
              <h3 className="text-sm font-semibold text-[#202124]">Validasi Penugasan Beswan</h3>
              <button
                onClick={() => setValidatingTask(null)}
                className="text-[#5F6368] hover:text-[#202124]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveValidation} className="mt-4 space-y-4">
              <div>
                <p className="text-xs text-[#5F6368]">Nama Beswan & NID</p>
                <p className="text-sm font-medium text-[#202124] mt-0.5">
                  {validatingTask.nama} ({validatingTask.nid})
                </p>
              </div>

              <div>
                <p className="text-xs text-[#5F6368]">Judul Penugasan</p>
                <p className="text-xs font-medium text-[#202124] mt-0.5">{validatingTask.judulTugas}</p>
              </div>

              {validatingTask.linkBerkas && (
                <div>
                  <a
                    href={validatingTask.linkBerkas}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#1A73E8] hover:underline"
                  >
                    <span>Periksa Dokumen Penugasan</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              )}

              <div>
                <label className="text-xs font-medium text-[#202124]">Keputusan Validasi</label>
                <div className="mt-2 flex gap-3">
                  <label className="flex flex-1 items-center gap-2 rounded-lg border border-[#DADCE0] p-2.5 text-xs font-medium text-[#202124] cursor-pointer hover:bg-[#F8F9FA]">
                    <input
                      type="radio"
                      name="decision"
                      checked={validationDecision === "Diterima"}
                      onChange={() => setValidationDecision("Diterima")}
                      className="text-[#1A73E8]"
                    />
                    <span>Terima (Valid)</span>
                  </label>
                  <label className="flex flex-1 items-center gap-2 rounded-lg border border-[#DADCE0] p-2.5 text-xs font-medium text-[#202124] cursor-pointer hover:bg-[#F8F9FA]">
                    <input
                      type="radio"
                      name="decision"
                      checked={validationDecision === "Tidak Diterima"}
                      onChange={() => setValidationDecision("Tidak Diterima")}
                      className="text-[#1A73E8]"
                    />
                    <span>Tolak (Revisi)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[#202124]">Catatan Admin</label>
                <textarea
                  rows={3}
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  placeholder="Tuliskan catatan pemeriksaan administratif..."
                  className="mt-1.5 w-full rounded-lg border border-[#DADCE0] p-2.5 text-xs text-[#202124] focus:border-[#1A73E8] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E8EAED]">
                <button
                  type="button"
                  onClick={() => setValidatingTask(null)}
                  className="rounded-lg border border-[#DADCE0] px-3.5 py-1.5 text-xs font-medium text-[#3C4043] hover:bg-[#F8F9FA]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#1A73E8] px-4 py-1.5 text-xs font-medium text-white hover:bg-[#1557B0]"
                >
                  Simpan Keputusan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState, useMemo } from "react"
import { DashboardHeader } from "@/components/dashboard-shell"
import { masterBeswan, dataPenugasan, dataPrestasi, masterWilayah } from "@/lib/mock-data"
import { exportToCsv } from "@/lib/export-csv"
import type { Beswan } from "@/lib/mock-data"
import {
  Search,
  Download,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react"

export default function DataBeswanPage() {
  const [search, setSearch] = useState("")
  const [selectedWilayah, setSelectedWilayah] = useState("Semua Wilayah")
  const [selectedStatus, setSelectedStatus] = useState("Semua Status")
  const [page, setPage] = useState(1)
  const pageSize = 15

  const [activeBeswan, setActiveBeswan] = useState<Beswan | null>(null)

  // Filter list
  const filteredData = useMemo(() => {
    return masterBeswan.filter((b) => {
      const matchSearch =
        b.nama.toLowerCase().includes(search.toLowerCase()) ||
        b.nid.includes(search) ||
        b.universitas.toLowerCase().includes(search.toLowerCase())
      const matchWilayah = selectedWilayah === "Semua Wilayah" || b.wilayah === selectedWilayah
      const matchStatus = selectedStatus === "Semua Status" || b.status === selectedStatus
      return matchSearch && matchWilayah && matchStatus
    })
  }, [search, selectedWilayah, selectedStatus])

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1
  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize
    return filteredData.slice(start, start + pageSize)
  }, [filteredData, page])

  // Get participant detail history
  const beswanTasks = useMemo(() => {
    if (!activeBeswan) return []
    return dataPenugasan.filter((t) => t.nid === activeBeswan.nid)
  }, [activeBeswan])

  const beswanPrestasi = useMemo(() => {
    if (!activeBeswan) return []
    return dataPrestasi.filter((p) => p.nid === activeBeswan.nid)
  }, [activeBeswan])

  const handleExportCsv = () => {
    const exportData = filteredData.map((b) => ({
      NID: b.nid,
      Nama_Beswan: b.nama,
      Universitas: b.universitas,
      Jurusan: b.jurusan,
      Wilayah: b.wilayah,
      Mentor: b.mentor,
      Status: b.status,
    }))
    exportToCsv(exportData, `data-beswan-bbm6-${new Date().toISOString().slice(0, 10)}.csv`)
  }

  return (
    <div className="flex flex-col flex-1 overflow-y-auto bg-[#F8F9FA]">
      <DashboardHeader
        title="Data Beswan"
        subtitle="Direktori master 121 penerima beasiswa Beasiswa Bintang Mandiri Angkatan 6"
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
        {/* Tabel Data Beswan */}
        <div className="rounded-xl border border-[#E8EAED] bg-white overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8EAED] p-5">
            <div>
              <h2 className="text-sm font-semibold text-[#202124]">Direktori Peserta BBM 6</h2>
              <p className="text-xs text-[#5F6368] mt-0.5">
                Menampilkan {filteredData.length} data peserta · NID diperlakukan sebagai teks baku
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#5F6368]" />
                <input
                  type="text"
                  placeholder="Cari NID, nama, universitas..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    setPage(1)
                  }}
                  className="w-full rounded-lg border border-[#DADCE0] bg-white pl-9 pr-3 py-1.5 text-xs text-[#202124] placeholder-[#5F6368] focus:border-[#1A73E8] focus:outline-none"
                />
              </div>

              <select
                value={selectedWilayah}
                onChange={(e) => {
                  setSelectedWilayah(e.target.value)
                  setPage(1)
                }}
                className="rounded-lg border border-[#DADCE0] bg-white px-3 py-1.5 text-xs text-[#202124] focus:border-[#1A73E8] focus:outline-none"
              >
                <option>Semua Wilayah</option>
                {masterWilayah.map((w) => (
                  <option key={w.id} value={w.wilayah}>
                    {w.wilayah.split("–")[0].trim()}
                  </option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value)
                  setPage(1)
                }}
                className="rounded-lg border border-[#DADCE0] bg-white px-3 py-1.5 text-xs text-[#202124] focus:border-[#1A73E8] focus:outline-none"
              >
                <option>Semua Status</option>
                <option value="Aktif">Aktif</option>
                <option value="Cuti">Cuti</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#E8EAED] bg-[#F8F9FA] text-[#5F6368]">
                  <th className="py-3 px-5 text-left font-medium">NID</th>
                  <th className="py-3 px-5 text-left font-medium">Nama Beswan</th>
                  <th className="py-3 px-5 text-left font-medium">Perguruan Tinggi</th>
                  <th className="py-3 px-5 text-left font-medium">Jurusan</th>
                  <th className="py-3 px-4 text-left font-medium">Wilayah</th>
                  <th className="py-3 px-4 text-left font-medium">Mentor</th>
                  <th className="py-3 px-4 text-center font-medium">Status</th>
                  <th className="py-3 px-5 text-right font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8EAED]">
                {paginatedData.map((b) => (
                  <tr
                    key={b.nid}
                    onClick={() => setActiveBeswan(b)}
                    className="hover:bg-[#F8F9FA] transition-colors cursor-pointer"
                  >
                    <td className="py-3.5 px-5 font-mono text-[#202124] font-medium">{b.nid}</td>
                    <td className="py-3.5 px-5 font-medium text-[#202124]">{b.nama}</td>
                    <td className="py-3.5 px-5 text-[#5F6368]">{b.universitas}</td>
                    <td className="py-3.5 px-5 text-[#5F6368]">{b.jurusan}</td>
                    <td className="py-3.5 px-4 font-medium text-[#202124]">{b.wilayah.split("–")[0].trim()}</td>
                    <td className="py-3.5 px-4 text-[#5F6368]">{b.mentor}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center rounded-md bg-[#E6F4EA] px-2 py-0.5 text-xs font-medium text-[#137333]">
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveBeswan(b)
                        }}
                        className="rounded-md border border-[#DADCE0] bg-white px-2.5 py-1 text-xs font-medium text-[#1A73E8] hover:bg-[#F8F9FA] transition-colors"
                      >
                        Profil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-[#E8EAED] px-5 py-3 text-xs text-[#5F6368]">
            <span>
              Halaman {page} dari {totalPages} ({filteredData.length} total peserta)
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="flex items-center gap-1 rounded-md border border-[#DADCE0] bg-white px-2.5 py-1 text-xs font-medium text-[#3C4043] disabled:opacity-40 hover:bg-[#F8F9FA]"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span>Sebelumnya</span>
              </button>
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="flex items-center gap-1 rounded-md border border-[#DADCE0] bg-white px-2.5 py-1 text-xs font-medium text-[#3C4043] disabled:opacity-40 hover:bg-[#F8F9FA]"
              >
                <span>Berikutnya</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide-over Profile Drawer */}
      {activeBeswan && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/30">
          <div className="h-full w-full max-w-lg bg-white p-6 shadow-2xl overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#E8EAED] pb-4">
                <div>
                  <h3 className="text-base font-semibold text-[#202124]">{activeBeswan.nama}</h3>
                  <p className="font-mono text-xs text-[#5F6368] mt-0.5">NID: {activeBeswan.nid}</p>
                </div>
                <button
                  onClick={() => setActiveBeswan(null)}
                  className="rounded-full p-1.5 text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#202124]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Data Akademik & Mentor */}
              <div className="mt-5 space-y-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#70757A]">
                  Informasi Kepesertaan
                </h4>
                <div className="grid grid-cols-2 gap-3 rounded-lg border border-[#E8EAED] p-4 text-xs">
                  <div>
                    <p className="text-[#5F6368]">Perguruan Tinggi</p>
                    <p className="font-medium text-[#202124] mt-0.5">{activeBeswan.universitas}</p>
                  </div>
                  <div>
                    <p className="text-[#5F6368]">Program Studi</p>
                    <p className="font-medium text-[#202124] mt-0.5">{activeBeswan.jurusan}</p>
                  </div>
                  <div>
                    <p className="text-[#5F6368]">Wilayah</p>
                    <p className="font-medium text-[#202124] mt-0.5">{activeBeswan.wilayah}</p>
                  </div>
                  <div>
                    <p className="text-[#5F6368]">Mentor Pendamping</p>
                    <p className="font-medium text-[#202124] mt-0.5">{activeBeswan.mentor}</p>
                  </div>
                </div>
              </div>

              {/* Riwayat Penugasan */}
              <div className="mt-6 space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#70757A]">
                  Riwayat Penugasan Brand Ambassador ({beswanTasks.length})
                </h4>
                {beswanTasks.length === 0 ? (
                  <p className="text-xs text-[#5F6368]">Belum ada data penugasan yang tercatat.</p>
                ) : (
                  <div className="divide-y divide-[#E8EAED] rounded-lg border border-[#E8EAED] text-xs">
                    {beswanTasks.map((t) => (
                      <div key={t.id} className="p-3">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-[#202124]">{t.judulTugas}</p>
                          <span
                            className={`rounded-md px-2 py-0.5 text-[11px] font-medium ${
                              t.statusValidasi === "Diterima"
                                ? "bg-[#E6F4EA] text-[#137333]"
                                : t.statusValidasi === "Menunggu Validasi"
                                ? "bg-[#FEF7E0] text-[#B06000]"
                                : "bg-[#FCE8E6] text-[#C5221F]"
                            }`}
                          >
                            {t.statusValidasi}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#5F6368] mt-1">Kategori: {t.kategori}</p>
                        {t.catatanAdmin && (
                          <p className="mt-1 text-[11px] text-[#3C4043] bg-[#F8F9FA] p-2 rounded">
                            Catatan: {t.catatanAdmin}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Prestasi */}
              <div className="mt-6 space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#70757A]">
                  Prestasi Terlaporkan ({beswanPrestasi.length})
                </h4>
                {beswanPrestasi.length === 0 ? (
                  <p className="text-xs text-[#5F6368]">Belum ada laporan prestasi.</p>
                ) : (
                  <div className="divide-y divide-[#E8EAED] rounded-lg border border-[#E8EAED] text-xs">
                    {beswanPrestasi.map((p) => (
                      <div key={p.id} className="p-3">
                        <p className="font-medium text-[#202124]">{p.judul}</p>
                        <p className="text-[11px] text-[#5F6368] mt-0.5">
                          {p.tingkat} · {p.penyelenggara} ({p.bulanPelaporan})
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-[#E8EAED]">
              <button
                onClick={() => setActiveBeswan(null)}
                className="w-full rounded-lg border border-[#DADCE0] py-2 text-xs font-medium text-[#3C4043] hover:bg-[#F8F9FA]"
              >
                Tutup Profil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

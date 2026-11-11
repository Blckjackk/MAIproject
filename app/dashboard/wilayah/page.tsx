"use client"

import { useState, useMemo } from "react"
import { DashboardHeader } from "@/components/dashboard-shell"
import { masterWilayah, masterBeswan } from "@/lib/mock-data"
import { exportToCsv } from "@/lib/export-csv"
import { Search, Download, Users } from "lucide-react"

export default function WilayahPage() {
  const [selectedWilayahId, setSelectedWilayahId] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  const activeWilayah = selectedWilayahId
    ? masterWilayah.find((w) => w.id === selectedWilayahId)
    : null

  const displayedBeswan = useMemo(() => {
    return masterBeswan.filter((b) => {
      const matchWilayah = selectedWilayahId ? b.wilayah === activeWilayah?.wilayah : true
      const matchSearch =
        b.nama.toLowerCase().includes(search.toLowerCase()) ||
        b.nid.includes(search) ||
        b.universitas.toLowerCase().includes(search.toLowerCase())
      return matchWilayah && matchSearch
    })
  }, [selectedWilayahId, activeWilayah, search])

  const handleExportCsv = () => {
    const exportData = displayedBeswan.map((b) => ({
      NID: b.nid,
      Nama_Beswan: b.nama,
      Universitas: b.universitas,
      Jurusan: b.jurusan,
      Wilayah: b.wilayah,
      Mentor: b.mentor,
      Status: b.status,
    }))
    exportToCsv(
      exportData,
      `wilayah-mentor-${activeWilayah ? activeWilayah.id : "semua"}-${new Date().toISOString().slice(0, 10)}.csv`
    )
  }

  return (
    <div className="flex flex-col flex-1 overflow-y-auto bg-[#F8F9FA]">
      <DashboardHeader
        title="Wilayah & Mentor"
        subtitle="Distribusi 8 wilayah pendampingan dan penugasan mentor BBM Angkatan 6"
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
        {/* 8 Wilayah Cards Grid */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#202124]">Daftar 8 Wilayah Pendampingan</h2>
            <span className="text-xs text-[#5F6368]">Pilih kartu wilayah untuk menyaring tabel</span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {masterWilayah.map((w) => {
              const isSelected = selectedWilayahId === w.id
              const beswanCount = masterBeswan.filter((b) => b.wilayah === w.wilayah).length
              return (
                <div
                  key={w.id}
                  onClick={() => setSelectedWilayahId(isSelected ? null : w.id)}
                  className={`cursor-pointer rounded-xl border p-5 transition-all ${
                    isSelected
                      ? "border-[#1A73E8] bg-[#F8FAFD] shadow-xs"
                      : "border-[#E8EAED] bg-white hover:border-[#DADCE0] hover:bg-[#FAFAFA]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-[#1A73E8]">{w.id}</span>
                    <span className="text-xs text-[#5F6368]">{beswanCount} Peserta</span>
                  </div>

                  <h3 className="mt-2 text-sm font-semibold text-[#202124] leading-tight">
                    {w.wilayah.split("–")[0].trim()}
                  </h3>
                  <p className="mt-1 text-xs text-[#5F6368]">
                    Mentor: <span className="text-[#202124] font-medium">{w.mentor}</span>
                  </p>

                  <div className="mt-3 flex items-center justify-between border-t border-[#E8EAED] pt-2 text-[11px]">
                    <span className="text-[#5F6368]">Status Penempatan</span>
                    <span className={isSelected ? "font-medium text-[#1A73E8]" : "text-[#5F6368]"}>
                      {isSelected ? "Filter Aktif" : "Klik Filter"}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Tabel Detail Peserta */}
        <div className="rounded-xl border border-[#E8EAED] bg-white overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8EAED] p-5">
            <div>
              <h2 className="text-sm font-semibold text-[#202124]">
                {activeWilayah ? `Anggota ${activeWilayah.wilayah}` : "Seluruh Peserta Menurut Wilayah"}
              </h2>
              <p className="text-xs text-[#5F6368] mt-0.5">
                {activeWilayah
                  ? `Didampingi oleh mentor ${activeWilayah.mentor} (${displayedBeswan.length} peserta)`
                  : `Menampilkan seluruh ${displayedBeswan.length} peserta di 8 wilayah`}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {selectedWilayahId && (
                <button
                  onClick={() => setSelectedWilayahId(null)}
                  className="rounded-lg border border-[#DADCE0] px-3 py-1.5 text-xs font-medium text-[#3C4043] hover:bg-[#F8F9FA] transition-colors"
                >
                  Tampilkan Semua Wilayah
                </button>
              )}

              <div className="relative w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#5F6368]" />
                <input
                  type="text"
                  placeholder="Cari NID, nama, universitas..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg border border-[#DADCE0] bg-white pl-9 pr-3 py-1.5 text-xs text-[#202124] placeholder-[#5F6368] focus:border-[#1A73E8] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#E8EAED] bg-[#F8F9FA] text-[#5F6368]">
                  <th className="py-3 px-5 text-left font-medium">NID</th>
                  <th className="py-3 px-5 text-left font-medium">Nama Beswan</th>
                  <th className="py-3 px-5 text-left font-medium">Universitas</th>
                  <th className="py-3 px-5 text-left font-medium">Jurusan</th>
                  <th className="py-3 px-4 text-left font-medium">Wilayah</th>
                  <th className="py-3 px-4 text-left font-medium">Mentor</th>
                  <th className="py-3 px-5 text-right font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8EAED]">
                {displayedBeswan.map((b) => (
                  <tr key={b.nid} className="hover:bg-[#F8F9FA] transition-colors">
                    <td className="py-3.5 px-5 font-mono text-[#202124] font-medium">{b.nid}</td>
                    <td className="py-3.5 px-5 font-medium text-[#202124]">{b.nama}</td>
                    <td className="py-3.5 px-5 text-[#5F6368]">{b.universitas}</td>
                    <td className="py-3.5 px-5 text-[#5F6368]">{b.jurusan}</td>
                    <td className="py-3.5 px-4 font-medium text-[#202124]">{b.wilayah.split("–")[0].trim()}</td>
                    <td className="py-3.5 px-4 text-[#5F6368]">{b.mentor}</td>
                    <td className="py-3.5 px-5 text-right">
                      <span className="inline-flex items-center rounded-md bg-[#E6F4EA] px-2 py-0.5 text-xs font-medium text-[#137333]">
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

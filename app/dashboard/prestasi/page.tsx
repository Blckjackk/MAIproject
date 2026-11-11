"use client"

import { useState, useMemo } from "react"
import { DashboardHeader } from "@/components/dashboard-shell"
import { dataPrestasi, masterWilayah } from "@/lib/mock-data"
import { exportToCsv } from "@/lib/export-csv"
import { ExternalLink, Search, Download } from "lucide-react"

const BULAN = ["Semua Bulan", "September 2026", "Oktober 2026", "November 2026"]

export default function PrestasiPage() {
  const [selectedBulan, setSelectedBulan] = useState("Semua Bulan")
  const [selectedWilayah, setSelectedWilayah] = useState("Semua Wilayah")
  const [search, setSearch] = useState("")

  const filteredPrestasi = useMemo(() => {
    return dataPrestasi.filter((p) => {
      const matchSearch =
        p.nama.toLowerCase().includes(search.toLowerCase()) ||
        p.nid.includes(search) ||
        p.judul.toLowerCase().includes(search.toLowerCase()) ||
        p.kategori.toLowerCase().includes(search.toLowerCase())
      const matchBulan = selectedBulan === "Semua Bulan" || p.bulanPelaporan === selectedBulan
      const matchWilayah = selectedWilayah === "Semua Wilayah" || p.wilayah === selectedWilayah
      return matchSearch && matchBulan && matchWilayah
    })
  }, [search, selectedBulan, selectedWilayah])

  const totalPrestasi = filteredPrestasi.length
  const internasional = filteredPrestasi.filter((p) => p.tingkat === "Internasional").length
  const nasional = filteredPrestasi.filter((p) => p.tingkat === "Nasional").length
  const uniqueBeswan = new Set(filteredPrestasi.map((p) => p.nid)).size

  const handleExportCsv = () => {
    const exportData = filteredPrestasi.map((p) => ({
      ID_Prestasi: p.id,
      NID: p.nid,
      Nama_Beswan: p.nama,
      Wilayah: p.wilayah,
      Judul_Prestasi: p.judul,
      Kategori: p.kategori,
      Tingkat: p.tingkat,
      Penyelenggara: p.penyelenggara,
      Bulan_Pelaporan: p.bulanPelaporan,
      Tautan_Sertifikat: p.linkSertifikat || "—",
    }))
    exportToCsv(exportData, `prestasi-beswan-${new Date().toISOString().slice(0, 10)}.csv`)
  }

  return (
    <div className="flex flex-col flex-1 overflow-y-auto bg-[#F8F9FA]">
      <DashboardHeader
        title="Prestasi Beswan"
        subtitle="Rekapitulasi pencapaian dan prestasi yang dilaporkan mulai September 2026"
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
        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-xl border border-[#E8EAED] bg-white p-5">
            <p className="text-xs font-medium text-[#5F6368]">Total Prestasi</p>
            <p className="mt-2 text-3xl font-semibold text-[#202124] tracking-tight">{totalPrestasi}</p>
            <p className="mt-1 text-xs text-[#5F6368]">Laporan tersaring</p>
          </div>
          <div className="rounded-xl border border-[#E8EAED] bg-white p-5">
            <p className="text-xs font-medium text-[#5F6368]">Tingkat Internasional</p>
            <p className="mt-2 text-3xl font-semibold text-[#1A73E8] tracking-tight">{internasional}</p>
            <p className="mt-1 text-xs text-[#5F6368]">Kompetisi global</p>
          </div>
          <div className="rounded-xl border border-[#E8EAED] bg-white p-5">
            <p className="text-xs font-medium text-[#5F6368]">Tingkat Nasional</p>
            <p className="mt-2 text-3xl font-semibold text-[#202124] tracking-tight">{nasional}</p>
            <p className="mt-1 text-xs text-[#5F6368]">Kompetisi nasional</p>
          </div>
          <div className="rounded-xl border border-[#E8EAED] bg-white p-5">
            <p className="text-xs font-medium text-[#5F6368]">Beswan Berprestasi</p>
            <p className="mt-2 text-3xl font-semibold text-[#137333] tracking-tight">{uniqueBeswan}</p>
            <p className="mt-1 text-xs text-[#5F6368]">Individu unik</p>
          </div>
        </div>

        {/* Tabel Prestasi */}
        <div className="rounded-xl border border-[#E8EAED] bg-white overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8EAED] p-5">
            <div>
              <h2 className="text-sm font-semibold text-[#202124]">Daftar Prestasi Terlaporkan</h2>
              <p className="text-xs text-[#5F6368] mt-0.5">
                Konsolidasi dari Google Spreadsheet SRC-01 dan SRC-03 tanpa duplikasi data
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative w-60">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#5F6368]" />
                <input
                  type="text"
                  placeholder="Cari prestasi, NID, nama..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg border border-[#DADCE0] bg-white pl-9 pr-3 py-1.5 text-xs text-[#202124] placeholder-[#5F6368] focus:border-[#1A73E8] focus:outline-none"
                />
              </div>

              <select
                value={selectedBulan}
                onChange={(e) => setSelectedBulan(e.target.value)}
                className="rounded-lg border border-[#DADCE0] bg-white px-3 py-1.5 text-xs text-[#202124] focus:border-[#1A73E8] focus:outline-none"
              >
                {BULAN.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>

              <select
                value={selectedWilayah}
                onChange={(e) => setSelectedWilayah(e.target.value)}
                className="rounded-lg border border-[#DADCE0] bg-white px-3 py-1.5 text-xs text-[#202124] focus:border-[#1A73E8] focus:outline-none"
              >
                <option>Semua Wilayah</option>
                {masterWilayah.map((w) => (
                  <option key={w.id} value={w.wilayah}>
                    {w.wilayah.split("–")[0].trim()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#E8EAED] bg-[#F8F9FA] text-[#5F6368]">
                  <th className="py-3 px-5 text-left font-medium">NID</th>
                  <th className="py-3 px-5 text-left font-medium">Nama Beswan</th>
                  <th className="py-3 px-4 text-left font-medium">Wilayah</th>
                  <th className="py-3 px-5 text-left font-medium">Pencapaian / Prestasi</th>
                  <th className="py-3 px-4 text-left font-medium">Tingkat</th>
                  <th className="py-3 px-4 text-left font-medium">Bulan Pelaporan</th>
                  <th className="py-3 px-5 text-right font-medium">Dokumen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8EAED]">
                {filteredPrestasi.map((p) => (
                  <tr key={p.id} className="hover:bg-[#F8F9FA] transition-colors">
                    <td className="py-3.5 px-5 font-mono text-[#202124] font-medium">{p.nid}</td>
                    <td className="py-3.5 px-5 font-medium text-[#202124]">{p.nama}</td>
                    <td className="py-3.5 px-4 text-[#5F6368]">{p.wilayah.split("–")[0].trim()}</td>
                    <td className="py-3.5 px-5 text-[#202124]">
                      <p className="font-medium text-[#202124]">{p.judul}</p>
                      <p className="text-[11px] text-[#5F6368] mt-0.5">{p.penyelenggara} · {p.kategori}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex rounded-md bg-[#F1F3F4] px-2 py-0.5 text-xs font-medium text-[#3C4043]">
                        {p.tingkat}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#5F6368]">{p.bulanPelaporan}</td>
                    <td className="py-3.5 px-5 text-right">
                      {p.linkSertifikat ? (
                        <a
                          href={p.linkSertifikat}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-[#1A73E8] hover:underline"
                        >
                          <span>Sertifikat</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        <span className="text-[#5F6368]">—</span>
                      )}
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

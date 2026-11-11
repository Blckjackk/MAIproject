"use client"

import { useState, useMemo } from "react"
import { DashboardHeader } from "@/components/dashboard-shell"
import { masterBeswan, rekapPembinaanWilayah } from "@/lib/mock-data"
import { exportToCsv } from "@/lib/export-csv"
import { Search, Download, Filter } from "lucide-react"

type StatusPembinaan = "Hadir Full" | "Hadir Sebagian" | "Tidak Hadir"

function getStatus(hadir: number): StatusPembinaan {
  if (hadir === 5) return "Hadir Full"
  if (hadir >= 3) return "Hadir Sebagian"
  return "Tidak Hadir"
}

function StatusIndicator({ status }: { status: StatusPembinaan }) {
  if (status === "Hadir Full") {
    return (
      <span className="inline-flex items-center rounded-md bg-[#E6F4EA] px-2 py-0.5 text-xs font-medium text-[#137333]">
        Hadir Full
      </span>
    )
  }
  if (status === "Hadir Sebagian") {
    return (
      <span className="inline-flex items-center rounded-md bg-[#FEF7E0] px-2 py-0.5 text-xs font-medium text-[#B06000]">
        Hadir Sebagian
      </span>
    )
  }
  return (
    <span className="inline-flex items-center rounded-md bg-[#FCE8E6] px-2 py-0.5 text-xs font-medium text-[#C5221F]">
      Tidak Hadir
    </span>
  )
}

function AttendanceText({ hadir }: { hadir: boolean | null }) {
  if (hadir === null) return <span className="text-[#5F6368] font-normal">—</span>
  return hadir ? (
    <span className="text-[#137333] font-medium">Hadir</span>
  ) : (
    <span className="text-[#5F6368]">Absen</span>
  )
}

function getMockKomponen(nid: string) {
  const seed = parseInt(nid.slice(-3))
  return {
    opening: seed % 4 !== 0,
    presensiAwal: seed % 7 !== 0,
    preTest: seed % 5 !== 0,
    postTest: seed % 9 !== 0,
    openingEval: seed % 6 !== 0,
    presensiAkhir: null, // belum dilaksanakan
  }
}

function countHadir(k: ReturnType<typeof getMockKomponen>) {
  return [k.presensiAwal, k.preTest, k.postTest, k.openingEval, k.presensiAkhir].filter((x) => x === true).length
}

export default function PembinaanNasionalPage() {
  const [search, setSearch] = useState("")
  const [selectedWilayah, setSelectedWilayah] = useState("Semua Wilayah")
  const [selectedStatus, setSelectedStatus] = useState("Semua Status")

  const beswan = useMemo(() => {
    return masterBeswan.map((b) => {
      const k = getMockKomponen(b.nid)
      const hadir = countHadir(k)
      return { ...b, komponen: k, hadir, status: getStatus(hadir) }
    })
  }, [])

  const filteredBeswan = useMemo(() => {
    return beswan.filter((b) => {
      const matchSearch =
        b.nama.toLowerCase().includes(search.toLowerCase()) ||
        b.nid.includes(search) ||
        b.universitas.toLowerCase().includes(search.toLowerCase())
      const matchWilayah = selectedWilayah === "Semua Wilayah" || b.wilayah === selectedWilayah
      const matchStatus = selectedStatus === "Semua Status" || b.status === selectedStatus
      return matchSearch && matchWilayah && matchStatus
    })
  }, [beswan, search, selectedWilayah, selectedStatus])

  const totalHadirFull = filteredBeswan.filter((b) => b.status === "Hadir Full").length
  const totalSebagian = filteredBeswan.filter((b) => b.status === "Hadir Sebagian").length
  const totalTidakHadir = filteredBeswan.filter((b) => b.status === "Tidak Hadir").length

  const handleExportCsv = () => {
    const exportData = filteredBeswan.map((b) => ({
      NID: b.nid,
      Nama: b.nama,
      Universitas: b.universitas,
      Wilayah: b.wilayah,
      Mentor: b.mentor,
      Opening_Program: b.komponen.opening ? "Hadir" : "Tidak Hadir",
      Presensi_Awal: b.komponen.presensiAwal ? "Hadir" : "Tidak Hadir",
      Pre_Test: b.komponen.preTest ? "Hadir" : "Tidak Hadir",
      Post_Test: b.komponen.postTest ? "Hadir" : "Tidak Hadir",
      Presensi_Evaluasi: b.komponen.openingEval ? "Hadir" : "Tidak Hadir",
      Presensi_Akhir: b.komponen.presensiAkhir === null ? "Belum Dilaksanakan" : b.komponen.presensiAkhir ? "Hadir" : "Tidak Hadir",
      Total_Hadir_Inti: b.hadir,
      Status_Kehadiran: b.status,
    }))
    exportToCsv(exportData, `rekap-pembinaan-nasional-${new Date().toISOString().slice(0, 10)}.csv`)
  }

  return (
    <div className="flex flex-col flex-1 overflow-y-auto bg-[#F8F9FA]">
      <DashboardHeader
        title="Pembinaan Nasional"
        subtitle="Rekapitulasi kehadiran 6 komponen — Opening Program dipisahkan dari 5 komponen inti"
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
            <p className="text-xs font-medium text-[#5F6368]">Hadir Penuh (5/5 Komponen)</p>
            <p className="mt-2 text-3xl font-semibold text-[#137333] tracking-tight">{totalHadirFull}</p>
            <p className="mt-1 text-xs text-[#5F6368]">
              {Math.round((totalHadirFull / (filteredBeswan.length || 1)) * 100)}% dari peserta tersaring
            </p>
          </div>
          <div className="rounded-xl border border-[#E8EAED] bg-white p-5">
            <p className="text-xs font-medium text-[#5F6368]">Hadir Sebagian (3–4 Komponen)</p>
            <p className="mt-2 text-3xl font-semibold text-[#B06000] tracking-tight">{totalSebagian}</p>
            <p className="mt-1 text-xs text-[#5F6368]">Memenuhi batas aktif minimum</p>
          </div>
          <div className="rounded-xl border border-[#E8EAED] bg-white p-5">
            <p className="text-xs font-medium text-[#5F6368]">Tidak Hadir (0–2 Komponen)</p>
            <p className="mt-2 text-3xl font-semibold text-[#C5221F] tracking-tight">{totalTidakHadir}</p>
            <p className="mt-1 text-xs text-[#5F6368]">Di bawah standar kehadiran</p>
          </div>
          <div className="rounded-xl border border-[#E8EAED] bg-white p-5">
            <p className="text-xs font-medium text-[#5F6368]">Total Peserta</p>
            <p className="mt-2 text-3xl font-semibold text-[#202124] tracking-tight">{filteredBeswan.length}</p>
            <p className="mt-1 text-xs text-[#5F6368]">Beswan BBM Angkatan 6</p>
          </div>
        </div>

        {/* Ringkasan Wilayah */}
        <div className="rounded-xl border border-[#E8EAED] bg-white p-6">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-[#202124]">Kehadiran per Wilayah</h2>
            <p className="text-xs text-[#5F6368] mt-0.5">8 Wilayah pendampingan mentor BBM 6</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {rekapPembinaanWilayah.map((w) => (
              <div key={w.id} className="rounded-lg border border-[#E8EAED] p-3.5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-[#202124]">{w.wilayah.split("–")[0].trim()}</p>
                  <span className="text-xs font-semibold text-[#202124]">{w.persentase}%</span>
                </div>
                <p className="text-[11px] text-[#5F6368] mt-0.5 truncate">{w.mentor}</p>
                <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-[#F1F3F4]">
                  <div
                    className="h-full rounded-full bg-[#1A73E8]"
                    style={{ width: `${w.persentase}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabel Detail Peserta */}
        <div className="rounded-xl border border-[#E8EAED] bg-white overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8EAED] p-5">
            <div>
              <h2 className="text-sm font-semibold text-[#202124]">Daftar Kehadiran Komponen Peserta</h2>
              <p className="text-xs text-[#5F6368] mt-0.5">
                Menampilkan {filteredBeswan.length} peserta · Komponen bertanda (–) belum diselenggarakan
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
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

              <select
                value={selectedWilayah}
                onChange={(e) => setSelectedWilayah(e.target.value)}
                className="rounded-lg border border-[#DADCE0] bg-white px-3 py-1.5 text-xs text-[#202124] focus:border-[#1A73E8] focus:outline-none"
              >
                <option>Semua Wilayah</option>
                {rekapPembinaanWilayah.map((w) => (
                  <option key={w.id} value={w.wilayah}>
                    {w.wilayah.split("–")[0].trim()}
                  </option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="rounded-lg border border-[#DADCE0] bg-white px-3 py-1.5 text-xs text-[#202124] focus:border-[#1A73E8] focus:outline-none"
              >
                <option>Semua Status</option>
                <option value="Hadir Full">Hadir Full</option>
                <option value="Hadir Sebagian">Hadir Sebagian</option>
                <option value="Tidak Hadir">Tidak Hadir</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#E8EAED] bg-[#F8F9FA] text-[#5F6368]">
                  <th className="py-3 px-5 text-left font-medium">NID</th>
                  <th className="py-3 px-5 text-left font-medium">Nama Beswan</th>
                  <th className="py-3 px-5 text-left font-medium">Universitas</th>
                  <th className="py-3 px-3 text-center font-medium bg-[#F1F3F4]/50">Opening*</th>
                  <th className="py-3 px-3 text-center font-medium">Presensi Awal</th>
                  <th className="py-3 px-3 text-center font-medium">Pre-Test</th>
                  <th className="py-3 px-3 text-center font-medium">Post-Test</th>
                  <th className="py-3 px-3 text-center font-medium">Evaluasi</th>
                  <th className="py-3 px-3 text-center font-medium">Presensi Akhir</th>
                  <th className="py-3 px-5 text-right font-medium">Status Akhir</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8EAED]">
                {filteredBeswan.map((b) => (
                  <tr key={b.nid} className="hover:bg-[#F8F9FA] transition-colors">
                    <td className="py-3.5 px-5 font-mono text-[#202124] font-medium">{b.nid}</td>
                    <td className="py-3.5 px-5 font-medium text-[#202124]">{b.nama}</td>
                    <td className="py-3.5 px-5 text-[#5F6368]">{b.universitas}</td>
                    <td className="py-3.5 px-3 text-center bg-[#F8F9FA]/40">
                      <AttendanceText hadir={b.komponen.opening} />
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <AttendanceText hadir={b.komponen.presensiAwal} />
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <AttendanceText hadir={b.komponen.preTest} />
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <AttendanceText hadir={b.komponen.postTest} />
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <AttendanceText hadir={b.komponen.openingEval} />
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <AttendanceText hadir={b.komponen.presensiAkhir} />
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <StatusIndicator status={b.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-[#E8EAED] px-5 py-3 text-[11px] text-[#5F6368] bg-[#F8F9FA]">
            * Kolom Opening Program dipisahkan dan tidak mempengaruhi perhitungan kelulusan 5 komponen inti (D-09 & D-10).
          </div>
        </div>
      </div>
    </div>
  )
}

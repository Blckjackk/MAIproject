"use client"

import { useState, useMemo } from "react"
import { DashboardHeader } from "@/components/dashboard-shell"
import { masterBeswan, masterWilayah, periodeMentorship as initialPeriods } from "@/lib/mock-data"
import { exportToCsv } from "@/lib/export-csv"
import type { PeriodeMentorship } from "@/lib/mock-data"
import { Search, Plus, Check, X, Download, ChevronRight } from "lucide-react"

function getMockMentorshipData(nid: string, periodeId: string) {
  const seed = parseInt(nid.slice(-3)) + parseInt(periodeId.slice(1) || "1")
  if (periodeId === "P6" || periodeId.startsWith("NEW")) {
    return { pm: null, preTest: null, postTest: null }
  }
  return {
    pm: seed % 7 !== 0,
    preTest: seed % 5 !== 0,
    postTest: seed % 11 !== 0,
  }
}

function getStatusMentorship(d: { pm: boolean | null; preTest: boolean | null; postTest: boolean | null }) {
  if (d.pm === null) return null
  const hadir = [d.pm, d.preTest, d.postTest].filter((x) => x === true).length
  return hadir >= 2 ? "Hadir" : "Tidak Hadir"
}

export default function MentorshipPage() {
  const [periods, setPeriods] = useState<PeriodeMentorship[]>(initialPeriods)
  const [selectedPeriodeId, setSelectedPeriodeId] = useState("P5")
  const [selectedWilayah, setSelectedWilayah] = useState("Semua Wilayah")
  const [search, setSearch] = useState("")

  // Modal tambah periode
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newNomor, setNewNomor] = useState(7)
  const [newNama, setNewNama] = useState("Mentoring #7 – Juli")
  const [newBulan, setNewBulan] = useState("Juli 2026")
  const [newFormsValue, setNewFormsValue] = useState("Mentoring #7 – Juli")
  const [toastMessage, setToastMessage] = useState("")

  const activePeriode = periods.find((p) => p.id === selectedPeriodeId) || periods[0]

  // Data beswan for the selected period
  const mentorshipList = useMemo(() => {
    return masterBeswan.map((b) => {
      const mk = getMockMentorshipData(b.nid, selectedPeriodeId)
      const status = getStatusMentorship(mk)
      const hadirCount = [mk.pm, mk.preTest, mk.postTest].filter(Boolean).length
      return {
        ...b,
        ...mk,
        statusPertemuan: status,
        komponenHadir: hadirCount,
      }
    })
  }, [selectedPeriodeId])

  const filteredList = useMemo(() => {
    return mentorshipList.filter((b) => {
      const matchSearch =
        b.nama.toLowerCase().includes(search.toLowerCase()) ||
        b.nid.includes(search) ||
        b.universitas.toLowerCase().includes(search.toLowerCase())
      const matchWilayah = selectedWilayah === "Semua Wilayah" || b.wilayah === selectedWilayah
      return matchSearch && matchWilayah
    })
  }, [mentorshipList, search, selectedWilayah])

  // Statistics
  const totalHadir = filteredList.filter((d) => d.statusPertemuan === "Hadir").length
  const totalTidakHadir = filteredList.filter((d) => d.statusPertemuan === "Tidak Hadir").length
  const belumTerlaksana = filteredList.filter((d) => d.statusPertemuan === null).length
  const attendanceRate =
    belumTerlaksana === filteredList.length
      ? "—"
      : `${Math.round((totalHadir / (totalHadir + totalTidakHadir || 1)) * 100)}%`

  // Regional summary for the active period
  const regionalSummary = useMemo(() => {
    return masterWilayah.map((w) => {
      const members = mentorshipList.filter((b) => b.wilayah === w.wilayah)
      const hadir = members.filter((b) => b.statusPertemuan === "Hadir").length
      const rate = members.length > 0 ? Math.round((hadir / members.length) * 100) : 0
      return {
        ...w,
        totalAnggota: members.length,
        hadir,
        rate,
      }
    })
  }, [mentorshipList])

  const handleAddPeriode = (e: React.FormEvent) => {
    e.preventDefault()
    const newPeriod: PeriodeMentorship = {
      id: `P${newNomor}`,
      nomor: newNomor,
      nama: newNama,
      bulanTahun: newBulan,
      status: "Direncanakan",
      nilaiForms: newFormsValue,
    }
    setPeriods((prev) => [...prev, newPeriod])
    setSelectedPeriodeId(newPeriod.id)
    setIsAddModalOpen(false)
    setNewNomor((n) => n + 1)
    setNewNama(`Mentoring #${newNomor + 1} – Periode Baru`)
    setToastMessage(`Pertemuan "${newNama}" berhasil ditambahkan.`)
    setTimeout(() => setToastMessage(""), 4000)
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto bg-[#F8F9FA]">
      <DashboardHeader
        title="Mentorship"
        subtitle="Rekapitulasi kehadiran peserta per pertemuan dan per wilayah mentor"
      />

      <div className="flex-1 px-8 py-7 space-y-8 max-w-7xl">
        {toastMessage && (
          <div className="flex items-center gap-2 rounded-lg bg-[#E6F4EA] px-4 py-3 text-xs font-medium text-[#137333] border border-[#CEEAD6]">
            <Check className="h-4 w-4" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* 1. Compact Attendance Statistics (GSA Style) */}
        <div>
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <h2 className="text-base font-semibold text-[#202124]">
                Ringkasan Kehadiran — {activePeriode.nama}
              </h2>
              <p className="text-xs text-[#5F6368]">
                Berdasarkan respons presensi, pre-test, dan post-test
              </p>
            </div>
            <span className="text-xs font-medium text-[#70757A]">
              Status: <span className="text-[#202124] font-semibold">{activePeriode.status}</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 pt-1">
            <div className="rounded-xl border border-[#E8EAED] bg-[#FFFFFF] p-4.5">
              <p className="text-xs font-medium text-[#5F6368]">Tingkat Kehadiran</p>
              <p className="mt-1.5 text-2xl font-semibold text-[#202124] tracking-tight">{attendanceRate}</p>
              <p className="mt-1 text-[11px] text-[#70757A]">Minimal 2 dari 3 komponen</p>
            </div>

            <div className="rounded-xl border border-[#E8EAED] bg-[#FFFFFF] p-4.5">
              <p className="text-xs font-medium text-[#5F6368]">Hadir (≥2 Komponen)</p>
              <p className="mt-1.5 text-2xl font-semibold text-[#137333] tracking-tight">{totalHadir}</p>
              <p className="mt-1 text-[11px] text-[#70757A]">Peserta memenuhi syarat</p>
            </div>

            <div className="rounded-xl border border-[#E8EAED] bg-[#FFFFFF] p-4.5">
              <p className="text-xs font-medium text-[#5F6368]">Tidak Hadir (0–1)</p>
              <p className="mt-1.5 text-2xl font-semibold text-[#D93025] tracking-tight">{totalTidakHadir}</p>
              <p className="mt-1 text-[11px] text-[#70757A]">Kurang dari 2 komponen</p>
            </div>

            <div className="rounded-xl border border-[#E8EAED] bg-[#FFFFFF] p-4.5">
              <p className="text-xs font-medium text-[#5F6368]">Total Peserta</p>
              <p className="mt-1.5 text-2xl font-semibold text-[#202124] tracking-tight">{filteredList.length}</p>
              <p className="mt-1 text-[11px] text-[#70757A]">Peserta terdaftar</p>
            </div>
          </div>
        </div>

        {/* 2. Daftar Pertemuan Mentorship (Clean Table) */}
        <div className="rounded-xl border border-[#E8EAED] bg-[#FFFFFF]">
          <div className="flex items-center justify-between border-b border-[#E8EAED] px-6 py-4">
            <div>
              <h3 className="text-sm font-semibold text-[#202124]">Daftar Pertemuan Mentorship</h3>
              <p className="text-xs text-[#5F6368]">Pilih pertemuan untuk melihat data rekapitulasi</p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-[#DADCE0] bg-[#FFFFFF] px-3 py-1.5 text-xs font-medium text-[#1A73E8] hover:bg-[#F8F9FA] transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Tambah Pertemuan</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#E8EAED] bg-[#F8F9FA] text-[#5F6368]">
                  <th className="py-3 px-6 font-medium w-12">#</th>
                  <th className="py-3 px-4 font-medium">Nama Pertemuan</th>
                  <th className="py-3 px-4 font-medium">Bulan / Periode</th>
                  <th className="py-3 px-4 font-medium">Opsi Google Form</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                  <th className="py-3 px-6 text-right font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F3F4]">
                {periods.map((p) => {
                  const isActive = p.id === selectedPeriodeId
                  return (
                    <tr
                      key={p.id}
                      onClick={() => setSelectedPeriodeId(p.id)}
                      className={`cursor-pointer transition-colors ${
                        isActive ? "bg-[#E8F0FE]/50" : "hover:bg-[#F8F9FA]"
                      }`}
                    >
                      <td className="py-3.5 px-6 font-mono text-[#5F6368]">{p.nomor}</td>
                      <td className="py-3.5 px-4 font-medium text-[#202124]">
                        <div className="flex items-center gap-2">
                          {isActive && <span className="h-2 w-2 rounded-full bg-[#1A73E8]" />}
                          <span>{p.nama}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-[#5F6368]">{p.bulanTahun}</td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-[#5F6368]">{p.nilaiForms}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                            p.status === "Selesai"
                              ? "text-[#137333]"
                              : p.status === "Berlangsung"
                              ? "text-[#1A73E8]"
                              : "text-[#70757A]"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              p.status === "Selesai"
                                ? "bg-[#137333]"
                                : p.status === "Berlangsung"
                                ? "bg-[#1A73E8]"
                                : "bg-[#9AA0A6]"
                            }`}
                          />
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-6 text-right">
                        <span
                          className={`text-xs font-medium ${
                            isActive ? "text-[#1A73E8] font-semibold" : "text-[#5F6368] hover:text-[#202124]"
                          }`}
                        >
                          {isActive ? "Sedang Dilihat" : "Pilih"}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Regional Summary (Easy to scan) */}
        <div className="rounded-xl border border-[#E8EAED] bg-[#FFFFFF] p-6">
          <div className="flex items-center justify-between border-b border-[#E8EAED] pb-3.5 mb-4">
            <div>
              <h3 className="text-sm font-semibold text-[#202124]">Rekap Wilayah — {activePeriode.nama}</h3>
              <p className="text-xs text-[#5F6368]">Distribusi kehadiran per kelompok mentor</p>
            </div>
            <span className="text-xs text-[#5F6368]">8 Wilayah</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {regionalSummary.map((r) => (
              <div
                key={r.id}
                onClick={() => setSelectedWilayah(selectedWilayah === r.wilayah ? "Semua Wilayah" : r.wilayah)}
                className={`cursor-pointer rounded-lg border p-3.5 transition-colors ${
                  selectedWilayah === r.wilayah
                    ? "border-[#1A73E8] bg-[#E8F0FE]/40"
                    : "border-[#E8EAED] bg-[#FFFFFF] hover:bg-[#F8F9FA]"
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs font-semibold text-[#202124]">{r.wilayah.split("–")[0].trim()}</span>
                  <span className="text-xs font-semibold text-[#1A73E8]">{r.rate}%</span>
                </div>
                <p className="text-[11px] text-[#5F6368] mt-1 truncate">Mentor: {r.mentor}</p>
                <div className="mt-2.5 flex items-center justify-between text-[11px] text-[#70757A]">
                  <span>{r.hadir} dari {r.totalAnggota} hadir</span>
                  <span className="h-1.5 w-16 rounded-full bg-[#E8EAED] overflow-hidden inline-block">
                    <span
                      className="h-full bg-[#1A73E8] block rounded-full"
                      style={{ width: `${r.rate}%` }}
                    />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Individual Attendance Details (Clear & Readable Table) */}
        <div className="rounded-xl border border-[#E8EAED] bg-[#FFFFFF]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E8EAED] px-6 py-4">
            <div>
              <h3 className="text-sm font-semibold text-[#202124]">
                Daftar Kehadiran Peserta — {activePeriode.nama}
              </h3>
              <p className="text-xs text-[#5F6368]">
                Komponen: Presensi Mentorship (PM), Pre-Test, dan Post-Test
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative min-w-[200px]">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#5F6368]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari NID atau nama..."
                  className="w-full rounded-lg border border-[#DADCE0] bg-[#FFFFFF] pl-8 pr-3 py-1.5 text-xs text-[#202124] placeholder:text-[#70757A] focus:outline-none focus:border-[#1A73E8]"
                />
              </div>

              <select
                value={selectedWilayah}
                onChange={(e) => setSelectedWilayah(e.target.value)}
                className="rounded-lg border border-[#DADCE0] bg-[#FFFFFF] px-3 py-1.5 text-xs text-[#3C4043] focus:outline-none focus:border-[#1A73E8]"
              >
                <option>Semua Wilayah</option>
                {masterWilayah.map((w) => (
                  <option key={w.id} value={w.wilayah}>
                    {w.wilayah.split("–")[0].trim()}
                  </option>
                ))}
              </select>

              <button
                onClick={() =>
                  exportToCsv(
                    `MAI_Mentorship_${activePeriode.id}_BBM6`,
                    filteredList.map((b) => ({
                      NID: b.nid,
                      "Nama Peserta": b.nama,
                      Wilayah: b.wilayah,
                      Mentor: b.mentor,
                      "Presensi Mentorship (PM)": b.pm ? "Hadir" : "Tidak Hadir",
                      "Pre-Test": b.preTest ? "Hadir" : "Tidak Hadir",
                      "Post-Test": b.postTest ? "Hadir" : "Tidak Hadir",
                      "Komponen Hadir": `${b.komponenHadir}/3`,
                      "Status Pertemuan": b.statusPertemuan || "Belum Dilaksanakan",
                    }))
                  )
                }
                className="flex items-center gap-1.5 rounded-lg border border-[#DADCE0] bg-[#FFFFFF] px-3 py-1.5 text-xs font-medium text-[#3C4043] hover:bg-[#F8F9FA] transition-colors"
              >
                <Download className="h-3.5 w-3.5 text-[#5F6368]" />
                <span>Ekspor CSV</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#E8EAED] bg-[#F8F9FA] text-[#5F6368]">
                  <th className="py-3 px-6 font-medium">NID</th>
                  <th className="py-3 px-4 font-medium">Nama Peserta</th>
                  <th className="py-3 px-4 font-medium">Wilayah</th>
                  <th className="py-3 px-4 font-medium">Mentor</th>
                  <th className="py-3 px-4 text-center font-medium">PM</th>
                  <th className="py-3 px-4 text-center font-medium">Pre-Test</th>
                  <th className="py-3 px-4 text-center font-medium">Post-Test</th>
                  <th className="py-3 px-4 text-center font-medium">Hadir</th>
                  <th className="py-3 px-6 text-right font-medium">Status Akhir</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F3F4]">
                {filteredList.slice(0, 30).map((b) => (
                  <tr key={b.nid} className="hover:bg-[#F8F9FA] transition-colors h-12">
                    <td className="py-3 px-6 font-mono font-medium text-[#202124]">{b.nid}</td>
                    <td className="py-3 px-4 font-medium text-[#202124]">{b.nama}</td>
                    <td className="py-3 px-4 text-[#5F6368]">{b.wilayah.split("–")[0].trim()}</td>
                    <td className="py-3 px-4 text-[#5F6368]">{b.mentor}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={b.pm ? "text-[#137333] font-medium" : "text-[#70757A]"}>
                        {b.pm === null ? "—" : b.pm ? "Hadir" : "—"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={b.preTest ? "text-[#137333] font-medium" : "text-[#70757A]"}>
                        {b.preTest === null ? "—" : b.preTest ? "Hadir" : "—"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={b.postTest ? "text-[#137333] font-medium" : "text-[#70757A]"}>
                        {b.postTest === null ? "—" : b.postTest ? "Hadir" : "—"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center font-medium text-[#202124]">
                      {b.statusPertemuan === null ? "—" : `${b.komponenHadir}/3`}
                    </td>
                    <td className="py-3 px-6 text-right font-medium">
                      {b.statusPertemuan === null ? (
                        <span className="text-[#70757A]">Belum Terlaksana</span>
                      ) : b.statusPertemuan === "Hadir" ? (
                        <span className="text-[#137333]">Hadir</span>
                      ) : (
                        <span className="text-[#D93025]">Tidak Hadir</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-[#E8EAED] px-6 py-3.5 text-xs text-[#5F6368] flex items-center justify-between">
            <span>
              Menampilkan {Math.min(30, filteredList.length)} dari {filteredList.length} peserta
            </span>
            <span className="text-[11px] text-[#70757A]">
              Aturan kehadiran: 0–1 komponen = Tidak Hadir · 2–3 komponen = Hadir
            </span>
          </div>
        </div>
      </div>

      {/* Modal Dialog Tambah Periode Mentorship */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-2xs">
          <div className="w-full max-w-md rounded-xl border border-[#DADCE0] bg-[#FFFFFF] p-6 shadow-xl">
            <div className="flex items-start justify-between border-b border-[#E8EAED] pb-3.5">
              <div>
                <h3 className="text-base font-semibold text-[#202124]">Tambah Pertemuan Mentorship</h3>
                <p className="text-xs text-[#5F6368] mt-0.5">Konfigurasi pertemuan untuk filter dashboard</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="rounded p-1 text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#202124]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleAddPeriode} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-[#202124] block mb-1">Nomor Pertemuan</label>
                  <input
                    type="number"
                    value={newNomor}
                    onChange={(e) => setNewNomor(parseInt(e.target.value) || 1)}
                    required
                    className="w-full rounded-lg border border-[#DADCE0] bg-[#FFFFFF] p-2 text-[#202124] focus:outline-none focus:border-[#1A73E8]"
                  />
                </div>
                <div>
                  <label className="font-medium text-[#202124] block mb-1">Bulan & Tahun</label>
                  <input
                    type="text"
                    value={newBulan}
                    onChange={(e) => setNewBulan(e.target.value)}
                    placeholder="Contoh: Juli 2026"
                    required
                    className="w-full rounded-lg border border-[#DADCE0] bg-[#FFFFFF] p-2 text-[#202124] focus:outline-none focus:border-[#1A73E8]"
                  />
                </div>
              </div>

              <div>
                <label className="font-medium text-[#202124] block mb-1">Nama Pertemuan</label>
                <input
                  type="text"
                  value={newNama}
                  onChange={(e) => setNewNama(e.target.value)}
                  placeholder="Contoh: Mentoring #7 – Juli"
                  required
                  className="w-full rounded-lg border border-[#DADCE0] bg-[#FFFFFF] p-2 text-[#202124] focus:outline-none focus:border-[#1A73E8]"
                />
              </div>

              <div>
                <label className="font-medium text-[#202124] block mb-1">Opsi di Google Form (Wajib Sama)</label>
                <input
                  type="text"
                  value={newFormsValue}
                  onChange={(e) => setNewFormsValue(e.target.value)}
                  placeholder="Sesuai pilihan pada Google Form"
                  required
                  className="w-full rounded-lg border border-[#DADCE0] bg-[#FFFFFF] p-2 font-mono text-[11px] text-[#202124] focus:outline-none focus:border-[#1A73E8]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E8EAED]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-lg border border-[#DADCE0] px-3 py-1.5 font-medium text-[#3C4043] hover:bg-[#F8F9FA]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#1A73E8] px-4 py-1.5 font-medium text-white hover:bg-[#1557B0] transition-colors"
                >
                  Simpan Pertemuan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

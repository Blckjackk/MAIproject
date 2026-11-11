"use client"

import { useState, useMemo } from "react"
import { DashboardHeader } from "@/components/dashboard-shell"
import { masterBeswan, periodeMentorship as initialPeriods } from "@/lib/mock-data"
import type { PeriodeMentorship } from "@/lib/mock-data"
import { CircleCheck, CircleX, Plus, Search, Calendar, X, Check } from "lucide-react"

type StatusPeriode = "Direncanakan" | "Berlangsung" | "Selesai" | "Ditutup"

function PeriodeBadge({ status }: { status: StatusPeriode }) {
  const map: Record<StatusPeriode, string> = {
    "Berlangsung": "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
    "Selesai": "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
    "Ditutup": "bg-muted text-muted-foreground",
    "Direncanakan": "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  }
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${map[status]}`}>{status}</span>
}

function ComponentDot({ hadir }: { hadir: boolean | null }) {
  if (hadir === null) return <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] text-muted-foreground">–</span>
  return hadir
    ? <CircleCheck className="h-4 w-4 text-emerald-500" />
    : <CircleX className="h-4 w-4 text-red-400" />
}

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
  const [search, setSearch] = useState("")

  // Modal tambah periode
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newNomor, setNewNomor] = useState(7)
  const [newNama, setNewNama] = useState("Mentoring #7 – Juli")
  const [newBulan, setNewBulan] = useState("Juli 2026")
  const [newFormsValue, setNewFormsValue] = useState("Mentoring #7 – Juli")
  const [toastMessage, setToastMessage] = useState("")

  const activePeriode = periods.find((p) => p.id === selectedPeriodeId) || periods[0]

  const mentorshipList = useMemo(() => {
    return masterBeswan.map((b) => {
      const mk = getMockMentorshipData(b.nid, selectedPeriodeId)
      return {
        ...b,
        ...mk,
        statusPertemuan: getStatusMentorship(mk),
        komponenHadir: [mk.pm, mk.preTest, mk.postTest].filter(Boolean).length,
      }
    })
  }, [selectedPeriodeId])

  const filteredList = useMemo(() => {
    return mentorshipList.filter((b) => {
      return (
        b.nama.toLowerCase().includes(search.toLowerCase()) ||
        b.nid.includes(search) ||
        b.wilayah.toLowerCase().includes(search.toLowerCase())
      )
    })
  }, [mentorshipList, search])

  const totalHadir = filteredList.filter((d) => d.statusPertemuan === "Hadir").length
  const totalTidakHadir = filteredList.filter((d) => d.statusPertemuan === "Tidak Hadir").length
  const belumTerlaksana = filteredList.filter((d) => d.statusPertemuan === null).length

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
    setToastMessage(`Periode baru "${newNama}" berhasil ditambahkan ke dashboard!`)
    setTimeout(() => setToastMessage(""), 4500)
  }

  return (
    <div className="flex flex-col flex-1 overflow-y-auto">
      <DashboardHeader
        title="Mentorship"
        subtitle="Rekap kehadiran per pertemuan — 1 Google Form & 1 Spreadsheet untuk semua periode"
      />

      <div className="flex-1 space-y-6 p-6">
        {toastMessage && (
          <div className="flex items-center gap-2 rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300 animate-in fade-in">
            <Check className="h-4 w-4 text-emerald-600" />
            {toastMessage}
          </div>
        )}

        {/* Info Banner */}
        <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-xs text-blue-800 dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-300">
          <strong>Prinsip Arsitektur (Spec D-06, D-07, D-08):</strong> Seluruh pertemuan Mentorship menggunakan <strong>satu Google Form dan satu Spreadsheet respons terpadu</strong>. Periode baru ditambahkan sebagai opsi di formulir yang sama. Menambah periode di dashboard mengonfigurasi filter tanpa membuat spreadsheet baru.
        </div>

        {/* Periode Config Card */}
        <div className="rounded-xl border border-border bg-card shadow-xs">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Daftar Periode Mentorship BBM 6</h3>
              <p className="text-xs text-muted-foreground">Admin mengelola penambahan pertemuan di sini</p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-2xs"
            >
              <Plus className="h-3.5 w-3.5" />
              Tambah Konfigurasi Periode
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="px-5 py-3 text-left font-semibold text-muted-foreground">#</th>
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Nama Pertemuan</th>
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Bulan / Tahun</th>
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Opsi Nilai Google Form</th>
                  <th className="px-3 py-3 text-center font-semibold text-muted-foreground">Status Pertemuan</th>
                  <th className="px-5 py-3 text-center font-semibold text-muted-foreground">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {periods.map((p) => {
                  const isCurrent = p.id === selectedPeriodeId
                  return (
                    <tr
                      key={p.id}
                      className={`border-b border-border/50 last:border-0 transition-colors ${
                        isCurrent ? "bg-primary/5 font-medium" : "hover:bg-muted/30"
                      }`}
                    >
                      <td className="px-5 py-3 font-mono font-bold text-foreground">{p.nomor}</td>
                      <td className="px-3 py-3 text-foreground">{p.nama}</td>
                      <td className="px-3 py-3 text-muted-foreground">{p.bulanTahun}</td>
                      <td className="px-3 py-3 font-mono text-[11px] text-muted-foreground">{p.nilaiForms}</td>
                      <td className="px-3 py-3 text-center">
                        <PeriodeBadge status={p.status} />
                      </td>
                      <td className="px-5 py-3 text-center">
                        <button
                          onClick={() => setSelectedPeriodeId(p.id)}
                          className={`rounded px-2.5 py-1 text-[11px] font-semibold transition-all ${
                            isCurrent
                              ? "bg-primary text-primary-foreground shadow-2xs"
                              : "border border-border text-muted-foreground hover:bg-muted"
                          }`}
                        >
                          {isCurrent ? "Aktif Dilihat" : "Pilih Periode"}
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* KPI Row for Active Period */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
            <p className="text-xs font-medium text-muted-foreground">Hadir (≥2 Komponen)</p>
            <p className="mt-1 text-3xl font-bold text-emerald-600">{totalHadir}</p>
            <p className="mt-1 text-xs text-muted-foreground">Status Hadir Pertemuan</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
            <p className="text-xs font-medium text-muted-foreground">Tidak Hadir (0–1 Komponen)</p>
            <p className="mt-1 text-3xl font-bold text-red-600">{totalTidakHadir}</p>
            <p className="mt-1 text-xs text-muted-foreground">Kurang dari 2 komponen</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
            <p className="text-xs font-medium text-muted-foreground">Persentase Kehadiran</p>
            <p className="mt-1 text-3xl font-bold text-foreground">
              {belumTerlaksana === filteredList.length
                ? "–"
                : `${Math.round((totalHadir / (totalHadir + totalTidakHadir || 1)) * 100)}%`}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Dari pertemuan yang terlaksana</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
            <p className="text-xs font-medium text-muted-foreground">Periode Aktif</p>
            <p className="mt-1 text-base font-bold text-foreground leading-tight">{activePeriode.nama}</p>
            <p className="mt-1 text-xs text-muted-foreground">{activePeriode.status}</p>
          </div>
        </div>

        {/* Detail Table */}
        <div className="rounded-xl border border-border bg-card shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Detail Per Peserta — {activePeriode.nama}</h3>
              <p className="text-xs text-muted-foreground">3 komponen: PM (Presensi Mentorship), Pre-Test, dan Post-Test</p>
            </div>
            <div className="relative min-w-[220px]">
              <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari NID / nama beswan..."
                className="w-full rounded-lg border border-border bg-background pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="px-5 py-3 text-left font-semibold text-muted-foreground">NID</th>
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Nama Peserta</th>
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Wilayah</th>
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Mentor</th>
                  <th className="px-3 py-3 text-center font-semibold text-muted-foreground">PM</th>
                  <th className="px-3 py-3 text-center font-semibold text-muted-foreground">Pre-Test</th>
                  <th className="px-3 py-3 text-center font-semibold text-muted-foreground">Post-Test</th>
                  <th className="px-3 py-3 text-center font-semibold text-muted-foreground">Hadir / 3</th>
                  <th className="px-5 py-3 text-center font-semibold text-muted-foreground">Status Akhir</th>
                </tr>
              </thead>
              <tbody>
                {filteredList.slice(0, 30).map((b) => (
                  <tr key={b.nid} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3 font-mono font-bold text-foreground">{b.nid}</td>
                    <td className="px-3 py-3 font-medium text-foreground">{b.nama}</td>
                    <td className="px-3 py-3 text-muted-foreground">{b.wilayah.split("–")[0].trim()}</td>
                    <td className="px-3 py-3 text-muted-foreground">{b.mentor}</td>
                    <td className="px-3 py-3 text-center"><ComponentDot hadir={b.pm} /></td>
                    <td className="px-3 py-3 text-center"><ComponentDot hadir={b.preTest} /></td>
                    <td className="px-3 py-3 text-center"><ComponentDot hadir={b.postTest} /></td>
                    <td className="px-3 py-3 text-center font-semibold text-foreground">
                      {b.statusPertemuan === null ? "–" : `${b.komponenHadir}/3`}
                    </td>
                    <td className="px-5 py-3 text-center">
                      {b.statusPertemuan === null ? (
                        <span className="text-muted-foreground">Belum Dilaksanakan</span>
                      ) : b.statusPertemuan === "Hadir" ? (
                        <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                          Hadir
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-700">
                          Tidak Hadir
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-border px-5 py-3 text-xs text-muted-foreground">
            Menampilkan {Math.min(30, filteredList.length)} dari {filteredList.length} beswan · Sumber data: Google Sheets Mentorship terpadu
          </div>
        </div>
      </div>

      {/* Modal Dialog Tambah Periode Mentorship (Spec 8.3) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-border pb-4">
              <div>
                <h3 className="text-base font-bold text-foreground">Tambah Konfigurasi Periode</h3>
                <p className="text-xs text-muted-foreground">Menambahkan periode baru untuk monitoring dashboard</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddPeriode} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-foreground block mb-1">Nomor Pertemuan</label>
                  <input
                    type="number"
                    value={newNomor}
                    onChange={(e) => setNewNomor(parseInt(e.target.value) || 1)}
                    required
                    className="w-full rounded-lg border border-border bg-background p-2 font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="font-medium text-foreground block mb-1">Bulan & Tahun</label>
                  <input
                    type="text"
                    value={newBulan}
                    onChange={(e) => setNewBulan(e.target.value)}
                    placeholder="Contoh: Juli 2026"
                    required
                    className="w-full rounded-lg border border-border bg-background p-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div>
                <label className="font-medium text-foreground block mb-1">Nama Periode / Label</label>
                <input
                  type="text"
                  value={newNama}
                  onChange={(e) => setNewNama(e.target.value)}
                  placeholder="Contoh: Mentoring #7 – Juli"
                  required
                  className="w-full rounded-lg border border-border bg-background p-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="font-medium text-foreground block mb-1">Nilai Opsi di Google Form (Wajib Sama)</label>
                <input
                  type="text"
                  value={newFormsValue}
                  onChange={(e) => setNewFormsValue(e.target.value)}
                  placeholder="Harus sama persis dengan opsi di Google Form"
                  required
                  className="w-full rounded-lg border border-border bg-background p-2 font-mono text-[11px] text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <p className="mt-1 text-[10px] text-muted-foreground">
                  Pastikan opsi ini sudah ditambahkan pada pertanyaan pilihan periode di Google Form yang sama.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-lg border border-border px-3 py-2 font-medium text-muted-foreground hover:bg-muted"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-xs"
                >
                  Simpan Periode
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

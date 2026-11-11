"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-shell"
import { sumberDataList } from "@/lib/mock-data"
import { RefreshCw, CircleCheck, CircleX, CircleAlert, Check } from "lucide-react"

const dataIssues = [
  { id: "ISS-001", kategori: "NID Tidak Dikenal", sumber: "SRC-01", tab: "RESPON_PEMBINAAN_NASIONAL", baris: 42, nilaiNid: "60104", pesan: "NID '60104' tidak ditemukan dalam master beswan setelah normalisasi" },
  { id: "ISS-002", kategori: "NID Tidak Dikenal", sumber: "SRC-01", tab: "RESPON_MENTORSHIP", baris: 87, nilaiNid: "602XXX", pesan: "NID '602XXX' mengandung karakter non-numerik" },
  { id: "ISS-003", kategori: "Respons Duplikat", sumber: "SRC-01", tab: "RESPON_PEMBINAAN_NASIONAL", baris: 125, nilaiNid: "601001", pesan: "NID 601001 memiliki 2 respons untuk Presensi Awal dengan timestamp berbeda (TBD-06)" },
  { id: "ISS-004", kategori: "NID Kosong", sumber: "SRC-02", tab: "Sheet1", baris: 203, nilaiNid: "(kosong)", pesan: "Kolom NID kosong, respons tidak dapat dipetakan ke beswan manapun" },
  { id: "ISS-005", kategori: "Pilihan Kolom Berbeda", sumber: "SRC-01", tab: "RESPON_MENTORSHIP", baris: null, nilaiNid: "—", pesan: "Pilihan opsi 'Periode Mentorship' terdapat variasi penulisan dari opsi Google Form" },
]

export default function IntegrasiDataPage() {
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncToast, setSyncToast] = useState(false)
  const [filterKategori, setFilterKategori] = useState("Semua Kategori")

  const handleSync = () => {
    setIsSyncing(true)
    setTimeout(() => {
      setIsSyncing(false)
      setSyncToast(true)
      setTimeout(() => setSyncToast(false), 4000)
    }, 1200)
  }

  const filteredIssues = dataIssues.filter((i) => {
    if (filterKategori === "Semua Kategori") return true
    return i.kategori === filterKategori
  })

  return (
    <div className="flex flex-col flex-1 overflow-y-auto bg-[#F8F9FA]">
      <DashboardHeader
        title="Integrasi Sheets"
        subtitle="Status koneksi 3 Google Spreadsheet dan audit anomali data"
        actions={
          <button
            onClick={handleSync}
            disabled={isSyncing}
            className="flex items-center gap-1.5 rounded-lg border border-[#DADCE0] bg-white px-3 py-1.5 text-xs font-medium text-[#3C4043] hover:bg-[#F8F9FA] hover:text-[#202124] transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-[#5F6368] ${isSyncing ? "animate-spin text-[#1A73E8]" : ""}`} />
            <span>{isSyncing ? "Menyinkronkan..." : "Sinkronkan Sekarang"}</span>
          </button>
        }
      />

      <div className="flex-1 space-y-8 p-8 max-w-7xl">
        {syncToast && (
          <div className="flex items-center gap-2 rounded-lg bg-[#E6F4EA] border border-[#CEEAD6] px-4 py-3 text-xs font-medium text-[#137333] transition-all">
            <Check className="h-4 w-4" />
            <span>Sinkronisasi selesai. Log tercatat pada tab lembar kerja administrasi.</span>
          </div>
        )}

        {/* Status Sumber Data */}
        <div className="rounded-xl border border-[#E8EAED] bg-white overflow-hidden">
          <div className="border-b border-[#E8EAED] p-5">
            <h2 className="text-sm font-semibold text-[#202124]">Sumber Data Google Sheets Aktif</h2>
            <p className="text-xs text-[#5F6368] mt-0.5">
              Sistem membaca data langsung dari spreadsheet tanpa perantara database SQL
            </p>
          </div>

          <div className="divide-y divide-[#E8EAED]">
            {sumberDataList.map((src) => (
              <div key={src.id} className="p-5 flex flex-wrap items-center justify-between gap-4 hover:bg-[#FAFAFA]">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-semibold text-[#1A73E8]">{src.id}</span>
                    <h3 className="text-sm font-semibold text-[#202124]">{src.nama}</h3>
                    <span
                      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ${
                        src.statusKoneksi === "Terhubung"
                          ? "bg-[#E6F4EA] text-[#137333]"
                          : src.statusKoneksi === "Gagal"
                          ? "bg-[#FCE8E6] text-[#C5221F]"
                          : "bg-[#FEF7E0] text-[#B06000]"
                      }`}
                    >
                      {src.statusKoneksi === "Terhubung" ? (
                        <CircleCheck className="h-3 w-3" />
                      ) : src.statusKoneksi === "Gagal" ? (
                        <CircleX className="h-3 w-3" />
                      ) : (
                        <CircleAlert className="h-3 w-3" />
                      )}
                      {src.statusKoneksi}
                    </span>
                  </div>
                  <p className="text-xs text-[#5F6368] mt-1">{src.kegunaan}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[#5F6368]">
                    <span>Total: {src.jumlahBaris} baris</span>
                    <span>·</span>
                    <span className="text-[#137333] font-medium">{src.jumlahDipetakan} terpetakan</span>
                    {src.jumlahNidTidakDikenal > 0 && (
                      <>
                        <span>·</span>
                        <span className="text-[#C5221F] font-medium">{src.jumlahNidTidakDikenal} NID bermasalah</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="text-right text-xs text-[#5F6368]">
                  <p>Sinkronisasi Terakhir</p>
                  <p className="font-medium text-[#202124] mt-0.5">{src.terakhirSinkron}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daftar Pengecualian / Exception List */}
        <div className="rounded-xl border border-[#E8EAED] bg-white overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8EAED] p-5">
            <div>
              <h2 className="text-sm font-semibold text-[#202124]">Daftar Pengecualian & Audit Data</h2>
              <p className="text-xs text-[#5F6368] mt-0.5">
                Data bermasalah tidak dihapus oleh sistem, melainkan dicatat untuk ditindaklanjuti admin
              </p>
            </div>

            <select
              value={filterKategori}
              onChange={(e) => setFilterKategori(e.target.value)}
              className="rounded-lg border border-[#DADCE0] bg-white px-3 py-1.5 text-xs text-[#202124] focus:border-[#1A73E8] focus:outline-none"
            >
              <option value="Semua Kategori">Semua Kategori</option>
              <option value="NID Tidak Dikenal">NID Tidak Dikenal</option>
              <option value="Respons Duplikat">Respons Duplikat</option>
              <option value="NID Kosong">NID Kosong</option>
              <option value="Pilihan Kolom Berbeda">Pilihan Kolom Berbeda</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#E8EAED] bg-[#F8F9FA] text-[#5F6368]">
                  <th className="py-3 px-5 text-left font-medium">ID Masalah</th>
                  <th className="py-3 px-5 text-left font-medium">Kategori</th>
                  <th className="py-3 px-4 text-left font-medium">Sumber & Tab</th>
                  <th className="py-3 px-4 text-left font-medium">Baris</th>
                  <th className="py-3 px-4 text-left font-medium">Nilai Input</th>
                  <th className="py-3 px-5 text-left font-medium">Keterangan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8EAED]">
                {filteredIssues.map((issue) => (
                  <tr key={issue.id} className="hover:bg-[#F8F9FA] transition-colors">
                    <td className="py-3.5 px-5 font-mono text-[#202124] font-medium">{issue.id}</td>
                    <td className="py-3.5 px-5">
                      <span className="inline-flex rounded-md bg-[#F1F3F4] px-2 py-0.5 text-xs font-medium text-[#3C4043]">
                        {issue.kategori}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#5F6368]">
                      {issue.sumber} · <span className="font-mono text-[11px]">{issue.tab}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[#5F6368]">
                      {issue.baris !== null ? `Baris ${issue.baris}` : "—"}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[#C5221F] font-medium">{issue.nilaiNid}</td>
                    <td className="py-3.5 px-5 text-[#3C4043]">{issue.pesan}</td>
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

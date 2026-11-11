"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-shell"
import { masterWilayah, masterBeswan } from "@/lib/mock-data"
import { Users, MapPin, Search, ChevronRight, CheckCircle, AlertTriangle } from "lucide-react"

export default function WilayahPage() {
  const [selectedWilayahId, setSelectedWilayahId] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  const activeWilayah = selectedWilayahId
    ? masterWilayah.find((w) => w.id === selectedWilayahId)
    : null

  const displayedBeswan = masterBeswan.filter((b) => {
    const matchWilayah = selectedWilayahId ? b.wilayah === activeWilayah?.wilayah : true
    const matchSearch =
      b.nama.toLowerCase().includes(search.toLowerCase()) ||
      b.nid.includes(search) ||
      b.universitas.toLowerCase().includes(search.toLowerCase())
    return matchWilayah && matchSearch
  })

  return (
    <div className="flex flex-col flex-1 overflow-y-auto bg-[#F6F8FB]">
      <DashboardHeader
        title="Wilayah & Mentor"
        subtitle="Kelompok pendampingan dan pembagian 120 beswan menurut wilayah"
      />

      <div className="flex-1 space-y-6 p-6">
        {/* Info Banner */}
        <div className="rounded-xl border border-[#27A9A5]/30 bg-[#27A9A5]/5 px-4 py-3 text-xs text-[#0f6c6a]">
          <strong>Aturan Wilayah (Spec 5.3 & TBD-12):</strong> Setiap rekap menampilkan nama wilayah dan nama mentor secara konsisten. Kebijakan perpindahan wilayah/mentor selama program masih berstatus TBD-12 (sementara ini menggunakan penempatan master aktif).
        </div>

        {/* 8 Wilayah Cards Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {masterWilayah.map((w) => {
            const isSelected = selectedWilayahId === w.id
            const beswanCount = masterBeswan.filter((b) => b.wilayah === w.wilayah).length
            return (
              <div
                key={w.id}
                onClick={() => setSelectedWilayahId(isSelected ? null : w.id)}
                className={`cursor-pointer rounded-2xl border p-5 shadow-xs transition-all hover:shadow-md ${
                  isSelected
                    ? "border-[#1769AA] bg-white ring-2 ring-[#1769AA]/20"
                    : "border-[#E5EAF1] bg-white hover:border-[#1769AA]/40"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                    isSelected ? "bg-[#12345B] text-white" : "bg-[#1769AA]/10 text-[#1769AA]"
                  }`}>
                    <MapPin className="h-4.5 w-4.5" />
                  </div>
                  <span className="font-mono text-xs font-bold text-[#64748B]">{w.id}</span>
                </div>

                <h3 className="mt-3 text-sm font-bold text-[#12345B] leading-tight">{w.wilayah}</h3>
                <p className="mt-1 text-xs text-[#64748B]">
                  Mentor: <strong className="text-[#172033] font-semibold">{w.mentor}</strong>
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-[#E5EAF1] pt-3 text-xs">
                  <div className="flex items-center gap-1.5 text-[#12345B] font-semibold">
                    <Users className="h-3.5 w-3.5 text-[#1769AA]" />
                    <span>{beswanCount} Peserta</span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#1769AA]">
                    {isSelected ? "Filter Aktif" : "Klik Filter"}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Tabel Detail Peserta per Wilayah */}
        <div className="rounded-2xl border border-[#E5EAF1] bg-white shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5EAF1] px-6 py-4">
            <div>
              <h3 className="text-sm font-bold text-[#12345B]">
                {activeWilayah ? `Daftar Anggota — ${activeWilayah.wilayah}` : "Seluruh Beswan Menurut Wilayah"}
              </h3>
              <p className="text-xs text-[#64748B]">
                {activeWilayah ? `Di bawah bimbingan mentor ${activeWilayah.mentor}` : "Klik card wilayah di atas untuk memfilter satu wilayah tertentu"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {selectedWilayahId && (
                <button
                  onClick={() => setSelectedWilayahId(null)}
                  className="rounded-lg border border-[#E5EAF1] bg-[#F6F8FB] px-3 py-1.5 text-xs font-medium text-[#172033] hover:bg-slate-200"
                >
                  Tampilkan Semua Wilayah
                </button>
              )}
              <div className="relative min-w-[220px]">
                <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-[#64748B]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari NID, nama, universitas..."
                  className="w-full rounded-lg border border-[#E5EAF1] bg-white pl-8 pr-3 py-1.5 text-xs text-[#172033] placeholder:text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#1769AA]/20"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#E5EAF1] bg-[#F6F8FB]/70 text-[#64748B]">
                  <th className="px-6 py-3 text-left font-semibold">NID</th>
                  <th className="px-3 py-3 text-left font-semibold">Nama Beswan</th>
                  <th className="px-3 py-3 text-left font-semibold">Universitas</th>
                  <th className="px-3 py-3 text-left font-semibold">Wilayah</th>
                  <th className="px-3 py-3 text-left font-semibold">Mentor Pendamping</th>
                  <th className="px-6 py-3 text-center font-semibold">Status Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5EAF1]/50">
                {displayedBeswan.slice(0, 30).map((b) => (
                  <tr key={b.nid} className="hover:bg-[#F6F8FB] transition-colors">
                    <td className="px-6 py-3 font-mono font-bold text-[#12345B]">{b.nid}</td>
                    <td className="px-3 py-3 font-semibold text-[#172033]">{b.nama}</td>
                    <td className="px-3 py-3 text-[#64748B]">{b.universitas}</td>
                    <td className="px-3 py-3 font-medium text-[#172033]">{b.wilayah.split("–")[0].trim()}</td>
                    <td className="px-3 py-3 text-[#64748B]">{b.mentor}</td>
                    <td className="px-6 py-3 text-center">
                      {b.status === "Aktif" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                          <CheckCircle className="h-3 w-3" /> Aktif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
                          <AlertTriangle className="h-3 w-3" /> Perlu Periksa
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-[#E5EAF1] px-6 py-3 text-xs text-[#64748B]">
            Menampilkan {Math.min(30, displayedBeswan.length)} dari {displayedBeswan.length} beswan · Sumber data: MASTER_BESWAN
          </div>
        </div>
      </div>
    </div>
  )
}

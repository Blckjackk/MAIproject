import { DashboardHeader } from "@/components/dashboard-shell"
import { Settings, AlertTriangle, Database, FileSpreadsheet, ShieldCheck, CheckCircle2 } from "lucide-react"

const tbdItems = [
  { id: "TBD-01", pertanyaan: "Bagaimana admin login: email/password, Google Login, atau metode lain?", dampak: "Desain autentikasi dan pengelolaan akun admin." },
  { id: "TBD-02", pertanyaan: "Sinkronisasi dilakukan manual, berkala, otomatis, atau kombinasi?", dampak: "Desain proses integrasi dan kesegaran data." },
  { id: "TBD-03", pertanyaan: "Di tab mana master peserta resmi berada, dan apakah berisi 120 atau 121 peserta lengkap?", dampak: "Akurasi seluruh rekap berbasis NID (saat ini 121 NID di lampiran)." },
  { id: "TBD-04", pertanyaan: "Apakah setiap kategori tugas rutin wajib sekali selama program, per bulan, atau per kegiatan?", dampak: "Penyebut persentase penyelesaian tugas." },
  { id: "TBD-05", pertanyaan: "Apakah tugas yang ditolak dapat dikumpulkan ulang? Bagaimana riwayat submission disimpan?", dampak: "Workflow validasi dan perhitungan tugas." },
  { id: "TBD-06", pertanyaan: "Jika ada 2 respons presensi untuk NID, periode, dan komponen yang sama, mana yang dipakai?", dampak: "Akurasi kehadiran." },
  { id: "TBD-07", pertanyaan: "Apakah prestasi perlu divalidasi admin?", dampak: "Status dan workflow modul prestasi." },
  { id: "TBD-08", pertanyaan: "Rekap prestasi per bulan mengikuti bulan prestasi diperoleh atau bulan pelaporan?", dampak: "Pengelompokan data bulanan." },
  { id: "TBD-09", pertanyaan: "Apakah admin membutuhkan ekspor rekap ke Excel/CSV/PDF?", dampak: "Kebutuhan laporan dan unduhan." },
  { id: "TBD-10", pertanyaan: "Apakah perubahan validasi ditulis ke workbook utama atau workbook administrasi terpisah?", dampak: "Penempatan data administratif di Google Sheets." },
  { id: "TBD-11", pertanyaan: "Bagaimana data historis Mentorship per kelompok lama dikonsolidasikan ke satu sumber terpadu?", dampak: "Kelengkapan tren Mentorship lintas pertemuan." },
  { id: "TBD-12", pertanyaan: "Apakah beswan dapat berpindah wilayah/mentor selama program, dan bagaimana riwayat perpindahannya dicatat?", dampak: "Akurasi rekap wilayah berdasarkan waktu." },
]

export default function PengaturanPage() {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto bg-[#F6F8FB]">
      <DashboardHeader
        title="Pengaturan & Pelacak TBD"
        subtitle="Konfigurasi integrasi Google Sheets dan status keputusan produk"
      />

      <div className="flex-1 space-y-6 p-6">
        {/* Banner Info */}
        <div className="rounded-xl border border-[#1769AA]/20 bg-[#EFF4FA] px-4 py-3 text-xs text-[#12345B]">
          <strong>Prinsip Konfigurasi (Spec 4.4 & 13.2):</strong> Seluruh ID Google Spreadsheet dan nama worksheet/tab disimpan secara dinamis melalui konfigurasi terpusat. Keputusan bisnis yang belum disepakati tidak diasumsikan sepihak oleh sistem.
        </div>

        {/* Konfigurasi Spreadsheet */}
        <div className="rounded-2xl border border-[#E5EAF1] bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#E5EAF1] pb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#12345B]/10 text-[#12345B]">
                <Database className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#12345B]">Sumber Google Spreadsheet Aktif</h3>
                <p className="text-xs text-[#64748B]">3 sumber spreadsheet yang dibaca oleh modul dashboard</p>
              </div>
            </div>
          </div>

          <div className="mt-4 divide-y divide-[#E5EAF1]/70">
            {[
              { id: "SRC-01", label: "Spreadsheet Utama BBM 6", spreadsheetId: "1AJ_ajJAOwpXY7AukaR6IA07RsgYa65OGylP-TnGMFr4", tabs: "MASTER_BESWAN, RESPON_PEMBINAAN_NASIONAL, RESPON_MENTORSHIP, RESPON_PENUGASAN", status: "Terhubung" },
              { id: "SRC-02", label: "Spreadsheet Mentorship Per Kelompok", spreadsheetId: "1BmAfFI1IkRm3DUj3gZ1EhzFMzQKb9E-GpFF187jF31Y", tabs: "Sheet1 (Data historis pertemuan)", status: "Terhubung" },
              { id: "SRC-03", label: "Spreadsheet Prestasi Beswan", spreadsheetId: "1y5e9t1eDeYsPIHDcm1kSAEUN6ZhEsd_P_XK-U9gWELk", tabs: "RESPON_PRESTASI", status: "Perlu Akses" },
            ].map((src) => (
              <div key={src.id} className="py-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#12345B]">{src.id}</span>
                      <span className="text-sm font-bold text-[#172033]">{src.label}</span>
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        src.status === "Terhubung" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                      }`}>{src.status}</span>
                    </div>
                    <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs">
                      <div>
                        <label className="text-[11px] font-medium text-[#64748B]">Spreadsheet ID</label>
                        <input
                          readOnly
                          value={src.spreadsheetId}
                          className="mt-0.5 w-full rounded-md border border-[#E5EAF1] bg-[#F6F8FB] px-2.5 py-1 font-mono text-[11px] text-[#12345B]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-medium text-[#64748B]">Tab Lembar Kerja</label>
                        <p className="mt-1 font-mono text-[11px] text-[#64748B]">{src.tabs}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Administrasi Dashboard */}
        <div className="rounded-2xl border border-[#E5EAF1] bg-white p-6 shadow-xs">
          <div className="flex items-center gap-2.5 border-b border-[#E5EAF1] pb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#27A9A5]/10 text-[#0f6c6a]">
              <FileSpreadsheet className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#12345B]">Tab Administrasi Google Sheets</h3>
              <p className="text-xs text-[#64748B]">Tempat penyimpanan persisten konfigurasi admin dan keputusan validasi tugas</p>
            </div>
          </div>

          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#E5EAF1] bg-[#F6F8FB]/70 text-[#64748B]">
                  <th className="py-2.5 px-3 text-left font-semibold">Nama Tab Rekomendasi</th>
                  <th className="py-2.5 px-3 text-left font-semibold">Fungsi Persistensi</th>
                  <th className="py-2.5 px-3 text-center font-semibold">Status Tab</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5EAF1]/50">
                {[
                  { tab: "CONFIG_PERIODE_MENTORSHIP", fungsi: "Menyimpan nama, nomor, bulan, dan opsi form untuk pertemuan Mentorship", status: "Tersedia" },
                  { tab: "VALIDASI_PENUGASAN", fungsi: "Menyimpan keputusan validasi (Diterima/Ditolak), catatan admin, dan timestamp", status: "Tersedia" },
                  { tab: "KONFIGURASI_SUMBER", fungsi: "Mapping kolom Google Form jika ada perubahan header di kemudian hari", status: "Tersedia" },
                  { tab: "RIWAYAT_SINKRONISASI", fungsi: "Log status pembacaan spreadsheet, total baris, dan pesan error", status: "Tersedia" },
                ].map((t) => (
                  <tr key={t.tab} className="hover:bg-[#F6F8FB]">
                    <td className="py-2.5 px-3 font-mono font-bold text-[#12345B]">{t.tab}</td>
                    <td className="py-2.5 px-3 text-[#172033]">{t.fungsi}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                        <CheckCircle2 className="h-3 w-3" /> {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pelacak 12 Item TBD (To Be Discussed) */}
        <div className="rounded-2xl border border-[#F28C28]/30 bg-white p-6 shadow-xs">
          <div className="flex items-center gap-2.5 border-b border-[#E5EAF1] pb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F28C28]/15 text-[#F28C28]">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#12345B]">Pelacak Keputusan Produk (12 Item TBD)</h3>
              <p className="text-xs text-[#64748B]">Item yang harus dikonfirmasi dengan stakeholder MAI Institute sebelum finalisasi produksi</p>
            </div>
          </div>

          <div className="mt-4 divide-y divide-[#E5EAF1]/70">
            {tbdItems.map((tbd) => (
              <div key={tbd.id} className="flex items-start gap-3 py-3.5">
                <span className="shrink-0 font-mono text-xs font-bold text-[#F28C28] bg-[#F28C28]/10 px-2 py-0.5 rounded">
                  {tbd.id}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#172033]">{tbd.pertanyaan}</p>
                  <p className="mt-0.5 text-[11px] text-[#64748B]">Dampak: {tbd.dampak}</p>
                </div>
                <span className="shrink-0 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[10px] font-semibold text-amber-800">
                  Menunggu Keputusan
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

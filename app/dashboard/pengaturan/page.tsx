import { DashboardHeader } from "@/components/dashboard-shell"

const tbdItems = [
  { id: "TBD-01", pertanyaan: "Bagaimana admin login: email/password, Google Login, atau metode lain?", dampak: "Desain autentikasi dan pengelolaan akun admin." },
  { id: "TBD-02", pertanyaan: "Sinkronisasi dilakukan manual, berkala, otomatis, atau kombinasi?", dampak: "Desain proses integrasi dan kesegaran data." },
  { id: "TBD-03", pertanyaan: "Di tab mana master peserta resmi berada, dan apakah berisi 120 atau 121 peserta lengkap?", dampak: "Akurasi seluruh rekap berbasis NID (saat ini 121 NID di lampiran)." },
  { id: "TBD-04", pertanyaan: "Apakah setiap kategori tugas rutin wajib sekali selama program, per bulan, atau per kegiatan?", dampak: "Penyebut persentase penyelesaian tugas." },
  { id: "TBD-05", pertanyaan: "Apakah tugas yang ditolak dapat dikumpulkan ulang? Bagaimana riwayat submission disimpan?", dampak: "Workflow validasi dan perhitungan tugas." },
  { id: "TBD-06", pertanyaan: "Jika ada 2 respons presensi untuk NID, periode, dan komponen yang sama, mana yang dipakai?", dampak: "Akurasi kehadiran." },
  { id: "TBD-07", pertanyaan: "Apakah prestasi perlu divalidasi admin?", dampak: "Status dan workflow modul prestasi." },
  { id: "TBD-08", pertanyaan: "Rekap prestasi per bulan mengikuti bulan prestasi diperoleh atau bulan pelaporan?", dampak: "Pengelompokan data bulanan." },
  { id: "TBD-09", pertanyaan: "Apakah admin membutuhkan ekspor rekap ke Excel/CSV/PDF?", dampak: "Kebutuhan laporan dan unduhan (telah disediakan CSV export)." },
  { id: "TBD-10", pertanyaan: "Apakah perubahan validasi ditulis ke workbook utama atau workbook administrasi terpisah?", dampak: "Penempatan data administratif di Google Sheets." },
  { id: "TBD-11", pertanyaan: "Bagaimana data historis Mentorship per kelompok lama dikonsolidasikan ke satu sumber terpadu?", dampak: "Kelengkapan tren Mentorship lintas pertemuan." },
  { id: "TBD-12", pertanyaan: "Apakah beswan dapat berpindah wilayah/mentor selama program, dan bagaimana riwayat perpindahannya dicatat?", dampak: "Akurasi rekap wilayah berdasarkan waktu." },
]

export default function PengaturanPage() {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto bg-[#F8F9FA]">
      <DashboardHeader
        title="Pengaturan & Pelacak TBD"
        subtitle="Konfigurasi integrasi Google Sheets dan status keputusan produk"
      />

      <div className="flex-1 space-y-8 p-8 max-w-7xl">
        {/* Konfigurasi Spreadsheet */}
        <div className="rounded-xl border border-[#E8EAED] bg-white overflow-hidden">
          <div className="border-b border-[#E8EAED] p-5">
            <h2 className="text-sm font-semibold text-[#202124]">Sumber Google Spreadsheet</h2>
            <p className="text-xs text-[#5F6368] mt-0.5">
              ID Workbook Google Sheets yang dibaca secara langsung oleh sistem dashboard
            </p>
          </div>

          <div className="divide-y divide-[#E8EAED] p-5 space-y-4">
            {[
              {
                id: "SRC-01",
                label: "Spreadsheet Utama BBM 6",
                spreadsheetId: "1AJ_ajJAOwpXY7AukaR6IA07RsgYa65OGylP-TnGMFr4",
                tabs: "MASTER_BESWAN, RESPON_PEMBINAAN_NASIONAL, RESPON_MENTORSHIP, RESPON_PENUGASAN",
                status: "Terhubung",
              },
              {
                id: "SRC-02",
                label: "Spreadsheet Mentorship Historis Per Kelompok",
                spreadsheetId: "1BmAfFI1IkRm3DUj3gZ1EhzFMzQKb9E-GpFF187jF31Y",
                tabs: "Sheet1 (Data historis kelompok)",
                status: "Terhubung",
              },
              {
                id: "SRC-03",
                label: "Spreadsheet Pendataan Prestasi Beswan",
                spreadsheetId: "1y5e9t1eDeYsPIHDcm1kSAEUN6ZhEsd_P_XK-U9gWELk",
                tabs: "RESPON_PRESTASI",
                status: "Perlu Akses",
              },
            ].map((src) => (
              <div key={src.id} className="pt-4 first:pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-[#1A73E8]">{src.id}</span>
                    <h3 className="text-sm font-medium text-[#202124]">{src.label}</h3>
                  </div>
                  <span
                    className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ${
                      src.status === "Terhubung"
                        ? "bg-[#E6F4EA] text-[#137333]"
                        : "bg-[#FCE8E6] text-[#C5221F]"
                    }`}
                  >
                    {src.status}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
                  <div>
                    <label className="text-[11px] font-medium text-[#5F6368]">Spreadsheet ID</label>
                    <input
                      readOnly
                      value={src.spreadsheetId}
                      className="mt-1 w-full rounded-md border border-[#DADCE0] bg-[#F8F9FA] px-3 py-1.5 font-mono text-xs text-[#202124] select-all"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-[#5F6368]">Tab Lembar Kerja</label>
                    <p className="mt-2 font-mono text-xs text-[#3C4043]">{src.tabs}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Administrasi & Persistensi */}
        <div className="rounded-xl border border-[#E8EAED] bg-white p-5">
          <h2 className="text-sm font-semibold text-[#202124]">Lembar Kerja Administrasi Persisten</h2>
          <p className="text-xs text-[#5F6368] mt-0.5">
            Keputusan validasi tugas dan konfigurasi periode disimpan kembali ke tab berikut di Google Sheets
          </p>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 text-xs">
            <div className="rounded-lg border border-[#E8EAED] p-3.5">
              <p className="font-mono font-medium text-[#1A73E8]">VALIDASI_PENUGASAN</p>
              <p className="text-[#5F6368] mt-1">Menyimpan status keputusan validasi admin beserta catatan dan timestamp.</p>
            </div>
            <div className="rounded-lg border border-[#E8EAED] p-3.5">
              <p className="font-mono font-medium text-[#1A73E8]">KONFIGURASI_PERIODE</p>
              <p className="text-[#5F6368] mt-1">Daftar periode mentorship aktif, tanggal pelaksanaan, dan nilai pencocokan Google Form.</p>
            </div>
            <div className="rounded-lg border border-[#E8EAED] p-3.5">
              <p className="font-mono font-medium text-[#1A73E8]">LOG_SINKRONISASI</p>
              <p className="text-[#5F6368] mt-1">Riwayat penarikan data berkala, jumlah baris terbaca, dan catatan anomali.</p>
            </div>
          </div>
        </div>

        {/* Pelacak 12 Item TBD */}
        <div className="rounded-xl border border-[#E8EAED] bg-white overflow-hidden">
          <div className="border-b border-[#E8EAED] p-5">
            <h2 className="text-sm font-semibold text-[#202124]">Pelacak Keputusan Produk (12 Item TBD)</h2>
            <p className="text-xs text-[#5F6368] mt-0.5">
              Daftar butir pertanyaan spesifikasi yang menunggu konfirmasi pemangku kepentingan MAI Institute
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#E8EAED] bg-[#F8F9FA] text-[#5F6368]">
                  <th className="py-3 px-5 text-left font-medium w-24">ID</th>
                  <th className="py-3 px-5 text-left font-medium">Butir Pertanyaan Spesifikasi</th>
                  <th className="py-3 px-5 text-left font-medium">Dampak Sistem & Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8EAED]">
                {tbdItems.map((item) => (
                  <tr key={item.id} className="hover:bg-[#F8F9FA] transition-colors">
                    <td className="py-3 px-5 font-mono text-[#1A73E8] font-semibold">{item.id}</td>
                    <td className="py-3 px-5 font-medium text-[#202124]">{item.pertanyaan}</td>
                    <td className="py-3 px-5 text-[#5F6368]">{item.dampak}</td>
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

import { DashboardHeader } from "@/components/dashboard-shell"
import { Settings, AlertTriangle } from "lucide-react"

const tbdItems = [
  { id: "TBD-01", pertanyaan: "Bagaimana admin login: email/password, Google Login, atau metode lain?", dampak: "Desain autentikasi dan pengelolaan akun admin." },
  { id: "TBD-02", pertanyaan: "Sinkronisasi dilakukan manual, berkala, otomatis, atau kombinasi?", dampak: "Desain proses integrasi dan kesegaran data." },
  { id: "TBD-03", pertanyaan: "Di tab mana master peserta resmi berada, dan apakah berisi 120 atau 121 peserta lengkap?", dampak: "Akurasi seluruh rekap berbasis NID." },
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
    <div className="flex flex-col flex-1 overflow-y-auto">
      <DashboardHeader
        title="Pengaturan"
        subtitle="Konfigurasi aplikasi dan daftar keputusan yang masih perlu dikonfirmasi"
      />

      <div className="flex-1 space-y-6 p-6">
        {/* Konfigurasi Spreadsheet */}
        <div className="rounded-xl border border-border bg-card shadow-xs">
          <div className="border-b border-border px-5 py-4">
            <h3 className="text-sm font-semibold text-foreground">Konfigurasi Sumber Spreadsheet</h3>
            <p className="text-xs text-muted-foreground">ID spreadsheet dan nama tab disimpan terpusat — tidak hardcode di kode aplikasi</p>
          </div>
          <div className="divide-y divide-border/50">
            {[
              { id: "SRC-01", label: "Spreadsheet Utama BBM 6", spreadsheetId: "1AJ_ajJAOwpXY7AukaR6IA07RsgYa65OGylP-TnGMFr4", tabs: "MASTER_BESWAN, RESPON_PEMBINAAN_NASIONAL, RESPON_MENTORSHIP, RESPON_PENUGASAN" },
              { id: "SRC-02", label: "Spreadsheet Mentorship Per Kelompok", spreadsheetId: "1BmAfFI1IkRm3DUj3gZ1EhzFMzQKb9E-GpFF187jF31Y", tabs: "Sheet1 (historis — perlu pemetaan kolom)" },
              { id: "SRC-03", label: "Spreadsheet Prestasi Beswan", spreadsheetId: "1y5e9t1eDeYsPIHDcm1kSAEUN6ZhEsd_P_XK-U9gWELk", tabs: "RESPON_PRESTASI" },
            ].map((src) => (
              <div key={src.id} className="px-5 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-muted-foreground">{src.id}</span>
                      <span className="text-sm font-medium text-foreground">{src.label}</span>
                    </div>
                    <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs">
                      <div>
                        <label className="text-muted-foreground">Spreadsheet ID</label>
                        <div className="mt-1 flex items-center gap-2">
                          <input
                            readOnly
                            value={src.spreadsheetId}
                            className="flex-1 rounded-md border border-border bg-muted/40 px-2.5 py-1.5 font-mono text-[10px] text-foreground focus:outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-muted-foreground">Tab yang digunakan</label>
                        <p className="mt-1 text-[10px] font-mono text-muted-foreground">{src.tabs}</p>
                      </div>
                    </div>
                  </div>
                  <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors whitespace-nowrap">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Administrasi */}
        <div className="rounded-xl border border-border bg-card shadow-xs">
          <div className="border-b border-border px-5 py-4">
            <h3 className="text-sm font-semibold text-foreground">Tab Administrasi Dashboard</h3>
            <p className="text-xs text-muted-foreground">Tab yang digunakan dashboard untuk menyimpan konfigurasi dan keputusan admin</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-5 py-3 text-left font-semibold text-muted-foreground">Nama Tab</th>
                  <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Fungsi</th>
                  <th className="px-5 py-3 text-center font-semibold text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { tab: "CONFIG_PERIODE_MENTORSHIP", fungsi: "Nomor, bulan, tahun, label pilihan form, dan status pertemuan", status: "Aktif" },
                  { tab: "VALIDASI_PENUGASAN", fungsi: "Identitas submission, status validasi, catatan admin, timestamp", status: "Aktif" },
                  { tab: "KONFIGURASI_SUMBER", fungsi: "Spreadsheet ID, nama tab, mapping kolom, dan jenis data", status: "Aktif" },
                  { tab: "RIWAYAT_SINKRONISASI", fungsi: "Waktu, hasil, jumlah baris, dan error sinkronisasi", status: "Aktif" },
                  { tab: "RIWAYAT_AUDIT", fungsi: "Riwayat perubahan penting oleh admin", status: "Aktif" },
                ].map((t) => (
                  <tr key={t.tab} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3 font-mono font-medium text-foreground">{t.tab}</td>
                    <td className="px-3 py-3 text-muted-foreground">{t.fungsi}</td>
                    <td className="px-5 py-3 text-center">
                      <span className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">{t.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Daftar TBD */}
        <div className="rounded-xl border border-amber-200 bg-card shadow-xs">
          <div className="border-b border-amber-200 bg-amber-50/50 dark:bg-amber-950/20 px-5 py-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <h3 className="text-sm font-semibold text-foreground">Keputusan yang Masih Perlu Dikonfirmasi (TBD)</h3>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Item ini harus dikonfirmasi sebelum menjadi perilaku final aplikasi. Developer tidak mengambil keputusan bisnis secara sepihak.</p>
          </div>
          <div className="divide-y divide-border/50">
            {tbdItems.map((tbd) => (
              <div key={tbd.id} className="flex items-start gap-4 px-5 py-4">
                <span className="shrink-0 font-mono text-xs font-semibold text-amber-600 mt-0.5">{tbd.id}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground">{tbd.pertanyaan}</p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">Dampak: {tbd.dampak}</p>
                </div>
                <span className="shrink-0 inline-flex rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700 dark:bg-amber-950/40">Belum dikonfirmasi</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


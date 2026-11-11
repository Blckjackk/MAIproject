// lib/mock-data.ts
// Mock data untuk MAI Institute Dashboard
// CATATAN: Data ini hanya untuk tampilan UI. Data real dibaca dari Google Sheets.

export type StatusPembinaan = "Hadir Full" | "Hadir Sebagian" | "Tidak Hadir"
export type StatusValidasi = "Diterima" | "Tidak Diterima" | "Menunggu Validasi" | "Belum Mengumpulkan"
export type StatusKoneksi = "Terhubung" | "Gagal" | "Memuat"
export type StatusPeriodeMentorship = "Direncanakan" | "Berlangsung" | "Selesai" | "Ditutup"

export interface Beswan {
  nid: string
  nomorBeswan: string
  nama: string
  universitas: string
  wilayah: string
  mentor: string
  status: "Aktif" | "Perlu Pemeriksaan"
}

export interface WilayahMentor {
  id: string
  wilayah: string
  mentor: string
  jumlahBeswan: number
}

export interface DataPembinaanNasional {
  nid: string
  nama: string
  wilayah: string
  mentor: string
  opening: boolean
  presensiAwal: boolean | null
  preTest: boolean | null
  postTest: boolean | null
  presensiOpeningEvaluasi: boolean | null
  presensiAkhir: boolean | null
}

export interface DataMentorship {
  nid: string
  nama: string
  wilayah: string
  mentor: string
  periode: string
  pm: boolean | null
  preTest: boolean | null
  postTest: boolean | null
}

export interface PeriodeMentorship {
  id: string
  nomor: number
  nama: string
  bulanTahun: string
  status: StatusPeriodeMentorship
  nilaiForms: string
  catatan?: string
}

export interface Penugasan {
  id: string
  nid: string
  nama: string
  wilayah: string
  mentor: string
  kategori: "MAI Foundation" | "Mentorship" | "MAI Wilayah" | "Pembinaan Nasional" | "Tugas Tambahan"
  statusValidasi: StatusValidasi
  linkBukti?: string
  catatanAdmin?: string
  submittedAt?: string
  validasiAt?: string
}

export interface Prestasi {
  id: string
  nid: string
  nama: string
  wilayah: string
  mentor: string
  judul: string
  kategori: string
  tingkat: string
  penyelenggara: string
  tanggalPrestasi: string
  tanggalPelaporan: string
  bulanPelaporan: string
  linkBukti?: string
  statusVerifikasi?: string
}

export interface SumberData {
  id: string
  nama: string
  kegunaan: string
  statusKoneksi: StatusKoneksi
  waktuBacaTerakhir: string
  jumlahBaris: number
  jumlahDipetakan: number
  jumlahNidTidakDikenal: number
  jumlahDuplikat: number
  pesanError?: string
}

// ===================== MASTER WILAYAH =====================
export const masterWilayah: WilayahMentor[] = [
  { id: "W1", wilayah: "Wilayah 1 – Jakarta Utara", mentor: "Ahmad Fauzi", jumlahBeswan: 15 },
  { id: "W2", wilayah: "Wilayah 2 – Jakarta Selatan", mentor: "Budi Santoso", jumlahBeswan: 14 },
  { id: "W3", wilayah: "Wilayah 3 – Jakarta Barat", mentor: "Citra Dewi", jumlahBeswan: 13 },
  { id: "W4", wilayah: "Wilayah 4 – Jakarta Timur", mentor: "Dian Pramesti", jumlahBeswan: 15 },
  { id: "W5", wilayah: "Wilayah 5 – Jakarta Pusat", mentor: "Eka Nugraha", jumlahBeswan: 14 },
  { id: "W6", wilayah: "Wilayah 6 – Bekasi", mentor: "Fajar Ramadhan", jumlahBeswan: 15 },
  { id: "W7", wilayah: "Wilayah 7 – Bogor", mentor: "Gita Lestari", jumlahBeswan: 14 },
  { id: "W8", wilayah: "Wilayah 8 – Tangerang", mentor: "Hendra Wijaya", jumlahBeswan: 15 },
]

// ===================== MASTER BESWAN (sample 20 dari 121 NID) =====================
export const masterBeswan: Beswan[] = [
  { nid: "601001", nomorBeswan: "001", nama: "Andi Pratama", universitas: "UI", wilayah: "Wilayah 1 – Jakarta Utara", mentor: "Ahmad Fauzi", status: "Aktif" },
  { nid: "602002", nomorBeswan: "002", nama: "Bella Sari", universitas: "ITB", wilayah: "Wilayah 1 – Jakarta Utara", mentor: "Ahmad Fauzi", status: "Aktif" },
  { nid: "601003", nomorBeswan: "003", nama: "Candra Putra", universitas: "UGM", wilayah: "Wilayah 1 – Jakarta Utara", mentor: "Ahmad Fauzi", status: "Aktif" },
  { nid: "601004", nomorBeswan: "004", nama: "Dewi Rahayu", universitas: "IPB", wilayah: "Wilayah 2 – Jakarta Selatan", mentor: "Budi Santoso", status: "Aktif" },
  { nid: "602005", nomorBeswan: "005", nama: "Eko Firmansyah", universitas: "Unpad", wilayah: "Wilayah 2 – Jakarta Selatan", mentor: "Budi Santoso", status: "Aktif" },
  { nid: "602006", nomorBeswan: "006", nama: "Fitri Handayani", universitas: "UNJ", wilayah: "Wilayah 2 – Jakarta Selatan", mentor: "Budi Santoso", status: "Aktif" },
  { nid: "601007", nomorBeswan: "007", nama: "Galih Saputra", universitas: "Trisakti", wilayah: "Wilayah 3 – Jakarta Barat", mentor: "Citra Dewi", status: "Aktif" },
  { nid: "601008", nomorBeswan: "008", nama: "Hani Kusuma", universitas: "Binus", wilayah: "Wilayah 3 – Jakarta Barat", mentor: "Citra Dewi", status: "Aktif" },
  { nid: "602009", nomorBeswan: "009", nama: "Irfan Maulana", universitas: "Atma Jaya", wilayah: "Wilayah 4 – Jakarta Timur", mentor: "Dian Pramesti", status: "Aktif" },
  { nid: "602010", nomorBeswan: "010", nama: "Jeni Wulandari", universitas: "Mercu Buana", wilayah: "Wilayah 4 – Jakarta Timur", mentor: "Dian Pramesti", status: "Aktif" },
  { nid: "601011", nomorBeswan: "011", nama: "Kevin Santoso", universitas: "Tarumanagara", wilayah: "Wilayah 5 – Jakarta Pusat", mentor: "Eka Nugraha", status: "Aktif" },
  { nid: "601012", nomorBeswan: "012", nama: "Lina Marlina", universitas: "UIN Jakarta", wilayah: "Wilayah 5 – Jakarta Pusat", mentor: "Eka Nugraha", status: "Aktif" },
  { nid: "602013", nomorBeswan: "013", nama: "Mario Hidayat", universitas: "Universitas Pancasila", wilayah: "Wilayah 6 – Bekasi", mentor: "Fajar Ramadhan", status: "Aktif" },
  { nid: "602014", nomorBeswan: "014", nama: "Nina Susanti", universitas: "STIE Trisakti", wilayah: "Wilayah 6 – Bekasi", mentor: "Fajar Ramadhan", status: "Perlu Pemeriksaan" },
  { nid: "601015", nomorBeswan: "015", nama: "Omar Fauzan", universitas: "Gunadarma", wilayah: "Wilayah 7 – Bogor", mentor: "Gita Lestari", status: "Aktif" },
  { nid: "602016", nomorBeswan: "016", nama: "Putri Anggraeni", universitas: "IPB", wilayah: "Wilayah 7 – Bogor", mentor: "Gita Lestari", status: "Aktif" },
  { nid: "602017", nomorBeswan: "017", nama: "Raka Dwi", universitas: "Pakuan", wilayah: "Wilayah 8 – Tangerang", mentor: "Hendra Wijaya", status: "Aktif" },
  { nid: "602018", nomorBeswan: "018", nama: "Sinta Rahma", universitas: "Banten", wilayah: "Wilayah 8 – Tangerang", mentor: "Hendra Wijaya", status: "Aktif" },
  { nid: "602019", nomorBeswan: "019", nama: "Taufik Hidayat", universitas: "Tangerang Raya", wilayah: "Wilayah 8 – Tangerang", mentor: "Hendra Wijaya", status: "Aktif" },
  { nid: "602020", nomorBeswan: "020", nama: "Utami Dewi", universitas: "UNPAM", wilayah: "Wilayah 8 – Tangerang", mentor: "Hendra Wijaya", status: "Aktif" },
]

// ===================== PERIODE MENTORSHIP =====================
export const periodeMentorship: PeriodeMentorship[] = [
  { id: "P1", nomor: 1, nama: "Mentoring #1 – Januari", bulanTahun: "Januari 2026", status: "Selesai", nilaiForms: "Mentoring #1 – Januari" },
  { id: "P2", nomor: 2, nama: "Mentoring #2 – Februari", bulanTahun: "Februari 2026", status: "Selesai", nilaiForms: "Mentoring #2 – Februari" },
  { id: "P3", nomor: 3, nama: "Mentoring #3 – Maret", bulanTahun: "Maret 2026", status: "Selesai", nilaiForms: "Mentoring #3 – Maret" },
  { id: "P4", nomor: 4, nama: "Mentoring #4 – April", bulanTahun: "April 2026", status: "Selesai", nilaiForms: "Mentoring #4 – April" },
  { id: "P5", nomor: 5, nama: "Mentoring #5 – Mei", bulanTahun: "Mei 2026", status: "Berlangsung", nilaiForms: "Mentoring #5 – Mei" },
  { id: "P6", nomor: 6, nama: "Mentoring #6 – Juni", bulanTahun: "Juni 2026", status: "Direncanakan", nilaiForms: "Mentoring #6 – Juni" },
]

// ===================== SUMBER DATA =====================
export const sumberDataList: SumberData[] = [
  {
    id: "SRC-01",
    nama: "Spreadsheet Utama BBM 6",
    kegunaan: "Pembinaan Nasional, Mentorship awal, Tugas, Prestasi awal",
    statusKoneksi: "Terhubung",
    waktuBacaTerakhir: "11 Nov 2026, 12:45 WIB",
    jumlahBaris: 487,
    jumlahDipetakan: 462,
    jumlahNidTidakDikenal: 8,
    jumlahDuplikat: 3,
  },
  {
    id: "SRC-02",
    nama: "Spreadsheet Mentorship Per Kelompok",
    kegunaan: "Rekap Mentorship periode 4 ke atas (historis per kelompok)",
    statusKoneksi: "Terhubung",
    waktuBacaTerakhir: "11 Nov 2026, 12:45 WIB",
    jumlahBaris: 320,
    jumlahDipetakan: 315,
    jumlahNidTidakDikenal: 2,
    jumlahDuplikat: 1,
  },
  {
    id: "SRC-03",
    nama: "Spreadsheet Prestasi Beswan",
    kegunaan: "Pendataan prestasi beswan (periode lebih baru)",
    statusKoneksi: "Gagal",
    waktuBacaTerakhir: "10 Nov 2026, 09:12 WIB",
    jumlahBaris: 0,
    jumlahDipetakan: 0,
    jumlahNidTidakDikenal: 0,
    jumlahDuplikat: 0,
    pesanError: "Akses ditolak: service account tidak memiliki izin baca. Periksa sharing permission spreadsheet.",
  },
]

// ===================== KPI DASHBOARD =====================
export const kpiDashboard = {
  totalBeswan: 121, // 121 NID di spec (perlu konfirmasi apakah 120 atau 121)
  targetBeswan: 120,
  rataRataKehadiranPembinaan: 73.4,
  rataRataKehadiranMentorship: 68.2,
  persentaseTugasDiterima: 54.1,
  jumlahMenungguValidasi: 34,
  jumlahBelumMengumpulkan: 28,
  jumlahPrestasi: 47,
  jumlahNidBermasalah: 10,
  statusSinkronisasi: "2 dari 3 sumber terhubung",
  waktuSinkronisasiTerakhir: "11 Nov 2026, 12:45 WIB",
}

// ===================== REKAP PEMBINAAN PER WILAYAH =====================
export const rekapPembinaanWilayah = masterWilayah.map((w, i) => ({
  ...w,
  jumlahHadir: [11, 10, 10, 12, 11, 10, 12, 11][i],
  totalKesempatan: w.jumlahBeswan * 5,
  totalHadirValid: [44, 38, 37, 52, 44, 38, 48, 44][i] * (i < 4 ? 1 : 1),
  persentase: [78, 72, 71, 80, 77, 72, 80, 76][i],
}))

// ===================== PENUGASAN SAMPLE =====================
export const dataPenugasan: Penugasan[] = masterBeswan.slice(0, 20).flatMap((b) =>
  (["MAI Foundation", "Mentorship", "MAI Wilayah", "Pembinaan Nasional"] as const).map((kat, ki) => ({
    id: `${b.nid}-${ki}`,
    nid: b.nid,
    nama: b.nama,
    wilayah: b.wilayah,
    mentor: b.mentor,
    kategori: kat,
    statusValidasi: (["Diterima", "Menunggu Validasi", "Belum Mengumpulkan", "Diterima", "Tidak Diterima", "Diterima", "Menunggu Validasi", "Belum Mengumpulkan"][
      (parseInt(b.nid.slice(-2)) + ki) % 8
    ] || "Menunggu Validasi") as StatusValidasi,
    linkBukti: ki % 3 !== 2 ? "https://drive.google.com/file/contoh" : undefined,
    submittedAt: ki % 3 !== 2 ? "5 Nov 2026" : undefined,
  }))
)

// ===================== PRESTASI SAMPLE =====================
export const dataPrestasi: Prestasi[] = [
  { id: "PR001", nid: "601001", nama: "Andi Pratama", wilayah: "Wilayah 1 – Jakarta Utara", mentor: "Ahmad Fauzi", judul: "Juara 1 Kompetisi Desain Nasional", kategori: "Desain", tingkat: "Nasional", penyelenggara: "Kemendikbud", tanggalPrestasi: "2026-09-10", tanggalPelaporan: "2026-09-15", bulanPelaporan: "September 2026", linkBukti: "https://drive.google.com/file/sertifikat1" },
  { id: "PR002", nid: "602002", nama: "Bella Sari", wilayah: "Wilayah 1 – Jakarta Utara", mentor: "Ahmad Fauzi", judul: "Finalis Hackathon AI Indonesia", kategori: "Teknologi", tingkat: "Nasional", penyelenggara: "KOMINFO", tanggalPrestasi: "2026-10-05", tanggalPelaporan: "2026-10-10", bulanPelaporan: "Oktober 2026", linkBukti: "https://drive.google.com/file/sertifikat2" },
  { id: "PR003", nid: "601003", nama: "Candra Putra", wilayah: "Wilayah 1 – Jakarta Utara", mentor: "Ahmad Fauzi", judul: "Paper Terpilih Konferensi Internasional", kategori: "Akademik", tingkat: "Internasional", penyelenggara: "IEEE", tanggalPrestasi: "2026-09-20", tanggalPelaporan: "2026-09-25", bulanPelaporan: "September 2026", linkBukti: "https://drive.google.com/file/sertifikat3" },
  { id: "PR004", nid: "601004", nama: "Dewi Rahayu", wilayah: "Wilayah 2 – Jakarta Selatan", mentor: "Budi Santoso", judul: "Juara 3 Lomba Menulis Ilmiah", kategori: "Akademik", tingkat: "Regional", penyelenggara: "Dikti", tanggalPrestasi: "2026-10-15", tanggalPelaporan: "2026-10-20", bulanPelaporan: "Oktober 2026" },
  { id: "PR005", nid: "602005", nama: "Eko Firmansyah", wilayah: "Wilayah 2 – Jakarta Selatan", mentor: "Budi Santoso", judul: "Best Presenter Youth Forum", kategori: "Kepemimpinan", tingkat: "Nasional", penyelenggara: "KNPI", tanggalPrestasi: "2026-11-01", tanggalPelaporan: "2026-11-05", bulanPelaporan: "November 2026", linkBukti: "https://drive.google.com/file/sertifikat5" },
]


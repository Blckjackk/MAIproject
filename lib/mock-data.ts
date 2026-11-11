// lib/mock-data.ts
// Mock data untuk MAI Institute Dashboard
// CATATAN: Data ini untuk tampilan UI prototipe & monitoring. Data real dibaca dari Google Sheets.

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
  { id: "W2", wilayah: "Wilayah 2 – Jakarta Selatan", mentor: "Budi Santoso", jumlahBeswan: 15 },
  { id: "W3", wilayah: "Wilayah 3 – Jakarta Barat", mentor: "Citra Dewi", jumlahBeswan: 15 },
  { id: "W4", wilayah: "Wilayah 4 – Jakarta Timur", mentor: "Dian Pramesti", jumlahBeswan: 15 },
  { id: "W5", wilayah: "Wilayah 5 – Jakarta Pusat", mentor: "Eka Nugraha", jumlahBeswan: 15 },
  { id: "W6", wilayah: "Wilayah 6 – Bekasi", mentor: "Fajar Ramadhan", jumlahBeswan: 15 },
  { id: "W7", wilayah: "Wilayah 7 – Bogor", mentor: "Gita Lestari", jumlahBeswan: 15 },
  { id: "W8", wilayah: "Wilayah 8 – Tangerang", mentor: "Hendra Wijaya", jumlahBeswan: 16 },
]

// ===================== 121 NID RESMI DARI SPESIFIKASI =====================
export const ALL_121_NIDS: string[] = [
  "601001", "602002", "601003", "601004", "602005", "602006", "601007", "601008", "602009", "602010",
  "601011", "601012", "602013", "602014", "601015", "602016", "602017", "602018", "602019", "602020",
  "601021", "601022", "602023", "602024", "602025", "602026", "602027", "602028", "602029", "602030",
  "602031", "602032", "602033", "602034", "601035", "601036", "601037", "601038", "601039", "602040",
  "602041", "602042", "601043", "601044", "601045", "602046", "602047", "602048", "602049", "602050",
  "601051", "601052", "601053", "601054", "602055", "602056", "602057", "601058", "602059", "602060",
  "602061", "601062", "601063", "601064", "602065", "601066", "601067", "601068", "601069", "601070",
  "601071", "601072", "601073", "601074", "601075", "601076", "601077", "602078", "602079", "602080",
  "602081", "602082", "601083", "602084", "602085", "602086", "602087", "602088", "602089", "601090",
  "602091", "602092", "601093", "601094", "601095", "601096", "601097", "602098", "602099", "601100",
  "602101", "602102", "602103", "602104", "602105", "601106", "602107", "602108", "602109", "601110",
  "602111", "602112", "602113", "601114", "602115", "602116", "602117", "602118", "602119", "602120",
  "601121"
]

const NAMA_DEPAN = ["Andi", "Bella", "Candra", "Dewi", "Eko", "Fitri", "Galih", "Hani", "Irfan", "Jeni", "Kevin", "Lina", "Mario", "Nina", "Omar", "Putri", "Raka", "Sinta", "Taufik", "Utami", "Wahyu", "Yulia", "Zainal", "Aditya", "Bagas", "Dina", "Farhan", "Hana", "Ilham", "Kurnia", "Maulana", "Naufal", "Pradana", "Rizky", "Syahrul", "Tirta"]
const NAMA_BELAKANG = ["Pratama", "Sari", "Putra", "Rahayu", "Firmansyah", "Handayani", "Saputra", "Kusuma", "Maulana", "Wulandari", "Santoso", "Marlina", "Hidayat", "Susanti", "Fauzan", "Anggraeni", "Dwi", "Rahma", "Dewi", "Wijaya", "Kurniawan", "Nugroho", "Setiawan", "Utomo"]
const UNIVERSITAS = ["Universitas Indonesia (UI)", "Institut Teknologi Bandung (ITB)", "Universitas Gadjah Mada (UGM)", "IPB University", "Universitas Padjadjaran (Unpad)", "Institut Teknologi Sepuluh Nopember (ITS)", "Universitas Airlangga (UNAIR)", "Universitas Diponegoro (Undip)", "Universitas Brawijaya (UB)", "UIN Syarif Hidayatullah", "Universitas Negeri Jakarta (UNJ)", "Binus University", "Universitas Trisakti"]

export const masterBeswan: Beswan[] = ALL_121_NIDS.map((nid, index) => {
  const wilayahIndex = Math.min(Math.floor(index / 15), 7)
  const wil = masterWilayah[wilayahIndex]
  const depan = NAMA_DEPAN[index % NAMA_DEPAN.length]
  const belakang = NAMA_BELAKANG[(index * 3) % NAMA_BELAKANG.length]
  const univ = UNIVERSITAS[(index * 2) % UNIVERSITAS.length]
  const isFlagged = index === 13 || index === 87

  return {
    nid,
    nomorBeswan: String(index + 1).padStart(3, "0"),
    nama: `${depan} ${belakang}`,
    universitas: univ,
    wilayah: wil.wilayah,
    mentor: wil.mentor,
    status: isFlagged ? "Perlu Pemeriksaan" : "Aktif",
  }
})

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
  totalBeswan: 121,
  targetBeswan: 120,
  rataRataKehadiranPembinaan: 75.2,
  rataRataKehadiranMentorship: 72.8,
  persentaseTugasDiterima: 58.4,
  jumlahMenungguValidasi: 24,
  jumlahBelumMengumpulkan: 18,
  jumlahPrestasi: 32,
  jumlahNidBermasalah: 10,
  statusSinkronisasi: "2 dari 3 sumber terhubung",
  waktuSinkronisasiTerakhir: "11 Nov 2026, 12:45 WIB",
}

// ===================== REKAP PEMBINAAN PER WILAYAH =====================
export const rekapPembinaanWilayah = masterWilayah.map((w, i) => {
  const hadir = [12, 11, 11, 13, 12, 11, 13, 12][i]
  const pct = [80, 74, 73, 86, 80, 74, 86, 75][i]
  return {
    ...w,
    jumlahHadir: hadir,
    totalKesempatan: w.jumlahBeswan * 5,
    totalHadirValid: Math.round((pct / 100) * (w.jumlahBeswan * 5)),
    persentase: pct,
  }
})

// ===================== PENUGASAN (Generated for 121 Beswan) =====================
export const dataPenugasan: Penugasan[] = masterBeswan.flatMap((b, idx) => {
  const kategoriList = ["MAI Foundation", "Mentorship", "MAI Wilayah", "Pembinaan Nasional"] as const
  return kategoriList.map((kat, ki) => {
    const seed = (idx * 4 + ki) % 10
    let status: StatusValidasi
    if (seed < 5) status = "Diterima"
    else if (seed < 7) status = "Menunggu Validasi"
    else if (seed < 8) status = "Tidak Diterima"
    else status = "Belum Mengumpulkan"

    const isSubmitted = status !== "Belum Mengumpulkan"
    return {
      id: `TUGAS-${b.nid}-${ki + 1}`,
      nid: b.nid,
      nama: b.nama,
      wilayah: b.wilayah,
      mentor: b.mentor,
      kategori: kat,
      statusValidasi: status,
      linkBukti: isSubmitted ? `https://drive.google.com/file/d/bukti-${b.nid}-${ki + 1}/view` : undefined,
      catatanAdmin: status === "Tidak Diterima" ? "Konten belum mencantumkan logo BBM 6 dan format caption belum sesuai pedoman." : status === "Diterima" ? "Tugas sesuai standar penugasan." : undefined,
      submittedAt: isSubmitted ? `${(idx % 10) + 1} Nov 2026, 14:${String((ki * 15) % 60).padStart(2, "0")} WIB` : undefined,
      validasiAt: status === "Diterima" || status === "Tidak Diterima" ? `${(idx % 10) + 2} Nov 2026, 09:30 WIB` : undefined,
    }
  })
})

// ===================== PRESTASI SAMPLE =====================
export const dataPrestasi: Prestasi[] = [
  { id: "PR001", nid: "601001", nama: "Andi Pratama", wilayah: "Wilayah 1 – Jakarta Utara", mentor: "Ahmad Fauzi", judul: "Juara 1 Kompetisi Desain Nasional", kategori: "Desain", tingkat: "Nasional", penyelenggara: "Kemendikbud", tanggalPrestasi: "2026-09-10", tanggalPelaporan: "2026-09-15", bulanPelaporan: "September 2026", linkBukti: "https://drive.google.com/file/sertifikat1" },
  { id: "PR002", nid: "602002", nama: "Bella Sari", wilayah: "Wilayah 1 – Jakarta Utara", mentor: "Ahmad Fauzi", judul: "Finalis Hackathon AI Indonesia", kategori: "Teknologi", tingkat: "Nasional", penyelenggara: "KOMINFO", tanggalPrestasi: "2026-10-05", tanggalPelaporan: "2026-10-10", bulanPelaporan: "Oktober 2026", linkBukti: "https://drive.google.com/file/sertifikat2" },
  { id: "PR003", nid: "601003", nama: "Candra Putra", wilayah: "Wilayah 1 – Jakarta Utara", mentor: "Ahmad Fauzi", judul: "Paper Terpilih Konferensi Internasional IEEE", kategori: "Akademik", tingkat: "Internasional", penyelenggara: "IEEE", tanggalPrestasi: "2026-09-20", tanggalPelaporan: "2026-09-25", bulanPelaporan: "September 2026", linkBukti: "https://drive.google.com/file/sertifikat3" },
  { id: "PR004", nid: "601004", nama: "Dewi Rahayu", wilayah: "Wilayah 1 – Jakarta Utara", mentor: "Ahmad Fauzi", judul: "Juara 3 Lomba Menulis Ilmiah Nasional", kategori: "Akademik", tingkat: "Nasional", penyelenggara: "Dikti", tanggalPrestasi: "2026-10-15", tanggalPelaporan: "2026-10-20", bulanPelaporan: "Oktober 2026" },
  { id: "PR005", nid: "602005", nama: "Eko Firmansyah", wilayah: "Wilayah 1 – Jakarta Utara", mentor: "Ahmad Fauzi", judul: "Best Presenter Youth Forum Asia Pasifik", kategori: "Kepemimpinan", tingkat: "Internasional", penyelenggara: "ASEAN Youth Forum", tanggalPrestasi: "2026-11-01", tanggalPelaporan: "2026-11-05", bulanPelaporan: "November 2026", linkBukti: "https://drive.google.com/file/sertifikat5" },
  { id: "PR006", nid: "602016", nama: "Putri Anggraeni", wilayah: "Wilayah 2 – Jakarta Selatan", mentor: "Budi Santoso", judul: "Juara 2 Business Plan Competition", kategori: "Wirausaha", tingkat: "Nasional", penyelenggara: "HIPMI", tanggalPrestasi: "2026-09-28", tanggalPelaporan: "2026-10-02", bulanPelaporan: "Oktober 2026", linkBukti: "https://drive.google.com/file/sertifikat6" },
  { id: "PR007", nid: "601035", nama: "Aditya Pratama", wilayah: "Wilayah 3 – Jakarta Barat", mentor: "Citra Dewi", judul: "Medali Emas Olimpiade Sains Mahasiswa", kategori: "Sains", tingkat: "Nasional", penyelenggara: "Puspresnas", tanggalPrestasi: "2026-10-18", tanggalPelaporan: "2026-10-22", bulanPelaporan: "Oktober 2026", linkBukti: "https://drive.google.com/file/sertifikat7" },
  { id: "PR008", nid: "602050", nama: "Kurnia Rahayu", wilayah: "Wilayah 4 – Jakarta Timur", mentor: "Dian Pramesti", judul: "Juara 1 Debat Bahasa Inggris Nasional", kategori: "Bahasa", tingkat: "Nasional", penyelenggara: "NUDC Kemendikbud", tanggalPrestasi: "2026-11-04", tanggalPelaporan: "2026-11-08", bulanPelaporan: "November 2026", linkBukti: "https://drive.google.com/file/sertifikat8" },
  { id: "PR009", nid: "601072", nama: "Rizky Santoso", wilayah: "Wilayah 5 – Jakarta Pusat", mentor: "Eka Nugraha", judul: "Pemenang Beasiswa Riset Inovasi", kategori: "Riset", tingkat: "Nasional", penyelenggara: "BRIN", tanggalPrestasi: "2026-09-12", tanggalPelaporan: "2026-09-18", bulanPelaporan: "September 2026", linkBukti: "https://drive.google.com/file/sertifikat9" },
  { id: "PR010", nid: "602095", nama: "Syahrul Maulana", wilayah: "Wilayah 7 – Bogor", mentor: "Gita Lestari", judul: "Juara Harapan 1 Startup Challenge", kategori: "Teknologi", tingkat: "Nasional", penyelenggara: "MDI Ventures", tanggalPrestasi: "2026-10-25", tanggalPelaporan: "2026-10-30", bulanPelaporan: "Oktober 2026" },
]

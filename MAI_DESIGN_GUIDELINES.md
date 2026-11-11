# MAI Institute — Design Guidelines
## Visual Direction for Beasiswa Bintang Mandiri Admin Dashboard

**Dokumen:** UI/UX Design Specification  
**Versi:** 1.0 (draft)  
**Tanggal:** 11 November 2026  
**Produk:** MAI Institute — Beasiswa Bintang Mandiri Angkatan 6 Admin Dashboard  
**Referensi brand:** https://mai-institute.com/  
**Referensi pola dashboard:** Google Student Ambassador Dashboard (screenshot yang diberikan oleh stakeholder)

> Dokumen ini menerjemahkan identitas visual MAI Institute menjadi pedoman antarmuka aplikasi internal. Website MAI merupakan website informasi/program publik, sehingga dashboard tidak boleh menyalin layout website publik secara langsung. Ambil identitas brand-nya, lalu terapkan pada antarmuka admin yang ringkas, fungsional, dan berorientasi data.

---

## 1. Tujuan Design Guidelines

Dokumen ini menjadi acuan visual bagi UI/UX designer dan frontend developer agar seluruh halaman dashboard memiliki tampilan yang konsisten.

Tujuan desain:

1. Menampilkan identitas MAI Institute dan Beasiswa Bintang Mandiri.
2. Membuat informasi monitoring 120 beswan mudah dipahami.
3. Mengutamakan keterbacaan tabel, status, persentase, dan ringkasan data.
4. Mengurangi kepadatan visual meskipun dashboard memiliki banyak data.
5. Memastikan tampilan tetap nyaman digunakan pada desktop, tablet, dan perangkat mobile.

## 2. Sumber Referensi dan Temuan Visual

### 2.1 Website resmi MAI Institute

Sumber utama: https://mai-institute.com/

Halaman utama website menonjolkan program, event, testimoni, serta informasi organisasi. Materi visual yang terlihat mencakup identitas MAI Institute, Learning Camp, Beasiswa Bintang Mandiri, dokumentasi kegiatan peserta, dan ornamen grafis bertema pendidikan.

Referensi yang diperiksa:

- Homepage MAI Institute.
- Banner Learning Camp 13.
- Banner Beasiswa Bintang Mandiri 2025.
- Banner Leadership Camp.
- Halaman About MAI Institute.

### 2.2 Karakter visual yang dapat diadaptasi

- Nuansa biru digunakan sebagai salah satu identitas visual utama.
- Teal/toska terlihat kuat pada materi Beasiswa Bintang Mandiri.
- Kuning dan oranye muncul sebagai warna aksen pada ornamen pendidikan.
- Putih dan bidang terang digunakan sebagai ruang visual agar materi tetap terbaca.
- Fotografi kegiatan, peserta, dan aktivitas pembinaan menjadi bagian penting dari komunikasi brand.
- Ornamen geometris dan ikon pendidikan dapat digunakan sebagai aksen, bukan sebagai dekorasi dominan di setiap halaman.

### 2.3 Batas kepastian

Website yang diperiksa tidak menyediakan design token atau panduan brand resmi yang dapat diverifikasi dari konten yang terbaca. Oleh karena itu:

- Kode warna pada dokumen ini adalah **estimasi awal berdasarkan materi visual website**, bukan kode warna resmi MAI.
- Jenis font resmi belum dapat dipastikan. Gunakan font UI sans-serif yang mudah dibaca sampai brand guideline resmi tersedia.
- Logo resmi sebaiknya diambil dari file aset resmi MAI dengan resolusi memadai; jangan menggambar ulang atau mengubah proporsi logo.
- Jika tim MAI memiliki brand guideline, logo vector, atau file desain resmi, dokumen ini harus diselaraskan kembali.

---

## 3. Arah Desain Dashboard

### 3.1 Design concept

**Clean Institutional Dashboard — Professional, Warm, and Data-focused.**

Dashboard harus terasa sebagai sistem internal lembaga pendidikan dan pemberdayaan, bukan landing page promosi dan bukan sistem ERP yang padat.

Karakter yang dituju:

- Profesional dan terpercaya.
- Bersih dan minimal.
- Ramah dan tidak kaku.
- Terstruktur dan mudah dipindai.
- Berorientasi pada informasi dan tindakan admin.

### 3.2 Prinsip utama

1. **Content first:** data dan aktivitas admin menjadi fokus utama.
2. **Clear hierarchy:** judul halaman, ringkasan, filter, tabel, dan aksi memiliki hierarki yang jelas.
3. **Consistent components:** pola card, tombol, badge, tabel, dan modal konsisten di seluruh modul.
4. **Controlled brand accents:** warna brand digunakan secara terukur, bukan memenuhi semua permukaan.
5. **Readable density:** tabel boleh informatif, tetapi jangan terlalu rapat atau menggunakan ukuran teks terlalu kecil.
6. **No decorative overload:** ornamen geometris MAI cukup menjadi aksen kecil pada login, header tertentu, atau empty state.

---

## 4. Color System

### 4.1 Palet awal (estimasi, perlu konfirmasi brand owner)

| Token | Hex estimasi | Pemakaian |
|---|---|---|
| `mai-navy` | `#12345B` | Heading, sidebar, teks kuat, elemen identitas |
| `mai-blue` | `#1769AA` | Primary button, link, selected navigation, chart utama |
| `mai-teal` | `#27A9A5` | Aksen Beasiswa Bintang Mandiri, indikator sekunder |
| `mai-yellow` | `#F5C928` | Highlight kecil, penanda perhatian non-kritis |
| `mai-orange` | `#F28C28` | Aksen grafis atau penekanan terbatas |
| `surface` | `#FFFFFF` | Card dan area konten |
| `background` | `#F6F8FB` | Latar belakang aplikasi |
| `text-primary` | `#172033` | Teks utama |
| `text-secondary` | `#64748B` | Teks pendukung dan metadata |
| `border` | `#E5EAF1` | Garis pemisah dan border |

**Catatan:** warna di atas adalah starting point untuk prototype. Jangan menyebutnya sebagai warna resmi sebelum diverifikasi dengan logo/brand guideline asli.

### 4.2 Aturan penggunaan warna

- Gunakan putih sebagai warna utama card.
- Gunakan background abu-abu sangat terang untuk kanvas aplikasi.
- Gunakan biru MAI sebagai warna aksi utama.
- Gunakan teal sebagai aksen yang menghubungkan dashboard dengan identitas Beasiswa Bintang Mandiri.
- Gunakan kuning/oranye seperlunya untuk highlight, bukan untuk tombol utama atau banyak badge sekaligus.
- Hindari menggunakan semua warna brand secara bersamaan dalam satu komponen.

### 4.3 Warna status (semantik)

Warna status harus konsisten dan tidak disamakan dengan warna brand:

| Status | Warna | Contoh |
|---|---|---|
| Berhasil / diterima / hadir | Hijau | Tugas diterima, hadir |
| Menunggu / perlu tindakan | Amber | Menunggu validasi, belum disinkronkan |
| Ditolak / tidak hadir / error | Merah | Tugas ditolak, NID bermasalah |
| Informasi / aktif | Biru | Informasi periode, sumber terhubung |
| Netral / belum diproses | Abu-abu | Belum ada data, draft |

Jangan mengandalkan warna saja. Setiap status wajib memiliki teks atau ikon yang menjelaskan maknanya.

---

## 5. Typography

Jenis font resmi belum terverifikasi. Untuk implementasi awal, gunakan satu keluarga font sans-serif modern dan mudah dibaca, misalnya **Inter**, **Plus Jakarta Sans**, atau font UI sans-serif bawaan sistem. Pilih satu keluarga utama dan gunakan konsisten.

Skala tipografi rekomendasi:

| Elemen | Ukuran desktop | Weight |
|---|---:|---|
| Page title | 24–28 px | 600–700 |
| Section title | 18–20 px | 600 |
| Card title | 15–16 px | 600 |
| Body | 14 px | 400 |
| Table body | 13–14 px | 400 |
| Label / metadata | 12 px | 400–500 |
| KPI number | 26–32 px | 600–700 |

Aturan:

- Gunakan line-height yang nyaman.
- Hindari terlalu banyak uppercase.
- Gunakan angka tabular untuk persentase, NID, dan statistik agar rata secara visual.
- Jangan mengecilkan teks tabel di bawah 12 px.

---

## 6. Layout dan Grid

### 6.1 Struktur aplikasi desktop

Gunakan pola dashboard dengan sidebar tetap di kiri dan area konten di kanan.

```text
+----------------------+------------------------------------------+
| MAI logo / identity  | Topbar: breadcrumb, page title, admin    |
|                      +------------------------------------------+
| Dashboard            |                                          |
| Pembinaan Nasional   | Main content                             |
| Mentorship           | - KPI cards                              |
| Penugasan BA         | - Filters                                |
| Prestasi Beswan      | - Charts / summary                       |
| Data Beswan          | - Data table                             |
| Integrasi Data       |                                          |
| Pengaturan           |                                          |
+----------------------+------------------------------------------+
```

Rekomendasi ukuran:

- Sidebar desktop: 240–260 px.
- Topbar: 64–72 px.
- Konten utama: padding 24–32 px.
- Jarak antar-card: 16–20 px.
- Radius card: 12–16 px.
- Border tipis dan shadow sangat ringan.

### 6.2 Sidebar

- Tampilkan logo MAI Institute dan label aplikasi, misalnya `Beswan Management`.
- Menu dikelompokkan menjadi Ringkasan, Monitoring, dan Manajemen Data.
- Item aktif menggunakan latar biru muda atau indikator garis biru.
- Gunakan ikon sederhana dengan gaya konsisten.
- Profil admin dan tombol logout berada di bagian bawah sidebar atau menu akun di topbar.
- Sidebar dapat diciutkan pada layar menengah.

### 6.3 Topbar

Berisi:

- Breadcrumb atau konteks halaman.
- Judul halaman bila tidak ditampilkan di area konten.
- Status sinkronisasi singkat bila relevan.
- Identitas akun admin.

Jangan memenuhi topbar dengan banyak tombol.

### 6.4 Responsive behavior

- Desktop: sidebar tetap terlihat.
- Tablet: sidebar dapat menjadi compact/collapsible.
- Mobile: navigasi berubah menjadi drawer; tabel menggunakan horizontal scroll atau tampilan list/card yang mempertahankan informasi penting.
- Filter dapat ditampilkan dalam panel/dropdown agar tidak menghabiskan ruang.
- Aksi utama harus tetap mudah dijangkau.

---

## 7. Komponen UI

### 7.1 KPI cards

Gunakan KPI card untuk angka yang membantu admin memahami kondisi program secara cepat.

Contoh:

- Total beswan.
- Rata-rata kehadiran Pembinaan Nasional.
- Rata-rata kehadiran Mentorship.
- Tugas menunggu validasi.
- Jumlah prestasi terlapor.

Ketentuan:

- Satu card hanya memuat satu metrik utama.
- Berikan label dan keterangan periode.
- Hindari grafik mini jika tidak memberi informasi tambahan.
- Angka harus berasal dari data hasil sinkronisasi, bukan dummy pada production.

### 7.2 Tables

Tabel adalah komponen utama dashboard MAI.

Fitur yang diharapkan:

- Search berdasarkan NID dan nama.
- Filter wilayah, mentor, periode, dan status sesuai halaman.
- Sorting pada kolom yang relevan.
- Pagination.
- Indikator jumlah hasil.
- Empty state ketika tidak ada data.
- Export jika memang dibutuhkan dan disetujui.
- Kolom aksi untuk melihat detail atau melakukan validasi.

Tabel harus memiliki header yang jelas, row spacing nyaman, dan status dalam badge berlabel teks.

### 7.3 Badges

Gunakan badge untuk status seperti `Hadir`, `Tidak Hadir`, `Hadir Sebagian`, `Hadir Full`, `Menunggu Validasi`, `Diterima`, `Ditolak`, `Belum Mengumpulkan`, dan `Perlu Pemeriksaan`.

Jangan menggunakan badge untuk teks deskriptif yang panjang.

### 7.4 Filters

Gunakan filter yang relevan dengan konteks:

- Periode/kegiatan.
- Wilayah.
- Mentor.
- Status.
- Bulan pelaporan.

Tampilkan filter aktif dan sediakan tombol reset filter.

### 7.5 Charts

Gunakan grafik hanya ketika membantu melihat pola:

- Bar chart untuk perbandingan wilayah.
- Line chart untuk tren prestasi atau perkembangan presensi per periode.
- Donut chart secara terbatas untuk komposisi status.

Grafik harus disertai angka, label, dan periode. Jangan gunakan chart 3D atau efek dekoratif berlebihan. Sediakan tabel atau ringkasan angka untuk aksesibilitas.

### 7.6 Dialog dan drawer

Gunakan dialog untuk tindakan singkat seperti konfirmasi validasi. Gunakan drawer atau halaman detail untuk informasi peserta/submission yang panjang.

Tindakan yang mengubah data harus meminta konfirmasi dan menampilkan hasil tindakan.

### 7.7 Feedback states

Setiap proses harus memiliki state:

- Loading/skeleton.
- Success.
- Error dengan pesan yang dapat ditindaklanjuti.
- Empty state.
- Stale data / sinkronisasi terakhir.

---

## 8. Struktur Navigasi dan Spesifikasi Halaman

### 8.1 Admin Login

Tujuan: memberi akses aman kepada admin.

Elemen:

- Logo MAI Institute.
- Nama aplikasi: `MAI Institute — Beswan Management`.
- Input email/username dan password sesuai keputusan autentikasi.
- Tombol masuk.
- Pesan error yang jelas.

Desain login boleh menggunakan aksen geometris/pendidikan dari identitas MAI secara halus. Hindari hero image besar yang mengganggu proses login.

### 8.2 Dashboard Overview

Tujuan: memberi ringkasan kondisi BBM Angkatan 6.

Komponen:

- Sapaan admin dan konteks angkatan.
- KPI total peserta.
- Ringkasan Pembinaan Nasional.
- Ringkasan Mentorship.
- Ringkasan status penugasan.
- Ringkasan prestasi per bulan.
- Daftar hal yang membutuhkan perhatian: NID tidak cocok, tugas menunggu validasi, data gagal sinkronisasi.

Jangan menampilkan angka yang belum tersedia sebagai nol. Gunakan `Belum ada data` atau `Belum disinkronkan`.

### 8.3 Pembinaan Nasional

Level tampilan:

1. Keseluruhan beswan.
2. Per wilayah/kelompok mentor.
3. Per individu.
4. Detail komponen kegiatan.

Komponen:

- KPI dan persentase keseluruhan.
- Filter wilayah dan mentor.
- Tabel rekap wilayah.
- Tabel rekap peserta.
- Rincian lima komponen utama.
- Indikator Opening Program secara terpisah.

Aturan visual:

- Persentase utama dihitung berdasarkan lima komponen utama.
- Opening Program ditampilkan sebagai indikator terpisah.
- Status utama: 0–2 dari 5 = Tidak Hadir; 3–4 dari 5 = Hadir Sebagian; 5 dari 5 = Hadir Full.
- Status komponen hanya Hadir atau Tidak Hadir.

### 8.4 Mentorship

Level tampilan:

1. Keseluruhan.
2. Per pertemuan.
3. Per wilayah/kelompok mentor.
4. Per individu.

Komponen:

- Pemilih pertemuan: Mentoring #1, Mentoring #2, dan seterusnya.
- Label bulan/periode.
- Rekap kehadiran.
- Rekap per wilayah dan nama mentor.
- Detail tiga komponen per pertemuan: PM, Pre-Test, dan Post-Test.
- Pencarian peserta melalui NID/nama.
- Informasi sumber dan waktu sinkronisasi.

Aturan:

- Mentorship menggunakan satu Google Form dan satu Google Spreadsheet respons yang sama untuk seluruh pertemuan.
- Periode baru ditambahkan pada pilihan periode di Google Form yang sama, misalnya `Mentoring #1 – Januari`, `Mentoring #2 – Februari`.
- Dashboard harus mengelompokkan respons berdasarkan penanda periode yang eksplisit, NID, dan komponen presensi.
- Admin mengelola konfigurasi periode di dashboard; sistem menyediakan rekap untuk seluruh kelompok.
- Respons periode sebelumnya harus tetap dipertahankan.
- Setiap pertemuan memiliki tiga komponen: PM, Pre-Test, dan Post-Test.
- 0/3 atau 1/3 = Tidak Hadir; 2/3 atau 3/3 = Hadir.

**Catatan implementasi:** jangan mengelompokkan periode hanya dari tanggal respons. Gunakan pilihan periode/field eksplisit pada form. Jika struktur form atau nama kolom berubah, integrasi perlu memiliki mapping yang dapat diperbarui.

### 8.5 Penugasan Brand Ambassador

Kategori:

- MAI Foundation (rutin).
- Mentorship (rutin).
- MAI Wilayah (rutin).
- Pembinaan Nasional (rutin).
- Tugas Tambahan.

Tampilan:

- Rekap keseluruhan.
- Rekap per wilayah/mentor.
- Rekap per individu.
- Submission terbaru.
- Daftar peserta yang belum mengumpulkan.
- Daftar tugas menunggu validasi.

Status submission:

- Belum Mengumpulkan.
- Menunggu Validasi.
- Diterima.
- Tidak Diterima.

Fitur:

- Buka bukti/link submission.
- Validasi manual oleh admin.
- Catatan/reason ketika diterima atau ditolak.
- Riwayat validasi.
- Tampilkan jumlah submission dan jumlah tugas valid secara terpisah.

Jangan menganggap tugas selesai hanya karena form telah dikirim. Persentase penyelesaian final harus berdasarkan aturan validasi yang disepakati.

### 8.6 Prestasi Beswan

Tampilan:

- Rekap prestasi per wilayah/kelompok mentor.
- Rekap prestasi per bulan, mulai September.
- Daftar prestasi per individu.
- Detail bukti/sertifikat dan informasi prestasi.

Field yang diharapkan bila tersedia pada sumber:

- NID.
- Nama peserta.
- Nama prestasi.
- Tingkat prestasi.
- Bidang/kategori.
- Penyelenggara.
- Tanggal prestasi diperoleh.
- Tanggal pelaporan.
- Link bukti/sertifikat.
- Status verifikasi jika proses validasi diterapkan.

Simpan tanggal perolehan dan tanggal pelaporan secara terpisah jika keduanya tersedia.

### 8.7 Data Beswan

Tampilan tabel master peserta dengan pencarian:

- NID.
- Nomor beswan jika berbeda dari NID.
- Nama.
- Universitas.
- Wilayah/kelompok mentor.
- Nama mentor.

Sediakan detail peserta yang menggabungkan ringkasan Pembinaan Nasional, Mentorship, Penugasan, dan Prestasi. Halaman ini adalah detail administratif untuk admin, bukan akun/dashboard beswan.

### 8.8 Integrasi Data

Tampilkan sumber spreadsheet, status koneksi, waktu sinkronisasi terakhir, jumlah baris terbaca, jumlah respons baru, dan jumlah error.

Fitur yang direkomendasikan:

- Konfigurasi Google Spreadsheet ID dan worksheet/tab.
- Konfigurasi mapping kolom.
- Tombol sinkronisasi manual.
- Riwayat sinkronisasi.
- Daftar baris gagal diproses.
- Deteksi NID yang tidak ditemukan pada master.
- Deteksi respons ganda/duplikat.
- Indikator perubahan struktur kolom.

Jangan menampilkan credential atau token integrasi kepada pengguna.

### 8.9 Audit dan Validasi

Catat perubahan penting yang dilakukan admin, terutama:

- Status validasi penugasan.
- Catatan penolakan/penerimaan.
- Perubahan mapping sumber data.
- Perubahan konfigurasi periode.
- Perubahan master peserta/wilayah/mentor jika diizinkan.

Tampilkan siapa yang melakukan perubahan dan kapan perubahan dilakukan.

---

## 9. Pola Interaksi

- Klik KPI dapat membuka halaman detail dengan filter terkait.
- Klik wilayah membuka daftar peserta wilayah tersebut.
- Klik peserta membuka detail individu.
- Klik periode membuka rekap kegiatan pada periode tersebut.
- Tombol sinkronisasi menampilkan status proses dan ringkasan hasil.
- Tombol validasi membuka dialog/drawer dengan pilihan diterima/ditolak dan catatan.
- Filter yang aktif harus memengaruhi seluruh tabel/grafik yang relevan dalam halaman yang sama.

Hindari aksi yang tidak jelas. Setiap tombol harus memiliki fungsi nyata.

---

## 10. Data Visualization Rules

1. Semua grafik wajib memiliki judul, satuan, dan periode.
2. Persentase harus menampilkan basis perhitungannya, misalnya `96 dari 120 kesempatan presensi`.
3. Bandingkan wilayah menggunakan metrik yang sama.
4. Jangan mencampur status submission dengan status validasi.
5. Jangan memperlakukan data kosong sebagai nol.
6. Jika sumber data belum berhasil disinkronkan, beri label bahwa data mungkin belum terbaru.
7. Sediakan akses ke detail tabel untuk angka agregat.

---

## 11. Accessibility dan Usability

- Kontras teks dan background harus memadai.
- Status tidak boleh dibedakan hanya dengan warna.
- Semua input memiliki label.
- Tombol memiliki teks yang jelas.
- Fokus keyboard terlihat.
- Tabel memiliki header kolom yang jelas.
- Ukuran target klik cukup nyaman.
- Format tanggal konsisten menggunakan Bahasa Indonesia.
- Angka persentase menggunakan format desimal yang konsisten.

---

## 12. Content Tone dan Bahasa UI

Gunakan Bahasa Indonesia yang ringkas, formal, dan mudah dipahami.

Contoh istilah:

- `Total Beswan`
- `Rata-rata Kehadiran`
- `Hadir Full`
- `Hadir Sebagian`
- `Tidak Hadir`
- `Menunggu Validasi`
- `Diterima`
- `Tidak Diterima`
- `Belum Mengumpulkan`
- `Sinkronisasi Berhasil`
- `Perlu Pemeriksaan`

Hindari label teknis seperti `payload`, `mapping failure`, atau `record mismatch` pada tampilan utama. Jika dibutuhkan untuk admin teknis, berikan penjelasan yang mudah dipahami.

---

## 13. Do and Don't

### Do

- Gunakan palet MAI dengan biru sebagai warna aksi utama dan teal sebagai aksen.
- Pertahankan ruang putih yang cukup.
- Buat tabel mudah dipindai.
- Gunakan badge status yang konsisten.
- Tampilkan waktu sinkronisasi.
- Beri akses drill-down dari agregat ke detail peserta.
- Gunakan ornamen MAI secara halus.
- Pastikan tampilan responsif.

### Don't

- Jangan menyalin homepage MAI menjadi dashboard admin.
- Jangan menjadikan ornamen geometris sebagai background di semua halaman.
- Jangan memakai banyak warna cerah sekaligus.
- Jangan memenuhi dashboard dengan grafik yang tidak diperlukan.
- Jangan membuat dashboard beswan atau mentor.
- Jangan menampilkan data dummy seolah-olah data aktual.
- Jangan menganggap data yang belum disinkronkan sebagai nol.
- Jangan menampilkan seluruh kolom spreadsheet tanpa kurasi.

---

## 14. Design Acceptance Checklist

Sebelum UI dianggap siap:

- [ ] Logo MAI yang digunakan adalah aset resmi dan tidak terdistorsi.
- [ ] Warna brand telah dikonfirmasi atau diberi label sebagai estimasi prototype.
- [ ] Ada konsistensi warna, tipografi, spacing, radius, dan ikon.
- [ ] Sidebar dan navigasi konsisten di semua halaman.
- [ ] Dashboard overview menonjolkan informasi paling penting.
- [ ] Tabel mendukung pencarian, filter, sorting, dan pagination sesuai kebutuhan.
- [ ] Status menggunakan warna dan label teks.
- [ ] Detail wilayah dan individu dapat dibuka dari rekap.
- [ ] Tampilan loading, empty, error, dan stale-data tersedia.
- [ ] Seluruh halaman dapat digunakan pada desktop dan tablet.
- [ ] Mobile tidak menyebabkan informasi atau aksi utama hilang.
- [ ] Tidak ada angka dummy yang terlihat seperti data riil.

---

## 15. Prompt untuk AI UI/Frontend Generator

Gunakan dokumen ini bersama `MAI_INSTITUTE_MASTER_SPECIFICATION.md` ketika membuat UI.

```text
Build an admin-only dashboard for MAI Institute's Beasiswa Bintang Mandiri program.

Use MAI_DESIGN_GUIDELINES.md as the visual source of truth and
MAI_INSTITUTE_MASTER_SPECIFICATION.md as the functional/business source of truth.

Visual direction:
- Clean institutional dashboard.
- Professional, warm, minimal, and data-focused.
- Use MAI-inspired navy/blue as the primary UI color and teal as a supporting accent.
- Yellow and orange are limited to small highlights.
- White cards on a very light neutral background.
- Clear typography, generous spacing, subtle borders, and restrained shadows.
- Use the official MAI logo asset when provided; do not recreate or distort it.

Application structure:
- Admin-only authentication and interface.
- Left sidebar navigation.
- Dashboard overview.
- Pembinaan Nasional.
- Mentorship.
- Penugasan Brand Ambassador.
- Prestasi Beswan.
- Data Beswan.
- Integrasi Data.
- Audit/Validasi.

UX requirements:
- Prioritize readable tables, search, filters, status badges, and drill-down details.
- Show clear loading, empty, error, and last-synchronized states.
- Do not invent production data. Use clearly labeled placeholders in prototypes.
- Do not create beswan or mentor dashboards.
- Do not redesign the public MAI website; apply its brand identity to an internal admin product.
- Keep all pages visually consistent and responsive.

Do not change business rules specified in the master specification.
If a brand color, font, logo asset, or interaction is not confirmed, mark it as an assumption rather than presenting it as an official MAI standard.
```

---

## 16. Hal yang Masih Perlu Dikonfirmasi

1. File logo resmi MAI Institute dan Beasiswa Bintang Mandiri (SVG/PNG transparan).
2. Brand guideline resmi atau kode warna resmi, jika tersedia.
3. Font resmi organisasi, jika memang ditetapkan.
4. Apakah dashboard menggunakan identitas MAI Institute saja atau menggabungkan logo MAI Institute dan Beasiswa Bintang Mandiri.
5. Apakah ada aturan khusus penggunaan foto peserta atau dokumentasi kegiatan di aplikasi internal.
6. Apakah tema gelap diperlukan. Rekomendasi awal: tidak perlu untuk MVP.

---

## 17. Referensi

- Website resmi MAI Institute: https://mai-institute.com/
- Halaman About MAI Institute: https://mai-institute.com/about
- Screenshot Google Student Ambassador Dashboard yang diberikan stakeholder sebagai referensi pola tata letak dashboard.

**Status akhir:** Dokumen ini merupakan pedoman desain awal berbasis pengamatan visual website MAI. Konfirmasi brand guideline resmi tetap diperlukan sebelum warna/font dinyatakan final.

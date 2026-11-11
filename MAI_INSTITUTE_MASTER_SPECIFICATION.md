# MAI Institute — Master Specification
## Dashboard Monitoring Beasiswa Bintang Mandiri Angkatan 6

**Dokumen:** Product Requirements & Technical Specification  
**Versi:** 1.0 — Draft kebutuhan fungsional dan teknis  
**Tanggal:** 11 November 2026  
**Produk:** MAI Institute Admin Dashboard  
**Pengguna aplikasi:** Admin MAI Institute  
**Sumber data utama:** Google Sheets yang terhubung dengan Google Forms

---

## 1. Ringkasan Eksekutif

MAI Institute membutuhkan dashboard internal untuk membantu admin melakukan rekapitulasi, monitoring, validasi, dan penelusuran data peserta Beasiswa Bintang Mandiri Angkatan 6 (BBM 6).

Saat ini data aktivitas beswan dikumpulkan melalui Google Forms dan responsnya tersimpan di Google Sheets. Data tersebut tersebar pada beberapa sumber dan membutuhkan proses rekap manual. Dashboard yang dibangun harus memudahkan admin melihat seluruh informasi dari satu aplikasi tanpa perlu membuka banyak spreadsheet, menggabungkan data satu per satu, atau menghitung persentase secara manual.

**Prinsip arsitektur yang wajib diikuti: Google Sheets menjadi basis penyimpanan data utama (source of truth) untuk aplikasi ini.** Sistem tidak perlu menggunakan MySQL, PostgreSQL, atau database relasional lain sebagai database utama. Dashboard membaca dan mengolah data dari Google Sheets yang sudah digunakan MAI. Apabila secara teknis diperlukan backend/API, backend tersebut berfungsi sebagai lapisan integrasi, autentikasi, pemrosesan, dan keamanan akses Google Sheets—bukan sebagai pengganti Google Sheets sebagai sumber data utama.

Google Forms tetap digunakan untuk pengumpulan data. Dashboard bukan aplikasi pengganti Google Forms dan bukan sistem input presensi baru.

### 1.1 Tujuan Produk

1. Menyatukan tampilan rekap Pembinaan Nasional, Mentorship, Penugasan Brand Ambassador, dan Prestasi Beswan.
2. Mengurangi pekerjaan rekap manual dari beberapa Google Sheets.
3. Memudahkan pencarian peserta menggunakan NID dan nama.
4. Menyediakan rekap per peserta, per wilayah/kelompok mentor, dan keseluruhan beswan.
5. Menyediakan proses validasi manual untuk penugasan Brand Ambassador.
6. Menampilkan data yang belum mengisi, NID yang tidak cocok, respons duplikat, dan data yang belum dapat dipetakan.
7. Mempertahankan Google Forms dan Google Sheets yang sudah menjadi alur kerja MAI.

### 1.2 Batasan Ruang Lingkup

- Aplikasi hanya digunakan oleh admin.
- Beswan tidak memiliki akun dan tidak memiliki dashboard.
- Mentor tidak memiliki akun dan tidak memiliki dashboard.
- Pengumpulan presensi, tugas, dan prestasi tetap menggunakan Google Forms yang sudah ditentukan.
- Google Sheets menjadi tempat penyimpanan dan sumber data utama yang dibaca dashboard.
- Dashboard berfokus pada monitoring, rekapitulasi, pencarian, validasi, dan pelaporan.
- Tidak membuat satu Google Form atau spreadsheet baru untuk setiap pertemuan Mentorship.
- Tidak membangun database SQL terpisah sebagai sumber data utama.

---

## 2. Keputusan Produk yang Sudah Dikonfirmasi

Bagian ini berisi keputusan yang sudah disampaikan dan dikonfirmasi oleh pihak pemilik kebutuhan. Developer tidak boleh mengubah keputusan ini tanpa persetujuan.

| ID | Area | Keputusan |
|---|---|---|
| D-01 | Pengguna | Hanya Admin yang dapat login dan menggunakan dashboard. |
| D-02 | Beswan | Beswan tidak memiliki akun, login, atau dashboard. |
| D-03 | Mentor | Mentor tidak memiliki akun atau dashboard. Pengelolaan dilakukan oleh Admin. |
| D-04 | Penyimpanan data | Google Sheets menjadi basis data/sumber data utama aplikasi. |
| D-05 | Google Forms | Google Forms yang ada tetap digunakan sebagai media pengumpulan data. |
| D-06 | Mentorship | Menggunakan satu Google Form dan satu spreadsheet respons untuk seluruh pertemuan; tidak membuat form/spreadsheet baru setiap pertemuan. |
| D-07 | Periode Mentorship | Periode baru ditambahkan sebagai pilihan pada Google Form yang sama, misalnya “Mentoring #1 – Januari”, “Mentoring #2 – Februari”, dan seterusnya. |
| D-08 | Penambahan periode Mentorship | Admin menambahkan konfigurasi pertemuan secara manual di dashboard; sistem menyediakan rekap untuk periode dan seluruh kelompok. |
| D-09 | Pembinaan Nasional | Opening Program dipisahkan dari perhitungan persentase lima komponen utama. |
| D-10 | Status Pembinaan Nasional | Dari lima komponen utama: 0–2 hadir = Tidak Hadir; 3–4 hadir = Hadir Sebagian; 5 hadir = Hadir Full. |
| D-11 | Status komponen presensi | Status tiap komponen hanya Hadir atau Tidak Hadir. |

---

## 3. Pengguna, Autentikasi, dan Hak Akses

### 3.1 Role

Hanya terdapat satu role aplikasi pada ruang lingkup saat ini:

| Role | Hak akses |
|---|---|
| Admin | Login, melihat seluruh dashboard, mengelola konfigurasi periode, melakukan sinkronisasi, melihat seluruh peserta, memvalidasi tugas, dan mengakses seluruh rekap. |

Tidak perlu membuat role Beswan atau Mentor. Nama mentor dan data beswan tetap ditampilkan sebagai informasi dalam rekap, bukan sebagai akun pengguna.

### 3.2 Autentikasi

- Halaman login hanya disediakan untuk Admin.
- Mekanisme login (email/password atau metode lain) belum ditetapkan dan harus dikonfirmasi sebelum implementasi autentikasi.
- Kredensial integrasi Google tidak boleh ditampilkan di frontend.
- Akses Google Sheets harus dilakukan melalui mekanisme autentikasi integrasi yang aman.

---

## 4. Arsitektur dan Prinsip Penyimpanan Data

### 4.1 Arsitektur Konseptual

```text
Beswan / sumber pengisi
        |
        v
Google Forms yang sudah digunakan MAI
        |
        v
Google Sheets (sumber data utama)
        |
        v
Lapisan integrasi dan pengolahan data
- membaca spreadsheet
- normalisasi data
- pencocokan NID
- pengelompokan periode/wilayah
- perhitungan rekap
- pembacaan data validasi admin
        |
        v
MAI Institute Admin Dashboard
- Dashboard ringkasan
- Pembinaan Nasional
- Mentorship
- Penugasan Brand Ambassador
- Prestasi Beswan
- Data Beswan
- Integrasi dan kualitas data
```

### 4.2 Aturan Source of Truth

1. Google Sheets merupakan sumber data utama untuk data operasional yang ditampilkan dashboard.
2. Jangan membuat database SQL sebagai tempat penyimpanan utama yang harus diisi ulang secara terpisah.
3. Dashboard harus membaca data dari spreadsheet sumber yang telah ditentukan.
4. Data hasil pengolahan seperti persentase, status kehadiran, jumlah pengumpulan, dan rekap wilayah dihitung dari data spreadsheet dan aturan bisnis pada dokumen ini.
5. Perubahan sumber data di Google Sheets harus dapat tercermin di dashboard setelah proses pembacaan/sinkronisasi.
6. Jika diperlukan penyimpanan sementara untuk cache atau performa, data tersebut hanya salinan sementara dan dapat dibangun ulang dari Google Sheets. Cache tidak boleh menjadi sumber kebenaran kedua.
7. Data yang dimasukkan admin, seperti keputusan validasi tugas atau catatan validasi, harus disimpan kembali secara persisten di Google Sheets, bukan hanya disimpan di state aplikasi/browser.
8. Untuk menyimpan data validasi, gunakan tab khusus admin pada spreadsheet yang ditentukan atau mekanisme penulisan balik ke spreadsheet. Penempatan final tab tersebut harus dikonfirmasi saat pemetaan spreadsheet.

### 4.3 Pembagian Spreadsheet Sumber

Berdasarkan brief awal, sumber data yang digunakan adalah:

| ID | Kegunaan | Sumber |
|---|---|---|
| SRC-01 | Sumber utama respons: Pembinaan Nasional, Mentorship awal, pengumpulan tugas, serta sebagian data prestasi awal | [Google Spreadsheet utama](https://docs.google.com/spreadsheets/d/1AJ_ajJAOwpXY7AukaR6IA07RsgYa65OGylP-TnGMFr4/edit?resourcekey=&gid=118547598#gid=118547598) |
| SRC-02 | Sumber rekap/data Mentorship per kelompok yang saat ini digunakan untuk pertemuan 4 dan seterusnya | [Google Spreadsheet Mentorship per kelompok](https://docs.google.com/spreadsheets/d/1BmAfFI1IkRm3DUj3gZ1EhzFMzQKb9E-GpFF187jF31Y/edit?usp=sharing) |
| SRC-03 | Sumber pendataan prestasi beswan yang digunakan belakangan | [Google Spreadsheet Prestasi](https://docs.google.com/spreadsheets/d/1y5e9t1eDeYsPIHDcm1kSAEUN6ZhEsd_P_XK-U9gWELk/edit?usp=sharing) |

**Catatan integrasi penting:** Brief awal menunjukkan adanya sumber Mentorship yang dipisah per kelompok untuk periode tertentu. Keputusan terbaru menetapkan pola operasional Mentorship menggunakan satu Google Form dan satu spreadsheet respons yang sama untuk semua pertemuan. Karena itu, developer harus memetakan data historis dari sumber lama dan menentukan cara konsolidasinya ke sumber Mentorship terpadu tanpa menghilangkan riwayat. Jangan menghapus atau mengabaikan sumber historis sebelum pemetaan dan verifikasi data selesai.

### 4.4 Prinsip Integrasi Google Sheets

- Gunakan ID spreadsheet dan nama tab/worksheet sebagai konfigurasi, bukan hardcode tersebar di seluruh kode aplikasi.
- Sistem harus dapat membaca beberapa spreadsheet sumber yang berbeda.
- Setiap sumber data perlu memiliki label, tujuan, status koneksi, waktu pembacaan/sinkronisasi terakhir, dan pesan error jika gagal.
- Pemetaan nama kolom dilakukan melalui konfigurasi mapping agar perubahan judul kolom bisa ditangani tanpa menulis ulang seluruh logika.
- Data mentah dari sumber tidak boleh diubah atau dihapus oleh proses sinkronisasi.
- Normalisasi dilakukan pada lapisan pengolahan atau pada tab hasil olahan yang disepakati.
- Respons baru harus dapat ditemukan pada pembacaan berikutnya.
- Sinkronisasi ulang tidak boleh menggandakan data yang sama.
- Perubahan struktur Google Form/Sheet harus ditandai sebagai potensi perubahan skema dan tidak boleh membuat sistem diam-diam menghilangkan data.

### 4.5 Sinkronisasi

Kebutuhan yang sudah pasti:

- Dashboard harus menyediakan cara untuk memperbarui/membaca ulang data sumber.
- Dashboard menampilkan status koneksi dan waktu pembacaan terakhir.
- Admin dapat mengetahui apabila sinkronisasi gagal atau ada kolom yang tidak dikenali.

Keputusan yang masih perlu ditetapkan:

- Sinkronisasi hanya melalui tombol manual, terjadwal, otomatis berkala, atau kombinasi.
- Interval sinkronisasi otomatis jika digunakan.
- Apakah dashboard perlu memuat ulang data secara otomatis ketika halaman terbuka.

**Rekomendasi awal:** sediakan tombol “Sinkronisasi Sekarang” untuk admin dan siapkan arsitektur agar sinkronisasi terjadwal dapat ditambahkan. Jangan mengklaim data real-time sebelum mekanisme dan intervalnya benar-benar ditetapkan.

---

## 5. Master Data Beswan, Wilayah, dan Mentor

### 5.1 Master Beswan

Master beswan menjadi dasar pencocokan semua modul. NID digunakan sebagai identifier utama peserta.

Atribut minimum yang diharapkan:

| Kolom | Keterangan |
|---|---|
| NID | Nomor identitas unik beswan; wajib dan menjadi kunci pencocokan utama |
| Nomor Beswan | Nomor urut peserta jika tersedia; berbeda dari NID bila memang demikian |
| Nama | Nama lengkap beswan |
| Universitas | Nama perguruan tinggi jika tersedia |
| Wilayah | Kelompok/wilayah mentor |
| Mentor | Nama mentor yang menaungi kelompok |
| Status data | Aktif/perlu pemeriksaan jika status ini memang tersedia |

Daftar NID yang diberikan dalam brief menjadi bahan awal pencocokan. Jumlah peserta yang menjadi target rekap adalah 120 beswan. Jumlah dan kelengkapan daftar NID tetap harus diverifikasi terhadap master peserta resmi sebelum sistem dinyatakan siap produksi.

### 5.2 Aturan NID

1. NID harus disimpan sebagai teks/string, bukan angka, untuk mencegah perubahan format atau hilangnya digit.
2. Hapus spasi di awal/akhir saat normalisasi.
3. Jangan mengubah digit NID.
4. Pencocokan utama harus exact match setelah normalisasi format sederhana.
5. Respons dengan NID yang tidak ditemukan dalam master harus masuk daftar “NID Tidak Dikenal / Perlu Pemetaan”.
6. Jangan otomatis menebak atau menggabungkan NID yang mirip.
7. Admin harus dapat melihat nilai NID mentah, sumber spreadsheet, tab, dan baris/identitas respons untuk penelusuran.
8. Jika satu NID ditemukan lebih dari sekali dalam master, tandai sebagai potensi duplikasi master dan jangan memilih salah satu secara diam-diam.

### 5.3 Wilayah dan Mentor

- Wilayah/kelompok mentor harus menggunakan master yang konsisten di semua modul.
- Setiap rekap wilayah menampilkan nama wilayah dan nama mentor.
- Perubahan penempatan beswan ke wilayah/mentor perlu memiliki aturan periode berlaku jika penempatan dapat berubah selama program.
- Aturan periode berlaku tersebut belum dikonfirmasi; sampai ada keputusan, gunakan data master wilayah/mentor yang ditetapkan admin dan tandai konflik pemetaan.

---

## 6. Modul Dashboard Ringkasan

Dashboard adalah halaman awal admin dan harus menyajikan gambaran program secara ringkas.

### 6.1 KPI Utama

Komponen ringkasan yang direkomendasikan:

- Total beswan terdaftar (target awal 120, angka aktual harus mengikuti master terverifikasi).
- Rata-rata kehadiran Pembinaan Nasional.
- Rata-rata kehadiran Mentorship.
- Persentase tugas yang sudah diterima/valid.
- Jumlah tugas menunggu validasi.
- Jumlah beswan yang belum mengumpulkan tugas tertentu.
- Jumlah prestasi yang dilaporkan.
- Jumlah respons dengan NID tidak dikenal atau perlu pemeriksaan.
- Status koneksi sumber Google Sheets dan waktu sinkronisasi terakhir.

Angka dashboard harus dapat ditelusuri ke halaman detail. Jangan menggunakan angka contoh atau placeholder sebagai angka produksi.

### 6.2 Filter Global

Jika relevan untuk masing-masing modul, sediakan filter:

- Periode/program.
- Wilayah.
- Mentor.
- Pencarian NID atau nama.
- Status.
- Bulan pelaporan.

Filter global tidak boleh membuat modul menggunakan definisi periode yang berbeda tanpa penjelasan.

---

## 7. Modul Pembinaan Nasional

### 7.1 Tujuan

Menampilkan rekap kehadiran Pembinaan Nasional pada tiga tingkat:

1. Keseluruhan beswan.
2. Per wilayah/kelompok mentor, disertai nama mentor.
3. Per peserta, disertai NID dan nama.

### 7.2 Komponen Presensi

Berdasarkan brief, terdapat enam komponen:

| No. | Komponen | Perlakuan |
|---:|---|---|
| 1 | Kehadiran Opening Program | Ditampilkan terpisah; tidak masuk persentase lima komponen utama |
| 2 | Presensi Awal | Masuk perhitungan utama |
| 3 | Pre-Test | Masuk perhitungan utama |
| 4 | Post-Test | Masuk perhitungan utama |
| 5 | Presensi Opening Evaluasi | Masuk perhitungan utama |
| 6 | Presensi Akhir/Closing | Masuk perhitungan utama |

### 7.3 Status Komponen

Setiap komponen memiliki status:

- Hadir
- Tidak Hadir

Tidak menggunakan status Izin atau Sakit pada aturan yang telah dikonfirmasi.

Respons pengisian form yang valid dipetakan menjadi “Hadir”. Jika peserta tidak memiliki respons pada komponen yang sudah dilaksanakan, statusnya menjadi “Tidak Hadir” setelah aturan penutupan/penguncian kegiatan diterapkan. Untuk kegiatan yang belum dilaksanakan, komponen tidak boleh dihitung sebagai ketidakhadiran.

### 7.4 Status Lima Komponen Utama

Persentase utama tidak memasukkan Opening Program.

Rumus:

`Persentase = (Jumlah komponen utama berstatus Hadir / 5) × 100%`

| Kehadiran | Persentase | Status akhir |
|---:|---:|---|
| 0 dari 5 | 0% | Tidak Hadir |
| 1 dari 5 | 20% | Tidak Hadir |
| 2 dari 5 | 40% | Tidak Hadir |
| 3 dari 5 | 60% | Hadir Sebagian |
| 4 dari 5 | 80% | Hadir Sebagian |
| 5 dari 5 | 100% | Hadir Full |

Opening Program ditampilkan sebagai indikator terpisah, misalnya “Hadir” atau “Tidak Hadir”, dan tidak memengaruhi persentase utama.

### 7.5 Rekap Keseluruhan dan Wilayah

Persentase agregat yang direkomendasikan:

`Persentase agregat = total kehadiran valid seluruh peserta pada komponen yang sudah dilaksanakan / total kesempatan kehadiran seluruh peserta pada komponen yang sudah dilaksanakan × 100%`

Komponen yang belum dilaksanakan dikeluarkan dari penyebut. Tampilkan jumlah peserta dan jumlah kesempatan presensi agar angka dapat dipahami.

Rekap wilayah menampilkan minimal:

- Nama wilayah.
- Nama mentor.
- Jumlah beswan.
- Jumlah kehadiran valid.
- Total kesempatan presensi.
- Persentase kehadiran.
- Rincian anggota.

### 7.6 Tampilan Detail Individu

Admin dapat membuka profil ringkas peserta yang berisi:

- NID dan nama.
- Wilayah dan mentor.
- Status Opening Program.
- Lima status komponen utama.
- Jumlah hadir dari lima komponen.
- Persentase dan status akhir.
- Sumber respons dan penanda data yang perlu diperiksa jika ada.

---

## 8. Modul Mentorship

### 8.1 Tujuan

Menampilkan persentase kehadiran beswan dalam kelompok mentorship berdasarkan respons Google Form, dengan rekap per pertemuan, per individu, per wilayah/kelompok, dan keseluruhan.

### 8.2 Pola Google Forms dan Google Sheets

**Keputusan final:** seluruh pertemuan Mentorship menggunakan satu Google Form dan satu Google Spreadsheet respons yang sama. Tidak membuat form atau spreadsheet baru untuk setiap pertemuan.

Contoh pilihan periode di Google Form:

- Mentoring #1 – Januari
- Mentoring #2 – Februari
- Mentoring #3 – Maret
- Mentoring #4 – April
- dan seterusnya.

Ketika periode baru dibuka, pilihan periode ditambahkan pada Google Form yang sama. Respons dari periode sebelumnya harus tetap berada di spreadsheet dan tidak boleh dihapus atau tertimpa.

Setiap respons harus memiliki penanda periode yang eksplisit. Pengelompokan periode tidak boleh hanya mengandalkan tanggal pengisian karena peserta dapat terlambat mengisi.

### 8.3 Pengelolaan Periode oleh Admin

Admin menambahkan konfigurasi pertemuan secara manual melalui dashboard. Contoh atribut:

- Nomor pertemuan.
- Nama periode, misalnya “Mentoring #4 – April”.
- Bulan/tahun.
- Status periode: direncanakan, berlangsung, selesai, atau ditutup (status final perlu disepakati).
- Nilai pilihan periode yang harus cocok dengan opsi di Google Form.
- Catatan admin (opsional).

Setelah periode dibuat, sistem menyediakan filter dan rekap untuk seluruh kelompok. Penambahan periode di dashboard tidak membuat Google Form atau spreadsheet baru. Admin tetap perlu memastikan pilihan periode yang sesuai sudah ditambahkan ke Google Form yang sama.

### 8.4 Komponen Presensi per Pertemuan

Berdasarkan notulensi MAI, setiap pertemuan memiliki tiga komponen:

1. Presensi Mentorship (PM).
2. Pre-Test.
3. Post-Test.

Setiap komponen dihitung Hadir/Tidak Hadir berdasarkan respons yang cocok dengan NID dan periode.

### 8.5 Status Kehadiran per Pertemuan

| Jumlah komponen hadir | Status pertemuan |
|---:|---|
| 0 dari 3 | Tidak Hadir |
| 1 dari 3 | Tidak Hadir |
| 2 dari 3 | Hadir |
| 3 dari 3 | Hadir |

Persentase individu per pertemuan:

`Persentase pertemuan = (Jumlah komponen hadir / 3) × 100%`

Tampilkan persentase komponen dan status pertemuan secara terpisah. Dengan begitu, 2/3 tetap berstatus Hadir sesuai aturan, tetapi nilainya tidak disamakan dengan 3/3.

### 8.6 Rekap

- Rekap keseluruhan: agregat seluruh beswan pada periode terpilih.
- Rekap wilayah: nama wilayah, nama mentor, jumlah anggota, jumlah hadir, total kesempatan, dan persentase.
- Rekap individu: NID, nama, wilayah, tiga komponen, jumlah hadir, persentase, dan status.
- Rekap lintas periode: perkembangan kehadiran peserta dari Mentoring #1 hingga periode terbaru.

### 8.7 Data Historis

Brief awal menyebut sumber Mentorship awal berada di spreadsheet utama, sedangkan pertemuan 4 dan seterusnya pernah dipisahkan per kelompok. Sistem harus dapat membaca dan memetakan data historis tersebut. Data historis tidak boleh dibuang ketika operasional Mentorship menggunakan satu spreadsheet respons terpadu.

---

## 9. Modul Penugasan Brand Ambassador

### 9.1 Tujuan

Menampilkan rekap tugas berdasarkan:

1. Per orang.
2. Per wilayah/kelompok mentor.
3. Keseluruhan beswan MAI.

Admin perlu mengetahui tugas yang sudah dikumpulkan, belum dikumpulkan, sedang menunggu validasi, diterima, atau tidak diterima.

### 9.2 Kategori Tugas

| Kategori | Keterangan awal |
|---|---|
| MAI Foundation | Tugas rutin |
| Mentorship | Tugas rutin |
| MAI Wilayah | Tugas rutin |
| Pembinaan Nasional | Tugas rutin |
| Tugas Tambahan | Tugas opsional/kondisional |

Brief menyebut empat kategori tugas wajib dan satu kategori tambahan. Frekuensi kewajiban tugas rutin (sekali selama program, per bulan, per kegiatan, atau per pertemuan) **belum ditetapkan** dan harus menjadi konfigurasi/keputusan bisnis sebelum persentase final dibangun.

### 9.3 Status Pengumpulan dan Validasi

Status minimal:

- Belum Mengumpulkan.
- Menunggu Validasi.
- Diterima.
- Tidak Diterima.

Alur:

```text
Respons pengumpulan masuk dari Google Forms/Sheets
                    |
                    v
             Menunggu Validasi
                    |
             Admin memeriksa
               /       \
              v         v
          Diterima   Tidak Diterima
                         |
                         v
                 Catatan/alasan admin
```

Jika kebijakan mengizinkan pengumpulan ulang, status Tidak Diterima dapat diikuti oleh submission revisi. Ketentuan upload ulang dan riwayat beberapa submission perlu dikonfirmasi.

### 9.4 Validasi Manual

Admin dapat:

- Membuka detail submission.
- Melihat tautan konten/bukti dari spreadsheet.
- Membuka tautan bukti pada tab atau jendela baru.
- Menetapkan Diterima atau Tidak Diterima.
- Menambahkan catatan validasi.
- Melihat siapa admin yang memvalidasi dan kapan validasi dilakukan, jika informasi akun/admin tersedia.
- Mengubah keputusan validasi dengan menyimpan riwayat perubahan.

Data hasil validasi harus disimpan secara persisten di Google Sheets, misalnya pada tab administrasi khusus yang menggunakan identitas submission/NID/kategori sebagai referensi. Jangan hanya menyimpan keputusan pada browser.

### 9.5 Perhitungan Rekap Tugas

Dashboard perlu membedakan:

- **Submission rate:** jumlah kewajiban yang sudah memiliki submission / total kewajiban yang seharusnya dikumpulkan.
- **Valid completion rate:** jumlah kewajiban berstatus Diterima / total kewajiban yang seharusnya dikumpulkan.
- **Pending validation:** jumlah submission yang menunggu pemeriksaan.
- **Rejected:** jumlah submission yang tidak diterima.
- **Not submitted:** jumlah kewajiban yang belum memiliki submission.

Submission yang baru masuk tidak otomatis dianggap tugas selesai. Untuk perhitungan penyelesaian yang sah, gunakan status Diterima.

Tugas Tambahan tidak boleh dimasukkan ke penyebut kewajiban tugas rutin kecuali admin menetapkannya sebagai kewajiban khusus.

### 9.6 Rekap Keseluruhan

Admin dapat melihat daftar peserta yang belum menyelesaikan kategori tugas tertentu, bukan hanya grafik persentase. Setiap angka rekap harus dapat diklik untuk membuka daftar nama dan NID terkait.

---

## 10. Modul Prestasi Beswan

### 10.1 Tujuan

Menampilkan prestasi beswan berdasarkan kelompok/wilayah mentor dan bulan pelaporan, mulai dari September sesuai brief.

### 10.2 Sumber Data

- Data prestasi pada tahap awal berada pada bagian paling kanan/tab prestasi dari spreadsheet respons utama.
- Data prestasi berikutnya dikumpulkan melalui spreadsheet pendataan prestasi terpisah.

Dashboard perlu menggabungkan pembacaan kedua sumber tanpa menggandakan prestasi yang sama.

### 10.3 Informasi Prestasi

Atribut yang disarankan (sesuaikan dengan kolom aktual spreadsheet):

- NID.
- Nama beswan.
- Nama/judul prestasi.
- Kategori/bidang.
- Tingkat prestasi.
- Penyelenggara.
- Tanggal prestasi diperoleh.
- Tanggal pelaporan.
- Bulan pelaporan.
- Tautan bukti/sertifikat.
- Wilayah dan mentor.
- Status verifikasi jika proses verifikasi memang diterapkan.

Tanggal prestasi diperoleh dan tanggal pelaporan harus dibedakan apabila kedua informasi tersebut tersedia. Rekap bulanan perlu mengikuti definisi bulan yang disepakati; rekomendasi awal adalah berdasarkan bulan pelaporan, dengan tanggal perolehan tetap ditampilkan.

### 10.4 Tampilan

- Filter bulan mulai September.
- Filter wilayah/mentor.
- Rekap jumlah prestasi per wilayah.
- Daftar prestasi per bulan.
- Detail individu dan bukti prestasi.
- Pencarian berdasarkan NID/nama.

Status verifikasi prestasi masih perlu dikonfirmasi. Jangan membuat alur validasi wajib sebelum disepakati.

---

## 11. Modul Data Beswan

Halaman ini menjadi pusat penelusuran peserta.

Fitur:

- Tabel master seluruh beswan.
- Pencarian NID dan nama.
- Filter wilayah dan mentor.
- Detail ringkas peserta.
- Riwayat Pembinaan Nasional.
- Riwayat Mentorship.
- Riwayat pengumpulan dan validasi tugas.
- Riwayat prestasi.
- Penanda jika data peserta belum lengkap atau ada NID yang tidak cocok.

Admin tidak perlu mengedit respons Google Forms secara langsung dari halaman ini. Apabila ada koreksi master data, tentukan spreadsheet master yang menjadi tempat perubahan resmi.

---

## 12. Modul Integrasi dan Kualitas Data

Halaman ini penting karena dashboard membaca beberapa Google Sheets.

### 12.1 Informasi yang Ditampilkan

- Nama sumber data.
- Kegunaan sumber.
- Status koneksi.
- Waktu pembacaan terakhir.
- Jumlah baris/respons yang berhasil dibaca.
- Jumlah data berhasil dipetakan.
- Jumlah NID tidak dikenal.
- Jumlah respons duplikat/potensi duplikat.
- Kolom yang tidak dikenali atau berubah.
- Pesan kesalahan dan tindakan yang disarankan.

### 12.2 Penanganan Data Bermasalah

Sistem tidak boleh menghapus respons yang tidak cocok. Data tersebut tetap ditampilkan pada daftar pengecualian dengan informasi sumber agar admin dapat memperbaikinya.

Kategori pengecualian minimal:

- NID kosong.
- NID tidak ditemukan di master.
- NID ganda dalam master.
- Respons duplikat atau berulang.
- Periode Mentorship tidak dikenali.
- Kategori tugas tidak dikenali.
- Kolom wajib tidak tersedia.
- Tautan bukti tidak valid/tidak dapat dibuka.

### 12.3 Aturan Duplikasi

- Tentukan kunci identitas submission berdasarkan kolom yang benar-benar tersedia di sumber, misalnya timestamp respons, NID, periode, dan kategori.
- Jangan menghapus dua respons hanya karena NID sama; peserta dapat memiliki beberapa aktivitas atau submission.
- Jika ada lebih dari satu respons untuk komponen presensi yang sama, tandai sebagai duplikat/potensi duplikat dan gunakan aturan pemilihan yang disetujui admin.
- Aturan apakah respons pertama atau terakhir yang digunakan belum dikonfirmasi. Sampai diputuskan, tampilkan konflik untuk pemeriksaan dan hindari memilih secara diam-diam.

---

## 13. Rancangan Struktur Google Sheets

Struktur final harus mengikuti spreadsheet yang benar-benar tersedia. Nama tab berikut adalah **rekomendasi struktur logis**, bukan klaim bahwa tab tersebut sudah ada.

### 13.1 Tab Sumber/Operasional

| Nama tab yang direkomendasikan | Fungsi |
|---|---|
| `MASTER_BESWAN` | NID, nomor beswan, nama, universitas, wilayah, mentor |
| `MASTER_WILAYAH_MENTOR` | Daftar wilayah dan mentor |
| `RESPON_PEMBINAAN_NASIONAL` | Respons form Pembinaan Nasional |
| `RESPON_MENTORSHIP` | Respons satu Google Form Mentorship untuk seluruh periode |
| `RESPON_PENUGASAN` | Respons pengumpulan tugas Brand Ambassador |
| `RESPON_PRESTASI` | Respons pendataan prestasi, jika digabung atau diekspor ke workbook terpadu |

### 13.2 Tab Administrasi Dashboard

Tab ini menyimpan konfigurasi dan keputusan admin yang tidak berasal langsung dari respons form.

| Nama tab yang direkomendasikan | Fungsi |
|---|---|
| `CONFIG_PERIODE_MENTORSHIP` | Nomor, bulan, tahun, label pilihan form, dan status pertemuan |
| `VALIDASI_PENUGASAN` | Identitas submission, status validasi, catatan, admin, timestamp |
| `KONFIGURASI_SUMBER` | Spreadsheet ID, nama tab, mapping kolom, dan jenis data |
| `RIWAYAT_SINKRONISASI` | Waktu, hasil, jumlah baris, dan error sinkronisasi |
| `RIWAYAT_AUDIT` | Riwayat perubahan penting oleh admin |

Tab administrasi dapat ditempatkan di workbook Google Sheets yang telah disepakati sebagai workbook administrasi utama. Lokasi finalnya perlu diputuskan saat implementasi. Jangan membuat workbook baru tanpa persetujuan.

### 13.3 Prinsip Pemisahan Data

- Respons mentah dari Google Forms diperlakukan sebagai data sumber dan tidak diedit oleh dashboard.
- Konfigurasi periode, keputusan validasi, dan audit admin disimpan di tab administrasi.
- Data hasil rekap dihitung dari sumber dan konfigurasi.
- Jika hasil rekap disimpan sebagai cache/tab turunan, harus jelas bahwa data tersebut dapat dibangun ulang dari sumber dan bukan sumber kebenaran.

---

## 14. Navigasi dan Spesifikasi Halaman UI

### 14.1 Gaya Visual

Referensi visual: https://gsa.dicoding.com/

Arah desain:

- Dashboard minimalis, bersih, modern, dan informatif.
- Sidebar navigasi di sisi kiri.
- Area konten utama luas dan fokus pada data.
- KPI card untuk ringkasan.
- Tabel dengan pencarian, filter, sorting, dan pagination.
- Badge status dengan warna yang konsisten.
- Grafik hanya digunakan jika membantu membaca pola; hindari grafik dekoratif yang tidak menambah informasi.
- Responsif untuk desktop, tablet, dan layar ponsel.
- Gunakan identitas visual MAI Institute; jangan menyalin identitas visual Google atau Dicoding.

### 14.2 Navigasi Admin

1. Dashboard
2. Pembinaan Nasional
3. Mentorship
4. Penugasan Brand Ambassador
5. Prestasi Beswan
6. Data Beswan
7. Wilayah & Mentor
8. Integrasi Data
9. Validasi (dapat menjadi bagian dari Penugasan atau halaman tersendiri)
10. Pengaturan

### 14.3 Dashboard

Menampilkan KPI utama, ringkasan modul, grafik tren yang relevan, daftar pekerjaan admin yang membutuhkan tindakan (misalnya tugas menunggu validasi), serta status integrasi Google Sheets.

### 14.4 Halaman Modul

Setiap modul sebaiknya memiliki pola tampilan konsisten:

- Judul dan deskripsi halaman.
- Filter periode/bulan/wilayah/mentor jika relevan.
- Kartu ringkasan.
- Tabel rekap.
- Tombol atau tautan untuk membuka detail.
- Indikator sumber dan waktu pembaruan data.
- Empty state saat data belum tersedia.
- Error state yang menjelaskan sumber bermasalah.

### 14.5 Tabel

Tabel harus mendukung:

- Search berdasarkan NID/nama.
- Filter yang relevan.
- Sorting kolom.
- Pagination.
- Tampilan jumlah data.
- Detail baris.
- Ekspor CSV/XLSX jika diputuskan sebagai kebutuhan.

Ekspor data perlu memperhatikan pembatasan akses dan tidak boleh membuat data pribadi terbuka untuk publik.

---

## 15. Kebutuhan Fungsional

| ID | Kebutuhan | Prioritas |
|---|---|---|
| FR-01 | Admin dapat login dan logout. | Must |
| FR-02 | Admin dapat melihat dashboard ringkasan. | Must |
| FR-03 | Sistem dapat membaca beberapa Google Sheets sumber. | Must |
| FR-04 | Sistem dapat mencocokkan respons menggunakan NID. | Must |
| FR-05 | Sistem menampilkan NID yang tidak dikenal/bermasalah. | Must |
| FR-06 | Sistem menampilkan rekap Pembinaan Nasional global, wilayah, dan individu. | Must |
| FR-07 | Sistem memisahkan Opening Program dari persentase lima komponen utama. | Must |
| FR-08 | Sistem menampilkan rekap Mentorship per periode, wilayah, dan individu. | Must |
| FR-09 | Sistem mendukung satu form dan satu spreadsheet Mentorship untuk semua pertemuan. | Must |
| FR-10 | Admin dapat menambahkan konfigurasi periode Mentorship tanpa membuat form/spreadsheet baru. | Must |
| FR-11 | Sistem membedakan tiga komponen presensi Mentorship. | Must |
| FR-12 | Sistem menampilkan rekap tugas per individu, wilayah, dan keseluruhan. | Must |
| FR-13 | Admin dapat memvalidasi submission tugas dan memberikan catatan. | Must |
| FR-14 | Status validasi tugas tersimpan secara persisten di Google Sheets. | Must |
| FR-15 | Sistem menampilkan prestasi per wilayah dan bulan. | Must |
| FR-16 | Sistem menggabungkan sumber prestasi lama dan baru tanpa duplikasi. | Must |
| FR-17 | Sistem menampilkan status dan waktu pembacaan/sinkronisasi sumber. | Must |
| FR-18 | Sinkronisasi ulang tidak menggandakan data. | Must |
| FR-19 | Sistem menampilkan daftar peserta yang belum memenuhi kewajiban tugas. | Must |
| FR-20 | Sistem menyediakan pencarian dan filter di tabel. | Should |
| FR-21 | Sistem menyediakan ekspor laporan. | Should — perlu konfirmasi |
| FR-22 | Sistem menyimpan audit perubahan validasi dan konfigurasi. | Should |

---

## 16. Kebutuhan Non-Fungsional

### 16.1 Keamanan

- Hanya admin terautentikasi yang dapat mengakses dashboard.
- Spreadsheet tidak boleh dibuat publik hanya demi mempermudah integrasi.
- Kredensial API, token, dan secret harus disimpan pada sisi server/lingkungan aman, bukan di kode frontend.
- Validasi akses dilakukan pada setiap endpoint/action yang mengakses data sensitif.
- Jangan menampilkan secret atau token pada log.

### 16.2 Integritas Data

- NID diperlakukan sebagai teks.
- Respons mentah tidak dihapus oleh proses pembacaan.
- Sinkronisasi bersifat idempotent: menjalankan sinkronisasi berulang tidak membuat salinan submission yang sama.
- Konflik dan duplikasi ditandai, bukan diselesaikan melalui tebakan.
- Nilai rekap dapat ditelusuri ke sumber data.

### 16.3 Kinerja dan Reliabilitas

- Tabel perlu menggunakan pagination atau pemuatan bertahap untuk data besar.
- Pembacaan spreadsheet harus menangani kegagalan jaringan, akses ditolak, tab tidak ditemukan, dan perubahan kolom.
- Dashboard harus membedakan data kosong dengan kegagalan mengambil data.
- Tampilkan waktu pembaruan terakhir agar admin mengetahui tingkat kebaruan data.

### 16.4 Kemudahan Penggunaan

- Admin dapat menemukan peserta menggunakan NID atau nama.
- Setiap persentase memiliki penjelasan numerator/denominator atau akses ke rincian perhitungan.
- Status harus menggunakan label yang jelas dan konsisten.
- Hindari kebutuhan input ulang data yang sudah dikumpulkan melalui Google Forms.

---

## 17. Aturan Perhitungan Umum

### 17.1 Cakupan Komponen

Komponen yang belum dilaksanakan tidak masuk penyebut persentase. Komponen yang sudah dilaksanakan tetapi peserta tidak memiliki respons yang valid mengikuti status Tidak Hadir setelah kegiatan ditutup sesuai aturan operasional.

### 17.2 Persentase Agregat

Untuk persentase kehadiran keseluruhan dan wilayah, rekomendasi perhitungan adalah rasio total kehadiran valid terhadap total kesempatan hadir yang sudah terlaksana. Jangan sekadar merata-ratakan persentase peserta apabila jumlah kesempatan hadir setiap peserta berbeda.

### 17.3 Tugas

Pisahkan submission rate dengan valid completion rate. Hanya status Diterima yang dihitung sebagai tugas selesai/valid.

### 17.4 Nilai Kosong

Nilai kosong tidak otomatis ditafsirkan sebagai Tidak Hadir sebelum dipastikan bahwa kegiatan sudah berlangsung dan masa pengisian telah ditutup. Ini mencegah peserta dinilai tidak hadir pada kegiatan yang belum dilaksanakan.

---

## 18. Penanganan Error dan Kasus Khusus

Sistem setidaknya menangani kasus berikut:

1. Spreadsheet tidak dapat diakses.
2. Nama tab berubah atau tab tidak ditemukan.
3. Header/kolom Google Sheets berubah.
4. NID kosong atau tidak ditemukan.
5. NID ganda pada master peserta.
6. Peserta mengirim respons lebih dari satu kali untuk komponen yang sama.
7. Periode Mentorship pada respons tidak cocok dengan konfigurasi periode.
8. Submission tugas tidak mempunyai tautan bukti.
9. Sumber prestasi awal dan baru memuat data yang sama.
10. Admin mengubah keputusan validasi yang sebelumnya telah disimpan.

Untuk setiap error, tampilkan pesan yang membantu admin mengidentifikasi sumber dan langkah pemeriksaan. Jangan menampilkan pesan teknis mentah sebagai satu-satunya informasi.

---

## 19. Acceptance Criteria

Aplikasi dapat dianggap memenuhi kebutuhan minimum apabila:

- [ ] Hanya admin yang dapat login.
- [ ] Tidak terdapat dashboard atau akun beswan/mentor.
- [ ] Data dashboard berasal dari Google Sheets yang ditentukan.
- [ ] Tidak ada database SQL terpisah yang menjadi sumber kebenaran utama.
- [ ] Admin dapat melihat total peserta dari master data terverifikasi.
- [ ] Pencarian NID dan nama berfungsi.
- [ ] Data NID tidak dikenal dapat ditelusuri ke sumbernya.
- [ ] Pembinaan Nasional menampilkan enam komponen, tetapi Opening Program terpisah dari persentase lima komponen utama.
- [ ] Status Pembinaan Nasional mengikuti aturan 0–2, 3–4, dan 5 dari 5.
- [ ] Mentorship memakai satu Google Form dan satu spreadsheet respons untuk seluruh periode.
- [ ] Penambahan periode Mentorship tidak membuat form atau spreadsheet baru.
- [ ] Respons Mentorship lama tetap tersimpan dan dapat direkap berdasarkan periode.
- [ ] Rekap Mentorship menampilkan PM, Pre-Test, dan Post-Test.
- [ ] Tugas dapat divalidasi admin dengan catatan.
- [ ] Keputusan validasi tersimpan secara persisten di Google Sheets.
- [ ] Rekap tugas membedakan terkumpul, menunggu validasi, diterima, ditolak, dan belum mengumpulkan.
- [ ] Prestasi dapat difilter berdasarkan bulan dan wilayah.
- [ ] Sinkronisasi berulang tidak menggandakan respons.
- [ ] Waktu pembaruan dan status sumber data ditampilkan.
- [ ] Angka pada dashboard dapat ditelusuri ke data sumber.

---

## 20. Tahapan Implementasi yang Direkomendasikan

### Tahap 1 — Audit dan Pemetaan Spreadsheet

- Inventarisasi seluruh spreadsheet dan tab.
- Catat header setiap tab.
- Identifikasi kolom NID, nama, wilayah, mentor, timestamp, periode, dan komponen.
- Identifikasi respons duplikat dan NID yang tidak cocok.
- Verifikasi master 120 beswan.
- Tentukan lokasi tab administrasi untuk konfigurasi dan validasi.

**Output:** dokumen data mapping dan daftar isu kualitas data.

### Tahap 2 — Integrasi Google Sheets

- Siapkan akses integrasi secara aman.
- Implementasikan pembacaan semua spreadsheet sumber.
- Implementasikan mapping kolom dan normalisasi.
- Implementasikan pencocokan NID.
- Implementasikan penanganan error, duplikasi, dan log sinkronisasi.

**Output:** data sumber dapat dibaca dan ditampilkan dalam bentuk tabel internal.

### Tahap 3 — Modul Monitoring

- Dashboard ringkasan.
- Pembinaan Nasional.
- Mentorship.
- Data Beswan.
- Prestasi Beswan.

**Output:** admin dapat melihat rekap dan menelusuri detail.

### Tahap 4 — Validasi Penugasan

- Daftar submission.
- Detail submission dan tautan bukti.
- Status diterima/tidak diterima.
- Catatan admin.
- Penulisan status dan catatan ke Google Sheets.
- Riwayat perubahan validasi.

**Output:** proses validasi tidak lagi bergantung pada catatan manual terpisah.

### Tahap 5 — Pengujian dan Serah Terima

- Uji perhitungan dengan sampel manual.
- Uji NID yang tidak cocok.
- Uji respons ganda.
- Uji penambahan periode Mentorship.
- Uji sinkronisasi berulang.
- Uji kegagalan akses spreadsheet.
- Uji hak akses admin.
- Dokumentasi penggunaan admin.

**Output:** dashboard siap digunakan sesuai data dan aturan yang telah diverifikasi.

---

## 21. Hal yang Masih Perlu Dikonfirmasi

Bagian ini sengaja dipisahkan agar asumsi tidak dianggap sebagai keputusan final.

| ID | Pertanyaan | Dampak jika belum diputuskan |
|---|---|---|
| TBD-01 | Bagaimana admin login: email/password, Google Login, atau metode lain? | Desain autentikasi dan pengelolaan akun admin. |
| TBD-02 | Sinkronisasi dilakukan manual, berkala, otomatis, atau kombinasi? | Desain proses integrasi dan kesegaran data. |
| TBD-03 | Di tab mana master peserta resmi berada, dan apakah berisi 120 peserta lengkap? | Akurasi seluruh rekap berbasis NID. |
| TBD-04 | Apakah setiap kategori tugas rutin wajib sekali selama program, per bulan, atau per kegiatan/pertemuan? | Penyebut persentase penyelesaian tugas. |
| TBD-05 | Apakah tugas yang ditolak dapat dikumpulkan ulang? Bagaimana riwayat submission disimpan? | Workflow validasi dan perhitungan tugas. |
| TBD-06 | Jika terdapat dua respons presensi untuk NID, periode, dan komponen yang sama, apakah yang dipakai respons pertama, terakhir, atau pemeriksaan admin? | Akurasi kehadiran. |
| TBD-07 | Apakah prestasi perlu divalidasi admin? | Status dan workflow modul prestasi. |
| TBD-08 | Rekap prestasi per bulan mengikuti bulan prestasi diperoleh atau bulan pelaporan? | Pengelompokan data bulanan. |
| TBD-09 | Apakah admin membutuhkan ekspor rekap ke Excel/CSV/PDF? | Kebutuhan laporan dan unduhan. |
| TBD-10 | Apakah perubahan validasi harus ditulis ke workbook utama tertentu atau workbook administrasi yang ditetapkan? | Penempatan data administratif di Google Sheets. |
| TBD-11 | Bagaimana data historis Mentorship per kelompok dari spreadsheet lama dikonsolidasikan ke satu sumber respons terpadu? | Kelengkapan tren Mentorship lintas pertemuan. |
| TBD-12 | Apakah beswan dapat berpindah wilayah/mentor selama program, dan bagaimana riwayat perpindahannya dicatat? | Akurasi rekap wilayah berdasarkan waktu. |

---

## 22. Catatan Khusus untuk Developer dan AI Coding Assistant

1. Baca dokumen ini sebelum membuat struktur aplikasi.
2. Jangan membuat halaman login atau dashboard Beswan/Mentor.
3. Jangan mengganti Google Sheets dengan MySQL atau database lain sebagai sumber data utama.
4. Jangan membuat Google Form atau spreadsheet baru untuk setiap Mentorship.
5. Jangan menghapus atau menimpa respons historis.
6. Jangan menghitung Opening Program ke dalam persentase lima komponen utama Pembinaan Nasional.
7. Jangan menganggap submission tugas otomatis valid; validasi harus dilakukan admin.
8. Jangan mengubah NID menjadi integer/angka numerik.
9. Jangan mengarang data peserta, nama mentor, jumlah kehadiran, atau persentase. Gunakan data aktual dari sumber.
10. Jangan menyimpulkan status Tidak Hadir untuk kegiatan yang belum dilaksanakan.
11. Jika struktur spreadsheet belum diketahui, lakukan audit dan mapping terlebih dahulu. Jangan menebak nama kolom atau tab.
12. Semua keputusan TBD harus ditandai dan dikonfirmasi sebelum menjadi perilaku final aplikasi.
13. Jika membutuhkan backend, gunakan backend sebagai lapisan aman untuk membaca/menulis Google Sheets dan menerapkan business logic. Hindari menyimpan salinan permanen yang menjadi sumber kebenaran berbeda.
14. Simpan konfigurasi sumber spreadsheet secara terpusat agar admin/developer dapat memperbarui mapping dengan aman.

---

## 23. Ringkasan Prinsip Produk

**MAI Institute Dashboard adalah alat bantu rekapitulasi dan monitoring admin, bukan pengganti Google Forms/Sheets.**

- Google Forms: media pengumpulan respons.
- Google Sheets: basis penyimpanan data utama dan source of truth.
- MAI Institute Dashboard: antarmuka admin untuk membaca, mengelompokkan, menghitung, memvalidasi, dan memonitor data.
- Backend/API (jika digunakan): lapisan integrasi dan keamanan, bukan database utama terpisah.

Prioritas keberhasilan produk adalah akurasi data, konsistensi NID, kejelasan perhitungan, kemudahan rekap, dan terjaganya data historis.

---

**Akhir dokumen — MAI Institute Master Specification v1.0**

## 24. Prompt Utama untuk AI Coding Assistant

Gunakan prompt berikut ketika memberikan dokumen ini kepada AI coding assistant. Prompt ini mengarahkan AI agar membangun dashboard sesuai kebutuhan, bukan membuat sistem baru yang menggantikan Google Forms dan Google Sheets.

```text
Anda bertindak sebagai senior full-stack engineer dan UI/UX designer. Bangun MAI Institute Admin Dashboard berdasarkan seluruh ketentuan dalam dokumen MAI_INSTITUTE_MASTER_SPECIFICATION.md.

KONTEKS PRODUK
MAI Institute adalah dashboard internal untuk membantu admin melakukan rekapitulasi dan monitoring Beasiswa Bintang Mandiri Angkatan 6. Aplikasi ini bukan platform pengumpulan data baru. Pengumpulan presensi, tugas, dan prestasi tetap menggunakan Google Forms yang sudah berjalan.

PRINSIP DATA WAJIB
1. Google Sheets adalah basis penyimpanan data utama (source of truth).
2. Jangan membuat MySQL, PostgreSQL, SQLite, atau database relasional lain sebagai database utama.
3. Jika backend/API diperlukan, fungsinya adalah lapisan integrasi, keamanan, pembacaan/penulisan Google Sheets, dan business logic.
4. Jika cache diperlukan untuk performa, cache hanya sementara dan harus dapat dibangun ulang dari Google Sheets.
5. Data validasi yang dibuat admin harus ditulis secara persisten ke tab administrasi pada Google Sheets yang disepakati. Jangan hanya menyimpannya di state frontend.
6. Data respons mentah Google Forms tidak boleh dihapus atau ditimpa oleh proses sinkronisasi.
7. Gunakan NID sebagai kunci pencocokan utama dan simpan NID sebagai string/teks.

PENGGUNA
- Hanya Admin yang dapat login.
- Beswan tidak memiliki akun atau dashboard.
- Mentor tidak memiliki akun atau dashboard.

MODUL UTAMA
1. Dashboard ringkasan.
2. Pembinaan Nasional.
3. Mentorship.
4. Penugasan Brand Ambassador.
5. Prestasi Beswan.
6. Data Beswan.
7. Wilayah & Mentor.
8. Integrasi Data.
9. Pengaturan.

ATURAN BISNIS PENTING
- Pembinaan Nasional memiliki enam komponen. Opening Program harus ditampilkan terpisah dan tidak masuk ke persentase lima komponen utama.
- Lima komponen utama adalah Presensi Awal, Pre-Test, Post-Test, Presensi Opening Evaluasi, dan Presensi Akhir/Closing.
- Persentase Pembinaan Nasional = jumlah komponen Hadir dari lima komponen utama / 5 x 100%.
- Status 0–2 dari 5 = Tidak Hadir; 3–4 dari 5 = Hadir Sebagian; 5 dari 5 = Hadir Full.
- Status masing-masing komponen hanya Hadir atau Tidak Hadir.
- Mentorship menggunakan satu Google Form dan satu Google Spreadsheet respons untuk seluruh pertemuan. Jangan membuat form atau spreadsheet baru setiap bulan/pertemuan.
- Periode Mentorship ditambahkan sebagai pilihan di Google Form yang sama, misalnya “Mentoring #1 – Januari”, “Mentoring #2 – Februari”, dan seterusnya.
- Admin menambahkan konfigurasi periode secara manual di dashboard. Penambahan periode di dashboard tidak otomatis membuat Google Form atau spreadsheet baru.
- Setiap pertemuan Mentorship memiliki PM, Pre-Test, dan Post-Test. Berdasarkan notulensi, 0–1 komponen hadir = Tidak Hadir; 2–3 komponen hadir = Hadir.
- Tugas Brand Ambassador terdiri dari MAI Foundation, Mentorship, MAI Wilayah, Pembinaan Nasional, dan Tugas Tambahan. Empat kategori pertama adalah tugas rutin; frekuensi rinci kewajibannya masih harus dikonfirmasi.
- Status tugas: Belum Mengumpulkan, Menunggu Validasi, Diterima, Tidak Diterima. Hanya tugas berstatus Diterima dihitung sebagai penyelesaian valid.
- Admin harus dapat memberikan catatan pada validasi tugas.
- Prestasi dapat direkap berdasarkan wilayah dan bulan, mulai September. Sumber data awal dan sumber data berikutnya harus dipetakan agar tidak terjadi duplikasi.

PENGALAMAN PENGGUNA DAN DESAIN
- Gunakan referensi layout dashboard https://gsa.dicoding.com/ sebagai inspirasi struktur, bukan menyalin branding atau tampilannya secara persis.
- Buat dashboard bersih, sederhana, modern, dan mudah dipahami.
- Gunakan sidebar di kiri, header halaman, KPI cards, filter, tabel, badge status, serta grafik seperlunya.
- Utamakan keterbacaan angka dan kemudahan menemukan peserta.
- Setiap angka rekap harus dapat ditelusuri ke daftar/detail yang membentuk angka tersebut.
- Sediakan loading state, empty state, error state, dan indikator waktu pembaruan data.
- Buat tampilan responsif, tetapi optimalkan pengalaman admin desktop karena aktivitas rekap banyak menggunakan tabel.

CARA KERJA YANG DIMINTA
1. Baca dokumen spesifikasi sampai selesai sebelum coding.
2. Audit struktur proyek dan teknologi yang sudah ada. Jangan mengganti stack tanpa alasan dan persetujuan.
3. Audit spreadsheet sumber: inventarisasi file, tab, header, kolom NID, periode, timestamp, wilayah, mentor, serta komponen data.
4. Jangan menebak nama tab atau kolom. Buat mapping berdasarkan hasil audit aktual.
5. Implementasikan lapisan integrasi Google Sheets secara aman. Kredensial tidak boleh berada di frontend atau repository.
6. Implementasikan normalisasi dan pencocokan NID, deteksi data tidak dikenal, dan penanganan duplikasi.
7. Implementasikan modul satu per satu sesuai prioritas dan acceptance criteria.
8. Uji hasil perhitungan menggunakan sampel data nyata yang dapat diverifikasi secara manual.
9. Jangan mengarang nama peserta, mentor, angka presensi, persentase, ataupun hasil prestasi.
10. Tandai semua hal yang masih berstatus TBD. Jangan mengambil keputusan bisnis sendiri untuk hal yang belum ditentukan.

HASIL YANG DIHARAPKAN
- Dashboard admin yang berfungsi dan terhubung dengan Google Sheets.
- Rekap per peserta, per wilayah/mentor, dan keseluruhan.
- Fitur pencarian NID/nama dan filter.
- Proses validasi tugas dengan catatan yang tersimpan di Google Sheets.
- Status integrasi dan log sinkronisasi.
- Tidak ada dashboard beswan/mentor.
- Tidak ada database SQL sebagai source of truth.
- Dokumentasi setup integrasi Google Sheets, konfigurasi sumber, dan cara menjalankan aplikasi.

Mulai dengan audit proyek dan audit struktur Google Sheets. Sebelum membuat asumsi tentang struktur data, tampilkan hasil pemetaan kolom dan daftar hal yang masih perlu dikonfirmasi. Setelah itu, lanjutkan implementasi sesuai spesifikasi.
```

## 25. Lampiran — Daftar NID yang Diberikan

Daftar berikut ditranskripsikan dari brief awal untuk menjadi bahan pencocokan dengan master peserta. Nilai disimpan sebagai teks/string.

**Peringatan verifikasi:** jumlah item pada daftar yang diberikan adalah **121 NID unik**, sedangkan brief menyebut total **120 beswan**. Dengan demikian, daftar ini belum boleh langsung dianggap sebagai master final. Admin MAI perlu mengonfirmasi apakah ada satu NID berlebih, apakah total peserta sebenarnya 121, atau apakah terdapat aturan lain pada daftar tersebut.

```text
601001, 602002, 601003, 601004, 602005, 602006, 601007, 601008, 602009, 602010,
601011, 601012, 602013, 602014, 601015, 602016, 602017, 602018, 602019, 602020,
601021, 601022, 602023, 602024, 602025, 602026, 602027, 602028, 602029, 602030,
602031, 602032, 602033, 602034, 601035, 601036, 601037, 601038, 601039, 602040,
602041, 602042, 601043, 601044, 601045, 602046, 602047, 602048, 602049, 602050,
601051, 601052, 601053, 601054, 602055, 602056, 602057, 601058, 602059, 602060,
602061, 601062, 601063, 601064, 602065, 601066, 601067, 601068, 601069, 601070,
601071, 601072, 601073, 601074, 601075, 601076, 601077, 602078, 602079, 602080,
602081, 602082, 601083, 602084, 602085, 602086, 602087, 602088, 602089, 601090,
602091, 602092, 601093, 601094, 601095, 601096, 601097, 602098, 602099, 601100,
602101, 602102, 602103, 602104, 602105, 601106, 602107, 602108, 602109, 601110,
602111, 602112, 602113, 601114, 602115, 602116, 602117, 602118, 602119, 602120,
601121
```

Sebelum go-live, cocokkan seluruh NID di atas dengan kolom NID pada master peserta resmi beserta nama, nomor beswan, universitas, wilayah, dan mentor. Jangan membuat nama peserta atau mengubah NID berdasarkan pola angka.

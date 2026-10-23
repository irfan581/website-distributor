# Website Distributor Pertanian

Website korporat dua bahasa untuk distributor pupuk dan produk perlindungan
tanaman. Bukan e-commerce: tujuannya memperkenalkan perusahaan, menampilkan
katalog produk, dan mengarahkan pengunjung ke tim sales lewat WhatsApp.

> **Catatan salinan portofolio.** Repo ini salinan dari proyek nyata yang saya
> kerjakan untuk sebuah distributor pupuk di Jawa Timur. Nama usaha, domain,
> alamat, nomor telepon, nama karyawan, foto, logo, kunci Firebase, dan
> konfigurasi server sudah diganti atau dihapus. "Tani Makmur" adalah nama
> samaran. Riwayat commit tidak disertakan.

**Stack:** Nuxt 4 · Vue 3 · TypeScript · Tailwind CSS v4 · Pinia · GSAP · VueUse

Bagian dari satu sistem bersama
[`sistem-distribusi-admin`](https://github.com/irfan581/sistem-distribusi-admin),
[`aplikasi-sales`](https://github.com/irfan581/aplikasi-sales), dan
[`aplikasi-driver`](https://github.com/irfan581/aplikasi-driver).

---

## Menjalankan

```bash
npm install
npm run dev          # http://localhost:3000

npm run build        # build produksi
npm run preview      # pratinjau hasil build
npx nuxi typecheck   # pemeriksaan tipe
```

---

## Struktur

```
app/
  assets/css/main.css     Design system: token warna, tipografi, utility
  components/
    ui/                   Elemen dasar — tombol, select, field, pagination,
                          motif kontur, ilustrasi produk, kepala section
    layout/               Header + mega menu, navigasi mobile, footer,
                          pengalih bahasa, tombol WhatsApp
    home/                 13 section beranda
    product/              Kartu produk, katalog berfilter, galeri produk
    shared/               Dipakai lintas halaman — hero halaman, remah roti,
                          peta jangkauan, kartu artikel, formulir kontak, CTA
  composables/            useApi, useContent, useLocalized, useCatalogFilters,
                          useReveal, useMotion, useNavigation, useFormat
  stores/                 settings, ui
  pages/                  Rute publik
  plugins/gsap.client.ts  GSAP + ScrollTrigger, khusus sisi klien

shared/types/content.ts   Kontrak data — dipakai app/ maupun server/
server/
  data/                   Data benih sementara (dihapus setelah API siap)
  api/v1/                 Endpoint yang meniru kontrak Laravel
  utils/repository.ts     Query in-memory yang meniru Eloquent
i18n/locales/             id.json, en.json
```

---

## Lapisan data

Semua komponen mengambil data lewat `useApi()` → `/v1/...`. Tidak ada satu pun
komponen yang mengimpor data benih secara langsung.

Saat dashboard Laravel siap:

```bash
# .env
NUXT_PUBLIC_API_BASE=https://api.example.com
```

Setelah itu `server/api/v1/` dan `server/data/` boleh dihapus — bentuk respons
sudah identik.

Pemeriksaan bahwa pemisahan ini masih terjaga:

```bash
grep -r "server/data" app/     # harus kosong
grep -r '\$fetch(' app/pages app/components   # harus kosong
```

---

## Dua bahasa

Indonesia adalah bahasa bawaan; Inggris memakai prefiks `/en/`. Alamat halaman
tetap dalam bahasa Indonesia (`/produk`, `/tentang-kami`) agar kata kunci lokal
terjaga.

- **Label antarmuka** → `i18n/locales/*.json`, dipanggil dengan `$t()`
- **Konten dari API** → objek `{ id, en }`, diselesaikan dengan `useLocalized()`

Deteksi bahasa peramban sengaja dimatikan: setiap pengunjung mendarat di halaman
Indonesia dan berpindah lewat pengalih bahasa. Konsekuensinya tidak ada
pengalihan di URL akar dan setiap URL bisa disimpan di cache CDN.

---

## Identitas visual

| Peran | Token |
|---|---|
| Oranye identitas (isian, ikon, aksen) | `tmk-500` `#F26B0F` |
| Oranye untuk teks | `tmk-600` `#C04409`, hover `tmk-700` |
| Hijau sekunder | `leaf-600` `#1F7A46` |
| Latar | `surface` putih, `surface-muted` `#F6F7F5` |
| Judul | Poppins | 
| Isi teks | Inter |

**Aturan kontras:** jangan menaruh teks di atas `tmk-500` — putih di atasnya
hanya mencapai 3:1. Gunakan `tmk-600` untuk semua kombinasi yang memuat teks.
`ink-400` dan `ink-500` sudah dikalibrasi agar lolos 4,5:1 pada latar putih
maupun `surface-muted`.

**Motif tanda tangan:** garis kontur ladang — kurva SVG bertumpuk yang muncul
sebagai latar hero, pembatas antar-section, dan tekstur kartu. Semuanya SVG
buatan sendiri; tidak ada berkas gambar yang perlu diunduh.

### Animasi

Komponen tidak menulis `gsap.from()` langsung. Semua lewat composable:

| Composable | Kegunaan |
|---|---|
| `useReveal(root)` | Elemen ber-`data-reveal` muncul bertahap saat masuk layar |
| `useMagnetic(el)` | Tombol tertarik ke arah kursor |
| `useMouseParallax(root)` | Lapisan ber-`data-parallax` bergeser mengikuti kursor |
| `useScrollParallax(root)` | Lapisan ber-`data-scroll-parallax` bergeser saat menggulir |
| `useCounter(el, nilai)` | Angka menghitung naik |

Semuanya menghormati `prefers-reduced-motion` dan membersihkan diri saat
komponen dilepas.

---

## Hasil pengujian

Lighthouse desktop, diukur pada build produksi versi asli (sebelum foto diganti gambar pengganti):

| Halaman | Performa | Aksesibilitas | Praktik Terbaik | SEO |
|---|---|---|---|---|
| Beranda | 99 | 100 | 100 | 100 |
| Katalog | 99 | 100 | 100 | 100 |
| Detail produk | 99 | 100 | 100 | 100 |
| Kontak | 100 | 100 | 100 | 100 |
| Tentang kami | 99 | 100 | 100 | 100 |
| Galeri | 99 | 100 | 100 | 100 |
| Artikel | 99 | 100 | 100 | 100 |
| Promo | 100 | 100 | 100 | 100 |
| Beranda (EN) | 98 | 100 | 100 | 100 |

Mobile (throttle 4× CPU + 4G lambat), diukur di balik proxy gzip: **87–91**.
Tanpa kompresi turun ke 78–87 — dokumen HTML 173 KB menjadi 34 KB setelah gzip.
Aktifkan gzip/brotli di server web saat produksi.

Sitemap: 36 URL per bahasa, lengkap dengan tautan alternatif hreflang.

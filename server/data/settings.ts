import type { SiteSettings } from '#shared/types/content'

/** Pengaturan situs Toko Pertanian Tani Makmur. `phone` masih placeholder. */
export const settings: SiteSettings = {
  company: {
    name: 'Tani Makmur',
    legal_name: 'Toko Pertanian Tani Makmur',
    tagline: {
      id: 'Distributor Pupuk & Perlindungan Tanaman Terpercaya di Jawa Timur',
      en: 'Trusted Fertilizer & Crop Protection Distributor in East Java',
    },
    description: {
      id: 'Tani Makmur mendistribusikan pupuk non-subsidi dan produk perlindungan tanaman berkualitas untuk petani, toko pertanian, koperasi, dan distributor di Jawa Timur hingga Jawa Tengah.',
      en: 'Tani Makmur distributes quality non-subsidised fertilisers and crop protection products for farmers, agri-stores, cooperatives, and distributors across East and Central Java.',
    },
    founded_year: 2018,
  },

  /**
   * Alamat, titik peta, dan WhatsApp sudah resmi; `phone` dan `email` sengaja kosong, jangan diisi karangan.
   * `whatsapp` adalah nomor admin pusat, BUKAN untuk tombol "Hubungi Sales" (lihat `useContactAction`).
   * Nomor lama 6281200000001 milik akun uji coba, jangan dipakai.
   */
  contact: {
    /* Baris pertama hanya bagian jalan (dipakai sebagai `streetAddress`). */
    address_lines: [
      'Jl. Contoh Raya No. 1',
      'Kecamatan Contoh',
      'Kabupaten Madiun, Jawa Timur 60000',
    ],
    address_full:
      'Jl. Contoh Raya No. 1, Kecamatan Contoh, Kabupaten Madiun, Jawa Timur 60000',
    phone: '',
    phone_display: '+62 XXX XXXX XXXX',
    whatsapp: '6281200000002',
    whatsapp_display: '+62 812-0000-0002',
    email: '',
    business_hours: [
      { days: { id: 'Senin sampai Sabtu', en: 'Monday to Saturday' }, hours: '07.30 sampai 16.00' },
      { days: { id: 'Minggu & Hari Libur', en: 'Sunday & Public Holidays' }, hours: 'Tutup' },
    ],
  },

  /** Titik asli showroom; zoom 17 agar penanda jatuh di bangunan toko. */
  maps: {
    lat: -7.6298,
    lng: 111.5239,
    embed:
      'https://www.google.com/maps?q=-7.6298,111.5239&z=17&output=embed',
    link: 'https://www.google.com/maps?q=-7.6298,111.5239',
  },

  social: {
    instagram: null,
    facebook: null,
    youtube: null,
  },

  seo: {
    default_title: {
      id: 'Tani Makmur | Distributor Pupuk & Perlindungan Tanaman Madiun',
      en: 'Tani Makmur | Fertilizer & Crop Protection Distributor, Madiun',
    },
    default_description: {
      id: 'Distributor pupuk non-subsidi dan perlindungan tanaman di Madiun, Jawa Timur. Melayani petani, toko pertanian, koperasi, dan distributor sejak 2018.',
      en: 'Non-subsidised fertilizer and crop protection distributor in Madiun, East Java. Serving farmers, agri-stores, cooperatives, and distributors since 2018.',
    },
    og_image: '/og/default.png',
  },
}

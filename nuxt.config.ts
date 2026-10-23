import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
  ],

  css: ['~/assets/css/main.css'],

  /** Nama komponen dari nama berkas saja, tanpa awalan folder. */
  components: [{ path: '~/components', pathPrefix: false }],

  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    public: {
      /** Basis REST API; sementara Nitro (`server/api`), nanti lewat NUXT_PUBLIC_API_BASE. */
      apiBase: '/api',
      siteUrl: 'https://www.example.com',
    },
  },

  site: {
    url: 'https://www.example.com',
    name: 'Tani Makmur',
    description:
      'Distributor pupuk non-subsidi dan perlindungan tanaman di Madiun, Jawa Timur. Melayani petani, toko pertanian, koperasi, dan distributor di Jawa Timur & Jawa Tengah.',
    defaultLocale: 'id',
  },

  sitemap: {
    /* Rute yang lahir dari data disuplai oleh server/api/__sitemap__/urls.ts */
    sources: ['/api/__sitemap__/urls'],
    /* Halaman galat tidak boleh ikut terdaftar. */
    exclude: ['/404', '/500'],
  },

  i18n: {
    defaultLocale: 'id',
    strategy: 'prefix_except_default',
    langDir: 'locales',
    baseUrl: 'https://www.example.com',
    locales: [
      { code: 'id', language: 'id-ID', name: 'Indonesia', file: 'id.json', dir: 'ltr' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json', dir: 'ltr' },
    ],
    /** Deteksi bahasa peramban dimatikan: semua pengunjung mendarat di halaman Indonesia. */
    detectBrowserLanguage: false,
    /**
     * Pesan bahasa ikut dikirim di dalam HTML, tidak diambil terpisah lewat /_i18n/.
     * Tanpa ini, perender yang gagal mengambil berkas itu (mis. Googlebot) menampilkan kunci mentah.
     */
    experimental: { preload: true, stripMessagesPayload: false },
  },

  fonts: {
    families: [
      // Apropal Bold (judul) di-host lokal lewat @font-face di main.css,
      // sengaja tidak didaftarkan di sini agar modul @nuxt/fonts tidak
      // mencoba resolve-nya sebagai font Google.
      { name: 'Noto Sans Bengali', provider: 'google', weights: [400, 500, 600, 700] },
    ],
    defaults: { subsets: ['latin'] },
  },

  image: {
    quality: 78,
    format: ['webp'],
    densities: [1, 2],
    screens: { xs: 320, sm: 375, md: 425, lg: 768, xl: 1024, xxl: 1440, '4k': 1920 },
  },

  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        /* Oranye utama brand guideline; mewarnai bilah alamat di Chrome Android. */
        { name: 'theme-color', content: '#fc8004' },
        { name: 'google', content: 'notranslate' },
      ],
      link: [{ rel: 'icon', type: 'image/png', href: '/brand/favicon.png' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  /* Artikel dinonaktifkan (lihat `useNavigation.ts`). 302, BUKAN 301, agar bisa dinyalakan lagi; satu baris per bahasa. */
  routeRules: {
    '/artikel': { redirect: { to: '/', statusCode: 302 } },
    '/artikel/**': { redirect: { to: '/', statusCode: 302 } },
    '/en/artikel': { redirect: { to: '/en', statusCode: 302 } },
    '/en/artikel/**': { redirect: { to: '/en', statusCode: 302 } },
  },

  nitro: {
    compressPublicAssets: true,
  },

  /** `typedPages` mati: dengan i18n `prefix_except_default`, `localePath('/produk')` ditolak pemeriksa tipe. */
})

/** Struktur navigasi tunggal untuk header, mega menu, navigasi mobile, dan footer. */
export interface NavItem {
  key: string
  label: string
  to: string
  /** Menandai item yang membuka mega menu kategori produk. */
  mega?: boolean
  children?: NavItem[]
}

/*
 * ARTIKEL DINONAKTIFKAN (28 Sep 2026): angka dosisnya belum ditinjau. Tautan dilepas dan /artikel dialihkan;
 * tulisannya tetap ada di `server/data/editorial.ts`, jadi menyalakannya cukup membalik perubahan ini.
 */
export function useNavigation() {
  const { t } = useI18n()
  const localePath = useLocalePath()

  const primary = computed<NavItem[]>(() => [
    // Beranda wajib ada di menu desktop; tidak semua orang tahu logo bisa diklik.
    { key: 'home', label: t('nav.home'), to: localePath('/') },
    { key: 'about', label: t('nav.about'), to: localePath('/tentang-kami') },
    { key: 'products', label: t('nav.products'), to: localePath('/produk'), mega: true },
    { key: 'services', label: t('nav.services'), to: localePath('/layanan') },
    { key: 'sales', label: t('nav.sales'), to: localePath('/sales') },
    { key: 'coverage', label: t('nav.coverage'), to: localePath('/jangkauan-distribusi') },
    // Promo dilepas (syaratnya dirundingkan sales per kios), jadi dua sisanya tampil langsung tanpa menu "Informasi".
    { key: 'gallery', label: t('nav.gallery'), to: localePath('/galeri') },
  ])

  /** Navigasi mobile menampilkan seluruh halaman secara datar, tanpa sub-menu. */
  const mobile = computed<NavItem[]>(() => [
    { key: 'home', label: t('nav.home'), to: localePath('/') },
    { key: 'about', label: t('nav.about'), to: localePath('/tentang-kami') },
    { key: 'products', label: t('nav.products'), to: localePath('/produk') },
    { key: 'services', label: t('nav.services'), to: localePath('/layanan') },
    { key: 'sales', label: t('nav.sales'), to: localePath('/sales') },
    { key: 'coverage', label: t('nav.coverage'), to: localePath('/jangkauan-distribusi') },
    { key: 'gallery', label: t('nav.gallery'), to: localePath('/galeri') },
    { key: 'contact', label: t('nav.contact'), to: localePath('/hubungi-kami') },
  ])

  // Daftar kedua di footer dibuang karena mengulang; Artikel dipindah ke sini.
  const footerCompany = computed<NavItem[]>(() => [
    { key: 'about', label: t('nav.about'), to: localePath('/tentang-kami') },
    { key: 'services', label: t('nav.services'), to: localePath('/layanan') },
    { key: 'sales', label: t('nav.sales'), to: localePath('/sales') },
    { key: 'coverage', label: t('nav.coverage'), to: localePath('/jangkauan-distribusi') },
    { key: 'gallery', label: t('nav.gallery'), to: localePath('/galeri') },
  ])

  return { primary, mobile, footerCompany }
}

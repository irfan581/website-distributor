import { galleryItems } from '../../data/editorial'
import { productRecords } from '../../data/catalog'
import { categories } from '../../data/catalog'

/** Sumber URL dinamis sitemap: produk, kategori, dan artikel beserta tanggal perubahannya. */
export default defineSitemapEventHandler(() => {
  const now = new Date().toISOString().slice(0, 10)

  /** `_i18nTransform` membuat modul sitemap membangkitkan versi Indonesia dan Inggris. */
  const i18n = { _i18nTransform: true as const }

  return [
    ...categories.map((category) => ({
      loc: `/kategori/${category.slug}`,
      lastmod: now,
      changefreq: 'weekly' as const,
      priority: 0.8 as const,
      ...i18n,
    })),

    ...productRecords.map((product) => ({
      loc: `/produk/${product.slug}`,
      lastmod: product.updated_at,
      changefreq: 'monthly' as const,
      /* Produk unggulan diberi bobot lebih tinggi di dalam katalog. */
      priority: product.is_featured ? (0.9 as const) : (0.7 as const),
      ...i18n,
    })),


    /* Artikel dinonaktifkan sementara; lihat catatan di useNavigation.ts. */

    /* Galeri tidak punya halaman per item, tetapi tanggal terbarunya menandai
       seberapa segar halaman galeri itu sendiri. */
    {
      loc: '/galeri',
      lastmod: galleryItems[0]?.taken_at ?? now,
      changefreq: 'monthly' as const,
      priority: 0.5 as const,
      ...i18n,
    },
  ]
})

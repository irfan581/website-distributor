import type {
  Article,
  ArticleSummary,
  Brand,
  Category,
  Collection,
  GalleryItem,
  PaginationMeta,
  Product,
  ProductImage,
  ProductSummary,
  SalesContact,
  SalesRegion,
} from '#shared/types/content'
import { articles, galleryItems } from '../data/editorial'
import { coverageAreas, salesContacts } from '../data/company'
import { brands, buildProductImage, categories, productRecords } from '../data/catalog'
import type { ProductRecord } from '../data/catalog'

/** Repository in-memory yang meniru query Eloquent; bentuk responsnya sama dengan API Resource Laravel nanti. */

/* -------------------------------------------------------------------------- */
/* Utilitas                                                                    */
/* -------------------------------------------------------------------------- */

export function paginate<T>(items: T[], page: number, perPage: number): Collection<T> {
  const total = items.length
  const lastPage = Math.max(1, Math.ceil(total / perPage))
  const safePage = Math.min(Math.max(1, page), lastPage)
  const offset = (safePage - 1) * perPage
  const data = items.slice(offset, offset + perPage)

  const meta: PaginationMeta = {
    current_page: safePage,
    last_page: lastPage,
    per_page: perPage,
    total,
    from: total === 0 ? 0 : offset + 1,
    to: offset + data.length,
  }

  return { data, meta }
}

/** Pencocokan longgar agar pencarian tetap berguna untuk salah ketik ringan. */
function matches(haystack: string, needle: string): boolean {
  return haystack.toLowerCase().includes(needle.toLowerCase().trim())
}

/* -------------------------------------------------------------------------- */
/* Produk                                                                      */
/* -------------------------------------------------------------------------- */

function categoryOf(slug: string) {
  const category = categories.find((c) => c.slug === slug)
  if (!category) throw new Error(`Kategori tidak dikenal: ${slug}`)
  return { id: category.id, slug: category.slug, name: category.name }
}

function brandOf(slug: string | null) {
  if (!slug) return null
  const brand = brands.find((b) => b.slug === slug)
  return brand ? { id: brand.id, slug: brand.slug, name: brand.name } : null
}

export function toProductSummary(record: ProductRecord): ProductSummary {
  return {
    id: record.id,
    slug: record.slug,
    name: record.name,
    tagline: record.tagline,
    excerpt: record.excerpt,
    category: categoryOf(record.category_slug),
    brand: brandOf(record.brand_slug),
    badge: record.badge,
    packaging: record.packaging,
    image: buildProductImage(record),
    is_featured: record.is_featured,
    is_bestseller: record.is_bestseller,
  }
}

/** Skor kedekatan produk terkait; tertinggi bila merek dan kategorinya sama. Tidak pernah menggabungkan produk. */
function skorKedekatan(kandidat: ProductRecord, acuan: ProductRecord): number {
  const merekSama = kandidat.brand_slug !== null && kandidat.brand_slug === acuan.brand_slug
  const kategoriSama = kandidat.category_slug === acuan.category_slug

  if (merekSama && kategoriSama) return 3
  if (kategoriSama) return 2
  if (merekSama) return 1
  return 0
}

export function toProductDetail(record: ProductRecord): Product {
  const related = productRecords
    .filter((r) => r.slug !== record.slug)
    .map((r) => ({ r, skor: skorKedekatan(r, record) }))
    .filter(({ skor }) => skor > 0)
    /* Urutan kedua memakai `sort_order` supaya hasilnya tetap sama pada tiap
       permintaan, bukan bergantung pada kestabilan sort bawaan mesin. */
    .sort((a, b) => b.skor - a.skor || a.r.sort_order - b.r.sort_order)
    .slice(0, 4)
    .map(({ r }) => toProductSummary(r))

  return {
    ...toProductSummary(record),
    description: record.description,
    specs: record.specs,
    benefits: record.benefits,
    usage: record.usage,
    packaging_options: record.packaging_options,
    /* Satu gambar saja per produk karena desain lainnya hanya beda latar. Berkas dan `image_count` tidak diubah. */
    gallery: [buildProductImage(record, 0)],
    /* Dokumen kosong sampai ada berkas sungguhan, tanpa entri ber-url '#'. */
    documents: [],
    related,
    updated_at: record.updated_at,
  }
}

export interface FindProductsOptions {
  q?: string
  category?: string
  brand?: string
  sort?: string
  featured?: boolean
  page?: number
  perPage?: number
}

export function findProducts(options: FindProductsOptions): Collection<ProductSummary> {
  let items = [...productRecords]

  if (options.category) {
    items = items.filter((r) => r.category_slug === options.category)
  }

  if (options.brand) {
    items = items.filter((r) => r.brand_slug === options.brand)
  }

  if (options.featured) {
    items = items.filter((r) => r.is_featured)
  }

  if (options.q) {
    const q = options.q
    items = items.filter(
      (r) =>
        matches(r.name, q) ||
        matches(r.tagline.id, q) ||
        matches(r.tagline.en, q) ||
        matches(r.excerpt.id, q) ||
        matches(r.excerpt.en, q) ||
        r.specs.some((s) => matches(s.value, q)),
    )
  }

  switch (options.sort) {
    case 'name_asc':
      items.sort((a, b) => a.name.localeCompare(b.name, 'id'))
      break
    case 'name_desc':
      items.sort((a, b) => b.name.localeCompare(a.name, 'id'))
      break
    case 'newest':
      items.sort((a, b) => b.updated_at.localeCompare(a.updated_at) || a.sort_order - b.sort_order)
      break
    case 'featured':
      /* Unggulan lebih dulu, lalu terlaris, lalu urutan katalog. */
      items.sort(
        (a, b) =>
          Number(b.is_featured) - Number(a.is_featured) ||
          Number(b.is_bestseller) - Number(a.is_bestseller) ||
          a.sort_order - b.sort_order,
      )
      break
    default:
      /* "catalog": urutan katalog cetak. `sort_order` mengikuti urutan produk
         di katalog PDF, sehingga satu seri (ZA, Urea, NPK 16, dan seterusnya)
         tampil berdampingan seperti di katalognya. */
      items.sort((a, b) => a.sort_order - b.sort_order)
  }

  return paginate(items.map(toProductSummary), options.page ?? 1, options.perPage ?? 12)
}

export function findProductBySlug(slug: string): Product | null {
  const record = productRecords.find((r) => r.slug === slug)
  return record ? toProductDetail(record) : null
}

/* -------------------------------------------------------------------------- */
/* Kategori & merek — jumlah produk selalu dihitung ulang dari data            */
/* -------------------------------------------------------------------------- */

/** Banyaknya foto cuplikan per kategori; kartu biasa memakai tiga pertama. */
const JUMLAH_CUPLIKAN = 6

/** Foto cuplikan kategori: produk unggulan dulu, sisanya diambil berjarak rata. */
function cuplikan(slug: string): ProductImage[] {
  const isi = productRecords
    .filter((r) => r.category_slug === slug && r.image_count > 0)
    .sort((a, b) => a.sort_order - b.sort_order)

  const terpilih = isi.filter((r) => r.is_featured).slice(0, JUMLAH_CUPLIKAN)
  const sisa = isi.filter((r) => !terpilih.includes(r))
  const kurang = Math.min(JUMLAH_CUPLIKAN - terpilih.length, sisa.length)
  for (let i = 0; i < kurang; i++) {
    terpilih.push(sisa[Math.floor((i * sisa.length) / kurang)]!)
  }
  return terpilih.map((r) => buildProductImage(r))
}

export function findCategories(): Category[] {
  return categories
    .map((category) => ({
      ...category,
      products_count: productRecords.filter((r) => r.category_slug === category.slug).length,
      preview: cuplikan(category.slug),
    }))
    .sort((a, b) => a.sort_order - b.sort_order)
}

export function findCategoryBySlug(slug: string): Category | null {
  return findCategories().find((c) => c.slug === slug) ?? null
}

export function findBrands(): Brand[] {
  return brands
    .map((brand) => ({
      ...brand,
      products_count: productRecords.filter((r) => r.brand_slug === brand.slug).length,
    }))
    .filter((brand) => brand.products_count > 0)
    .sort((a, b) => b.products_count - a.products_count || a.name.localeCompare(b.name))
}

/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */



/* -------------------------------------------------------------------------- */
/* Artikel                                                                     */
/* -------------------------------------------------------------------------- */

function toArticleSummary(article: Article): ArticleSummary {
  const { body: _body, tags: _tags, related: _related, ...summary } = article
  return summary
}

export function findArticles(page = 1, perPage = 9): Collection<ArticleSummary> {
  const sorted = [...articles].sort((a, b) => b.published_at.localeCompare(a.published_at))
  return paginate(sorted.map(toArticleSummary), page, perPage)
}

export function findArticleBySlug(slug: string): Article | null {
  const article = articles.find((a) => a.slug === slug)
  if (!article) return null

  /* Artikel terkait: kategori sama lebih dulu, dilengkapi artikel terbaru lain. */
  const sameCategory = articles.filter(
    (a) => a.slug !== slug && a.category.id === article.category.id,
  )
  const others = articles.filter(
    (a) => a.slug !== slug && a.category.id !== article.category.id,
  )
  const related = [...sameCategory, ...others].slice(0, 3).map(toArticleSummary)

  return { ...article, related }
}

/* -------------------------------------------------------------------------- */
/* Tim sales                                                                   */
/* -------------------------------------------------------------------------- */

/** Hanya sales aktif yang tampil di situs publik, diurutkan sesuai `sort_order`. */
export function findSales(region?: string): SalesContact[] {
  const active = salesContacts
    .filter((sales) => sales.is_active)
    .sort((a, b) => a.sort_order - b.sort_order)

  if (!region || region === 'all') return active
  return active.filter((sales) => sales.regions.includes(region))
}

export function findSalesBySlug(slug: string): SalesContact | null {
  return salesContacts.find((sales) => sales.slug === slug && sales.is_active) ?? null
}

/** Hanya wilayah yang punya sales, agar filter tidak berujung daftar kosong. */
export function findSalesRegions(): SalesRegion[] {
  return coverageAreas
    .map((area) => ({
      slug: area.slug,
      name: area.name,
      province: area.province,
      sales_count: salesContacts.filter(
        (sales) => sales.is_active && sales.regions.includes(area.slug),
      ).length,
    }))
    .filter((region) => region.sales_count > 0)
    .sort((a, b) => a.name.localeCompare(b.name, 'id'))
}

/* -------------------------------------------------------------------------- */
/* Galeri                                                                      */
/* -------------------------------------------------------------------------- */

export function findGallery(category?: string): GalleryItem[] {
  const items = [...galleryItems].sort((a, b) => b.taken_at.localeCompare(a.taken_at))
  if (!category || category === 'all') return items
  return items.filter((item) => item.category === category)
}

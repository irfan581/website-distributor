/** Kontrak data publik, dipakai `app/` dan `server/`. API Laravel nanti harus menghasilkan bentuk ini persis. */

/** Teks yang punya versi dua bahasa. Di database nanti = kolom `*_id` dan `*_en`. */
export interface Localized {
  id: string
  en: string
}

export type LocaleCode = 'id' | 'en'

/* -------------------------------------------------------------------------- */
/* Amplop respons — mengikuti Laravel API Resource                            */
/* -------------------------------------------------------------------------- */

export interface PaginationMeta {
  current_page: number
  last_page: number
  per_page: number
  total: number
  from: number
  to: number
}

export interface Collection<T> {
  data: T[]
  meta: PaginationMeta
}

export interface Single<T> {
  data: T
}

/* -------------------------------------------------------------------------- */
/* Katalog                                                                     */
/* -------------------------------------------------------------------------- */

/** Kunci ikon yang dirender komponen <IconGlyph>. Bukan URL — supaya bebas aset. */
export type IconKey =
  | 'granule'
  | 'leaf'
  | 'drop'
  | 'shield'
  | 'sprout'
  | 'bug'
  | 'spray'
  | 'mouse'
  | 'truck'
  | 'warehouse'
  | 'store'
  | 'handshake'
  | 'chat'
  | 'map'
  | 'network'
  | 'certificate'
  | 'clock'
  | 'phone'
  | 'mail'
  | 'pin'

export interface Category {
  id: number
  slug: string
  name: Localized
  tagline: Localized
  description: Localized
  icon: IconKey
  /** Warna aksen kartu kategori — token, bukan hex bebas. */
  accent: 'tmk' | 'leaf'
  image: string | null
  products_count: number
  sort_order: number
  /** Foto cuplikan isi kategori, diisi API, bukan data katalog. */
  preview?: ProductImage[]
}

export interface Brand {
  id: number
  slug: string
  name: string
  origin: Localized | null
  logo: string | null
  products_count: number
}

export interface ProductSpec {
  label: Localized
  value: string
}

export interface ProductImage {
  id: number
  url: string | null
  alt: Localized
  /** Fallback art-direction saat `url` masih null. */
  placeholder: string
}

export interface ProductDocument {
  id: number
  title: Localized
  url: string
  /** Ukuran berkas siap tampil, mis. "1.2 MB". */
  size: string
  type: 'pdf'
}

/** Bentuk ringkas untuk kartu di grid katalog. */
export interface ProductSummary {
  id: number
  slug: string
  name: string
  tagline: Localized
  excerpt: Localized
  category: Pick<Category, 'id' | 'slug' | 'name'>
  brand: Pick<Brand, 'id' | 'slug' | 'name'> | null
  badge: Localized | null
  packaging: string
  image: ProductImage
  is_featured: boolean
  is_bestseller: boolean
}

/** Bentuk lengkap untuk halaman detail produk. */
export interface Product extends ProductSummary {
  description: Localized
  specs: ProductSpec[]
  benefits: Localized[]
  usage: Localized[]
  packaging_options: string[]
  gallery: ProductImage[]
  documents: ProductDocument[]
  related: ProductSummary[]
  updated_at: string
}

export type ProductSort = 'catalog' | 'featured' | 'name_asc' | 'name_desc' | 'newest'

export interface ProductQuery {
  q?: string
  category?: string
  brand?: string
  sort?: ProductSort
  page?: number
  per_page?: number
  featured?: boolean
}

/* -------------------------------------------------------------------------- */
/* Konten editorial                                                            */
/* -------------------------------------------------------------------------- */


export interface ArticleSummary {
  id: number
  slug: string
  title: Localized
  excerpt: Localized
  category: Localized
  author: string
  published_at: string
  reading_minutes: number
  image: string | null
  placeholder: string
}

export interface ArticleBlock {
  type: 'paragraph' | 'heading' | 'list' | 'quote'
  text?: Localized
  items?: Localized[]
}

export interface Article extends ArticleSummary {
  body: ArticleBlock[]
  tags: Localized[]
  related: ArticleSummary[]
}

export type GalleryCategory =
  | 'gudang'
  | 'toko'
  | 'produk'
  | 'kegiatan'
  | 'distribusi'
  | 'petani'

export interface GalleryItem {
  id: number
  title: Localized
  caption: Localized
  category: GalleryCategory
  image: string | null
  placeholder: string
  /** Rasio tinggi/lebar untuk masonry tanpa layout shift. */
  ratio: number
  taken_at: string
}

/* -------------------------------------------------------------------------- */
/* Profil perusahaan & pengaturan situs                                        */
/* -------------------------------------------------------------------------- */

export interface CoverageArea {
  id: number
  /** Dipakai untuk menautkan wilayah dengan sales yang menanganinya. */
  slug: string
  name: string
  province: Localized
  /** Posisi relatif pada peta SVG (persen), bukan koordinat geografis. */
  x: number
  y: number
  is_hub: boolean
}

export interface Service {
  id: number
  slug: string
  title: Localized
  summary: Localized
  description: Localized
  icon: IconKey
  /** Foto panel visual halaman layanan; null berarti gradien dan motif kontur. */
  image: string | null
  points: Localized[]
}

export interface ValueItem {
  title: Localized
  description: Localized
  icon: IconKey
}

export interface TimelineItem {
  year: string
  title: Localized
  description: Localized
}

export interface Achievement {
  value: number
  suffix: string
  label: Localized
  /** Tahun ditampilkan apa adanya, bukan dihitung mundur dari nol. */
  is_year?: boolean
  /** Sumber angka yang dihitung ulang API; bila diisi, `value` di data hanya cadangan. */
  derive?: 'products' | 'coverage' | 'sales'
}

export interface Testimonial {
  id: number
  name: string
  role: Localized
  location: string
  content: Localized
  rating: number
  initials: string
}

/** Wilayah layanan sebagai entitas tersendiri, agar filter sales tidak mencocokkan teks bebas. */
export interface SalesRegion {
  slug: string
  name: string
  province: Localized
  sales_count: number
}

export interface SalesContact {
  id: number
  slug: string
  name: string
  title: Localized
  /** Ringkasan wilayah untuk ditampilkan, mis. "Madiun & Magetan". */
  zone: string
  /** Slug wilayah yang ditangani; dipakai filter dan pemetaan produk ke sales. */
  regions: string[]
  coverage: string[]
  description: Localized
  photo: string | null
  whatsapp: string
  phone: string
  email: string | null
  initials: string
  /** Sales nonaktif tidak dikirim API, tetapi kolomnya disiapkan untuk dashboard. */
  is_active: boolean
  sort_order: number
}

export interface CompanyProfile {
  story: Localized[]
  vision: Localized[]
  mission: Localized[]
  position: Localized[]
  values: ValueItem[]
  advantages: ValueItem[]
  timeline: TimelineItem[]
  achievements: Achievement[]
}

export interface SiteSettings {
  company: {
    name: string
    legal_name: string
    tagline: Localized
    description: Localized
    founded_year: number
  }
  contact: {
    address_lines: string[]
    address_full: string
    phone: string
    phone_display: string
    whatsapp: string
    whatsapp_display: string
    email: string
    business_hours: { days: Localized; hours: string }[]
  }
  maps: { lat: number; lng: number; embed: string; link: string }
  social: { instagram: string | null; facebook: string | null; youtube: string | null }
  seo: { default_title: Localized; default_description: Localized; og_image: string }
}

/* -------------------------------------------------------------------------- */
/* Form                                                                        */
/* -------------------------------------------------------------------------- */

export interface ContactPayload {
  name: string
  email: string
  phone: string
  company?: string
  subject: string
  message: string
}

export interface ContactResponse {
  message: Localized
  reference: string
}

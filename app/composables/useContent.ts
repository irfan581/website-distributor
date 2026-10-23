import type {
  Article,
  ArticleSummary,
  Brand,
  Category,
  Collection,
  CompanyProfile,
  CoverageArea,
  GalleryItem,
  Product,
  ProductQuery,
  ProductSummary,
  SalesContact,
  SalesRegion,
  Service,
  SiteSettings,
  Testimonial,
} from '#shared/types/content'

/** Composable per sumber daya di atas `useApi()`, memakai `useAsyncData` dengan kunci stabil. */

interface CompanyBundle {
  profile: CompanyProfile
  /** Jumlah nyata yang dihitung server; lihat `server/api/v1/company.get.ts`. */
  stats: { products: number; coverage: number; sales: number }
  coverage: CoverageArea[]
  services: Service[]
  testimonials: Testimonial[]
  sales_contacts: SalesContact[]
}

/* -------------------------------------------------------------------------- */
/* Katalog                                                                     */
/* -------------------------------------------------------------------------- */

/** Daftar produk; query reaktif agar katalog memuat ulang saat filter berubah. */
export function useProducts(query: MaybeRefOrGetter<ProductQuery> = {}) {
  const api = useApi()
  const resolved = computed(() => toValue(query))

  return useAsyncData<Collection<ProductSummary>>(
    () => `products:${JSON.stringify(resolved.value)}`,
    () =>
      api<Collection<ProductSummary>>('/v1/products', {
        query: {
          q: resolved.value.q || undefined,
          category: resolved.value.category || undefined,
          brand: resolved.value.brand || undefined,
          sort: resolved.value.sort || undefined,
          featured: resolved.value.featured ? 'true' : undefined,
          page: resolved.value.page || undefined,
          per_page: resolved.value.per_page || undefined,
        },
      }),
    { watch: [resolved] },
  )
}

export function useProduct(slug: MaybeRefOrGetter<string>) {
  const api = useApi()
  const resolved = computed(() => toValue(slug))

  return useAsyncData<{ data: Product }>(
    () => `product:${resolved.value}`,
    () => api<{ data: Product }>(`/v1/products/${resolved.value}`),
    { watch: [resolved] },
  )
}

export function useCategories() {
  const api = useApi()
  return useAsyncData<{ data: Category[] }>('categories', () =>
    api<{ data: Category[] }>('/v1/categories'),
  )
}

export function useBrands() {
  const api = useApi()
  return useAsyncData<{ data: Brand[] }>('brands', () => api<{ data: Brand[] }>('/v1/brands'))
}

/* -------------------------------------------------------------------------- */
/* Editorial                                                                   */
/* -------------------------------------------------------------------------- */



export function useArticles(page: MaybeRefOrGetter<number> = 1, perPage = 9) {
  const api = useApi()
  const resolved = computed(() => toValue(page))

  return useAsyncData<Collection<ArticleSummary>>(
    () => `articles:${resolved.value}:${perPage}`,
    () =>
      api<Collection<ArticleSummary>>('/v1/articles', {
        query: { page: resolved.value, per_page: perPage },
      }),
    { watch: [resolved] },
  )
}

export function useArticle(slug: MaybeRefOrGetter<string>) {
  const api = useApi()
  const resolved = computed(() => toValue(slug))

  return useAsyncData<{ data: Article }>(
    () => `article:${resolved.value}`,
    () => api<{ data: Article }>(`/v1/articles/${resolved.value}`),
    { watch: [resolved] },
  )
}

export function useGallery(category: MaybeRefOrGetter<string> = 'all') {
  const api = useApi()
  const resolved = computed(() => toValue(category))

  return useAsyncData<{ data: GalleryItem[] }>(
    () => `gallery:${resolved.value}`,
    () => api<{ data: GalleryItem[] }>('/v1/gallery', { query: { category: resolved.value } }),
    { watch: [resolved] },
  )
}

/* -------------------------------------------------------------------------- */
/* Tim sales                                                                   */
/* -------------------------------------------------------------------------- */

/** Daftar sales, opsional disaring per wilayah. */
export function useSales(region: MaybeRefOrGetter<string> = 'all') {
  const api = useApi()
  const resolved = computed(() => toValue(region))

  return useAsyncData<{ data: SalesContact[] }>(
    () => `sales:${resolved.value}`,
    () => api<{ data: SalesContact[] }>('/v1/sales', { query: { region: resolved.value } }),
    { watch: [resolved] },
  )
}

/** Wilayah yang punya penanggung jawab; dipakai filter dan pemilih wilayah. */
export function useSalesRegions() {
  const api = useApi()
  return useAsyncData<{ data: SalesRegion[] }>('sales-regions', () =>
    api<{ data: SalesRegion[] }>('/v1/sales-regions'),
  )
}

/* -------------------------------------------------------------------------- */
/* Perusahaan                                                                  */
/* -------------------------------------------------------------------------- */

export function useCompany() {
  const api = useApi()
  return useAsyncData<{ data: CompanyBundle }>('company', () =>
    api<{ data: CompanyBundle }>('/v1/company'),
  )
}

/** Pengaturan situs disimpan di store agar hanya diambil sekali per sesi. */
export function useSiteSettings() {
  const api = useApi()
  return useAsyncData<{ data: SiteSettings }>('settings', () =>
    api<{ data: SiteSettings }>('/v1/settings'),
  )
}

import type { ProductQuery, ProductSort } from '#shared/types/content'

const SORTS: ProductSort[] = ['catalog', 'featured', 'name_asc', 'name_desc', 'newest']

/** Status filter katalog, tersinkron dengan query URL. `lockedCategory` mengunci kategori di /kategori/[slug]. */
export function useCatalogFilters(lockedCategory?: MaybeRefOrGetter<string | undefined>) {
  const route = useRoute()
  const router = useRouter()

  function read(key: string): string {
    const value = route.query[key]
    return typeof value === 'string' ? value : ''
  }

  const search = ref(read('q'))
  const category = ref(read('category') || 'all')
  const brand = ref(read('brand') || 'all')
  const sort = ref<ProductSort>(
    SORTS.includes(read('sort') as ProductSort) ? (read('sort') as ProductSort) : 'catalog',
  )
  const page = ref(Math.max(Number(route.query.page) || 1, 1))

  /* Pengetikan tidak boleh memicu satu permintaan per huruf. */
  const debouncedSearch = refDebounced(search, 350)

  const effectiveCategory = computed(() => toValue(lockedCategory) ?? category.value)

  const query = computed<ProductQuery>(() => ({
    q: debouncedSearch.value.trim() || undefined,
    category: effectiveCategory.value !== 'all' ? effectiveCategory.value : undefined,
    brand: brand.value !== 'all' ? brand.value : undefined,
    sort: sort.value,
    page: page.value,
    per_page: 12,
  }))

  /* Mengubah filter apa pun berarti kembali ke halaman pertama. */
  watch([debouncedSearch, category, brand, sort], () => {
    page.value = 1
  })

  /* Tulis balik ke URL; `replace` agar riwayat tidak penuh oleh setiap ketikan. */
  watch(
    query,
    (value) => {
      const next: Record<string, string> = {}
      if (value.q) next.q = value.q
      if (!toValue(lockedCategory) && category.value !== 'all') next.category = category.value
      if (brand.value !== 'all') next.brand = brand.value
      if (sort.value !== 'catalog') next.sort = sort.value
      if (page.value > 1) next.page = String(page.value)

      router.replace({ query: next })
    },
    { flush: 'post' },
  )

  const isFiltered = computed(
    () =>
      Boolean(search.value.trim()) ||
      brand.value !== 'all' ||
      sort.value !== 'catalog' ||
      (!toValue(lockedCategory) && category.value !== 'all'),
  )

  function reset() {
    search.value = ''
    if (!toValue(lockedCategory)) category.value = 'all'
    brand.value = 'all'
    sort.value = 'catalog'
    page.value = 1
  }

  /** Hanya mengubah nomor halaman. Mengembalikan `true` bila halaman benar-benar berpindah. */
  function goToPage(next: number): boolean {
    if (next === page.value) return false
    page.value = next
    return true
  }

  return { search, category, brand, sort, page, query, isFiltered, reset, goToPage }
}

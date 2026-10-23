<script setup lang="ts">
/** Katalog lengkap: pencarian, filter, pengurutan, pagination. `lockedCategory` mengunci kategori di /kategori/[slug]. */
const props = defineProps<{ lockedCategory?: string }>()

const { L } = useLocalized()
const { t } = useI18n()

const filters = useCatalogFilters(() => props.lockedCategory)
const { data, status } = useProducts(filters.query)
const { data: categoriesData } = useCategories()
const { data: brandsData } = useBrands()

const products = computed(() => data.value?.data ?? [])
const meta = computed(() => data.value?.meta)
const pending = computed(() => status.value === 'pending')

/* Kategori tanpa produk tidak ditawarkan, kecuali yang sedang dikunci `lockedCategory`. */
const categoryOptions = computed(() => [
  { value: 'all', label: t('catalog.allCategories') },
  ...(categoriesData.value?.data ?? [])
    .filter((c) => c.products_count > 0 || c.slug === props.lockedCategory)
    .map((c) => ({
      value: c.slug,
      label: L(c.name),
      count: c.products_count,
    })),
])

const brandOptions = computed(() => [
  { value: 'all', label: t('catalog.allBrands') },
  ...(brandsData.value?.data ?? []).map((b) => ({
    value: b.slug,
    label: b.name,
    count: b.products_count,
  })),
])

const sortOptions = computed(() => [
  { value: 'catalog', label: t('catalog.sortCatalog') },
  { value: 'featured', label: t('catalog.sortFeatured') },
  { value: 'name_asc', label: t('catalog.sortNameAsc') },
  { value: 'name_desc', label: t('catalog.sortNameDesc') },
  { value: 'newest', label: t('catalog.sortNewest') },
])

const grid = useTemplateRef<HTMLElement>('grid')
const section = useTemplateRef<HTMLElement>('section')

/* Lembar filter ponsel; kontrol dan state-nya sama dengan sidebar desktop. */
const sheetTerbuka = ref(false)

/* Berpindah halaman menutup lembar, supaya tidak menggantung di atas hasil
   yang sudah berubah. */
watch(() => filters.query.value, () => { sheetTerbuka.value = false })

/** Berpindah halaman menggulir ke awal daftar hasil, bukan ke puncak halaman. */
function onPageChange(next: number) {
  if (filters.goToPage(next)) scrollToElement(section.value)
}

/** Kartu muncul bertahap setiap kali hasil berubah. */
watch(
  products,
  async () => {
    if (!import.meta.client) return
    await nextTick()

    const el = grid.value
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const { $gsap } = useNuxtApp()
    $gsap.fromTo(
      el.querySelectorAll('[data-card]'),
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.55, stagger: 0.045, ease: 'power3.out', overwrite: true },
    )
  },
  { immediate: true },
)
</script>

<template>
  <!-- Jarak atas lebih rapat dari `section-tmk` agar daftar produk cepat terlihat. -->
  <section ref="section" class="pb-[clamp(4rem,2.6rem+6vw,8.5rem)] pt-10 lg:pt-14">
    <!-- Dari lg ke atas filter pindah ke sidebar kiri yang menempel; di bawahnya menumpuk. -->
    <div class="container-tmk lg:grid lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:items-start lg:gap-10">
      <!-- Panel filter penuh hanya untuk lg ke atas; di ponsel pindah ke lembar filter. -->
      <aside class="hidden rounded-3xl border border-ink-200 bg-surface-muted p-5 sm:p-6 lg:sticky lg:top-28 lg:block">
        <h2 class="sr-only">{{ $t('catalog.filters') }}</h2>

        <div class="grid gap-4">
          <!-- Pencarian -->
          <div class="min-w-0 sm:col-span-2 lg:col-span-1">
            <label
              for="catalog-search"
              class="block text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ink-400"
            >
              {{ $t('catalog.searchLabel') }}
            </label>
            <div class="relative mt-1.5">
              <input
                id="catalog-search"
                v-model="filters.search.value"
                type="search"
                :placeholder="$t('catalog.search')"
                class="w-full rounded-xl border border-ink-200 bg-white py-2.5 pl-10 pr-3.5 text-sm text-ink-800 transition-colors duration-300 placeholder:text-ink-400 hover:border-ink-300 focus:border-tmk-400"
              />
              <svg
                class="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </div>
          </div>

          <UiSelect
            v-if="!lockedCategory"
            v-model="filters.category.value"
            :label="$t('catalog.category')"
            :options="categoryOptions"
          />

          <UiSelect
            v-model="filters.brand.value"
            :label="$t('catalog.brand')"
            :options="brandOptions"
          />

          <UiSelect
            v-model="filters.sort.value"
            :label="$t('catalog.sort')"
            :options="sortOptions"
          />
        </div>

        <!-- Ringkasan hasil -->
        <div class="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-ink-200 pt-4">
          <p class="text-[0.8125rem] text-ink-500">
            <template v-if="meta && meta.total > 0">
              {{ $t('catalog.resultCount', { from: meta.from, to: meta.to, total: meta.total }) }}
            </template>
            <template v-else-if="pending">{{ $t('common.loading') }}</template>
          </p>

          <button
            v-if="filters.isFiltered.value"
            type="button"
            class="text-[0.8125rem] font-semibold text-tmk-600 underline-offset-4 transition-colors duration-300 hover:text-tmk-700 hover:underline"
            @click="filters.reset()"
          >
            {{ $t('catalog.reset') }}
          </button>
        </div>
      </aside>

      <!-- Bar ringkas ponsel: pencarian, tombol lembar filter, dan jumlah hasil. -->
      <div class="lg:hidden">
        <div class="relative">
          <label for="catalog-search-mobile" class="sr-only">
            {{ $t('catalog.searchLabel') }}
          </label>
          <input
            id="catalog-search-mobile"
            v-model="filters.search.value"
            type="search"
            :placeholder="$t('catalog.search')"
            class="w-full rounded-xl border border-ink-200 bg-white py-2.5 pl-10 pr-3.5 text-sm text-ink-800 transition-colors duration-300 placeholder:text-ink-400 hover:border-ink-300 focus:border-tmk-400"
          />
          <svg
            class="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </div>

        <div class="mt-3 flex items-center justify-between gap-3">
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm font-semibold text-ink-800 transition-colors duration-300 hover:border-ink-300"
            :aria-expanded="sheetTerbuka"
            aria-haspopup="dialog"
            @click="sheetTerbuka = true"
          >
            <svg
              viewBox="0 0 24 24"
              class="size-4 text-ink-500"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              aria-hidden="true"
            >
              <path d="M4 6h16M7 12h10M10 18h4" />
            </svg>
            {{ $t('catalog.filterAndSort') }}
            <!-- Titik penanda bahwa ada filter aktif, tanpa menambah teks. -->
            <span
              v-if="filters.isFiltered.value"
              class="size-2 rounded-full bg-tmk-500"
              aria-hidden="true"
            />
          </button>

          <p class="shrink-0 text-[0.8125rem] text-ink-500">
            <template v-if="meta && meta.total > 0">
              {{ $t('catalog.productCount', { total: meta.total }) }}
            </template>
            <template v-else-if="pending">{{ $t('common.loading') }}</template>
          </p>
        </div>
      </div>

      <!-- Grid produk -->
      <div class="mt-6 lg:mt-0">
        <div ref="grid">
          <!-- Kartu produk memakai <h3>. Judul wilayah hasil ini menjaga urutan
               heading tetap h1 → h2 → h3, tanpa menambah judul yang terlihat. -->
          <h2 class="sr-only">{{ $t('catalog.title') }}</h2>

          <ul
            v-if="products.length"
            class="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3 2xl:grid-cols-4"
            :class="pending && 'opacity-60 transition-opacity duration-300'"
          >
            <li v-for="product in products" :key="product.id" data-card>
              <ProductCard :product="product" />
            </li>
          </ul>

          <!-- Kerangka saat pemuatan pertama -->
          <ul v-else-if="pending" class="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3 2xl:grid-cols-4">
            <li v-for="n in 6" :key="n" class="card-tmk overflow-hidden">
              <div class="skeleton bingkai-produk bg-ink-100" />
              <div class="space-y-3 p-5">
                <div class="skeleton h-3 w-24 rounded-full bg-ink-100" />
                <div class="skeleton h-5 w-3/4 rounded-full bg-ink-100" />
                <div class="skeleton h-3 w-full rounded-full bg-ink-100" />
              </div>
            </li>
          </ul>

          <!-- Tidak ada hasil -->
          <div v-else class="rounded-3xl border border-dashed border-ink-300 px-6 py-14 text-center">
            <span class="mx-auto grid size-14 place-items-center rounded-2xl bg-ink-50 text-ink-400">
              <IconGlyph name="granule" :size="26" />
            </span>
            <h3 class="text-heading mt-5">{{ $t('catalog.noResult') }}</h3>
            <p class="mx-auto mt-2 max-w-sm text-sm text-ink-500">
              {{ $t('catalog.noResultHint') }}
            </p>
            <div class="mt-6">
              <UiButton variant="ghost" size="sm" @click="filters.reset()">
                {{ $t('catalog.reset') }}
              </UiButton>
            </div>
          </div>
        </div>

        <div v-if="meta" class="mt-9">
          <UiPagination :meta="meta" @change="onPageChange" />
        </div>
      </div>
    </div>
    <!-- Lembar filter ponsel. Memakai state filter yang sama dengan sidebar
         desktop, jadi pilihan di keduanya tidak pernah berbeda. -->
    <ProductFilterSheet
      v-model:category="filters.category.value"
      v-model:brand="filters.brand.value"
      v-model:sort="filters.sort.value"
      :open="sheetTerbuka"
      :category-options="categoryOptions"
      :brand-options="brandOptions"
      :sort-options="sortOptions"
      :locked-category="lockedCategory"
      :is-filtered="filters.isFiltered.value"
      :total="meta?.total"
      @close="sheetTerbuka = false"
      @reset="filters.reset()"
    />
  </section>
</template>

<style scoped>
.skeleton {
  animation: shimmer 1.4s ease-in-out infinite;
}

@keyframes shimmer {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@media (prefers-reduced-motion: reduce) {
  .skeleton {
    animation: none;
  }
}
</style>

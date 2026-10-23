<script setup lang="ts">
definePageMeta({ heroOverlay: true })

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const localePath = useLocalePath()

/* Wilayah disimpan di URL agar pilihan bisa dibagikan, mis. /sales?wilayah=ngawi */
const region = ref(typeof route.query.wilayah === 'string' ? route.query.wilayah : 'all')

const { data: salesData, status } = useSales(region)
const { data: regionsData } = useSalesRegions()

const sales = computed(() => salesData.value?.data ?? [])
const regions = computed(() => regionsData.value?.data ?? [])

watch(region, (value) => {
  router.replace({ query: value === 'all' ? {} : { wilayah: value } })
})

const grid = useTemplateRef<HTMLElement>('grid')

/* Kartu masuk bertahap setiap kali wilayah berganti. */
watch(
  sales,
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
      { opacity: 1, y: 0, duration: 0.55, stagger: 0.05, ease: 'power3.out', overwrite: true },
    )
  },
  { immediate: true },
)

useSeoMeta({
  title: () => t('sales.title'),
  description: () => t('sales.description'),
  ogTitle: () => t('sales.title'),
  ogDescription: () => t('sales.description'),
})
</script>

<template>
  <div>
    <PageHero
      :eyebrow="$t('nav.sales')"
      :title="$t('sales.title')"
      :description="$t('sales.description')"
      :crumbs="[{ label: $t('nav.sales') }]"
    />

    <section class="section-tmk">
      <div class="container-tmk">
        <SalesRegionFilter v-model="region" :regions="regions" />

        <p class="mt-5 text-[0.8125rem] text-ink-500">
          {{ $t('sales.resultCount', { n: sales.length }) }}
        </p>

        <div ref="grid" class="mt-8">
          <!-- Kartu memakai <h3>. Judul wilayah hasil ini menjaga urutan
               heading tetap h1 → h2 → h3 tanpa menambah judul yang terlihat. -->
          <h2 class="sr-only">{{ $t('sales.title') }}</h2>

          <ul
            v-if="sales.length"
            class="grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
            :class="status === 'pending' && 'opacity-60 transition-opacity duration-300'"
          >
            <li v-for="person in sales" :key="person.id" data-card>
              <SalesCard :sales="person" />
            </li>
          </ul>

          <div v-else class="rounded-3xl border border-dashed border-ink-300 px-6 py-14 text-center">
            <span class="mx-auto grid size-14 place-items-center rounded-2xl bg-ink-50 text-ink-400">
              <IconGlyph name="handshake" :size="26" />
            </span>
            <h2 class="text-heading mt-5">{{ $t('sales.empty') }}</h2>
            <p class="mx-auto mt-2 max-w-sm text-sm text-ink-500">
              {{ $t('sales.emptyHint') }}
            </p>
            <div class="mt-6 flex flex-wrap justify-center gap-3">
              <UiButton variant="ghost" size="sm" @click="region = 'all'">
                {{ $t('sales.allRegions') }}
              </UiButton>
              <UiButton :to="localePath('/hubungi-kami')" size="sm">
                {{ $t('nav.contact') }}
              </UiButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

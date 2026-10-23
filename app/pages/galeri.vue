<script setup lang="ts">
import type { GalleryCategory } from '#shared/types/content'

definePageMeta({ heroOverlay: true })

const { L } = useLocalized()
const { t } = useI18n()

const filter = ref<GalleryCategory | 'all'>('all')
const { data, status } = useGallery(filter)

const items = computed(() => data.value?.data ?? [])

/* Daftar penyaring mengikuti isi galeri; kategori kosong tersaring, urutannya dipatok di sini. */
const URUTAN: GalleryCategory[] = ['gudang', 'toko', 'produk', 'kegiatan', 'distribusi', 'petani']

const { data: semua } = useGallery('all')

const filters = computed<(GalleryCategory | 'all')[]>(() => {
  const ada = new Set((semua.value?.data ?? []).map(i => i.category))
  return ['all', ...URUTAN.filter(k => ada.has(k))]
})

const grid = useTemplateRef<HTMLElement>('grid')

/* Ubin muncul saat masuk layar lewat `ScrollTrigger.batch`. Pemicu lama dimatikan tiap penyaring diganti. */
let pemicu: { kill: () => void }[] = []

function matikanPemicu() {
  pemicu.forEach((p) => p.kill())
  pemicu = []
}

onBeforeUnmount(matikanPemicu)

watch(
  items,
  async () => {
    if (!import.meta.client) return
    await nextTick()

    const el = grid.value
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const { $gsap, $ScrollTrigger } = useNuxtApp()
    matikanPemicu()

    const ubin = el.querySelectorAll('[data-tile]')
    if (!ubin.length) return

    /* Di layar sempit geserannya dipendekkan, sama seperti di `useReveal`. */
    const geser = window.matchMedia('(max-width: 767px)').matches ? 12 : 20

    $gsap.set(ubin, { opacity: 0, y: geser })
    pemicu = $ScrollTrigger.batch(ubin, {
      start: 'top 82%',
      once: true,
      onEnter: (kelompok: Element[]) =>
        $gsap.to(kelompok, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.09,
          ease: 'power3.out',
          overwrite: true,
        }),
    })

    /* Segarkan ScrollTrigger tiap penyaring diganti, karena tinggi halaman berubah. */
    await nextTick()
    $ScrollTrigger.refresh()
  },
  { immediate: true },
)

useSeoMeta({
  title: () => t('gallery.title'),
  description: () => t('gallery.description'),
  ogTitle: () => t('gallery.title'),
  ogDescription: () => t('gallery.description'),
})
</script>

<template>
  <div>
    <PageHero
      :eyebrow="$t('nav.gallery')"
      :title="$t('gallery.title')"
      :description="$t('gallery.description')"
      :crumbs="[{ label: $t('nav.gallery') }]"
    />

    <section class="section-tmk">
      <div class="container-tmk">
        <!-- Filter kategori: tombol penyaring, bukan tab, jadi memakai aria-pressed. -->
        <div class="no-scrollbar -mx-5 overflow-x-auto px-5">
          <ul class="flex w-max gap-2" :aria-label="$t('catalog.filters')">
            <li v-for="key in filters" :key="key">
              <button
                type="button"
                class="rounded-full border px-4 py-2 font-[family-name:var(--font-display)] text-[0.8125rem] font-medium transition-colors duration-300"
                :class="
                  filter === key
                    ? 'border-tmk-600 bg-tmk-600 text-white'
                    : 'border-ink-200 text-ink-600 hover:border-tmk-300 hover:text-tmk-600'
                "
                :aria-pressed="filter === key"
                @click="filter = key"
              >
                {{ $t(`gallery.${key}`) }}
              </button>
            </li>
          </ul>
        </div>

        <!-- Masonry lewat kolom CSS: tinggi alami tanpa JavaScript -->
        <div
          ref="grid"
          class="mt-10 gap-5 sm:columns-2 lg:columns-3"
          :class="status === 'pending' && 'opacity-60 transition-opacity duration-300'"
        >
          <figure
            v-for="(item, index) in items"
            :key="item.id"
            data-tile
            class="group mb-5 break-inside-avoid overflow-hidden rounded-2xl border border-ink-200"
          >
            <div class="relative overflow-hidden bg-ink-100" :style="{ aspectRatio: `1 / ${item.ratio}` }">
              <div
                class="h-full w-full transition-transform duration-700 ease-[var(--ease-tmk)] group-hover:scale-105"
              >
                <MediaVisual
                  :src="item.image"
                  :accent="item.placeholder"
                  :alt="L(item.title)"
                  :seed="item.id + index"
                  sizes="sm:100vw md:50vw lg:33vw"
                />
              </div>

              <span
                class="absolute left-3.5 top-3.5 rounded-full bg-white/90 px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-wider text-ink-700 backdrop-blur-sm"
              >
                {{ $t(`gallery.${item.category}`) }}
              </span>
            </div>

            <figcaption class="bg-white p-5">
              <h2 class="font-[family-name:var(--font-display)] text-base font-semibold text-ink-900">
                {{ L(item.title) }}
              </h2>
              <p class="mt-1.5 text-sm leading-relaxed text-ink-500">{{ L(item.caption) }}</p>
            </figcaption>
          </figure>
        </div>

        <p v-if="!items.length && status !== 'pending'" class="py-12 text-center text-ink-500">
          {{ $t('common.empty') }}
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { ProductImage } from '#shared/types/content'

/** Galeri produk: satu gambar utama, thumbnail hanya bila gambarnya lebih dari satu. */
const props = defineProps<{
  images: ProductImage[]
  categorySlug: string
  name: string
}>()

const { L } = useLocalized()
const activeIndex = ref(0)
const active = computed(() => props.images[activeIndex.value] ?? props.images[0]!)

/* Hanya pestisida yang fotonya poster tegak; pupuk dan bahan pendukung
   memakai foto persegi dari katalog PDF. */
const POSTER_TEGAK = ['herbisida', 'insektisida', 'fungisida', 'rodentisida']
const rasioDetail = computed(() => (POSTER_TEGAK.includes(props.categorySlug) ? '4 / 5' : '1 / 1'))
</script>

<template>
  <div>
    <!-- Gambar utama memakai rasio kartu katalog agar tidak terpotong; thumbnail tetap persegi. -->
    <div
      class="bingkai-detail relative mx-auto w-full overflow-hidden rounded-[1.75rem] border border-ink-200 bg-foto p-4 sm:p-6"
      :style="{ '--rasio-detail': rasioDetail }"
    >
      <Transition
        enter-active-class="transition duration-500 ease-[var(--ease-tmk)]"
        enter-from-class="opacity-0 scale-[1.03]"
        leave-active-class="absolute inset-0 transition duration-300 ease-in"
        leave-to-class="opacity-0"
      >
        <div :key="activeIndex" class="h-full w-full">
          <UiProductVisual
            :image="active"
            :category="categorySlug"
            :alt="L(active.alt)"
            :variant="activeIndex"
            size="detail"
          />
        </div>
      </Transition>
    </div>

    <!-- Thumbnail -->
    <ul v-if="images.length > 1" class="mt-4 flex gap-3">
      <li v-for="(image, index) in images" :key="image.id" class="min-w-0 flex-1">
        <button
          type="button"
          class="aspect-square w-full overflow-hidden rounded-2xl border transition-all duration-300 ease-[var(--ease-tmk)]"
          :class="
            index === activeIndex
              ? 'border-tmk-400 ring-2 ring-tmk-200'
              : 'border-ink-200 opacity-70 hover:opacity-100'
          "
          :aria-label="$t('product.viewImage', { n: index + 1 })"
          :aria-current="index === activeIndex ? 'true' : undefined"
          @click="activeIndex = index"
        >
          <UiProductVisual
            :image="image"
            :category="categorySlug"
            :alt="`${name} ${index + 1}`"
            :variant="index"
          />
        </button>
      </li>
    </ul>
  </div>
</template>

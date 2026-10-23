<script setup lang="ts">
import type { ProductSummary } from '#shared/types/content'

/** Kartu produk untuk katalog, produk unggulan, dan produk terkait. */
const props = defineProps<{ product: ProductSummary }>()

const { L } = useLocalized()
const localePath = useLocalePath()
const { contactTarget } = useContactAction()

/* "Hubungi Sales" mengarah ke halaman tim sales, tempat pengunjung memilih
   wilayahnya sendiri. Nomor Admin Marketing sengaja tidak dipakai di sini;
   lihat pemisahannya di useContactAction. */
const kontak = computed(() => contactTarget())

/* Baris kandungan hanya tampil bila `tagline` memang berisi kandungan, bukan nama kategori. */
const kandungan = computed(() => {
  const teks = L(props.product.tagline)
  return teks && teks !== L(props.product.category.name) ? teks : ''
})
</script>

<template>
  <!-- `@container`: susunan tombol mengikuti lebar kartu, bukan lebar layar. -->
  <article
    class="card-tmk group @container relative flex h-full flex-col overflow-hidden transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-tmk)] hover:-translate-y-1 hover:shadow-[var(--shadow-float)] hover:border-tmk-200 focus-within:-translate-y-1 focus-within:shadow-[var(--shadow-float)]"
  >
    <!-- Bingkai gambar berlatar netral. `overflow-hidden` wajib agar `aspect-ratio` berlaku; `max-h` hanya di ponsel. -->
    <div
      class="bingkai-produk relative max-h-[17rem] shrink-0 overflow-hidden bg-foto p-3 sm:max-h-none sm:p-4"
    >
      <div
        class="h-full w-full transition-transform duration-700 ease-[var(--ease-tmk)] group-hover:scale-[1.02]"
      >
        <UiProductVisual
          :image="product.image"
          :category="product.category.slug"
          :alt="L(product.image.alt)"
        />
      </div>

      <span
        v-if="product.badge"
        class="absolute left-3.5 top-3.5 rounded-full bg-ink-900/90 px-3 py-1 font-[family-name:var(--font-display)] text-[0.6875rem] font-semibold tracking-wide text-white backdrop-blur-sm"
      >
        {{ L(product.badge) }}
      </span>
    </div>

    <!-- Keterangan produk; diringkas pada kartu sempit (di bawah 18rem). -->
    <div class="flex flex-1 flex-col p-3.5 @[18rem]:p-4 sm:@[18rem]:p-5">
      <!-- Di kartu sempit hanya satu label: merek, atau kategori bila tanpa merek. -->
      <p class="flex items-center gap-x-2 gap-y-1 text-[0.6875rem] @[18rem]:flex-wrap">
        <span
          class="truncate font-semibold uppercase tracking-[0.12em] text-tmk-600"
          :class="product.brand && '@max-[18rem]:hidden'"
        >
          {{ L(product.category.name) }}
        </span>
        <span v-if="product.brand" class="text-ink-300 @max-[18rem]:hidden" aria-hidden="true">·</span>
        <span
          v-if="product.brand"
          class="truncate font-medium text-ink-400 @max-[18rem]:font-semibold @max-[18rem]:uppercase @max-[18rem]:tracking-[0.12em] @max-[18rem]:text-tmk-600"
        >
          {{ product.brand.name }}
        </span>
      </p>

      <!-- Tinggi minimum nama berlaku saat kartu berdampingan, agar baris di bawahnya sejajar. -->
      <h3
        class="text-heading mt-2.5 line-clamp-2 transition-colors duration-300 group-hover:text-tmk-700 sm:min-h-[2.6em] @max-[18rem]:mt-1.5 @max-[18rem]:min-h-[2.75em] @max-[18rem]:text-[0.9375rem] @max-[18rem]:leading-snug"
      >
        {{ product.name }}
      </h3>

      <!-- Kandungan dan kemasan hanya muncul bila ada. 3,25em = dua baris `leading-relaxed`. -->
      <p
        v-if="kandungan"
        class="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-500 sm:min-h-[3.25em] @max-[18rem]:mt-1.5 @max-[18rem]:min-h-[3.25em] @max-[18rem]:text-[0.8125rem]"
      >
        {{ kandungan }}
      </p>
      <p
        v-else
        class="hidden sm:block sm:min-h-[3.25em] @max-[18rem]:mt-1.5 @max-[18rem]:block @max-[18rem]:min-h-[3.25em] @max-[18rem]:text-[0.8125rem]"
        aria-hidden="true"
      />

      <!-- Kemasan tampil sebagai keping bergaris agar berbeda dari baris kandungan. -->
      <p class="mt-3 hidden sm:block @max-[18rem]:mt-2.5 @max-[18rem]:block" :class="product.packaging && '!block'">
        <template v-if="product.packaging">
          <span class="sr-only">{{ $t('product.packaging') }}: </span>
        </template>
        <!-- Produk tanpa kemasan tetap merender keping tak terlihat agar tinggi kartu sama. -->
        <span
          class="inline-block rounded-full border border-ink-200 bg-surface-muted px-2.5 py-1 text-[0.6875rem] font-medium text-ink-500"
          :class="!product.packaging && 'invisible'"
          :aria-hidden="!product.packaging"
        >
          {{ product.packaging || '—' }}
        </span>
      </p>

      <!-- Aksi menempel di dasar kartu agar tinggi seluruh grid tetap rata -->
      <div class="mt-auto flex flex-col items-stretch gap-2 pt-3.5 @[18rem]:flex-row @[18rem]:items-center @[18rem]:pt-4 sm:@[18rem]:pt-5">
        <!-- Stretched link: `after` menutupi kartu agar seluruhnya bisa diklik. Border transparan menyamakan tinggi dengan tombol ghost. -->
        <UiButton
          :to="localePath(`/produk/${product.slug}`)"
          size="sm"
          class="w-full justify-center whitespace-nowrap border border-transparent after:absolute after:inset-0 after:content-[''] @max-[10rem]:px-2 @[18rem]:w-auto"
        >
          {{ $t('common.viewDetail') }}
        </UiButton>

        <!-- `relative z-10` menaikkan tombol di atas stretched link. Disembunyikan di kartu sempit. -->
        <UiButton
          :to="kontak.to"
          :href="kontak.href"
          :external="kontak.external"
          variant="ghost"
          size="sm"
          class="relative z-10 w-full justify-center @max-[18rem]:hidden @[18rem]:w-auto"
        >
          {{ $t('common.contactSales') }}
        </UiButton>
      </div>
    </div>
  </article>
</template>

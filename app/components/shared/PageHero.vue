<script setup lang="ts">
import type { Crumb } from './Breadcrumbs.vue'

/** Kepala halaman interior, lebih pendek dari hero beranda. */
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    description?: string
    crumbs?: Crumb[]
    /** Versi lebih pendek untuk halaman yang isinya perlu segera terlihat, misalnya katalog. */
    compact?: boolean
    /** Foto latar; bawaannya sama dengan hero beranda, `null` berarti latar polos. */
    image?: string | null
    /** Penyetel ukuran judul dan jarak untuk satu halaman. Kelas ukuran di `titleClass` WAJIB memakai `!`. `klasik` memakai latar lama (lihat UiLatarGelap). */
    klasik?: boolean
    crumbsClass?: string
    titleClass?: string
    descriptionClass?: string
  }>(),
  {
    crumbs: () => [],
    image: '/gambar/hero/beranda.jpg',
    klasik: false,
    crumbsClass: '',
    titleClass: '',
    descriptionClass: '',
  },
)

const root = useTemplateRef<HTMLElement>('root')
useMouseParallax(root, 16)
</script>

<template>
  <section
    ref="root"
    class="relative overflow-hidden bg-ink-950 text-white"
    :class="
      compact
        ? 'pb-12 pt-24 lg:pb-16 lg:pt-28'
        : 'pb-24 pt-28 lg:pb-32 lg:pt-36'
    "
  >
    <!-- Susunan lapisan sama dengan hero beranda: foto, dua selubung, lalu batik. -->
    <UiLatarGelap :image="image" :klasik="klasik" :opacity="0.28" :duration="120" eager />

    <div class="container-tmk relative">
      <Breadcrumbs v-if="crumbs.length" :items="crumbs" tone="light" class="mb-8" :class="crumbsClass" />

      <p v-if="eyebrow" class="eyebrow !text-tmk-300">
        {{ eyebrow }}
      </p>

      <h1 class="text-display mt-4 max-w-4xl !text-white" :class="titleClass">{{ title }}</h1>

      <p
        v-if="description"
        class="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-white/70"
        :class="descriptionClass"
      >
        {{ description }}
      </p>

      <slot />
    </div>

  </section>
</template>

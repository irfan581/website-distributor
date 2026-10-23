<script setup lang="ts">
/** Logo resmi: `logo-dark.png` untuk latar terang, `logo-light.png` untuk latar gelap. */
withDefaults(
  defineProps<{
    tone?: 'dark' | 'light'
    /** Tinggi logo (kelas Tailwind). Bawaannya besar agar wordmark dua baris terbaca. */
    size?: string
  }>(),
  { tone: 'dark', size: 'h-11 lg:h-16' },
)
</script>

<template>
  <span class="inline-flex items-center">
    <NuxtImg
      :src="tone === 'light' ? '/brand/logo-light.png' : '/brand/logo-dark.png'"
      alt="Tani Makmur"
      class="w-auto"
      :class="size"
      width="640"
      height="318"
      format="webp"
      quality="92"
      preload
    />
  </span>
</template>

<script setup lang="ts">
/* PageHero berlatar gelap dan dimulai dari puncak halaman, jadi header
   melayang transparan di atasnya sampai pengguna menggulir. */
definePageMeta({ heroOverlay: true })

const { t } = useI18n()

useSeoMeta({
  title: () => t('catalog.title'),
  description: () => t('catalog.description'),
  ogTitle: () => t('catalog.title'),
  ogDescription: () => t('catalog.description'),
})
</script>

<template>
  <div>
    <!-- Tinggi hero sama dengan halaman interior lain; varian `compact` sengaja tidak dipakai. -->
    <PageHero
      :eyebrow="$t('nav.products')"
      :title="$t('catalog.title')"
      :description="$t('catalog.description')"
      :crumbs="[{ label: $t('nav.products') }]"
    />

    <ProductCatalog />
  </div>
</template>

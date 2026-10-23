<script setup lang="ts">
const settingsStore = useSettingsStore()
await settingsStore.load()

const { locale } = useI18n()
const config = useRuntimeConfig()
const site = computed(() => settingsStore.settings)

/* Atribut lang mengikuti bahasa aktif — penting untuk pembaca layar dan SEO. */
useHead({
  htmlAttrs: { lang: () => (locale.value === 'en' ? 'en' : 'id') },
  titleTemplate: (title) => (title ? `${title} | Tani Makmur` : 'Tani Makmur'),
})

/** Gambar pratinjau tautan untuk seluruh halaman; halaman tertentu boleh menimpanya. */
useSeoMeta({
  ogImage: () => `${config.public.siteUrl}${site.value?.seo.og_image ?? '/og/default.png'}`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Tani Makmur',
  twitterCard: 'summary_large_image',
})

/* Data terstruktur tingkat organisasi, dipasang sekali untuk seluruh situs. */
useSchemaOrg([
  defineOrganization({
    name: 'Tani Makmur',
    legalName: site.value?.company.legal_name,
    logo: '/brand/logo-horizontal.png',
    email: site.value?.contact.email,
    address: {
      streetAddress: site.value?.contact.address_lines[0],
      addressLocality: 'Kabupaten Madiun',
      addressRegion: 'Jawa Timur',
      postalCode: '60000',
      addressCountry: 'ID',
    },
  }),
  defineWebSite({ name: 'Tani Makmur' }),
  defineWebPage(),
])
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

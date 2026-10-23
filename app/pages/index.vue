<script setup lang="ts">
/** Beranda memakai hero gelap penuh layar, sehingga header dimulai transparan. */
definePageMeta({ heroOverlay: true })

const { t } = useI18n()
const { L } = useLocalized()
const settingsStore = useSettingsStore()
const site = computed(() => settingsStore.settings)

useSeoMeta({
  title: () => L(site.value?.company.tagline) || t('nav.home'),
  description: () => t('home.hero.description'),
  ogTitle: () => `Tani Makmur, ${t('home.hero.titleHighlight')}`,
  ogDescription: () => t('home.hero.description'),
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

/* Beranda mewakili perusahaan itu sendiri di mata mesin pencari lokal. */
useSchemaOrg([
  defineLocalBusiness({
    name: 'Tani Makmur',
    description: site.value?.company.description.id,
    telephone: site.value?.contact.phone,
    email: site.value?.contact.email,
    address: {
      streetAddress: site.value?.contact.address_lines[0],
      addressLocality: 'Kabupaten Madiun',
      addressRegion: 'Jawa Timur',
      postalCode: '60000',
      addressCountry: 'ID',
    },
    geo: {
      latitude: site.value?.maps.lat,
      longitude: site.value?.maps.lng,
    },
    openingHoursSpecification: [
      {
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '07:30',
        closes: '16:00',
      },
    ],
  }),
])
</script>

<template>
  <div>
    <HomeHero />
    <HomeCategories />
    <HomeFeatured />
    <HomeAbout />
    <HomeWhyUs />
    <HomeCoverage />
    <HomeServices />
    <HomeSales />
    <HomePartners />
    <HomeActivities />
    <HomeTestimonials />
    <CtaBanner />
  </div>
</template>

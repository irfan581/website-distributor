<script setup lang="ts">
definePageMeta({ heroOverlay: true })

const { L } = useLocalized()
const { t } = useI18n()
const { contactTarget } = useContactAction()
const { data } = useCompany()

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)

const areas = computed(() => data.value?.data.coverage ?? [])

const grouped = computed(() => {
  const groups = new Map<string, typeof areas.value>()
  for (const area of areas.value) {
    const key = L(area.province)
    groups.set(key, [...(groups.get(key) ?? []), area])
  }
  return Array.from(groups, ([province, list]) => ({ province, list }))
})

// Judul kartu ditulis di sini, tidak meminjam kunci i18n halaman lain.
// Jam di kartu tengah harus sama dengan `business_hours` di settings.ts.
const deliveryPoints = computed(() => [
  {
    icon: 'truck' as const,
    title: L({ id: 'Armada Sesuai Muatan', en: 'A Fleet Sized to the Load' }),
    text: L({
      id: 'Armada dari pick up hingga truk besar, menyesuaikan volume pesanan dan akses jalan menuju lokasi Anda.',
      en: 'A fleet from pickups to large trucks, matched to order volume and road access to your location.',
    }),
  },
  {
    icon: 'clock' as const,
    title: t('contact.hours'),
    text: L({
      id: 'Senin sampai Sabtu, pukul 07.30 sampai 16.00 WIB. Hari Minggu tutup.',
      en: 'Monday to Saturday, 07:30 to 16:00 Western Indonesia Time (WIB). Closed on Sundays.',
    }),
  },
  {
    icon: 'warehouse' as const,
    title: L({ id: 'Stok Dipastikan Dulu', en: 'Stock Confirmed First' }),
    text: L({
      id: 'Ketersediaan stok dikonfirmasi lebih dulu sebelum pesanan diproses, sehingga tidak ada janji kosong.',
      en: 'Stock availability is confirmed before an order is processed, so no promise is left unmet.',
    }),
  },
])

useSeoMeta({
  title: () => t('coverage.title'),
  description: () => t('coverage.description'),
  ogTitle: () => t('coverage.title'),
  ogDescription: () => t('coverage.description'),
})
</script>

<template>
  <div ref="root">
    <PageHero
      :eyebrow="$t('nav.coverage')"
      :title="$t('coverage.title')"
      :description="$t('coverage.description')"
      :crumbs="[{ label: $t('nav.coverage') }]"
    />

    <!-- Wilayah dan peta satu section dua kolom; padding atas dikecilkan agar tidak kosong setelah hero. -->
    <section class="pb-16 pt-10 lg:pb-24 lg:pt-14">
      <div class="container-tmk">
        <UiSectionHeading :eyebrow="$t('nav.coverage')" :title="$t('coverage.areas')" />

        <div class="mt-8 grid items-start gap-8 lg:mt-10 lg:grid-cols-2 lg:gap-10">
          <!-- Kolom kiri: daftar wilayah per provinsi -->
          <div class="space-y-7">
            <div v-for="group in grouped" :key="group.province" data-reveal>
              <!-- `eyebrow`: nama provinsi adalah label kelompok, bukan judul. -->
              <h3 class="eyebrow">{{ group.province }}</h3>

              <!-- Satu kolom di 1024 sampai 1279 px agar nama kabupaten tidak terpotong. -->
              <ul class="mt-3 grid gap-px overflow-hidden rounded-2xl bg-ink-200 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <li
                  v-for="area in group.list"
                  :key="area.id"
                  class="flex items-center gap-3 bg-white px-4 py-3"
                >
                  <IconGlyph
                    name="pin"
                    :size="17"
                    class="shrink-0"
                    :class="area.is_hub ? 'text-tmk-500' : 'text-ink-300'"
                  />
                  <span class="text-sm font-medium text-ink-700">{{ area.name }}</span>
                  <span
                    v-if="area.is_hub"
                    class="ml-auto shrink-0 rounded-full bg-tmk-50 px-2.5 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider text-tmk-700"
                  >
                    {{ $t('home.coverage.hub') }}
                  </span>
                </li>
                <!-- Pengisi sel terakhir saat jumlah wilayah ganjil, agar tidak tampil abu-abu. -->
                <li
                  v-if="group.list.length % 2 === 1"
                  class="hidden bg-white sm:block lg:hidden xl:block"
                  aria-hidden="true"
                />
              </ul>
            </div>
          </div>

          <!-- Kolom kanan: peta, lebarnya mengikuti kolom. -->
          <div
            data-reveal
            class="rounded-[2rem] border border-ink-200 bg-surface-muted p-5 sm:p-6"
          >
            <CoverageMap :areas="areas" tone="light" />
          </div>
        </div>
      </div>
    </section>

    <!-- Dukungan pengiriman -->
    <section class="section-tmk bg-surface-muted">
      <div class="container-tmk">
        <UiSectionHeading :eyebrow="$t('nav.services')" :title="$t('coverage.deliveryTitle')" />

        <ul class="mt-9 grid gap-5 lg:grid-cols-3">
          <li v-for="point in deliveryPoints" :key="point.title" data-reveal class="card-tmk p-7">
            <span class="grid size-12 place-items-center rounded-2xl bg-tmk-50 text-tmk-600">
              <IconGlyph :name="point.icon" :size="23" />
            </span>
            <h3 class="text-heading mt-5">{{ point.title }}</h3>
            <p class="mt-2.5 text-sm leading-relaxed text-ink-500">{{ point.text }}</p>
          </li>
        </ul>

        <!-- Di luar wilayah -->
        <div
          data-reveal
          class="mt-10 flex flex-col items-start justify-between gap-6 rounded-3xl border border-dashed border-ink-300 p-7 sm:flex-row sm:items-center lg:p-7"
        >
          <div>
            <h3 class="text-heading">{{ $t('coverage.outsideTitle') }}</h3>
            <p class="mt-2 max-w-xl text-sm leading-relaxed text-ink-500">
              {{ $t('coverage.outsideDescription') }}
            </p>
          </div>
          <UiButton v-bind="contactTarget()" class="shrink-0">
            {{ $t('common.contactSales') }}
          </UiButton>
        </div>
      </div>
    </section>
  </div>
</template>

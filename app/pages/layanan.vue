<script setup lang="ts">
definePageMeta({ heroOverlay: true })

const { L, LL } = useLocalized()
const { t } = useI18n()
const { data } = useCompany()

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)

const services = computed(() => data.value?.data.services ?? [])

useSeoMeta({
  title: () => t('services.title'),
  description: () => t('services.description'),
  ogTitle: () => t('services.title'),
  ogDescription: () => t('services.description'),
})
</script>

<template>
  <div ref="root">
    <PageHero
      :eyebrow="$t('nav.services')"
      :title="$t('services.title')"
      :description="$t('services.description')"
      :crumbs="[{ label: $t('nav.services') }]"
    />

    <section class="section-tmk">
      <div class="container-tmk space-y-6">
        <!-- Setiap layanan sebagai panel penuh; urutan kolom berselang-seling
             agar halaman tidak terbaca monoton dari atas ke bawah. -->
        <article
          v-for="(service, index) in services"
          :key="service.id"
          data-reveal
          class="card-tmk overflow-hidden"
        >
          <div class="grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <!-- Panel visual. Tanpa foto: gradien, garis kontur, butiran. Berfoto: hanya satu selubung gelap. -->
            <div
              class="relative min-h-52 overflow-hidden bg-ink-950 p-7 lg:p-7"
              :class="[index % 2 === 1 && 'lg:order-2', !service.image && 'grain']"
            >
              <template v-if="service.image">
                <NuxtImg
                  :src="service.image"
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  format="webp"
                  sizes="sm:100vw md:50vw lg:40vw"
                  class="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/40 to-ink-950/25"
                  aria-hidden="true"
                />
              </template>

              <template v-else>
                <div
                  class="absolute inset-0"
                  aria-hidden="true"
                  :style="
                    index % 2 === 0
                      ? 'background: radial-gradient(ellipse 70% 80% at 20% 10%, rgba(252,128,4,0.42), transparent 62%);'
                      : 'background: radial-gradient(ellipse 70% 80% at 80% 90%, rgba(0,125,62,0.45), transparent 62%);'
                  "
                />
                <UiBatikField :opacity="0.2" :duration="140" />
              </template>

              <div class="relative flex h-full flex-col justify-between gap-8">
                <!-- Di atas foto, kotak ikon 10% putih nyaris tak terlihat;
                     dinaikkan dan diberi garis tepi tipis supaya tetap terbaca
                     baik di atas karung terang maupun bayangan gudang. -->
                <span
                  class="grid size-14 place-items-center rounded-2xl text-white"
                  :class="service.image ? 'bg-white/15 ring-1 ring-white/25 backdrop-blur-sm' : 'bg-white/10'"
                >
                  <IconGlyph :name="service.icon" :size="26" />
                </span>
                <span
                  class="font-[family-name:var(--font-display)] text-6xl font-bold leading-none tracking-tighter"
                  :class="service.image ? 'text-white/45' : 'text-white/15'"
                >
                  {{ String(index + 1).padStart(2, '0') }}
                </span>
              </div>
            </div>

            <!-- Panel teks -->
            <div class="p-7 sm:p-7 lg:p-8">
              <h2 class="text-title">{{ L(service.title) }}</h2>
              <p class="mt-3 text-lg text-tmk-600">{{ L(service.summary) }}</p>
              <p class="mt-5 text-[0.9375rem] leading-relaxed text-ink-600">
                {{ L(service.description) }}
              </p>

              <h3 class="mt-8 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
                {{ $t('services.whatYouGet') }}
              </h3>
              <ul class="mt-4 grid gap-3 sm:grid-cols-2">
                <li
                  v-for="(point, pointIndex) in LL(service.points)"
                  :key="pointIndex"
                  class="flex gap-3 text-sm leading-relaxed text-ink-600"
                >
                  <span class="mt-0.5 shrink-0 text-tmk-500" aria-hidden="true">✓</span>
                  {{ point }}
                </li>
              </ul>
            </div>
          </div>
        </article>
      </div>
    </section>

    <CtaBanner />
  </div>
</template>

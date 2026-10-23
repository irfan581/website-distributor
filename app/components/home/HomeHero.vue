<script setup lang="ts">
/** Hero beranda. Judul masuk baris demi baris saat dimuat, tanpa useReveal. */
const settingsStore = useSettingsStore()
const localePath = useLocalePath()

const root = useTemplateRef<HTMLElement>('root')
const title = useTemplateRef<HTMLElement>('title')

useMouseParallax(root, 26)

const { contactTarget } = useContactAction()
const contact = computed(() => contactTarget())

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const { $gsap } = useNuxtApp()
  const scope = root.value
  if (!scope) return

  /* fromTo, bukan from: keadaan awal sudah disembunyikan CSS, jadi kedua ujung harus disebut. */
  const ctx = $gsap.context(() => {
    const timeline = $gsap.timeline({ defaults: { ease: 'power3.out' } })

    timeline
      /* `y: 0` wajib di kedua ujung agar sisa translateY dari CSS tidak menahan judul di luar mask. */
      .fromTo(
        '[data-hero-line]',
        { yPercent: 108, y: 0 },
        { yPercent: 0, y: 0, duration: 1.05, stagger: 0.09 },
        0.15,
      )
      .fromTo(
        '[data-hero-eyebrow]',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.1,
      )
      .fromTo('[data-hero-text]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 0.55)
      .fromTo(
        '[data-hero-action]',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
        0.7,
      )
      .fromTo(
        '[data-hero-card]',
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 },
        0.85,
      )
      .fromTo('[data-hero-scroll]', { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.2)
  }, scope)

  onBeforeUnmount(() => ctx.revert())
})

/* Angka kartu diambil dari data nyata lewat `useCompany`, tanpa permintaan tambahan. */
const { data: company } = useCompany()
const stats = computed(() => company.value?.data.stats)

const cards = computed(() => [
  {
    key: 'stock',
    icon: 'granule' as const,
    label: 'home.hero.cardStock',
    value: 'home.hero.cardStockValue',
    count: stats.value?.products ?? 0,
  },
  {
    key: 'coverage',
    icon: 'map' as const,
    label: 'home.hero.cardCoverage',
    value: 'home.hero.cardCoverageValue',
    count: stats.value?.coverage ?? 0,
  },
  {
    key: 'since',
    icon: 'certificate' as const,
    label: 'home.hero.cardSince',
    value: 'home.hero.cardSinceValue',
    count: 0,
  },
])
</script>

<template>
  <section
    ref="root"
    class="relative flex min-h-[100svh] items-start overflow-hidden bg-ink-950 pb-24 pt-28 text-white lg:pb-28 lg:pt-32"
  >
    <!-- Susunan lapisannya dijelaskan di UiLatarGelap. -->
    <UiLatarGelap :opacity="0.28" :duration="120" eager />

    <!-- `my-auto`, bukan `items-center`, agar isi yang lebih tinggi dari layar tidak tertutup header. -->
    <div class="container-tmk relative my-auto">
      <!-- Kartu disejajarkan ke tengah kolom judul, bukan ke dasarnya, supaya
           tidak jatuh terlalu rendah dan sejajar dengan badan teks. -->
      <div class="grid items-center gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-10">
        <!-- Kolom judul -->
        <div>
          <p data-hero-eyebrow class="eyebrow !text-tmk-300">
            {{ $t('home.hero.eyebrow') }}
          </p>

          <h1 ref="title" class="text-hero mt-6 !text-white">
            <!-- Setiap baris dibungkus agar bisa disingkap dari bawah -->
            <span class="block overflow-hidden pb-[0.08em]">
              <span data-hero-line class="block">{{ $t('home.hero.titleLine1') }}</span>
            </span>
            <span class="block overflow-hidden pb-[0.08em]">
              <span data-hero-line class="block text-gradient-tmk">
                {{ $t('home.hero.titleHighlight') }}
              </span>
            </span>
            <span class="block overflow-hidden pb-[0.08em]">
              <span data-hero-line class="block">{{ $t('home.hero.titleLine2') }}</span>
            </span>
          </h1>

          <p data-hero-text class="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-white/70">
            {{ $t('home.hero.description') }}
          </p>

          <div class="mt-9 flex flex-wrap gap-3">
            <span data-hero-action>
              <UiButton :to="localePath('/produk')" size="lg" magnetic>
                {{ $t('common.exploreProducts') }}
              </UiButton>
            </span>
            <span data-hero-action>
              <UiButton
                :to="contact.to"
                :href="contact.href"
                :external="contact.external"
                size="lg"
                variant="light"
              >
                {{ $t('common.contactSales') }}
              </UiButton>
            </span>
          </div>
        </div>

        <!-- Kartu informasi mengambang -->
        <ul class="flex flex-col gap-3" data-parallax="0.22">
          <li
            v-for="card in cards"
            :key="card.key"
            data-hero-card
            class="flex items-center gap-4 rounded-2xl border border-white/12 bg-white/[0.06] p-4 backdrop-blur-md sm:p-5"
          >
            <span class="grid size-11 shrink-0 place-items-center rounded-xl bg-tmk-500/18 text-tmk-300">
              <IconGlyph :name="card.icon" :size="21" />
            </span>
            <span class="min-w-0">
              <span class="block text-xs uppercase tracking-[0.14em] text-white/50">
                {{ $t(card.label) }}
              </span>
              <span
                class="mt-1 block font-[family-name:var(--font-display)] text-lg font-semibold text-white"
              >
                {{ $t(card.value, { count: card.count }) }}
              </span>
            </span>
          </li>
        </ul>
      </div>

      <!-- Petunjuk gulir -->
      <div data-hero-scroll class="mt-10 hidden items-center gap-3 lg:flex">
        <span class="relative block h-11 w-px overflow-hidden bg-white/20">
          <span class="scroll-tick absolute inset-x-0 top-0 block h-4 bg-tmk-400" />
        </span>
        <span class="text-xs uppercase tracking-[0.18em] text-white/40">
          {{ $t('common.scrollDown') }}
        </span>
      </div>
    </div>

  </section>
</template>

<style scoped>
.scroll-tick {
  animation: tick 2.4s var(--ease-tmk) infinite;
}

@keyframes tick {
  0% {
    transform: translateY(-100%);
  }
  55%,
  100% {
    transform: translateY(280%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .scroll-tick {
    animation: none;
  }
}
</style>

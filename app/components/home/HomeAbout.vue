<script setup lang="ts">
/** Ringkasan perusahaan dengan angka pencapaian yang dihitung naik lewat `useCounter`. */
const { L } = useLocalized()
const localePath = useLocalePath()
const { data } = useCompany()

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
useScrollParallax(root)
const profile = computed(() => data.value?.data.profile)
/* Angka yang sama dengan kartu stok di hero, dari sumber yang sama. */
const jumlahProduk = computed(() => data.value?.data.stats?.products ?? 0)

/*
 * Foto dibuka seperti tirai dari bawah. Ease `expo.out` supaya gerak langsung terlihat
 * sejak awal, bukan menunggu. Geser-ikut-scroll hanya di layar lebar: di ponsel kurang
 * terasa, berat untuk HP murah, dan bisa memusingkan.
 */
onMounted(() => {
  const el = root.value
  if (!el) return

  const bingkai = el.querySelector<HTMLElement>('[data-foto-bingkai]')
  const foto = el.querySelector<HTMLElement>('[data-foto]')
  const kartu = el.querySelector<HTMLElement>('[data-foto-kartu]')
  if (!bingkai || !foto) return

  const { $gsap } = useNuxtApp()
  const mm = $gsap.matchMedia(el)

  mm.add(
    { lebar: '(min-width: 1024px)', gerak: '(prefers-reduced-motion: no-preference)' },
    (konteks) => {
      const { lebar, gerak } = konteks.conditions as { lebar: boolean; gerak: boolean }
      if (!gerak) return

      const pemicu = { trigger: bingkai, start: 'top 88%', once: true }
      /* Di layar lebar foto diperbesar sedikit agar geseran parallax tidak memperlihatkan tepi. */
      const skalaAkhir = lebar ? 1.08 : 1

      $gsap.fromTo(
        bingkai,
        { clipPath: 'inset(100% 0% 0% 0% round 2rem)' },
        { clipPath: 'inset(0% 0% 0% 0% round 2rem)', duration: lebar ? 1.2 : 0.9, ease: 'expo.out', scrollTrigger: pemicu },
      )
      $gsap.fromTo(foto, { scale: skalaAkhir + 0.12 }, { scale: skalaAkhir, duration: 1.4, scrollTrigger: pemicu })

      if (lebar) {
        $gsap.fromTo(
          foto,
          { yPercent: -3 },
          { yPercent: 3, ease: 'none', scrollTrigger: { trigger: bingkai, start: 'top bottom', end: 'bottom top', scrub: 0.6 } },
        )
      }

      /* Kartu memakai scale dan opacity; sumbu y sudah dipegang parallax scroll. */
      if (kartu) {
        $gsap.fromTo(
          kartu,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.7, delay: 0.45, ease: 'back.out(1.4)', scrollTrigger: pemicu },
        )
      }
    },
  )

  onBeforeUnmount(() => mm.revert())
})
</script>

<template>
  <section ref="root" class="section-tmk overflow-hidden">
    <div
      class="container-tmk grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-stretch lg:gap-16"
    >
      <!-- Kolom visual: foto bangunan, di layar lebar setinggi kolom teks -->
      <div class="relative order-2 lg:order-1">
        <div
          data-foto-bingkai
          class="relative aspect-4/3 overflow-hidden rounded-[2rem] bg-ink-950 lg:aspect-auto lg:h-full"
        >
          <NuxtImg
            data-foto
            src="/gambar/hero/tentang.jpg"
            alt=""
            loading="lazy"
            format="webp"
            sizes="sm:100vw xl:40vw"
            class="absolute inset-0 h-full w-full object-cover object-[40%_center]"
          />
        </div>

        <!-- Kartu mengambang dengan parallax scroll halus -->
        <div
          data-foto-kartu
          data-scroll-parallax="26"
          class="absolute -right-2 top-8 hidden w-52 rounded-2xl border border-ink-200 bg-white p-4 shadow-[var(--shadow-float)] sm:block lg:-right-8"
        >
          <span class="grid size-9 place-items-center rounded-xl bg-leaf-50 text-leaf-600">
            <IconGlyph name="warehouse" :size="19" />
          </span>
          <p class="mt-3 text-sm font-semibold text-ink-900">
            {{ $t('home.hero.cardStock') }}
          </p>
          <!-- Teks ini memuat {count}; dulu dipanggil tanpa angka sehingga
               yang tampil hanya kata "produk". -->
          <p class="mt-0.5 text-xs text-ink-500">{{ $t('home.hero.cardStockValue', { count: jumlahProduk }) }}</p>
        </div>
      </div>

      <!-- Kolom teks -->
      <div class="order-1 lg:order-2">
        <UiSectionHeading
          :eyebrow="$t('home.about.eyebrow')"
          :title="$t('home.about.title')"
        />

        <div v-if="profile" class="mt-6 space-y-4">
          <p
            v-for="(paragraph, index) in profile.story.slice(0, 2)"
            :key="index"
            data-reveal
            class="text-[0.9375rem] leading-relaxed text-ink-600"
          >
            {{ L(paragraph) }}
          </p>
        </div>

        <!-- Angka pencapaian -->
        <ul v-if="profile" class="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
          <li v-for="item in profile.achievements" :key="item.label.id" data-reveal>
            <HomeAchievement :item="item" />
          </li>
        </ul>

        <div data-reveal class="mt-10">
          <UiButton :to="localePath('/tentang-kami')" variant="ghost">
            {{ $t('home.about.cta') }}
            <template #icon-right>
              <span aria-hidden="true">→</span>
            </template>
          </UiButton>
        </div>
      </div>
    </div>
  </section>
</template>

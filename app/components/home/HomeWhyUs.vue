<script setup lang="ts">
/** Keunggulan perusahaan sebagai kartu putih terpisah, senada dengan section sebelum dan sesudahnya. */
const { L } = useLocalized()
const { data } = useCompany()

const root = useTemplateRef<HTMLElement>('root')
/* Geseran dan jeda lebih besar dari irama situs supaya kartu terasa muncul satu per satu. */
useReveal(root, { y: 40, stagger: 0.15 })

const advantages = computed(() => data.value?.data.profile.advantages ?? [])

/* Ikon meletup menyusul kartunya, dengan irama stagger yang sama. */
onMounted(() => {
  const el = root.value
  if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const ikon = Array.from(el.querySelectorAll<HTMLElement>('[data-ikon]'))
  if (ikon.length === 0) return

  const { $gsap, $ScrollTrigger } = useNuxtApp()
  /* Pantulan kecil tanpa putaran, supaya senada dengan animasi lain di situs yang tenang. */
  $gsap.set(ikon, { scale: 0.6, opacity: 0 })

  /* Batch seperti `useReveal`: di ponsel kartu bertumpuk, jadi tiap ikon menunggu kartunya sendiri. */
  const ctx = $gsap.context(() => {
    $ScrollTrigger.batch(ikon, {
      start: 'top 82%',
      once: true,
      onEnter: (kelompok: Element[]) =>
        $gsap.to(kelompok, {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          delay: 0.25,
          stagger: 0.15,
          ease: 'back.out(1.6)',
          overwrite: true,
        }),
    })
  }, el)

  onBeforeUnmount(() => ctx.revert())
})
</script>

<template>
  <section ref="root" class="relative overflow-hidden">
    <div class="container-tmk relative section-tmk">
      <UiSectionHeading
        :eyebrow="$t('home.why.eyebrow')"
        :title="$t('home.why.title')"
        :description="$t('home.why.description')"
        title-class="max-lg:!text-[1.75rem] max-lg:!leading-[1.08]"
      />

      <ul class="mt-7 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-5">
        <!-- GSAP memegang transform di <li>, jadi efek angkat saat hover ditaruh di kartu di dalamnya -->
        <li v-for="advantage in advantages" :key="advantage.title.id" data-reveal>
          <div
            class="group h-full rounded-3xl border border-ink-200 bg-white p-5 shadow-[var(--shadow-lift)] transition-[translate,box-shadow,border-color] duration-500 ease-[var(--ease-tmk)] hover:-translate-y-1.5 hover:border-tmk-200 hover:shadow-[var(--shadow-float)] sm:p-6 lg:p-7"
          >
            <span
              data-ikon
              class="grid size-11 place-items-center rounded-2xl bg-tmk-50 text-tmk-600 transition-colors duration-500 group-hover:bg-tmk-600 group-hover:text-white lg:size-12"
            >
              <IconGlyph :name="advantage.icon" :size="23" />
            </span>

            <h3 class="text-heading mt-4 text-ink-900 lg:mt-6">
              {{ L(advantage.title) }}
            </h3>
            <p class="mt-2 text-[0.8125rem] leading-snug text-ink-600 lg:mt-3 lg:text-sm lg:leading-relaxed">
              {{ L(advantage.description) }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

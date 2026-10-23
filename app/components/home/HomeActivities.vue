<script setup lang="ts">
/** Cuplikan galeri mendatar: mengikuti scroll di layar besar, geser dengan snap di layar kecil. */
const { L } = useLocalized()
const localePath = useLocalePath()
const { data } = useGallery('all')

const root = useTemplateRef<HTMLElement>('root')
const track = useTemplateRef<HTMLElement>('track')
useReveal(root)
const items = computed(() => (data.value?.data ?? []).slice(0, 8))

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  /* Geser mengikuti scroll hanya di layar lebar. */
  if (!window.matchMedia('(min-width: 1024px)').matches) return

  const { $gsap } = useNuxtApp()
  const scope = root.value
  const rail = track.value
  if (!scope || !rail) return

  const ctx = $gsap.context(() => {
    /* Jarak geser dihitung dari lebar isi yang melebihi layar. */
    const overflow = () => Math.max(rail.scrollWidth - window.innerWidth + 120, 0)

    $gsap.to(rail, {
      x: () => -overflow(),
      ease: 'none',
      scrollTrigger: {
        trigger: scope,
        start: 'top 72%',
        end: () => `+=${overflow() + 200}`,
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    })
  }, scope)

  onBeforeUnmount(() => ctx.revert())
})
</script>

<template>
  <section ref="root" class="section-tmk overflow-hidden">
    <div class="container-tmk">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <UiSectionHeading
          :eyebrow="$t('home.activities.eyebrow')"
          :title="$t('home.activities.title')"
        />
        <div data-reveal class="shrink-0 pb-2">
          <UiButton :to="localePath('/galeri')" variant="ghost" size="sm">
            {{ $t('home.activities.cta') }}
            <template #icon-right>
              <span aria-hidden="true">→</span>
            </template>
          </UiButton>
        </div>
      </div>
    </div>

    <!-- Baris geser: full-bleed agar terasa membentang keluar layar -->
    <div class="no-scrollbar mt-9 overflow-x-auto pl-5 lg:overflow-visible lg:pl-0 lg:mt-10">
      <ul
        ref="track"
        class="flex w-max snap-x snap-mandatory gap-4 pr-5 lg:snap-none lg:pl-[max(1.25rem,calc((100vw-84rem)/2+3rem))] lg:pr-0"
      >
        <li
          v-for="(item, index) in items"
          :key="item.id"
          class="w-[76vw] shrink-0 snap-start sm:w-[46vw] lg:w-[22rem]"
        >
          <figure class="group overflow-hidden rounded-2xl">
            <div class="relative aspect-4/3 overflow-hidden bg-ink-100">
              <div
                class="h-full w-full transition-transform duration-700 ease-[var(--ease-tmk)] group-hover:scale-105"
              >
                <MediaVisual
                  :src="item.image"
                  :accent="item.placeholder"
                  :alt="L(item.title)"
                  :seed="item.id + index"
                  sizes="sm:76vw md:46vw lg:22rem"
                />
              </div>

              <span
                class="absolute left-3.5 top-3.5 rounded-full bg-white/90 px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-wider text-ink-700 backdrop-blur-sm"
              >
                {{ $t(`gallery.${item.category}`) }}
              </span>
            </div>

            <figcaption class="pt-4">
              <h3 class="font-[family-name:var(--font-display)] text-base font-semibold text-ink-900">
                {{ L(item.title) }}
              </h3>
              <p class="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-500">
                {{ L(item.caption) }}
              </p>
            </figcaption>
          </figure>
        </li>
      </ul>
    </div>
  </section>
</template>

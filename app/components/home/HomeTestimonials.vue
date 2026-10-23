<script setup lang="ts">
/** Testimoni sebagai kolom masonry; panjang kutipan dibiarkan berbeda. */
const { L } = useLocalized()
const { data } = useCompany()

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)

const testimonials = computed(() => data.value?.data.testimonials ?? [])
</script>

<template>
  <section ref="root" class="section-tmk bg-surface-muted">
    <div class="container-tmk">
      <UiSectionHeading
        :eyebrow="$t('home.testimonials.eyebrow')"
        :title="$t('home.testimonials.title')"
        align="center"
      />

      <!-- Kolom CSS memberi tinggi kartu yang alami tanpa JavaScript -->
      <div class="mt-9 gap-5 lg:mt-10 sm:columns-2 lg:columns-3">
        <figure
          v-for="item in testimonials"
          :key="item.id"
          data-reveal
          class="card-tmk mb-5 break-inside-avoid p-6"
        >
          <!-- role="img" wajib: sebuah <div> polos tidak boleh membawa
               aria-label, dan tanpa itu bintangnya tak terbaca pembaca layar. -->
          <div class="flex gap-0.5" role="img" :aria-label="`${item.rating} / 5`">
            <span
              v-for="star in 5"
              :key="star"
              class="text-sm"
              :class="star <= item.rating ? 'text-tmk-500' : 'text-ink-200'"
              aria-hidden="true"
            >★</span>
          </div>

          <blockquote class="mt-4 text-[0.9375rem] leading-relaxed text-ink-600">
            “{{ L(item.content) }}”
          </blockquote>

          <figcaption class="mt-5 flex items-center gap-3 border-t border-ink-200 pt-5">
            <span
              class="grid size-10 shrink-0 place-items-center rounded-full bg-tmk-50 font-[family-name:var(--font-display)] text-xs font-bold text-tmk-700"
              aria-hidden="true"
            >
              {{ item.initials }}
            </span>
            <span class="min-w-0">
              <span class="block truncate text-sm font-semibold text-ink-900">{{ item.name }}</span>
              <span class="block truncate text-xs text-ink-500">
                {{ L(item.role) }} · {{ item.location }}
              </span>
            </span>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

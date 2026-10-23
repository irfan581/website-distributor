<script setup lang="ts">
/** Layanan sebagai daftar bernomor, bukan grid kartu. */
const { L } = useLocalized()
const localePath = useLocalePath()
const { data } = useCompany()

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)

const services = computed(() => data.value?.data.services ?? [])
</script>

<template>
  <section ref="root" class="section-tmk">
    <div class="container-tmk">
      <UiSectionHeading
        :eyebrow="$t('home.services.eyebrow')"
        :title="$t('home.services.title')"
        :description="$t('home.services.description')"
      />

      <ul class="mt-9 border-t border-ink-200 lg:mt-10">
        <li v-for="(service, index) in services" :key="service.id" data-reveal>
          <NuxtLink
            :to="localePath('/layanan')"
            class="group grid items-start gap-x-8 gap-y-3 border-b border-ink-200 py-7 transition-colors duration-500 hover:border-tmk-300 sm:grid-cols-[auto_1fr_auto] lg:py-9"
          >
            <span
              class="font-[family-name:var(--font-display)] text-sm font-semibold tabular-nums text-ink-400 transition-colors duration-500 group-hover:text-tmk-500 sm:pt-1.5"
            >
              {{ String(index + 1).padStart(2, '0') }}
            </span>

            <div class="sm:flex sm:items-start sm:gap-7">
              <div class="flex items-center gap-3.5 sm:w-72 sm:shrink-0">
                <span
                  class="grid size-10 shrink-0 place-items-center rounded-xl bg-ink-50 text-ink-500 transition-colors duration-500 group-hover:bg-tmk-50 group-hover:text-tmk-600 sm:hidden"
                >
                  <IconGlyph :name="service.icon" :size="20" />
                </span>
                <h3
                  class="text-heading transition-colors duration-300 group-hover:text-tmk-600 sm:!text-xl"
                >
                  {{ L(service.title) }}
                </h3>
              </div>

              <p class="mt-2 max-w-lg text-sm leading-relaxed text-ink-500 sm:mt-1">
                {{ L(service.summary) }}
              </p>
            </div>

            <span
              class="hidden size-10 place-items-center rounded-full border border-ink-200 text-ink-400 transition-all duration-500 ease-[var(--ease-tmk)] group-hover:border-tmk-400 group-hover:bg-tmk-600 group-hover:text-white sm:grid"
              aria-hidden="true"
            >→</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
const { L } = useLocalized()
const localePath = useLocalePath()
const { data } = useCompany()

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
const areas = computed(() => data.value?.data.coverage ?? [])

/* Dikelompokkan per provinsi agar sebaran wilayah langsung terbaca. */
const grouped = computed(() => {
  const groups = new Map<string, typeof areas.value>()
  for (const area of areas.value) {
    const key = L(area.province)
    groups.set(key, [...(groups.get(key) ?? []), area])
  }
  return Array.from(groups, ([province, list]) => ({ province, list }))
})
</script>

<template>
  <section ref="root" class="section-tmk bg-surface-muted">
    <div class="container-tmk grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
      <div>
        <!-- Judul dikecilkan di desktop karena kolom kirinya sempit; di ponsel tidak diubah. -->
        <UiSectionHeading
          :eyebrow="$t('home.coverage.eyebrow')"
          :title="$t('home.coverage.title')"
          :description="$t('home.coverage.description')"
          title-class="lg:!text-[2.75rem] lg:!leading-[1.08]"
          description-class="lg:leading-relaxed"
        />

        <div class="mt-7 space-y-5 lg:mt-8 lg:space-y-6">
          <div v-for="group in grouped" :key="group.province" data-reveal>
            <h3 class="text-xs font-semibold uppercase tracking-[0.16em] text-tmk-600">
              {{ group.province }}
            </h3>
            <ul class="mt-3 flex flex-wrap gap-2">
              <li
                v-for="area in group.list"
                :key="area.id"
                class="rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[0.8125rem] font-medium text-ink-600"
                :class="area.is_hub && '!border-tmk-300 !bg-tmk-50 !text-tmk-700'"
              >
                {{ area.name }}
              </li>
            </ul>
          </div>
        </div>

        <div data-reveal class="mt-7 lg:mt-8">
          <UiButton :to="localePath('/jangkauan-distribusi')" variant="ghost">
            {{ $t('home.coverage.cta') }}
            <template #icon-right>
              <span aria-hidden="true">→</span>
            </template>
          </UiButton>
        </div>
      </div>

      <div data-reveal class="rounded-[2rem] border border-ink-200 bg-white p-6 sm:p-8">
        <CoverageMap :areas="areas" tone="light" />
      </div>
    </div>
  </section>
</template>

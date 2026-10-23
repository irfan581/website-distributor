<script setup lang="ts">
/** Ajakan menuju tim sales: daftar wilayah saja, sales lengkap ada di halamannya. */
const localePath = useLocalePath()
const { data } = useSalesRegions()

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)

const regions = computed(() => data.value?.data ?? [])
</script>

<template>
  <section ref="root" class="section-tmk">
    <div class="container-tmk">
      <div class="grid gap-9 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-10">
        <div>
          <UiSectionHeading
            :eyebrow="$t('nav.sales')"
            :title="$t('sales.homeTitle')"
            :description="$t('sales.homeDescription')"
          />

          <div data-reveal class="mt-9">
            <UiButton :to="localePath('/sales')" size="lg" magnetic>
              {{ $t('sales.seeAll') }}
              <template #icon-right>
                <span aria-hidden="true">→</span>
              </template>
            </UiButton>
          </div>
        </div>

        <!-- Wilayah sebagai pintu ke sales. Bila jumlahnya ganjil, kotak terakhir selebar dua kolom. -->
        <ul class="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-ink-200 sm:grid-cols-3">
          <li
            v-for="(region, index) in regions"
            :key="region.slug"
            data-reveal
            :class="regions.length % 2 === 1 && index === regions.length - 1 && 'col-span-2 sm:col-span-1'"
          >
            <NuxtLink
              :to="localePath({ path: '/sales', query: { wilayah: region.slug } })"
              class="group flex h-full flex-col justify-between gap-3 bg-white p-4 transition-colors duration-300 hover:bg-tmk-50 sm:p-5"
            >
              <span
                class="font-[family-name:var(--font-display)] text-[0.9375rem] font-semibold text-ink-900 transition-colors duration-300 group-hover:text-tmk-700"
              >
                {{ region.name }}
              </span>
              <span class="text-xs text-ink-400">
                {{ region.sales_count }} {{ $t('nav.sales').toLowerCase() }}
              </span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

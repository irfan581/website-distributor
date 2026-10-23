<script setup lang="ts">
import type { SalesRegion } from '#shared/types/content'

/** Pemilih wilayah. Wilayah tanpa sales sudah disaring di API. */
defineProps<{ regions: SalesRegion[] }>()
const model = defineModel<string>({ required: true })

const { L } = useLocalized()
</script>

<template>
  <!-- Di layar kecil barisannya digulir mendatar; mulai sm ia membungkus,
       karena 13 pilihan tidak muat satu baris dan chip yang terpotong di tepi
       kanan terbaca seperti cacat tampilan, bukan isyarat bisa digulir. -->
  <div class="no-scrollbar -mx-5 overflow-x-auto px-5 sm:mx-0 sm:overflow-visible sm:px-0">
    <ul
      class="flex w-max gap-2 sm:w-full sm:flex-wrap"
      :aria-label="$t('sales.filterLabel')"
    >
      <li>
        <button
          type="button"
          class="rounded-full border px-4 py-2 font-[family-name:var(--font-display)] text-[0.8125rem] font-medium transition-colors duration-300"
          :class="
            model === 'all'
              ? 'border-tmk-600 bg-tmk-600 text-white'
              : 'border-ink-200 text-ink-600 hover:border-tmk-300 hover:text-tmk-600'
          "
          :aria-pressed="model === 'all'"
          @click="model = 'all'"
        >
          {{ $t('sales.allRegions') }}
        </button>
      </li>

      <li v-for="region in regions" :key="region.slug">
        <button
          type="button"
          class="rounded-full border px-4 py-2 font-[family-name:var(--font-display)] text-[0.8125rem] font-medium transition-colors duration-300"
          :class="
            model === region.slug
              ? 'border-tmk-600 bg-tmk-600 text-white'
              : 'border-ink-200 text-ink-600 hover:border-tmk-300 hover:text-tmk-600'
          "
          :aria-pressed="model === region.slug"
          :title="L(region.province)"
          @click="model = region.slug"
        >
          {{ region.name }}
        </button>
      </li>
    </ul>
  </div>
</template>

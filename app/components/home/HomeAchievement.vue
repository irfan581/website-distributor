<script setup lang="ts">
import type { Achievement } from '#shared/types/content'

/** Satu angka pencapaian. Dipisah karena `useCounter` butuh referensi elemen per item. */
const props = defineProps<{ item: Achievement }>()

const { L } = useLocalized()
const el = useTemplateRef<HTMLElement>('el')
const display = useCounter(el, () => props.item.value, { isYear: props.item.is_year })
</script>

<template>
  <div ref="el">
    <p
      class="font-[family-name:var(--font-display)] text-[clamp(1.75rem,1.4rem+1.4vw,2.5rem)] font-bold leading-none tracking-tight text-ink-900"
    >
      {{ display }}<span class="text-tmk-500">{{ item.suffix }}</span>
    </p>
    <p class="mt-2 text-[0.8125rem] leading-snug text-ink-500">
      {{ L(item.label) }}
    </p>
  </div>
</template>

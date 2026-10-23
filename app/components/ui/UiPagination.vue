<script setup lang="ts">
import type { PaginationMeta } from '#shared/types/content'

/** Pagination dengan maksimal lima nomor dan elipsis, muat di layar 320px. */
const props = defineProps<{ meta: PaginationMeta }>()
const emit = defineEmits<{ change: [page: number] }>()

const pages = computed<(number | '…')[]>(() => {
  const { current_page: current, last_page: last } = props.meta
  if (last <= 7) return Array.from({ length: last }, (_, i) => i + 1)

  const window: (number | '…')[] = [1]
  const from = Math.max(2, current - 1)
  const to = Math.min(last - 1, current + 1)

  if (from > 2) window.push('…')
  for (let i = from; i <= to; i++) window.push(i)
  if (to < last - 1) window.push('…')
  window.push(last)

  return window
})

const canPrev = computed(() => props.meta.current_page > 1)
const canNext = computed(() => props.meta.current_page < props.meta.last_page)
</script>

<template>
  <nav v-if="meta.last_page > 1" class="flex items-center justify-center gap-1.5" aria-label="Pagination">
    <button
      type="button"
      class="grid size-10 place-items-center rounded-full border border-ink-200 text-ink-500 transition-colors duration-300 hover:border-tmk-400 hover:text-tmk-600 disabled:pointer-events-none disabled:opacity-40"
      :disabled="!canPrev"
      :aria-label="$t('catalog.prev')"
      @click="emit('change', meta.current_page - 1)"
    >
      <span aria-hidden="true">←</span>
    </button>

    <template v-for="(item, index) in pages" :key="`${item}-${index}`">
      <span v-if="item === '…'" class="px-1 text-sm text-ink-300" aria-hidden="true">…</span>

      <button
        v-else
        type="button"
        class="size-10 rounded-full font-[family-name:var(--font-display)] text-sm font-semibold tabular-nums transition-colors duration-300"
        :class="
          item === meta.current_page
            ? 'bg-tmk-600 text-white'
            : 'border border-ink-200 text-ink-600 hover:border-tmk-400 hover:text-tmk-600'
        "
        :aria-label="$t('catalog.page', { n: item })"
        :aria-current="item === meta.current_page ? 'page' : undefined"
        @click="emit('change', item)"
      >
        {{ item }}
      </button>
    </template>

    <button
      type="button"
      class="grid size-10 place-items-center rounded-full border border-ink-200 text-ink-500 transition-colors duration-300 hover:border-tmk-400 hover:text-tmk-600 disabled:pointer-events-none disabled:opacity-40"
      :disabled="!canNext"
      :aria-label="$t('catalog.next')"
      @click="emit('change', meta.current_page + 1)"
    >
      <span aria-hidden="true">→</span>
    </button>
  </nav>
</template>

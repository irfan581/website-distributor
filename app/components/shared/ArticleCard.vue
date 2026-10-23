<script setup lang="ts">
import type { ArticleSummary } from '#shared/types/content'

/** Kartu artikel — dipakai di beranda dan halaman daftar artikel. */
withDefaults(defineProps<{ article: ArticleSummary; compact?: boolean }>(), { compact: false })

const { L } = useLocalized()
const localePath = useLocalePath()
const { formatDate } = useFormat()
</script>

<template>
  <article class="card-tmk card-lift group h-full overflow-hidden">
    <NuxtLink :to="localePath(`/artikel/${article.slug}`)" class="flex h-full flex-col">
      <div class="relative aspect-16/10 overflow-hidden bg-ink-100">
        <div
          class="h-full w-full transition-transform duration-700 ease-[var(--ease-tmk)] group-hover:scale-105"
        >
          <MediaVisual
            :src="article.image"
            :accent="article.placeholder"
            :alt="L(article.title)"
            :seed="article.id * 11"
          />
        </div>
      </div>

      <div class="flex flex-1 flex-col p-5 sm:p-6">
        <div class="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.6875rem]">
          <span class="font-semibold uppercase tracking-[0.12em] text-tmk-600">
            {{ L(article.category) }}
          </span>
          <span class="text-ink-300" aria-hidden="true">·</span>
          <time :datetime="article.published_at" class="text-ink-400">
            {{ formatDate(article.published_at) }}
          </time>
        </div>

        <h3 class="text-heading mt-2.5 transition-colors duration-300 group-hover:text-tmk-600">
          {{ L(article.title) }}
        </h3>

        <p v-if="!compact" class="mt-2.5 line-clamp-2 text-sm leading-relaxed text-ink-500">
          {{ L(article.excerpt) }}
        </p>

        <div class="mt-auto flex items-center justify-between gap-3 pt-5">
          <span class="text-xs text-ink-400">
            {{ $t('common.minuteRead', { n: article.reading_minutes }) }}
          </span>
          <span
            class="inline-flex items-center gap-1.5 font-[family-name:var(--font-display)] text-[0.8125rem] font-semibold text-ink-800 transition-colors duration-300 group-hover:text-tmk-600"
          >
            {{ $t('common.readMore') }}
            <span
              class="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >→</span>
          </span>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>

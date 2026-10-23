<script setup lang="ts">
definePageMeta({ heroOverlay: true })

const route = useRoute()
const slug = computed(() => String(route.params.slug))

const { L, LL } = useLocalized()
const { t } = useI18n()
const { formatDate } = useFormat()
const localePath = useLocalePath()

const { data, error } = await useArticle(slug)

if (error.value || !data.value?.data) {
  throw createError({ statusCode: 404, statusMessage: t('error.404Title'), fatal: true })
}

const article = computed(() => data.value!.data)

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)

useSeoMeta({
  title: () => L(article.value.title),
  description: () => L(article.value.excerpt),
  ogTitle: () => L(article.value.title),
  ogDescription: () => L(article.value.excerpt),
  ogType: 'article',
  articlePublishedTime: () => article.value.published_at,
  articleAuthor: () => [article.value.author],
})

useSchemaOrg([
  defineArticle({
    headline: L(article.value.title),
    description: L(article.value.excerpt),
    datePublished: article.value.published_at,
    author: { name: article.value.author },
  }),
])
</script>

<template>
  <div ref="root">
    <PageHero
      :eyebrow="L(article.category)"
      :title="L(article.title)"
      :crumbs="[
        { label: $t('nav.articles'), to: localePath('/artikel') },
        { label: L(article.title) },
      ]"
    >
      <div class="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/60">
        <span>{{ $t('articles.by', { author: article.author }) }}</span>
        <span class="text-white/25" aria-hidden="true">·</span>
        <time :datetime="article.published_at">
          {{ $t('articles.publishedOn', { date: formatDate(article.published_at) }) }}
        </time>
        <span class="text-white/25" aria-hidden="true">·</span>
        <span>{{ $t('common.minuteRead', { n: article.reading_minutes }) }}</span>
      </div>
    </PageHero>

    <article class="section-tmk">
      <div class="container-tmk">
        <div data-reveal class="mx-auto aspect-16/9 max-w-4xl overflow-hidden rounded-[1.75rem] bg-ink-900">
          <MediaVisual
            :src="article.image"
            :accent="article.placeholder"
            :alt="L(article.title)"
            :seed="article.id * 11"
            sizes="sm:100vw lg:56rem"
          />
        </div>

        <!-- Isi artikel. Blok dirender sesuai tipe dari API sehingga editor di
             dashboard nanti bisa menyusun urutan bebas tanpa mengubah kode. -->
        <div class="mx-auto mt-9 max-w-3xl">
          <template v-for="(block, index) in article.body" :key="index">
            <h2
              v-if="block.type === 'heading'"
              data-reveal
              class="text-title mt-9 first:mt-0"
            >
              {{ L(block.text) }}
            </h2>

            <p
              v-else-if="block.type === 'paragraph'"
              data-reveal
              class="mt-6 text-[1.0625rem] leading-[1.8] text-ink-600"
            >
              {{ L(block.text) }}
            </p>

            <ul v-else-if="block.type === 'list'" data-reveal class="mt-6 space-y-3">
              <li
                v-for="(item, itemIndex) in LL(block.items)"
                :key="itemIndex"
                class="flex gap-4 text-[1.0625rem] leading-relaxed text-ink-600"
              >
                <span class="mt-2.5 block size-1.5 shrink-0 rounded-full bg-tmk-500" aria-hidden="true" />
                {{ item }}
              </li>
            </ul>

            <blockquote
              v-else-if="block.type === 'quote'"
              data-reveal
              class="my-10 border-l-2 border-tmk-500 py-2 pl-6"
            >
              <p
                class="font-[family-name:var(--font-display)] text-xl font-medium leading-snug text-ink-900"
              >
                “{{ L(block.text) }}”
              </p>
            </blockquote>
          </template>

          <!-- Tag -->
          <div v-if="article.tags.length" data-reveal class="mt-9 border-t border-ink-200 pt-8">
            <h2 class="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
              {{ $t('articles.tags') }}
            </h2>
            <ul class="mt-4 flex flex-wrap gap-2">
              <li
                v-for="tag in LL(article.tags)"
                :key="tag"
                class="rounded-full border border-ink-200 px-3.5 py-1.5 text-[0.8125rem] text-ink-600"
              >
                {{ tag }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </article>

    <!-- Artikel lain -->
    <section v-if="article.related.length" class="section-tmk bg-surface-muted">
      <div class="container-tmk">
        <UiSectionHeading :title="$t('articles.related')" as="h2" />

        <ul class="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <li v-for="item in article.related" :key="item.id" data-reveal>
            <ArticleCard :article="item" />
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

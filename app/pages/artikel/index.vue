<script setup lang="ts">
definePageMeta({ heroOverlay: true })

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const page = ref(Math.max(Number(route.query.page) || 1, 1))
const { data } = useArticles(page, 9)

const root = useTemplateRef<HTMLElement>('root')
const list = useTemplateRef<HTMLElement>('list')
useReveal(root)

const articles = computed(() => data.value?.data ?? [])
const meta = computed(() => data.value?.meta)

/* Sama seperti katalog: berpindah halaman membawa pengunjung ke awal daftar,
   bukan ke puncak halaman. Menekan halaman yang sedang aktif tidak berefek. */
function goToPage(next: number) {
  if (next === page.value) return

  page.value = next
  router.replace({ query: next > 1 ? { page: String(next) } : {} })
  scrollToElement(list.value)
}

useSeoMeta({
  title: () => t('articles.title'),
  description: () => t('articles.description'),
  ogTitle: () => t('articles.title'),
  ogDescription: () => t('articles.description'),
})
</script>

<template>
  <div ref="root">
    <PageHero
      :eyebrow="$t('nav.articles')"
      :title="$t('articles.title')"
      :description="$t('articles.description')"
      :crumbs="[{ label: $t('nav.articles') }]"
    />

    <section ref="list" class="section-tmk">
      <div class="container-tmk">
        <ul class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <li v-for="article in articles" :key="article.id" data-reveal>
            <ArticleCard :article="article" />
          </li>
        </ul>

        <div v-if="meta" class="mt-10">
          <UiPagination :meta="meta" @change="goToPage" />
        </div>
      </div>
    </section>
  </div>
</template>

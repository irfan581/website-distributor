<script setup lang="ts">
const localePath = useLocalePath()
const { data } = useArticles(1, 3)

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)

const articles = computed(() => data.value?.data ?? [])
</script>

<template>
  <section ref="root" class="section-tmk">
    <div class="container-tmk">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <UiSectionHeading
          :eyebrow="$t('home.articles.eyebrow')"
          :title="$t('home.articles.title')"
          :description="$t('home.articles.description')"
        />
        <div data-reveal class="hidden shrink-0 pb-2 lg:block">
          <UiButton :to="localePath('/artikel')" variant="ghost" size="sm">
            {{ $t('common.viewAll') }}
            <template #icon-right>
              <span aria-hidden="true">→</span>
            </template>
          </UiButton>
        </div>
      </div>

      <ul class="mt-9 grid gap-5 md:grid-cols-2 lg:mt-10 lg:grid-cols-3">
        <li v-for="article in articles" :key="article.id" data-reveal>
          <ArticleCard :article="article" />
        </li>
      </ul>

      <div data-reveal class="mt-10 lg:hidden">
        <UiButton :to="localePath('/artikel')" variant="ghost" block>
          {{ $t('common.viewAll') }}
        </UiButton>
      </div>
    </div>
  </section>
</template>

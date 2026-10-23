<script setup lang="ts">
definePageMeta({ heroOverlay: true })

const route = useRoute()
const slug = computed(() => String(route.params.slug))

const { L } = useLocalized()
const { t } = useI18n()
const localePath = useLocalePath()

/* Ditunggu di sini: pemeriksaan 404 di bawah harus melihat data yang sudah ada. */
const { data } = await useCategories()
const category = computed(() => data.value?.data.find((c) => c.slug === slug.value))

/* Kategori yang tidak ada harus 404, bukan katalog kosong tanpa penjelasan. */
if (!category.value) {
  throw createError({ statusCode: 404, statusMessage: t('error.404Title'), fatal: true })
}

useSeoMeta({
  title: () => L(category.value!.name),
  description: () => L(category.value!.description),
  ogTitle: () => L(category.value!.name),
  ogDescription: () => L(category.value!.description),
})
</script>

<template>
  <div v-if="category">
    <PageHero
      :eyebrow="$t('nav.products')"
      :title="L(category.name)"
      :description="L(category.description)"
      :crumbs="[
        { label: $t('nav.products'), to: localePath('/produk') },
        { label: L(category.name) },
      ]"
    >
      <p class="mt-8 inline-flex items-center gap-2.5 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80">
        <IconGlyph :name="category.icon" :size="18" class="text-tmk-300" />
        {{ category.products_count }} {{ $t('common.products') }}
      </p>
    </PageHero>

    <ProductCatalog :locked-category="category.slug" />
  </div>
</template>

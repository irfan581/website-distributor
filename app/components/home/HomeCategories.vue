<script setup lang="ts">
/** Kartu kategori dengan cuplikan foto produk; kategori pertama selebar dua kolom. */
const { L } = useLocalized()
const localePath = useLocalePath()
const { data } = useCategories()

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)

/* Kategori tanpa produk tidak ditampilkan, sama seperti di filter katalog. */
const categories = computed(() => (data.value?.data ?? []).filter((c) => c.products_count > 0))
const totalProducts = computed(() => categories.value.reduce((n, c) => n + c.products_count, 0))
</script>

<template>
  <section ref="root" class="section-tmk relative">
    <div class="container-tmk">
      <UiSectionHeading
        :eyebrow="$t('home.categories.eyebrow')"
        :title="$t('home.categories.title')"
        :description="$t('home.categories.description', { products: totalProducts, categories: categories.length })"
      />

      <ul class="mt-9 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3">
        <li
          v-for="(category, index) in categories"
          :key="category.id"
          data-reveal
          :class="index === 0 && 'sm:col-span-2 lg:col-span-2'"
        >
          <NuxtLink
            :to="localePath(`/kategori/${category.slug}`)"
            class="card-tmk card-lift group relative flex h-full flex-col overflow-hidden p-6 sm:p-7"
          >
            <!-- Cahaya aksen yang menyala saat disorot -->
            <span
              class="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
              :class="category.accent === 'leaf' ? 'bg-leaf-400/25' : 'bg-tmk-400/25'"
              aria-hidden="true"
            />

            <span
              class="relative grid size-12 place-items-center rounded-2xl transition-colors duration-500"
              :class="
                category.accent === 'leaf'
                  ? 'bg-leaf-50 text-leaf-600 group-hover:bg-leaf-600 group-hover:text-white'
                  : 'bg-tmk-50 text-tmk-600 group-hover:bg-tmk-600 group-hover:text-white'
              "
            >
              <IconGlyph :name="category.icon" :size="24" />
            </span>

            <h3
              class="text-heading relative mt-5 transition-colors duration-300 group-hover:text-tmk-600"
              :class="index === 0 && 'sm:!text-2xl'"
            >
              {{ L(category.name) }}
            </h3>

            <p
              class="relative mt-2.5 max-w-md text-sm leading-relaxed text-ink-500"
              :class="index === 0 && 'sm:text-base'"
            >
              {{ index === 0 ? L(category.description) : L(category.tagline) }}
            </p>

            <!-- Kartu lebar memuat enam foto, kartu biasa tiga; di ponsel semuanya tiga. -->
            <ul
              v-if="category.preview?.length"
              class="relative mt-6 grid gap-2"
              :class="index === 0 ? 'grid-cols-3 sm:grid-cols-6' : 'grid-cols-3'"
              aria-hidden="true"
            >
              <li
                v-for="(foto, i) in index === 0 ? category.preview : category.preview.slice(0, 3)"
                :key="foto.id"
                class="aspect-square overflow-hidden rounded-xl bg-foto p-1.5"
                :class="i >= 3 && 'hidden sm:block'"
              >
                <NuxtImg
                  v-if="foto.url"
                  :src="foto.url"
                  alt=""
                  loading="lazy"
                  format="webp"
                  sizes="120px sm:160px"
                  class="h-full w-full object-contain transition-transform duration-700 ease-[var(--ease-tmk)] group-hover:scale-105"
                />
              </li>
            </ul>

            <div class="relative mt-auto flex items-center justify-between gap-3 pt-6">
              <span class="text-xs font-medium uppercase tracking-wider text-ink-400">
                {{ category.products_count }} {{ $t('common.products') }}
              </span>
              <span
                class="grid size-9 place-items-center rounded-full border border-ink-200 text-ink-500 transition-all duration-500 ease-[var(--ease-tmk)] group-hover:border-tmk-400 group-hover:bg-tmk-600 group-hover:text-white"
                aria-hidden="true"
              >→</span>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

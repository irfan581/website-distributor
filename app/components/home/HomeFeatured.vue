<script setup lang="ts">
/** Produk unggulan, dari endpoint katalog yang sama dengan filter `featured`. */
const localePath = useLocalePath()
const { data } = useProducts({ featured: true, per_page: 4 })

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)

const products = computed(() => data.value?.data ?? [])
</script>

<template>
  <section ref="root" class="section-tmk bg-surface-muted">
    <div class="container-tmk">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <UiSectionHeading
          :eyebrow="$t('home.featured.eyebrow')"
          :title="$t('home.featured.title')"
          :description="$t('home.featured.description')"
        />

        <div data-reveal class="hidden shrink-0 pb-2 lg:block">
          <UiButton :to="localePath('/produk')" variant="ghost" size="sm">
            {{ $t('nav.allProducts') }}
            <template #icon-right>
              <span aria-hidden="true">→</span>
            </template>
          </UiButton>
        </div>
      </div>

      <!-- Dua kolom sejak lebar ponsel, sama dengan katalog. Satu kolom membuat
           delapan kartu produk memakan sekitar 2.500 piksel beranda. -->
      <ul class="mt-9 grid grid-cols-2 gap-3 sm:gap-5 lg:mt-10 lg:grid-cols-4">
        <li v-for="product in products" :key="product.id" data-reveal>
          <ProductCard :product="product" />
        </li>
      </ul>

      <div data-reveal class="mt-10 lg:hidden">
        <UiButton :to="localePath('/produk')" variant="ghost" block>
          {{ $t('nav.allProducts') }}
        </UiButton>
      </div>
    </div>
  </section>
</template>

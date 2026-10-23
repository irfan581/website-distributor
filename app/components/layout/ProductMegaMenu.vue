<script setup lang="ts">
/** Mega menu kategori produk, dari API yang sama dengan katalog. */
defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

const { L } = useLocalized()
const localePath = useLocalePath()
const { data } = useCategories()

/* Kategori tanpa produk tidak ditampilkan di mega menu, sebab tautannya
   berujung pada halaman kategori yang kosong. */
const categories = computed(() =>
  (data.value?.data ?? []).filter((c) => c.products_count > 0),
)
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-[var(--ease-tmk)]"
    enter-from-class="opacity-0 -translate-y-2"
    leave-active-class="transition duration-200 ease-in"
    leave-to-class="opacity-0 -translate-y-1"
  >
    <div
      v-if="open"
      class="absolute inset-x-0 top-full origin-top border-t border-ink-200/70 bg-white/95 shadow-[0_28px_60px_-30px_rgba(20,25,23,0.35)] backdrop-blur-xl"
      @mouseleave="emit('close')"
    >
      <div class="container-tmk grid gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_2.1fr]">
        <!-- Kolom pengantar -->
        <div class="flex flex-col justify-between gap-6">
          <div>
            <p class="eyebrow">
              {{ $t('nav.megaTitle') }}
            </p>
            <p class="text-lead mt-4 max-w-sm">{{ $t('nav.megaDescription') }}</p>
          </div>

          <UiButton :to="localePath('/produk')" variant="ghost" size="sm" @click="emit('close')">
            {{ $t('nav.allProducts') }}
            <template #icon-right>
              <span aria-hidden="true">→</span>
            </template>
          </UiButton>
        </div>

        <!-- Daftar kategori -->
        <ul class="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          <li v-for="category in categories" :key="category.id">
            <NuxtLink
              :to="localePath(`/kategori/${category.slug}`)"
              class="group flex h-full gap-3.5 rounded-2xl border border-transparent p-4 transition-colors duration-300 hover:border-ink-200 hover:bg-ink-50"
              @click="emit('close')"
            >
              <span
                class="mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl transition-colors duration-300"
                :class="
                  category.accent === 'leaf'
                    ? 'bg-leaf-50 text-leaf-600 group-hover:bg-leaf-100'
                    : 'bg-tmk-50 text-tmk-600 group-hover:bg-tmk-100'
                "
              >
                <IconGlyph :name="category.icon" :size="20" />
              </span>

              <span class="min-w-0">
                <span
                  class="block font-[family-name:var(--font-display)] text-[0.95rem] font-semibold text-ink-900"
                >
                  {{ L(category.name) }}
                </span>
                <span class="mt-1 block text-[0.8125rem] leading-snug text-ink-500">
                  {{ L(category.tagline) }}
                </span>
                <span class="mt-2 block text-[0.6875rem] font-medium uppercase tracking-wider text-tmk-600">
                  {{ category.products_count }} {{ $t('common.products') }}
                </span>
              </span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </Transition>
</template>

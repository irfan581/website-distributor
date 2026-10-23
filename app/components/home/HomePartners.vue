<script setup lang="ts">
/** Deretan merek principal. Selama `brand.logo` kosong, nama merek tampil sebagai teks. */
const { data } = useBrands()

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)

const brands = computed(() => data.value?.data ?? [])

/* Sel pengisi baris terakhir grid agar sisa selnya tidak tampil abu-abu (2 dan 4 kolom). */
const pengisi = computed(() => {
  const n = brands.value.length
  const dua = (2 - (n % 2)) % 2
  const empat = (4 - (n % 4)) % 4
  return Array.from({ length: Math.max(dua, empat) }, (_, i) => ({
    ponsel: i < dua,
    lebar: i < empat,
  }))
})
</script>

<template>
  <section ref="root" class="border-y border-ink-200 bg-surface-muted py-12 lg:py-14">
    <div class="container-tmk">
      <div class="grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:items-center lg:gap-10">
        <div>
          <p data-reveal class="eyebrow">
            {{ $t('home.partners.eyebrow') }}
          </p>
          <h2 data-reveal class="text-title mt-4">{{ $t('home.partners.title') }}</h2>
          <p data-reveal class="mt-4 text-sm leading-relaxed text-ink-500">
            {{ $t('home.partners.description') }}
          </p>
        </div>

        <ul class="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-ink-200 sm:grid-cols-4">
          <li
            v-for="brand in brands"
            :key="brand.id"
            data-reveal
            class="flex min-h-24 flex-col items-center justify-center gap-1 bg-surface-muted px-4 py-6 text-center transition-colors duration-500 hover:bg-white"
          >
            <NuxtImg
              v-if="brand.logo"
              :src="brand.logo"
              :alt="brand.name"
              loading="lazy"
              class="h-7 w-auto opacity-70 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0"
            />
            <template v-else>
              <span
                class="font-[family-name:var(--font-display)] text-[0.9375rem] font-semibold tracking-tight text-ink-700"
              >
                {{ brand.name }}
              </span>
              <span class="text-[0.6875rem] text-ink-400">
                {{ brand.products_count }} {{ $t('common.products') }}
              </span>
            </template>
          </li>
          <li
            v-for="(sel, i) in pengisi"
            :key="`pengisi-${i}`"
            class="bg-surface-muted"
            :class="[!sel.ponsel && 'hidden', sel.lebar ? 'sm:block' : 'sm:hidden']"
            aria-hidden="true"
          />
        </ul>
      </div>
    </div>
  </section>
</template>

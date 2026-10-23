<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const localePath = useLocalePath()
const isNotFound = computed(() => props.error?.statusCode === 404)

/* Halaman galat memakai layout penuh agar pengunjung tetap punya jalan keluar. */
useHead({ title: () => (isNotFound.value ? '404' : '500') })
</script>

<template>
  <NuxtLayout>
    <section class="relative flex min-h-[70vh] items-center overflow-hidden bg-ink-950 py-24 text-white">
      <UiLatarGelap :opacity="0.24" :duration="120" />

      <div class="container-tmk relative text-center">
        <p
          class="font-[family-name:var(--font-display)] text-[clamp(5rem,16vw,10rem)] font-bold leading-none tracking-tighter text-white/12"
        >
          {{ error?.statusCode ?? 500 }}
        </p>

        <h1 class="text-display mt-2 !text-white">
          {{ isNotFound ? $t('error.404Title') : $t('error.500Title') }}
        </h1>

        <p class="mx-auto mt-5 max-w-md text-[1.0625rem] leading-relaxed text-white/65">
          {{ isNotFound ? $t('error.404Description') : $t('error.500Description') }}
        </p>

        <div class="mt-9 flex flex-wrap justify-center gap-3">
          <UiButton :to="localePath('/')" size="lg" magnetic>
            {{ $t('error.backHome') }}
          </UiButton>
          <UiButton :to="localePath('/produk')" size="lg" variant="light">
            {{ $t('error.seeProducts') }}
          </UiButton>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

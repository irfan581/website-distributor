<script setup lang="ts">
/** Kepala section: label kecil, judul, dan deskripsi opsional. */
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    description?: string
    align?: 'left' | 'center'
    tone?: 'dark' | 'light'
    as?: 'h1' | 'h2' | 'h3'
    /** Penyetel ukuran judul dan deskripsi untuk satu section. Kelas ukuran WAJIB memakai `!`. */
    titleClass?: string
    descriptionClass?: string
  }>(),
  { align: 'left', tone: 'dark', as: 'h2', titleClass: '', descriptionClass: '' },
)
</script>

<template>
  <div
    class="flex flex-col"
    :class="align === 'center' ? 'items-center text-center' : 'items-start'"
  >
    <p v-if="eyebrow" data-reveal class="eyebrow" :class="tone === 'light' && '!text-tmk-300'">
      {{ eyebrow }}
    </p>

    <component
      :is="as"
      data-reveal
      class="text-display mt-3 max-w-3xl"
      :class="[tone === 'light' && '!text-white', titleClass]"
    >
      {{ title }}
    </component>

    <p
      v-if="description"
      data-reveal
      class="text-lead mt-4 max-w-2xl"
      :class="[tone === 'light' && '!text-white/70', descriptionClass]"
    >
      {{ description }}
    </p>

    <slot />
  </div>
</template>

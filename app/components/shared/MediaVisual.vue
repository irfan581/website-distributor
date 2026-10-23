<script setup lang="ts">
/** Visual galeri dan artikel: gradien selama `src` kosong, <NuxtImg> bila terisi. */
const props = withDefaults(
  defineProps<{
    src?: string | null
    accent: string
    alt: string
    /** Angka apa pun; dipakai untuk memvariasikan sudut gradien. */
    seed?: number
    sizes?: string
  }>(),
  { src: null, seed: 0, sizes: 'sm:100vw md:50vw lg:33vw' },
)

const uid = computed(() => `mv-${props.seed}-${props.accent.replace('#', '')}`)
/* Sudut gradien berputar per entri agar deretan kartu tidak terlihat makmur. */
const angle = computed(() => (props.seed * 37) % 360)
</script>

<template>
  <NuxtImg
    v-if="src"
    :src="src"
    :alt="alt"
    :sizes="sizes"
    loading="lazy"
    format="webp"
    class="h-full w-full object-cover"
  />

  <svg
    v-else
    class="h-full w-full"
    viewBox="0 0 400 300"
    preserveAspectRatio="xMidYMid slice"
    role="img"
    :aria-label="alt"
  >
    <defs>
      <linearGradient
        :id="`${uid}-fill`"
        :gradientTransform="`rotate(${angle} 0.5 0.5)`"
        x1="0"
        y1="0"
        x2="1"
        y2="1"
      >
        <stop offset="0%" :stop-color="accent" stop-opacity="0.92" />
        <stop offset="60%" :stop-color="accent" stop-opacity="0.68" />
        <stop offset="100%" stop-color="#141917" stop-opacity="0.82" />
      </linearGradient>
    </defs>

    <rect width="400" height="300" :fill="`url(#${uid}-fill)`" />

    <!-- Motif garis kontur, tanda tangan visual yang sama di seluruh situs -->
    <g fill="none" stroke="#ffffff" stroke-opacity="0.16" stroke-width="1.1">
      <path d="M-20 128c60-30 118 12 176 20s96-26 164-10" />
      <path d="M-20 162c60-30 118 12 176 20s96-26 164-10" />
      <path d="M-20 196c60-30 118 12 176 20s96-26 164-10" />
      <path d="M-20 230c60-30 118 12 176 20s96-26 164-10" />
    </g>

    <!-- Cahaya lembut di sudut atas -->
    <ellipse cx="90" cy="46" rx="130" ry="80" fill="#ffffff" fill-opacity="0.09" />
  </svg>
</template>

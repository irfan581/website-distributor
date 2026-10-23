<script setup lang="ts">
import type { ProductImage } from '#shared/types/content'

/** Visual produk: ilustrasi kemasan per kategori selama `image.url` kosong, <NuxtImg> bila terisi. */
const props = withDefaults(
  defineProps<{
    image: ProductImage
    category?: string
    alt: string
    /** Ilustrasi diperbesar untuk halaman detail. */
    size?: 'card' | 'detail'
    /** Variasi sudut pandang di galeri detail. */
    variant?: number
  }>(),
  { size: 'card', variant: 0 },
)

type Shape = 'sack' | 'jerrycan' | 'bottle' | 'box'

const shape = computed<Shape>(() => {
  switch (props.category) {
    case 'herbisida':
      return 'jerrycan'
    case 'insektisida':
    case 'fungisida':
      return 'bottle'
    case 'rodentisida':
      return 'box'
    default:
      return 'sack'
  }
})

const accent = computed(() => props.image.placeholder)
const uid = computed(() => `pv-${props.image.id}-${props.variant}`)

/* Sudut pandang berbeda untuk galeri: hadap depan, sedikit miring, dan menjauh. */
const pose = computed(() => {
  const poses = [
    { rotate: 0, scale: 1 },
    { rotate: -7, scale: 0.94 },
    { rotate: 5, scale: 0.88 },
  ]
  return poses[props.variant % poses.length]!
})
</script>

<template>
  <!-- Foto asli memakai `object-contain` agar teks di tepi desain tidak terpotong. -->
  <NuxtImg
    v-if="image.url"
    :src="image.url"
    :alt="alt"
    loading="lazy"
    format="webp"
    class="h-full w-full object-contain"
    :sizes="size === 'detail' ? 'xs:100vw lg:416px' : 'sm:100vw md:50vw lg:25vw'"
  />

  <!-- Ilustrasi buatan sebagai pengganti sementara -->
  <svg
    v-else
    class="h-full w-full"
    viewBox="0 0 300 300"
    preserveAspectRatio="xMidYMid meet"
    role="img"
    :aria-label="alt"
  >
    <defs>
      <linearGradient :id="`${uid}-bg`" x1="0" y1="0" x2="0.6" y2="1">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="100%" :stop-color="accent" stop-opacity="0.13" />
      </linearGradient>

      <linearGradient :id="`${uid}-body`" x1="0" y1="0" x2="1" y2="0.9">
        <stop offset="0%" :stop-color="accent" stop-opacity="0.95" />
        <stop offset="55%" :stop-color="accent" />
        <stop offset="100%" :stop-color="accent" stop-opacity="0.72" />
      </linearGradient>

      <!-- Sorotan lembut di sisi kiri kemasan -->
      <linearGradient :id="`${uid}-sheen`" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.32" />
        <stop offset="45%" stop-color="#ffffff" stop-opacity="0.04" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0.12" />
      </linearGradient>

      <clipPath :id="`${uid}-clip`">
        <rect x="0" y="0" width="300" height="300" rx="0" />
      </clipPath>
    </defs>

    <g :clip-path="`url(#${uid}-clip)`">
      <rect width="300" height="300" :fill="`url(#${uid}-bg)`" />

      <!-- Garis kontur latar, motif tanda tangan yang sama seperti di hero -->
      <g fill="none" :stroke="accent" stroke-opacity="0.16" stroke-width="1">
        <path d="M-20 214c60-26 118 10 176 16s96-22 164-8" />
        <path d="M-20 240c60-26 118 10 176 16s96-22 164-8" />
        <path d="M-20 266c60-26 118 10 176 16s96-22 164-8" />
      </g>

      <!-- Bayangan jatuh -->
      <ellipse cx="150" cy="248" rx="74" ry="11" :fill="accent" fill-opacity="0.16" />

      <g
        :transform="`translate(150 152) rotate(${pose.rotate}) scale(${pose.scale}) translate(-150 -152)`"
      >
        <!-- Zak pupuk -->
        <template v-if="shape === 'sack'">
          <path
            d="M104 82c0-6 5-10 11-10h70c6 0 11 4 11 10l8 138c1 11-8 20-19 20h-70c-11 0-20-9-19-20l8-138Z"
            :fill="`url(#${uid}-body)`"
          />
          <path
            d="M104 82c0-6 5-10 11-10h70c6 0 11 4 11 10l8 138c1 11-8 20-19 20h-70c-11 0-20-9-19-20l8-138Z"
            :fill="`url(#${uid}-sheen)`"
          />
          <!-- Jahitan atas -->
          <path
            d="M112 74h76"
            stroke="#ffffff"
            stroke-opacity="0.5"
            stroke-width="3"
            stroke-linecap="round"
            stroke-dasharray="7 6"
          />
          <!-- Panel label -->
          <rect x="118" y="112" width="64" height="46" rx="6" fill="#ffffff" fill-opacity="0.9" />
          <rect x="127" y="126" width="46" height="4" rx="2" :fill="accent" fill-opacity="0.75" />
          <rect x="127" y="136" width="32" height="4" rx="2" :fill="accent" fill-opacity="0.4" />
          <!-- Butiran pupuk di dasar -->
          <g :fill="accent" fill-opacity="0.5">
            <circle cx="126" cy="196" r="4" />
            <circle cx="142" cy="204" r="3" />
            <circle cx="160" cy="196" r="4.5" />
            <circle cx="176" cy="205" r="3" />
          </g>
        </template>

        <!-- Jeriken herbisida -->
        <template v-else-if="shape === 'jerrycan'">
          <rect x="108" y="92" width="84" height="148" rx="14" :fill="`url(#${uid}-body)`" />
          <rect x="108" y="92" width="84" height="148" rx="14" :fill="`url(#${uid}-sheen)`" />
          <!-- Leher dan tutup -->
          <rect x="136" y="66" width="28" height="30" rx="5" :fill="accent" />
          <rect x="130" y="56" width="40" height="16" rx="6" fill="#ffffff" fill-opacity="0.88" />
          <!-- Pegangan -->
          <path
            d="M192 108h14c7 0 12 5 12 12v22c0 7-5 12-12 12h-14"
            fill="none"
            :stroke="accent"
            stroke-width="9"
            stroke-linecap="round"
          />
          <!-- Panel label -->
          <rect x="120" y="132" width="60" height="62" rx="7" fill="#ffffff" fill-opacity="0.92" />
          <rect x="129" y="146" width="42" height="4" rx="2" :fill="accent" fill-opacity="0.75" />
          <rect x="129" y="156" width="30" height="4" rx="2" :fill="accent" fill-opacity="0.4" />
          <rect x="129" y="172" width="42" height="10" rx="3" :fill="accent" fill-opacity="0.22" />
        </template>

        <!-- Botol suspensi -->
        <template v-else-if="shape === 'bottle'">
          <path
            d="M124 108c0-8 6-12 6-20V78h40v10c0 8 6 12 6 20v118c0 10-8 18-18 18h-16c-10 0-18-8-18-18V108Z"
            :fill="`url(#${uid}-body)`"
          />
          <path
            d="M124 108c0-8 6-12 6-20V78h40v10c0 8 6 12 6 20v118c0 10-8 18-18 18h-16c-10 0-18-8-18-18V108Z"
            :fill="`url(#${uid}-sheen)`"
          />
          <rect x="132" y="54" width="36" height="26" rx="5" fill="#ffffff" fill-opacity="0.9" />
          <rect x="128" y="130" width="44" height="62" rx="6" fill="#ffffff" fill-opacity="0.92" />
          <rect x="136" y="144" width="28" height="4" rx="2" :fill="accent" fill-opacity="0.75" />
          <rect x="136" y="154" width="20" height="4" rx="2" :fill="accent" fill-opacity="0.4" />
          <!-- Garis takaran -->
          <g :stroke="accent" stroke-opacity="0.45" stroke-width="2" stroke-linecap="round">
            <path d="M178 152h8" />
            <path d="M178 166h12" />
            <path d="M178 180h8" />
          </g>
        </template>

        <!-- Kotak umpan blok -->
        <template v-else>
          <path d="M96 116l54-28 54 28v96l-54 28-54-28v-96Z" :fill="`url(#${uid}-body)`" />
          <path d="M96 116l54 28v96l-54-28v-96Z" fill="#000000" fill-opacity="0.14" />
          <path d="M204 116l-54 28v96l54-28v-96Z" fill="#ffffff" fill-opacity="0.14" />
          <path
            d="M96 116l54-28 54 28-54 28-54-28Z"
            fill="#ffffff"
            fill-opacity="0.24"
          />
          <rect
            x="116"
            y="152"
            width="46"
            height="34"
            rx="5"
            fill="#ffffff"
            fill-opacity="0.9"
            transform="skewY(28)"
          />
        </template>
      </g>
    </g>
  </svg>
</template>

<script setup lang="ts">
import type { IconKey } from '#shared/types/content'

/** Set ikon garis buatan sendiri, grid 24×24, tebal garis 1,5. */
const props = withDefaults(
  defineProps<{
    name: IconKey
    size?: number | string
  }>(),
  { size: 24 },
)

const paths: Record<IconKey, string> = {
  /* Butiran pupuk dalam genggaman */
  granule:
    'M4 15c0-1.1.9-2 2-2h12a2 2 0 0 1 2 2v1a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-1Zm4-6.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm4.5 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm4.5-1.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z',
  /* Daun tunggal dengan tulang daun */
  leaf: 'M20 4c0 8-4.5 13-11 13H5c0-8 4.5-13 11-13h4ZM5 20c1.5-4 4-7 8-9',
  /* Tetes cairan */
  drop: 'M12 3.5c3.2 3.6 5.5 6.6 5.5 9.4a5.5 5.5 0 1 1-11 0c0-2.8 2.3-5.8 5.5-9.4Z',
  /* Perisai perlindungan */
  shield: 'M12 3 5 6v5.5c0 4.3 2.9 7.8 7 9.5 4.1-1.7 7-5.2 7-9.5V6l-7-3Zm-2.5 8.8 2 2 3.5-3.8',
  /* Tunas muda dari tanah */
  sprout:
    'M12 21v-7m0 0c0-3 2-5 5-5 0 3-2 5-5 5Zm0 0c0-3-2-5-5-5 0 3 2 5 5 5ZM5 21h14',
  /* Serangga hama */
  bug: 'M9 8a3 3 0 0 1 6 0m-8 3.5a5 5 0 0 1 10 0v2a5 5 0 0 1-10 0v-2Zm0 1H4m13 0h3M7.5 8 5.5 6m11 2 2-2M7.5 17l-2 2m11-2 2 2',
  /* Nozzle semprot dengan butiran */
  spray:
    'M9 8h5v12a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V8Zm0 3.5h5M9 8V5.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V8m3.5-3.5h.01M20 7h.01M17.5 10h.01M20 12.5h.01',
  /* Tikus */
  mouse:
    'M16.5 9a3.5 3.5 0 1 0-7 0c0 1 .4 1.9 1 2.5L4 17.5a2 2 0 0 0 1.4 3.4h9.3a5.3 5.3 0 0 0 0-10.6M13 8.5h.01M19.5 6.5a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z',
  /* Truk pengiriman */
  truck:
    'M3 7a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v9H3V7Zm11 3h3.2a1 1 0 0 1 .8.4l2 2.6a1 1 0 0 1 .2.6V16h-6v-6ZM7 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z',
  /* Gudang beratap */
  warehouse:
    'M3 20V9.5L12 5l9 4.5V20M3 20h18M7 20v-6h10v6M7 17h10',
  /* Etalase toko */
  store:
    'M4 9h16v11H4V9Zm-1 0 1.6-4.4A1 1 0 0 1 5.5 4h13a1 1 0 0 1 .9.6L21 9m-11 11v-6h4v6M4 9c0 1.4 1.1 2.5 2.5 2.5S9 10.4 9 9m0 0c0 1.4 1.1 2.5 2.5 2.5S14 10.4 14 9m0 0c0 1.4 1.1 2.5 2.5 2.5S19 10.4 19 9',
  /* Jabat tangan kemitraan */
  handshake:
    'm11 17-2.5 2.5a1.8 1.8 0 0 1-2.5-2.5L3 14l4-6h4l2 2 2-2h4l4 6-3 3a1.8 1.8 0 0 1-2.5 0L14 14m-3 3 1.5 1.5a1.8 1.8 0 0 0 2.5-2.5L13 13',
  /* Balon percakapan konsultasi */
  chat: 'M20 12a7 7 0 0 1-7 7H8l-4 3v-4.3A7 7 0 0 1 4 12a7 7 0 0 1 7-7h2a7 7 0 0 1 7 7Zm-11 0h.01M13 12h.01M17 12h.01',
  /* Peta terlipat dengan penanda */
  map: 'M9 4 3 6.5v14L9 18m0-14 6 2.5m-6-2.5v14m6-11.5 6-2.5v6M15 6.5V13m6 4.5a2.5 2.5 0 1 0-5 0c0 1.9 2.5 4.5 2.5 4.5s2.5-2.6 2.5-4.5Zm-2.5 0h.01',
  /* Jaringan simpul */
  network:
    'M12 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm-7 12a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm14 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM12 8.5v4m0 0-5.5 3.5M12 12.5l5.5 3.5',
  /* Sertifikat dengan pita */
  certificate:
    'M8 3h11a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H8m0-12L5 6v11l3-2m0-12v12m4-8h5m-5 3.5h3M9.5 17.5 8 22l2.5-1.5L13 22l-1.5-4.5',
  /* Jam operasional */
  clock: 'M12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm0 3.5V12l3 2',
  /* Gagang telepon */
  phone:
    'M7 3.5h2.5l1.5 4-2 1.4a12 12 0 0 0 6.1 6.1l1.4-2 4 1.5V17c0 1.9-1.6 3.5-3.5 3.5A15.5 15.5 0 0 1 3.5 7C3.5 5.1 5.1 3.5 7 3.5Z',
  /* Amplop surel */
  mail: 'M3 6.5h18v11H3v-11Zm0 .5 9 6 9-6',
  /* Penanda lokasi */
  pin: 'M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
}

const d = computed(() => paths[props.name] ?? paths.leaf)
const dimension = computed(() =>
  typeof props.size === 'number' ? `${props.size}px` : props.size,
)
</script>

<template>
  <svg
    :width="dimension"
    :height="dimension"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path :d="d" />
  </svg>
</template>

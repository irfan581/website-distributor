<script setup lang="ts">
/** Motif garis kontur ladang untuk latar hero dan section gelap, murni SVG. */
withDefaults(
  defineProps<{
    /** Jumlah garis. Lebih banyak berarti motif lebih rapat. */
    lines?: number
    tone?: 'dark' | 'light'
    opacity?: number
  }>(),
  { lines: 9, tone: 'dark', opacity: 1 },
)

/** Setiap garis adalah kurva Bézier yang sama, digeser turun dan diregangkan. */
function contourPath(index: number): string {
  const offset = index * 46
  const swell = 1 + index * 0.06
  return [
    `M -100 ${210 + offset}`,
    `C ${220 * swell} ${120 + offset}, ${430 * swell} ${300 + offset}, 720 ${190 + offset}`,
    `S ${1160 * swell} ${60 + offset}, 1540 ${170 + offset}`,
  ].join(' ')
}
</script>

<template>
  <svg
    class="pointer-events-none absolute inset-0 h-full w-full"
    :style="{ opacity }"
    viewBox="0 0 1440 800"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <linearGradient :id="`contour-${tone}`" x1="0" y1="0" x2="1" y2="0.4">
        <stop
          offset="0%"
          :stop-color="tone === 'light' ? '#ffffff' : '#fc8004'"
          :stop-opacity="tone === 'light' ? 0.05 : 0.16"
        />
        <stop
          offset="48%"
          :stop-color="tone === 'light' ? '#ffffff' : '#007d3e'"
          :stop-opacity="tone === 'light' ? 0.24 : 0.3"
        />
        <stop
          offset="100%"
          :stop-color="tone === 'light' ? '#ffffff' : '#fc8004'"
          :stop-opacity="tone === 'light' ? 0.04 : 0.12"
        />
      </linearGradient>
    </defs>

    <g fill="none" :stroke="`url(#contour-${tone})`" stroke-width="1.25">
      <path v-for="i in lines" :key="i" :d="contourPath(i - 1)" />
    </g>
  </svg>
</template>

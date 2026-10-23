<script setup lang="ts">
import type { CoverageArea } from '#shared/types/content'

/** Peta jangkauan berupa siluet stilasi. Penanda diposisikan dengan persentase dari data dan berupa tombol. */
const props = withDefaults(
  defineProps<{
    areas: CoverageArea[]
    tone?: 'dark' | 'light'
  }>(),
  { tone: 'light' },
)

const { L } = useLocalized()
const active = ref<number | null>(null)

const hub = computed(() => props.areas.find((a) => a.is_hub))
</script>

<template>
  <div class="relative w-full" :style="{ aspectRatio: '4 / 3' }">
    <!-- Siluet daratan -->
    <svg
      class="absolute inset-0 h-full w-full"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="coverage-land" x1="0" y1="0" x2="0.8" y2="1">
          <stop
            offset="0%"
            :stop-color="tone === 'dark' ? '#ffffff' : '#007d3e'"
            :stop-opacity="tone === 'dark' ? 0.09 : 0.1"
          />
          <stop
            offset="100%"
            :stop-color="tone === 'dark' ? '#ffffff' : '#fc8004'"
            :stop-opacity="tone === 'dark' ? 0.04 : 0.09"
          />
        </linearGradient>
      </defs>

      <!-- Siluet stilasi: memanjang barat ke timur dengan pesisir bergelombang -->
      <path
        d="M28 96c34-22 74-30 118-24 32 4 62 16 96 14 30-2 56-14 84-8 22 5 34 20 40 40 5 18 2 38-10 52-16 19-42 26-68 30-40 6-80 2-119 10-30 6-58 20-88 16-26-4-48-22-56-46-9-27-3-60 3-84Z"
        fill="url(#coverage-land)"
        :stroke="tone === 'dark' ? 'rgba(255,255,255,0.16)' : 'rgba(0,125,62,0.22)'"
        stroke-width="1.25"
      />

      <!-- Garis kontur di dalam daratan, motif yang sama seperti hero -->
      <g
        fill="none"
        :stroke="tone === 'dark' ? 'rgba(255,255,255,0.09)' : 'rgba(20,25,23,0.07)'"
        stroke-width="1"
      >
        <path d="M40 140c60-18 120 12 180 8s90-24 140-10" />
        <path d="M40 168c60-18 120 12 180 8s90-24 140-10" />
        <path d="M40 196c60-18 120 12 180 8s90-24 140-10" />
      </g>
    </svg>

    <!-- Penanda wilayah -->
    <ul class="absolute inset-0">
      <li
        v-for="area in areas"
        :key="area.id"
        class="absolute -translate-x-1/2 -translate-y-1/2"
        :style="{ left: `${area.x}%`, top: `${area.y}%` }"
      >
        <button
          type="button"
          class="group relative grid place-items-center rounded-full focus-visible:outline-none"
          :aria-label="`${area.name}, ${L(area.province)}`"
          @mouseenter="active = area.id"
          @mouseleave="active = null"
          @focus="active = area.id"
          @blur="active = null"
        >
          <!-- Denyut hanya pada pusat distribusi -->
          <span
            v-if="area.is_hub"
            class="pulse absolute size-8 rounded-full bg-tmk-500/25"
            aria-hidden="true"
          />

          <span
            class="relative block rounded-full ring-2 transition-all duration-300 ease-[var(--ease-tmk)] group-hover:scale-150 group-focus-visible:scale-150"
            :class="[
              area.is_hub ? 'size-3.5' : 'size-2.5',
              area.is_hub
                ? 'bg-tmk-500 ring-tmk-500/30'
                : tone === 'dark'
                  ? 'bg-white/70 ring-white/20 group-hover:bg-tmk-400'
                  : 'bg-leaf-600 ring-leaf-600/20 group-hover:bg-tmk-500',
            ]"
          />

          <!-- Label muncul saat disorot atau difokus -->
          <span
            class="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg px-2.5 py-1 text-[0.6875rem] font-semibold transition-all duration-300"
            :class="[
              active === area.id ? 'opacity-100' : 'opacity-0 translate-y-1',
              tone === 'dark' ? 'bg-white text-ink-900' : 'bg-ink-900 text-white',
            ]"
          >
            {{ area.name }}
          </span>
        </button>
      </li>
    </ul>

    <!-- Keterangan pusat distribusi -->
    <p
      v-if="hub"
      class="absolute bottom-0 left-0 flex items-center gap-2 text-xs"
      :class="tone === 'dark' ? 'text-white/50' : 'text-ink-400'"
    >
      <span class="block size-2.5 rounded-full bg-tmk-500" aria-hidden="true" />
      {{ $t('home.coverage.hub') }}: {{ hub.name }}
    </p>
  </div>
</template>

<style scoped>
.pulse {
  animation: pulse-ring 2.6s var(--ease-tmk) infinite;
}

@keyframes pulse-ring {
  0% {
    transform: scale(0.5);
    opacity: 0.8;
  }
  70%,
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .pulse {
    animation: none;
    opacity: 0.3;
  }
}
</style>

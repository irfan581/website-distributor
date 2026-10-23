<script setup lang="ts">
import type { SalesContact } from '#shared/types/content'

/** Kartu satu sales. Pesan pembuka WhatsApp bisa disesuaikan lewat prop `message`. */
const props = withDefaults(
  defineProps<{
    sales: SalesContact
    /** Nama produk yang ditanyakan bila dibuka dari detail produk; hanya topiknya, bukan kalimat utuh. */
    product?: string
    compact?: boolean
  }>(),
  { compact: false },
)

const { L } = useLocalized()
const { t } = useI18n()

const waLink = computed(() => {
  const text = props.product
    ? t('sales.waProduct', { name: props.sales.name, product: props.product })
    : t('sales.waGeneral', { name: props.sales.name, zone: props.sales.zone })

  return `https://wa.me/${props.sales.whatsapp}?text=${encodeURIComponent(text)}`
})
</script>

<template>
  <article class="card-tmk flex h-full flex-col gap-4" :class="compact ? 'p-5' : 'p-6'">
    <div class="flex items-start gap-4">
      <!-- Foto bila sudah ada; sementara memakai inisial. -->
      <NuxtImg
        v-if="sales.photo"
        :src="sales.photo"
        :alt="sales.name"
        class="size-14 shrink-0 rounded-2xl object-cover"
        width="56"
        height="56"
        loading="lazy"
      />
      <span
        v-else
        class="grid size-14 shrink-0 place-items-center rounded-2xl bg-ink-900 font-[family-name:var(--font-display)] text-sm font-bold text-white"
        aria-hidden="true"
      >
        {{ sales.initials }}
      </span>

      <div class="min-w-0">
        <h3 class="font-[family-name:var(--font-display)] text-base font-semibold text-ink-900">
          {{ sales.name }}
        </h3>
        <p class="mt-0.5 text-sm text-tmk-600">{{ L(sales.title) }}</p>
        <p class="mt-0.5 text-sm text-ink-500">{{ sales.zone }}</p>
      </div>
    </div>

    <p v-if="!compact" class="text-sm leading-relaxed text-ink-500">
      {{ L(sales.description) }}
    </p>

    <!-- Daftar wilayah hanya berguna bila memegang lebih dari satu kabupaten. -->
    <div v-if="!compact && sales.coverage.length > 1">
      <p class="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ink-400">
        {{ $t('sales.coverage') }}
      </p>
      <ul class="mt-2 flex flex-wrap gap-1.5">
        <li
          v-for="area in sales.coverage"
          :key="area"
          class="rounded-full border border-ink-200 px-2.5 py-1 text-xs text-ink-600"
        >
          {{ area }}
        </li>
      </ul>
    </div>

    <!-- Tombol menempel di dasar agar tinggi kartu rata. Nama terakses diawali nomor telepon yang terlihat. -->
    <a
      :href="waLink"
      target="_blank"
      rel="noopener noreferrer"
      class="btn-tmk mt-auto gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-[0.8125rem] font-semibold text-[#0B2E1E] transition-transform duration-300 hover:scale-[1.02]"
      :aria-label="`${sales.phone}, ${$t('sales.chat')} ${sales.name}`"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path
          d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.18h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.4c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 5.83 2.42 8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.25-8.24 8.25Z"
        />
      </svg>
      {{ sales.phone }}
    </a>
  </article>
</template>

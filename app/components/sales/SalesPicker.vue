<script setup lang="ts">
/** Pemilih sales per wilayah dari halaman detail produk, dibuka sebagai dialog. */
const props = defineProps<{
  open: boolean
  /** Nama produk yang sedang dilihat, untuk pesan pembuka WhatsApp. */
  productName: string
}>()

const emit = defineEmits<{ close: [] }>()

const region = ref('all')

const { data: regionsData } = useSalesRegions()
const { data: salesData, status } = useSales(region)

const regions = computed(() => regionsData.value?.data ?? [])
const sales = computed(() => salesData.value?.data ?? [])

const panel = useTemplateRef<HTMLElement>('panel')

/* Kunci scroll latar dan kembalikan fokus ke dalam dialog saat dibuka. */
watch(
  () => props.open,
  async (isOpen) => {
    if (!import.meta.client) return

    document.documentElement.style.overflow = isOpen ? 'hidden' : ''
    if (!isOpen) return

    await nextTick()
    panel.value?.focus()
  },
)

onBeforeUnmount(() => {
  if (import.meta.client) document.documentElement.style.overflow = ''
})

onKeyStroke('Escape', () => {
  if (props.open) emit('close')
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300 ease-[var(--ease-tmk)]"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-[60] flex items-end justify-center bg-ink-950/60 backdrop-blur-sm sm:items-center sm:p-6"
        @click.self="emit('close')"
      >
        <div
          ref="panel"
          role="dialog"
          aria-modal="true"
          :aria-label="$t('sales.pickRegion')"
          tabindex="-1"
          class="panel-in flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[1.75rem] bg-white focus:outline-none sm:rounded-[1.75rem]"
        >
          <!-- Kepala dialog -->
          <div class="flex items-start justify-between gap-4 border-b border-ink-200 p-6">
            <div>
              <h2 class="text-heading">{{ $t('sales.pickRegion') }}</h2>
              <p class="mt-1.5 text-sm text-ink-500">{{ $t('sales.pickRegionHint') }}</p>
            </div>

            <button
              type="button"
              class="grid size-9 shrink-0 place-items-center rounded-full border border-ink-200 text-ink-500 transition-colors duration-300 hover:border-tmk-400 hover:text-tmk-600"
              :aria-label="$t('sales.close')"
              @click="emit('close')"
            >
              <span aria-hidden="true">✕</span>
            </button>
          </div>

          <!-- Isi dialog -->
          <div class="min-h-0 flex-1 overflow-y-auto p-6">
            <SalesRegionFilter v-model="region" :regions="regions" />

            <ul
              v-if="sales.length"
              class="mt-6 grid gap-4 sm:grid-cols-2"
              :class="status === 'pending' && 'opacity-60 transition-opacity duration-300'"
            >
              <li v-for="person in sales" :key="person.id">
                <SalesCard :sales="person" :product="productName" compact />
              </li>
            </ul>

            <p v-else class="py-12 text-center text-sm text-ink-500">
              {{ $t('sales.empty') }}
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.panel-in {
  animation: panel-up 0.4s var(--ease-tmk) both;
}

@keyframes panel-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .panel-in {
    animation: none;
  }
}
</style>

<script setup lang="ts">
interface Pilihan {
  value: string
  label: string
  count?: number
}

/** Lembar filter ponsel yang naik dari dasar layar. State tetap milik `useCatalogFilters`, dialirkan lewat v-model. */
const props = defineProps<{
  open: boolean
  categoryOptions: Pilihan[]
  brandOptions: Pilihan[]
  sortOptions: Pilihan[]
  lockedCategory?: string
  isFiltered: boolean
  total?: number
}>()

const emit = defineEmits<{
  close: []
  reset: []
}>()

const category = defineModel<string>('category', { required: true })
const brand = defineModel<string>('brand', { required: true })
const sort = defineModel<string>('sort', { required: true })

const panel = useTemplateRef<HTMLElement>('panel')

/* Escape menutup lembar, sama seperti overlay lain di situs ini. */
onKeyStroke('Escape', () => {
  if (props.open) emit('close')
})

/* Mengunci gulir halaman dan memindahkan fokus ke lembar selama terbuka. */
watch(
  () => props.open,
  async (terbuka) => {
    if (!import.meta.client) return
    document.documentElement.style.overflow = terbuka ? 'hidden' : ''
    if (terbuka) {
      await nextTick()
      panel.value?.querySelector<HTMLElement>('[data-fokus-awal]')?.focus()
    }
  },
)

onBeforeUnmount(() => {
  if (import.meta.client) document.documentElement.style.overflow = ''
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
      <!-- `z-[60]`, di atas header yang memakai `z-50`. Dengan lapisan yang
           sama, header menutupi backdrop di 64 piksel teratas layar sehingga
           menekan area itu tidak menutup lembar. -->
      <div v-if="open" class="fixed inset-0 z-[60] lg:hidden">
        <!-- Lapisan gelap: menekannya menutup lembar. -->
        <button
          type="button"
          class="absolute inset-0 bg-ink-950/50 backdrop-blur-[2px]"
          :aria-label="$t('common.close')"
          @click="emit('close')"
        />

        <Transition
          enter-active-class="transition-transform duration-300 ease-[var(--ease-tmk)]"
          enter-from-class="translate-y-full"
          leave-active-class="transition-transform duration-200 ease-in"
          leave-to-class="translate-y-full"
          appear
        >
          <div
            v-if="open"
            ref="panel"
            role="dialog"
            aria-modal="true"
            :aria-label="$t('catalog.filters')"
            class="absolute inset-x-0 bottom-0 flex max-h-[85vh] flex-col rounded-t-3xl bg-white shadow-[var(--shadow-float)]"
          >
            <!-- Kepala -->
            <div class="flex items-center justify-between gap-4 border-b border-ink-200 px-5 py-4">
              <h2 class="font-[family-name:var(--font-display)] text-base font-semibold text-ink-900">
                {{ $t('catalog.filters') }}
              </h2>
              <button
                type="button"
                data-fokus-awal
                class="grid size-9 place-items-center rounded-full text-ink-500 transition-colors duration-300 hover:bg-ink-100 hover:text-ink-800"
                :aria-label="$t('common.close')"
                @click="emit('close')"
              >
                <svg
                  viewBox="0 0 24 24"
                  class="size-5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <!-- Isi: bisa digulir sendiri bila pilihannya banyak. -->
            <div class="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-5">
              <UiSelect
                v-if="!lockedCategory"
                v-model="category"
                :label="$t('catalog.category')"
                :options="categoryOptions"
              />
              <UiSelect v-model="brand" :label="$t('catalog.brand')" :options="brandOptions" />
              <UiSelect v-model="sort" :label="$t('catalog.sort')" :options="sortOptions" />
            </div>

            <!-- Kaki: tetap terlihat walau isinya digulir. -->
            <div
              class="flex items-center gap-3 border-t border-ink-200 px-5 py-4"
              :style="{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }"
            >
              <UiButton
                v-if="isFiltered"
                variant="ghost"
                size="sm"
                class="shrink-0"
                @click="emit('reset')"
              >
                {{ $t('catalog.reset') }}
              </UiButton>
              <UiButton size="sm" block @click="emit('close')">
                {{ $t('catalog.apply', { total: total ?? 0 }) }}
              </UiButton>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

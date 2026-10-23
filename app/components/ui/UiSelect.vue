<script setup lang="ts">
/** Select bergaya yang tetap memakai <select> asli demi keyboard dan pembaca layar. */
defineProps<{
  label: string
  options: { value: string; label: string; count?: number }[]
}>()

const model = defineModel<string>({ required: true })
const id = useId()
</script>

<template>
  <div class="min-w-0">
    <label
      :for="id"
      class="block text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ink-400"
    >
      {{ label }}
    </label>

    <div class="relative mt-1.5">
      <select
        :id="id"
        v-model="model"
        class="w-full cursor-pointer appearance-none rounded-xl border border-ink-200 bg-white py-2.5 pl-3.5 pr-9 text-sm font-medium text-ink-800 transition-colors duration-300 hover:border-ink-300 focus:border-tmk-400"
      >
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}{{ option.count !== undefined ? ` (${option.count})` : '' }}
        </option>
      </select>

      <span
        class="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[0.6rem] text-ink-400"
        aria-hidden="true"
      >▾</span>
    </div>
  </div>
</template>

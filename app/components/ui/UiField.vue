<script setup lang="ts">
/** Kolom formulir dengan label, pesan galat, dan ARIA; <textarea> bila `type` "textarea". */
const props = withDefaults(
  defineProps<{
    label: string
    type?: string
    placeholder?: string
    required?: boolean
    error?: string
    autocomplete?: string
    rows?: number
  }>(),
  { type: 'text', required: false, rows: 5 },
)

const model = defineModel<string>({ required: true })
const id = useId()
const errorId = computed(() => `${id}-error`)
</script>

<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-ink-700">
      {{ label }}
      <span v-if="required" class="text-tmk-600" :aria-label="$t('contact.required')">*</span>
    </label>

    <component
      :is="props.type === 'textarea' ? 'textarea' : 'input'"
      :id="id"
      v-model="model"
      :type="props.type === 'textarea' ? undefined : props.type"
      :rows="props.type === 'textarea' ? rows : undefined"
      :placeholder="placeholder"
      :required="required"
      :autocomplete="autocomplete"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="error ? errorId : undefined"
      class="mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm text-ink-800 transition-colors duration-300 placeholder:text-ink-400 focus:border-tmk-400"
      :class="error ? 'border-red-400' : 'border-ink-200 hover:border-ink-300'"
    />

    <p v-if="error" :id="errorId" class="mt-1.5 text-xs text-red-600">
      {{ error }}
    </p>
  </div>
</template>

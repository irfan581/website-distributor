<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

/** Tombol tunggal situs: <NuxtLink> bila `to`, <a> bila `href`, selain itu <button>. */
const props = withDefaults(
  defineProps<{
    to?: RouteLocationRaw
    href?: string
    variant?: 'primary' | 'secondary' | 'ghost' | 'light'
    size?: 'sm' | 'md' | 'lg'
    magnetic?: boolean
    block?: boolean
    disabled?: boolean
    type?: 'button' | 'submit'
    external?: boolean
  }>(),
  { variant: 'primary', size: 'md', type: 'button' },
)

const root = useTemplateRef<HTMLElement>('root')

/* Efek magnetik dinyalakan eksplisit — dipakai pada CTA utama, bukan setiap tombol. */
if (props.magnetic) {
  useMagnetic(root, 0.22)
}

const component = computed(() => {
  if (props.to) return resolveComponent('NuxtLink')
  if (props.href) return 'a'
  return 'button'
})

const variants: Record<string, string> = {
  /* Latar tmk-600, bukan tmk-500: teks putih di atas oranye terang hanya
     mencapai 3:1. Bayangannya tetap memakai oranye terang supaya cahaya di
     sekitar tombol tidak kehilangan karakter brand. */
  primary:
    'bg-tmk-600 text-white shadow-[0_10px_28px_-12px_rgba(242,107,15,0.75)] hover:bg-tmk-700 hover:shadow-[0_16px_36px_-14px_rgba(242,107,15,0.85)]',
  secondary:
    'bg-ink-900 text-white hover:bg-ink-800 shadow-[0_10px_28px_-14px_rgba(20,25,23,0.6)]',
  ghost:
    'border border-ink-300 text-ink-800 hover:border-tmk-400 hover:text-tmk-600 hover:bg-tmk-50',
  light:
    'bg-white/12 text-white border border-white/25 backdrop-blur-sm hover:bg-white/20 hover:border-white/40',
}

const sizes: Record<string, string> = {
  sm: 'text-sm px-4 py-2 gap-1.5',
  md: 'text-[0.9375rem] px-6 py-3 gap-2',
  lg: 'text-base px-7 py-3.5 gap-2.5',
}
</script>

<template>
  <component
    :is="component"
    ref="root"
    :to="to"
    :href="href"
    :type="component === 'button' ? type : undefined"
    :disabled="component === 'button' ? disabled : undefined"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :aria-disabled="disabled || undefined"
    class="btn-tmk rounded-full font-medium font-[family-name:var(--font-display)] transition-[background-color,border-color,color,box-shadow] duration-300 ease-[var(--ease-tmk)] disabled:pointer-events-none disabled:opacity-50"
    :class="[variants[variant], sizes[size], block && 'w-full']"
  >
    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </component>
</template>

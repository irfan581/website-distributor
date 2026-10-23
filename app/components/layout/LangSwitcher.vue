<script setup lang="ts">
/** Pengalih bahasa; `switchLocalePath` menjaga pengguna di halaman yang sama. */
withDefaults(defineProps<{ tone?: 'dark' | 'light' }>(), { tone: 'dark' })

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const options = computed(() =>
  (locales.value as { code: string; name: string }[]).map((l) => ({
    code: l.code,
    short: l.code.toUpperCase(),
    name: l.name,
    path: switchLocalePath(l.code as 'id' | 'en'),
  })),
)
</script>

<template>
  <div
    class="switch-tmk rounded-full p-0.5"
    :class="tone === 'light' ? 'bg-white/12 ring-1 ring-white/20' : 'bg-ink-100 ring-1 ring-ink-200'"
    role="group"
    :aria-label="$t('common.switchLanguage')"
  >
    <NuxtLink
      v-for="option in options"
      :key="option.code"
      :to="option.path"
      class="rounded-full px-2.5 py-1 font-[family-name:var(--font-display)] text-[0.7rem] font-semibold tracking-wide transition-colors duration-300"
      :class="[
        locale === option.code
          ? tone === 'light'
            ? 'bg-white text-ink-900'
            : 'bg-white text-ink-900 shadow-sm'
          : tone === 'light'
            ? 'text-white/70 hover:text-white'
            : 'text-ink-500 hover:text-ink-900',
      ]"
      :aria-current="locale === option.code ? 'true' : undefined"
      :lang="option.code"
    >
      <span class="sr-only">{{ option.name }}</span>
      <span aria-hidden="true">{{ option.short }}</span>
    </NuxtLink>
  </div>
</template>

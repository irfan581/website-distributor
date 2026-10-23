<script setup lang="ts">
/** Remah roti beserta JSON-LD BreadcrumbList. */
export interface Crumb {
  label: string
  to?: string
}

const props = withDefaults(
  defineProps<{ items: Crumb[]; tone?: 'dark' | 'light' }>(),
  { tone: 'dark' },
)

const localePath = useLocalePath()
const { t } = useI18n()
const config = useRuntimeConfig()

const trail = computed<Crumb[]>(() => [
  { label: t('common.home'), to: localePath('/') },
  ...props.items,
])

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: trail.value.map((crumb) => ({
      name: crumb.label,
      item: crumb.to ? `${config.public.siteUrl}${crumb.to}` : undefined,
    })),
  }),
])
</script>

<template>
  <nav :aria-label="$t('common.home')">
    <ol class="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem]">
      <li
        v-for="(crumb, index) in trail"
        :key="index"
        class="flex items-center gap-2"
      >
        <NuxtLink
          v-if="crumb.to && index < trail.length - 1"
          :to="crumb.to"
          class="transition-colors duration-300"
          :class="
            tone === 'light'
              ? 'text-white/60 hover:text-white'
              : 'text-ink-400 hover:text-tmk-600'
          "
        >
          {{ crumb.label }}
        </NuxtLink>
        <span
          v-else
          class="font-medium"
          :class="tone === 'light' ? 'text-white' : 'text-ink-700'"
          aria-current="page"
        >
          {{ crumb.label }}
        </span>

        <span
          v-if="index < trail.length - 1"
          :class="tone === 'light' ? 'text-white/30' : 'text-ink-300'"
          aria-hidden="true"
        >/</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
/** Navigasi mobile layar penuh, animasinya transisi CSS dengan penundaan per item. */
const ui = useUiStore()
const settingsStore = useSettingsStore()
const { mobile } = useNavigation()
const route = useRoute()
const localePath = useLocalePath()

const { contactTarget } = useContactAction()
const contact = computed(() => contactTarget())
const site = computed(() => settingsStore.settings)

function isActive(path: string) {
  const home = localePath('/')
  return path === home ? route.path === home : route.path.startsWith(path)
}
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-300 ease-[var(--ease-tmk)]"
    enter-from-class="opacity-0"
    leave-active-class="transition-opacity duration-200 ease-in"
    leave-to-class="opacity-0"
  >
    <div
      v-if="ui.mobileNavOpen"
      id="mobile-nav"
      class="fixed inset-0 z-40 flex flex-col bg-white lg:hidden"
    >
      <!-- Motif kontur sebagai latar, konsisten dengan hero -->
      <div class="pointer-events-none absolute inset-0 contour-bg opacity-70" aria-hidden="true" />

      <nav
        class="relative flex-1 overflow-y-auto px-5 pb-8 pt-24"
        :aria-label="$t('nav.menu')"
      >
        <ul class="flex flex-col">
          <li
            v-for="(item, index) in mobile"
            :key="item.key"
            class="mobile-nav-item border-b border-ink-200/70"
            :style="{ '--delay': `${60 + index * 45}ms` }"
          >
            <NuxtLink
              :to="item.to"
              class="flex items-baseline justify-between py-4 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight transition-colors duration-300"
              :class="isActive(item.to) ? 'text-tmk-600' : 'text-ink-900'"
              @click="ui.closeMobileNav()"
            >
              {{ item.label }}
              <span
                class="font-[family-name:var(--font-sans)] text-xs font-medium text-ink-400"
                aria-hidden="true"
              >
                {{ String(index + 1).padStart(2, '0') }}
              </span>
            </NuxtLink>
          </li>
        </ul>

        <div
          class="mobile-nav-item mt-8 flex flex-col gap-4"
          :style="{ '--delay': `${60 + mobile.length * 45}ms` }"
        >
          <UiButton
            :to="contact.to"
            :href="contact.href"
            :external="contact.external"
            variant="primary"
            size="lg"
            block
          >
            {{ $t('common.contactSales') }}
          </UiButton>

          <div class="flex items-center justify-between gap-4">
            <a
              v-if="site"
              :href="`mailto:${site.contact.email}`"
              class="min-w-0 truncate text-sm text-ink-500 underline-offset-4 hover:text-tmk-600 hover:underline"
            >
              {{ site.contact.email }}
            </a>
            <LangSwitcher class="shrink-0" />
          </div>
        </div>
      </nav>
    </div>
  </Transition>
</template>

<style scoped>
/* Tautan masuk berurutan; penundaan diatur lewat variabel per item. */
.mobile-nav-item {
  animation: nav-in 0.5s var(--ease-tmk) both;
  animation-delay: var(--delay, 0ms);
}

@keyframes nav-in {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .mobile-nav-item {
    animation: none;
  }
}
</style>

<script setup lang="ts">
/** Header sticky. Halaman dengan `heroOverlay: true` memulainya transparan, lalu jadi panel putih saat digulir. */
const route = useRoute()
const ui = useUiStore()
const settingsStore = useSettingsStore()
const { primary } = useNavigation()
const localePath = useLocalePath()
const { t } = useI18n()

const { y } = useWindowScroll()
const scrolled = computed(() => y.value > 24)

const overlayPage = computed(() => route.meta.heroOverlay === true)
/* Mode terang dipakai hanya saat benar-benar melayang di atas hero gelap. */
const isTransparent = computed(
  () => overlayPage.value && !scrolled.value && !ui.megaMenuOpen && !ui.mobileNavOpen,
)
const tone = computed<'dark' | 'light'>(() => (isTransparent.value ? 'light' : 'dark'))

const openDropdown = ref<string | null>(null)

/** Menyetel kedua panel sekaligus agar paling banyak satu yang terbuka. */
function focusNavItem(item: NavItem) {
  ui.megaMenuOpen = item.mega === true
  openDropdown.value = item.children ? item.key : null
}

/* Setiap perpindahan halaman menutup seluruh menu yang masih terbuka. */
watch(
  () => route.fullPath,
  () => {
    ui.closeAll()
    openDropdown.value = null
  },
)

/** Menggulir menutup mega menu dan dropdown. Navigasi mobile tidak ikut ditutup. */
watch(y, () => {
  ui.megaMenuOpen = false
  openDropdown.value = null
})

function isActive(path: string) {
  const home = localePath('/')
  if (path === home) return route.path === home
  return route.path.startsWith(path)
}

const { contactTarget } = useContactAction()
const contact = computed(() => contactTarget())
</script>

<template>
  <!-- Saat tembus pandang border dibuat `transparent`, bukan dihapus, agar tinggi header tidak berubah. -->
  <header
    class="fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500 ease-[var(--ease-tmk)]"
    :class="
      isTransparent
        ? 'border-b border-transparent bg-transparent'
        : 'glass-tmk shadow-[0_1px_0_rgba(20,25,23,0.04),0_18px_40px_-32px_rgba(20,25,23,0.4)]'
    "
    @mouseleave="ui.megaMenuOpen = false"
  >
    <!-- Tinggi header desktop 96px agar wordmark logo terbaca. -->
    <div class="container-tmk flex h-16 items-center justify-between gap-4 lg:h-24 xl:gap-6">
      <!-- Lambang. Tanpa aria-label: wordmark di AppLogo sudah menjadi nama tautannya. -->
      <NuxtLink
        :to="localePath('/')"
        class="shrink-0 transition-opacity duration-300 hover:opacity-80"
      >
        <AppLogo :tone="tone" />
      </NuxtLink>

      <!-- Navigasi desktop. Di 1024 sampai 1279 px jarak menu dirapatkan dan label dikunci satu baris. -->
      <nav class="hidden items-center gap-0.5 lg:flex xl:gap-1" :aria-label="t('nav.menu')">
        <template v-for="item in primary" :key="item.key">
          <!-- Item pembuka mega menu -->
          <NuxtLink
            v-if="item.mega"
            :to="item.to"
            class="relative whitespace-nowrap rounded-full px-2.5 py-2 font-[family-name:var(--font-display)] text-[0.875rem] font-medium transition-colors duration-300 xl:px-3.5"
            :class="[
              tone === 'light'
                ? 'text-white/85 hover:text-white'
                : 'text-ink-600 hover:text-ink-900',
              isActive(item.to) && (tone === 'light' ? '!text-white' : '!text-tmk-600'),
            ]"
            @mouseenter="focusNavItem(item)"
            @focus="focusNavItem(item)"
          >
            {{ item.label }}
            <span
              class="ml-1 inline-block text-[0.6rem] transition-transform duration-300"
              :class="ui.megaMenuOpen && 'rotate-180'"
              aria-hidden="true"
            >▾</span>
          </NuxtLink>

          <!-- Item dengan sub-menu sederhana -->
          <div
            v-else-if="item.children"
            class="relative"
            @mouseenter="focusNavItem(item)"
            @mouseleave="openDropdown = null"
          >
            <button
              type="button"
              class="whitespace-nowrap rounded-full px-2.5 py-2 font-[family-name:var(--font-display)] text-[0.875rem] font-medium transition-colors duration-300 xl:px-3.5"
              :class="
                tone === 'light'
                  ? 'text-white/85 hover:text-white'
                  : 'text-ink-600 hover:text-ink-900'
              "
              :aria-expanded="openDropdown === item.key"
              @click="openDropdown = openDropdown === item.key ? null : item.key"
              @focus="ui.megaMenuOpen = false"
            >
              {{ item.label }}
              <span
                class="ml-1 inline-block text-[0.6rem] transition-transform duration-300"
                :class="openDropdown === item.key && 'rotate-180'"
                aria-hidden="true"
              >▾</span>
            </button>

            <Transition
              enter-active-class="transition duration-200 ease-[var(--ease-tmk)]"
              enter-from-class="opacity-0 -translate-y-1"
              leave-active-class="transition duration-150 ease-in"
              leave-to-class="opacity-0"
            >
              <ul
                v-if="openDropdown === item.key"
                class="absolute left-0 top-full min-w-44 rounded-2xl border border-ink-200 bg-white p-1.5 shadow-[var(--shadow-float)]"
              >
                <li v-for="child in item.children" :key="child.key">
                  <NuxtLink
                    :to="child.to"
                    class="block rounded-xl px-3.5 py-2 text-[0.875rem] text-ink-600 transition-colors duration-200 hover:bg-ink-50 hover:text-ink-900"
                  >
                    {{ child.label }}
                  </NuxtLink>
                </li>
              </ul>
            </Transition>
          </div>

          <!-- Item biasa -->
          <NuxtLink
            v-else
            :to="item.to"
            class="whitespace-nowrap rounded-full px-2.5 py-2 font-[family-name:var(--font-display)] text-[0.875rem] font-medium transition-colors duration-300 xl:px-3.5"
            :class="[
              tone === 'light'
                ? 'text-white/85 hover:text-white'
                : 'text-ink-600 hover:text-ink-900',
              isActive(item.to) && (tone === 'light' ? '!text-white' : '!text-tmk-600'),
            ]"
            @mouseenter="focusNavItem(item)"
            @focus="focusNavItem(item)"
          >
            {{ item.label }}
          </NuxtLink>
        </template>
      </nav>

      <!-- Aksi kanan -->
      <div class="flex items-center gap-2.5">
        <LangSwitcher :tone="tone" class="hidden sm:inline-flex" />

        <UiButton
          :to="contact.to"
          :href="contact.href"
          :external="contact.external"
          size="sm"
          :variant="tone === 'light' ? 'light' : 'primary'"
          class="hidden whitespace-nowrap md:inline-flex"
        >
          {{ $t('common.contactSales') }}
        </UiButton>

        <!-- Tombol menu mobile -->
        <button
          type="button"
          class="grid size-10 place-items-center rounded-full transition-colors duration-300 lg:hidden"
          :class="
            tone === 'light'
              ? 'text-white hover:bg-white/12'
              : 'text-ink-800 hover:bg-ink-100'
          "
          :aria-label="ui.mobileNavOpen ? t('nav.closeMenu') : t('nav.openMenu')"
          :aria-expanded="ui.mobileNavOpen"
          aria-controls="mobile-nav"
          @click="ui.toggleMobileNav()"
        >
          <span class="relative block h-4 w-5" aria-hidden="true">
            <span
              class="absolute left-0 block h-0.5 w-full rounded-full bg-current transition-all duration-300 ease-[var(--ease-tmk)]"
              :class="ui.mobileNavOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'"
            />
            <span
              class="absolute left-0 top-1/2 block h-0.5 w-full -translate-y-1/2 rounded-full bg-current transition-opacity duration-200"
              :class="ui.mobileNavOpen && 'opacity-0'"
            />
            <span
              class="absolute left-0 block h-0.5 w-full rounded-full bg-current transition-all duration-300 ease-[var(--ease-tmk)]"
              :class="ui.mobileNavOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'"
            />
          </span>
        </button>
      </div>
    </div>

    <ProductMegaMenu :open="ui.megaMenuOpen" @close="ui.megaMenuOpen = false" />
  </header>
</template>

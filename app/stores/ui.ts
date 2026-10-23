/** Status antarmuka global: navigasi mobile dan mega menu. */
export const useUiStore = defineStore('ui', () => {
  const mobileNavOpen = ref(false)
  const megaMenuOpen = ref(false)

  function openMobileNav() {
    mobileNavOpen.value = true
    megaMenuOpen.value = false
  }

  function closeMobileNav() {
    mobileNavOpen.value = false
  }

  function toggleMobileNav() {
    mobileNavOpen.value ? closeMobileNav() : openMobileNav()
  }

  function closeAll() {
    mobileNavOpen.value = false
    megaMenuOpen.value = false
  }

  /* Kunci scroll halaman selama overlay terbuka agar latar tidak ikut bergeser. */
  if (import.meta.client) {
    const isLocked = computed(() => mobileNavOpen.value)
    watch(isLocked, (locked) => {
      document.documentElement.style.overflow = locked ? 'hidden' : ''
    })
  }

  return {
    mobileNavOpen,
    megaMenuOpen,
    openMobileNav,
    closeMobileNav,
    toggleMobileNav,
    closeAll,
  }
})

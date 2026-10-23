<script setup lang="ts">
const route = useRoute()

/** Halaman berhero gelap merender sampai ke balik header; halaman lain diberi ruang atas. */
const overlay = computed(() => route.meta.heroOverlay === true)
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <AppHeader />
    <MobileNav />

    <!-- Ruang atas harus sama persis dengan tinggi header di AppHeader. -->
    <main id="main" class="flex-1" :class="!overlay && 'pt-16 lg:pt-24'">
      <slot />
    </main>

    <AppFooter />
    <WhatsAppFab />
  </div>
</template>

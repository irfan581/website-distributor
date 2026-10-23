/** `heroOverlay`: halaman berhero gelap penuh layar; header mulai transparan, tanpa ruang atas. */
declare module 'vue-router' {
  interface RouteMeta {
    heroOverlay?: boolean
  }
}

export {}

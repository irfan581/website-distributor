import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/** GSAP hanya di klien; mendaftarkan ScrollTrigger dan menyediakannya lewat `$gsap`. */
export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger)

  /* Nilai default khas TMK supaya seluruh animasi terasa satu keluarga. */
  gsap.defaults({ ease: 'power3.out', duration: 0.9 })

  /* Setelah transisi halaman, posisi ScrollTrigger harus dihitung ulang. */
  const nuxtApp = useNuxtApp()
  nuxtApp.hook('page:finish', () => {
    requestAnimationFrame(() => ScrollTrigger.refresh())
  })

  /* Hitung ulang posisi pemicu sekali setelah `load`, saat ukuran halaman sudah final. */
  if (document.readyState === 'complete') {
    ScrollTrigger.refresh()
  } else {
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })
  }

  return {
    provide: { gsap, ScrollTrigger },
  }
})

/** Menormalkan template ref yang bisa berupa elemen maupun instance komponen. */
function toRevealElement(value: unknown): HTMLElement | null {
  if (!value) return null
  if (value instanceof HTMLElement) return value
  const el = (value as { $el?: unknown }).$el
  return el instanceof HTMLElement ? el : null
}

export interface RevealOptions {
  /** Jarak geser vertikal saat muncul, dalam piksel. */
  y?: number
  /** Jeda antar elemen dalam satu kelompok. */
  stagger?: number
  /** Posisi pemicu relatif terhadap viewport. */
  start?: string
  /** Ulangi animasi setiap kali elemen masuk layar. */
  repeat?: boolean
  duration?: number
}

/** Animasi masuk untuk elemen bertanda `data-reveal`. Composable ini yang menyembunyikan dan memunculkan, bukan CSS. */
export function useReveal(root: Ref<unknown>, options: RevealOptions = {}) {
  /* Irama animasi scroll seluruh situs: y 20 px, stagger 90 ms, durasi 900 ms. */
  const { y = 20, stagger = 0.09, start = 'top 82%', repeat = false, duration = 0.9 } = options

  onMounted(() => {
    const el = toRevealElement(unref(root))
    if (!el) return

    /* Hormati preferensi sistem: tampilkan konten tanpa animasi sama sekali. */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.querySelectorAll<HTMLElement>('[data-reveal]').forEach((node) => {
        node.style.opacity = '1'
        node.style.transform = 'none'
      })
      return
    }

    const { $gsap, $ScrollTrigger } = useNuxtApp()
    const targets = Array.from(el.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (targets.length === 0) return

    /* Di ponsel geserannya dipendekkan; dibaca sekali, tanpa listener. */
    const sempit = window.matchMedia('(max-width: 767px)').matches
    const geser = sempit ? Math.round(y * 0.6) : y

    /* Konteks GSAP membereskan tween saat komponen dilepas. Elemen disembunyikan di sini, bukan lewat CSS. */
    $gsap.set(targets, { opacity: 0, y: geser })

    /* `ScrollTrigger.batch`: tiap elemen punya pemicu sendiri, yang masuk layar berbarengan dijadikan satu kelompok. */
    const ctx = $gsap.context(() => {
      $ScrollTrigger.batch(targets, {
        start,
        once: !repeat,
        onEnter: (kelompok: Element[]) =>
          $gsap.to(kelompok, { opacity: 1, y: 0, duration, stagger, overwrite: true }),
        onLeaveBack: repeat
          ? (kelompok: Element[]) =>
              $gsap.to(kelompok, { opacity: 0, y: geser, duration: duration * 0.6, overwrite: true })
          : undefined,
      })
    }, el)

    onBeforeUnmount(() => {
      ctx.revert()
      $ScrollTrigger.refresh()
    })
  })
}

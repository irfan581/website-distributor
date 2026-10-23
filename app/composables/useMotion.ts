/** Interaksi mikro: tombol magnetik, parallax mouse dan scroll, animasi angka. */

/** Mengambil elemen DOM dari template ref, baik ref elemen maupun instance komponen. */
function toElement(value: unknown): HTMLElement | null {
  if (!value) return null
  if (value instanceof HTMLElement) return value

  const el = (value as { $el?: unknown }).$el
  return el instanceof HTMLElement ? el : null
}

/** Menggulir sampai elemen berhenti tepat di bawah header yang menempel. */
export function scrollToElement(el: HTMLElement | null | undefined, offset = 104) {
  if (!import.meta.client || !el) return

  const top = el.getBoundingClientRect().top + window.scrollY - offset
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  window.scrollTo({ top: Math.max(top, 0), behavior: reduced ? 'auto' : 'smooth' })
}

/** True bila pengguna meminta pengurangan gerak. Semua composable menghormatinya. */
export function usePrefersReducedMotion() {
  const reduced = ref(false)

  onMounted(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduced.value = query.matches
    const onChange = (e: MediaQueryListEvent) => (reduced.value = e.matches)
    query.addEventListener('change', onChange)
    onBeforeUnmount(() => query.removeEventListener('change', onChange))
  })

  return reduced
}

/** Tombol yang sedikit tertarik ke arah kursor; mati di perangkat sentuh. */
export function useMagnetic(
  target: Ref<unknown>,
  strength = 0.28,
) {
  onMounted(() => {
    const el = toElement(unref(target))
    if (!el) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const { $gsap } = useNuxtApp()
    const move = $gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
    const moveY = $gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })

    function onPointerMove(event: PointerEvent) {
      const rect = el!.getBoundingClientRect()
      move((event.clientX - (rect.left + rect.width / 2)) * strength)
      moveY((event.clientY - (rect.top + rect.height / 2)) * strength)
    }

    function onPointerLeave() {
      move(0)
      moveY(0)
    }

    el.addEventListener('pointermove', onPointerMove)
    el.addEventListener('pointerleave', onPointerLeave)

    onBeforeUnmount(() => {
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerleave', onPointerLeave)
      $gsap.killTweensOf(el)
    })
  })
}

/** Parallax kursor. Anak ditandai `data-parallax="0.5"`, angkanya pengali kedalaman. */
export function useMouseParallax(root: Ref<unknown>, range = 24) {
  onMounted(() => {
    const el = toElement(unref(root))
    if (!el) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const { $gsap } = useNuxtApp()
    const layers = Array.from(el.querySelectorAll<HTMLElement>('[data-parallax]'))
    if (layers.length === 0) return

    const setters = layers.map((layer) => ({
      depth: Number(layer.dataset.parallax) || 0.5,
      x: $gsap.quickTo(layer, 'x', { duration: 1.1, ease: 'power2.out' }),
      y: $gsap.quickTo(layer, 'y', { duration: 1.1, ease: 'power2.out' }),
    }))

    function onPointerMove(event: PointerEvent) {
      /* Normalisasi ke rentang -1..1 dari titik tengah viewport. */
      const nx = (event.clientX / window.innerWidth - 0.5) * 2
      const ny = (event.clientY / window.innerHeight - 0.5) * 2
      setters.forEach(({ depth, x, y }) => {
        x(nx * range * depth)
        y(ny * range * depth)
      })
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })

    onBeforeUnmount(() => {
      window.removeEventListener('pointermove', onPointerMove)
      layers.forEach((layer) => $gsap.killTweensOf(layer))
    })
  })
}

/** Parallax scroll. Anak ditandai `data-scroll-parallax="80"`, jarak tempuh dalam piksel. */
export function useScrollParallax(root: Ref<unknown>) {
  onMounted(() => {
    const el = toElement(unref(root))
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const { $gsap } = useNuxtApp()
    const layers = Array.from(el.querySelectorAll<HTMLElement>('[data-scroll-parallax]'))
    if (layers.length === 0) return

    const ctx = $gsap.context(() => {
      layers.forEach((layer) => {
        const distance = Number(layer.dataset.scrollParallax) || 60
        $gsap.fromTo(
          layer,
          { y: distance },
          {
            y: -distance,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })
    }, el)

    onBeforeUnmount(() => ctx.revert())
  })
}

/** Angka yang menghitung naik saat masuk layar, diformat lokal Indonesia. */
export function useCounter(
  target: Ref<unknown>,
  value: MaybeRefOrGetter<number>,
  options: { duration?: number; isYear?: boolean } = {},
) {
  const { duration = 1.8, isYear = false } = options

  function format(n: number) {
    /* Tahun ditampilkan apa adanya — "2.018" jelas salah baca. */
    return isYear ? String(Math.round(n)) : Math.round(n).toLocaleString('id-ID')
  }

  /* Mulai dari angka akhir agar HTML dari server (dan mesin pencari) tidak memuat "0". */
  const display = ref(format(toValue(value)))

  onMounted(() => {
    const el = toElement(unref(target))
    const end = toValue(value)
    display.value = format(end)

    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const { $gsap } = useNuxtApp()
    /* Tahun dihitung dari titik yang dekat agar tidak berlari dari nol. */
    const counter = { n: isYear ? Math.max(end - 30, 0) : 0 }

    const ctx = $gsap.context(() => {
      $gsap.to(counter, {
        n: end,
        duration,
        ease: 'power2.out',
        onUpdate: () => (display.value = format(counter.n)),
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    }, el)

    onBeforeUnmount(() => ctx.revert())
  })

  return display
}

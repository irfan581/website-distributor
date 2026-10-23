import type { RouteLocationRaw } from 'vue-router'

/** Dua jalur kontak yang sengaja dipisah: nomor pusat (admin) dan sales per wilayah. */
export function useContactAction() {
  const settingsStore = useSettingsStore()
  const localePath = useLocalePath()

  interface ContactTarget {
    to?: RouteLocationRaw
    href?: string
    external: boolean
  }

  /** Tujuan "Hubungi Sales": selalu halaman tim sales, tidak pernah nomor pusat. */
  function contactTarget(): ContactTarget {
    return { to: localePath('/sales'), external: false }
  }

  /** Tujuan kontak admin (nomor pusat) untuk tombol WhatsApp melayang; bila kosong, ke halaman sales. */
  function adminTarget(message?: string): ContactTarget {
    const teks =
      message ?? 'Halo Tani Makmur, saya ingin mendapatkan informasi mengenai produk Tani Makmur.'
    const link = settingsStore.whatsappLink(teks)

    return link ? { href: link, external: true } : contactTarget()
  }

  return { contactTarget, adminTarget }
}

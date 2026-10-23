import type { Localized } from '#shared/types/content'

/** Mengubah objek `{ id, en }` dari API menjadi string sesuai bahasa aktif. */
export function useLocalized() {
  const { locale } = useI18n()

  /** Mengembalikan teks pada bahasa aktif, dengan Indonesia sebagai cadangan. */
  function L(value: Localized | null | undefined): string {
    if (!value) return ''
    return (locale.value === 'en' ? value.en : value.id) || value.id || value.en || ''
  }

  /** Versi untuk daftar, mis. daftar manfaat produk. */
  function LL(values: Localized[] | null | undefined): string[] {
    return (values ?? []).map(L)
  }

  return { L, LL }
}

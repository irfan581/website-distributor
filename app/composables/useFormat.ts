/** Pemformatan yang bergantung pada bahasa aktif. */
export function useFormat() {
  const { locale } = useI18n()

  const intlLocale = computed(() => (locale.value === 'en' ? 'en-GB' : 'id-ID'))

  /** Tanggal panjang, mis. "14 Mei 2026" / "14 May 2026". */
  function formatDate(value: string | Date): string {
    const date = typeof value === 'string' ? new Date(value) : value
    if (Number.isNaN(date.getTime())) return ''

    return new Intl.DateTimeFormat(intlLocale.value, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date)
  }

  /** Angka dengan pemisah ribuan sesuai lokal. */
  function formatNumber(value: number): string {
    return new Intl.NumberFormat(intlLocale.value).format(value)
  }

  return { formatDate, formatNumber }
}

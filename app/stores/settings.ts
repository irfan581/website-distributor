import type { SiteSettings } from '#shared/types/content'

/** Pengaturan situs di store: satu permintaan per sesi, tersedia sinkron di mana pun. */
export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<SiteSettings | null>(null)

  async function load() {
    if (settings.value) return settings.value

    const api = useApi()
    const { data } = await useAsyncData('settings-store', () =>
      api<{ data: SiteSettings }>('/v1/settings'),
    )
    settings.value = data.value?.data ?? null
    return settings.value
  }

  /** Kosong selama nomor resmi belum ada; komponen lalu mengarahkan ke halaman sales. */
  const hasWhatsapp = computed(() => Boolean(settings.value?.contact.whatsapp))
  const hasPhone = computed(() => Boolean(settings.value?.contact.phone))
  const hasEmail = computed(() => Boolean(settings.value?.contact.email))

  /** Tautan WhatsApp perusahaan, atau `null` bila nomornya belum tersedia. */
  function whatsappLink(message?: string): string | null {
    const number = settings.value?.contact.whatsapp
    if (!number) return null

    const text = message ?? 'Halo Tani Makmur, saya ingin menanyakan produk.'
    return `https://wa.me/${number}?text=${encodeURIComponent(text)}`
  }

  const telLink = computed(() =>
    hasPhone.value ? `tel:${settings.value!.contact.phone.replace(/\s/g, '')}` : null,
  )

  const mailLink = computed(() =>
    hasEmail.value ? `mailto:${settings.value!.contact.email}` : null,
  )

  return { settings, load, hasWhatsapp, hasPhone, hasEmail, whatsappLink, telLink, mailLink }
})

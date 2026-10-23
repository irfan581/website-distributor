<script setup lang="ts">
/** Tombol kontak mengambang, muncul setelah hero. Tanpa nomor WhatsApp ia mengarah ke halaman sales. */
const settingsStore = useSettingsStore()
const ui = useUiStore()
/* Tombol melayang adalah kanal Admin Digital Marketing, bukan sales:
   pertanyaan umum masuk ke satu pintu, sedangkan pertanyaan harga dan
   stok per wilayah tetap lewat tombol "Hubungi Sales". */
const { adminTarget } = useContactAction()
const { y } = useWindowScroll()

const visible = computed(() => y.value > 520 && !ui.mobileNavOpen)
const contact = computed(() => adminTarget())
const label = computed(() =>
  settingsStore.hasWhatsapp ? 'common.whatsapp' : 'common.contactSales',
)
</script>

<template>
  <Transition
    enter-active-class="transition duration-400 ease-[var(--ease-tmk)]"
    enter-from-class="opacity-0 translate-y-4 scale-90"
    leave-active-class="transition duration-200 ease-in"
    leave-to-class="opacity-0 translate-y-2 scale-95"
  >
    <!-- Dua cabang eksplisit: <a> untuk tautan keluar, NuxtLink untuk tujuan internal. -->
    <a
      v-if="visible && contact.external"
      :href="contact.href"
      target="_blank"
      rel="noopener noreferrer"
      class="group fixed bottom-4 right-4 z-40 flex items-center gap-2.5 rounded-full bg-[#25D366] p-2.5 text-[#0B2E1E] shadow-[0_14px_34px_-12px_rgba(37,211,102,0.75)] transition-transform duration-300 hover:scale-[1.04] sm:bottom-7 sm:right-7 sm:py-3 sm:pl-3.5 sm:pr-4"
      :aria-label="$t(label)"
    >
      <!-- Lambang WhatsApp. Isinya hijau tua agar kontrasnya cukup di atas hijau merek. -->
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path
          d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.18h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.4c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 5.83 2.42 8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.25-8.24 8.25Zm4.52-6.17c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.44.06-.66.31-.23.25-.87.85-.87 2.07s.89 2.4 1.02 2.57c.12.16 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.19.2-.58.2-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z"
        />
      </svg>

      <!-- Label hanya muncul di layar lebar agar tidak menutupi konten mobile -->
      <span class="hidden text-sm font-semibold sm:inline">{{ $t(label) }}</span>
    </a>

    <NuxtLink
      v-else-if="visible"
      :to="contact.to"
      class="group fixed bottom-4 right-4 z-40 flex items-center gap-2.5 rounded-full bg-[#25D366] p-2.5 text-[#0B2E1E] shadow-[0_14px_34px_-12px_rgba(37,211,102,0.75)] transition-transform duration-300 hover:scale-[1.04] sm:bottom-7 sm:right-7 sm:py-3 sm:pl-3.5 sm:pr-4"
      :aria-label="$t(label)"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path
          d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.18h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.4c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 5.83 2.42 8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.25-8.24 8.25Zm4.52-6.17c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.44.06-.66.31-.23.25-.87.85-.87 2.07s.89 2.4 1.02 2.57c.12.16 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.19.2-.58.2-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z"
        />
      </svg>

      <span class="hidden text-sm font-semibold sm:inline">{{ $t(label) }}</span>
    </NuxtLink>
  </Transition>
</template>

<script setup lang="ts">
const settingsStore = useSettingsStore()
const { footerCompany } = useNavigation()
const { L } = useLocalized()
const localePath = useLocalePath()
const { data: categoriesData } = useCategories()

const site = computed(() => settingsStore.settings)
/* Kategori tanpa produk tidak ditautkan: tautannya hanya membawa pengunjung
   ke halaman kategori yang kosong. Lihat catatan serupa di ProductCatalog. */
const categories = computed(() =>
  (categoriesData.value?.data ?? []).filter((c) => c.products_count > 0),
)
const year = new Date().getFullYear()

const { t } = useI18n()
const hakCipta = computed(() => {
  const nama = site.value?.company.legal_name ?? 'Tani Makmur'
  return `© ${year} ${nama}. ${t('footer.rights')}`
})

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="relative overflow-hidden bg-ink-950 text-ink-300">
    <UiLatarGelap :opacity="0.16" :duration="160" />

    <!-- Ruang bawah di ponsel dilebihkan: tombol WhatsApp melayang di pojok
         kanan bawah dan tanpa ini ia duduk persis di atas baris hak cipta,
         memotong kalimatnya di tengah. -->
    <div class="container-tmk relative pb-20 pt-8 sm:pb-8 sm:pt-10 lg:pb-10 lg:pt-20">
      <!-- Di ponsel dua lajur agar footer tidak lebih tinggi dari satu layar; logo dan kontak tetap selebar penuh. -->
      <div class="grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-9">
        <!-- Identitas -->
        <div class="col-span-2 lg:col-span-1">
          <AppLogo tone="light" size="h-10 lg:h-14" />
          <!-- Slogannya tiga baris dan isinya sama dengan kalimat pembuka
               beranda. Di desktop ia mengisi kolom pertama yang memang lapang;
               di ponsel ia cuma tinggi tambahan sebelum tautan yang dicari. -->
          <p class="mt-4 hidden max-w-xs text-sm leading-relaxed text-ink-300 lg:block">
            {{ $t('footer.tagline') }}
          </p>
        </div>

        <!-- Perusahaan -->
        <nav :aria-label="$t('footer.company')">
          <h2 class="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white lg:text-xs">
            {{ $t('footer.company') }}
          </h2>
          <ul class="mt-3 space-y-2 lg:mt-4 lg:space-y-2.5">
            <li v-for="item in footerCompany" :key="item.key">
              <NuxtLink
                :to="item.to"
                class="text-[0.8125rem] text-ink-300 transition-colors duration-300 hover:text-tmk-300 lg:text-sm"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Produk -->
        <nav :aria-label="$t('footer.products')">
          <h2 class="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white lg:text-xs">
            {{ $t('footer.products') }}
          </h2>
          <ul class="mt-3 space-y-2 lg:mt-4 lg:space-y-2.5">
            <li v-for="category in categories" :key="category.id">
              <NuxtLink
                :to="localePath(`/kategori/${category.slug}`)"
                class="text-[0.8125rem] text-ink-300 transition-colors duration-300 hover:text-tmk-300 lg:text-sm"
              >
                {{ L(category.name) }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Kontak -->
        <div class="col-span-2 lg:col-span-1">
          <h2 class="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white lg:text-xs">
            {{ $t('footer.contactUs') }}
          </h2>

          <address v-if="site" class="mt-3 space-y-2.5 not-italic lg:mt-4 lg:space-y-3.5">
            <p class="flex gap-3 text-[0.8125rem] leading-snug text-ink-300 lg:text-sm lg:leading-relaxed">
              <IconGlyph name="pin" :size="18" class="mt-0.5 shrink-0 text-tmk-400" />
              <span>
                <span v-for="line in site.contact.address_lines" :key="line" class="block">
                  {{ line }}
                </span>
              </span>
            </p>

            <!-- Selama nomor perusahaan belum ada, yang ditawarkan adalah jalan
                 ke tim sales, bukan nomor karangan yang tidak bisa dihubungi. -->
            <p class="flex gap-3 text-[0.8125rem] text-ink-300 lg:text-sm">
              <IconGlyph name="phone" :size="18" class="shrink-0 text-tmk-400" />
              <a
                v-if="settingsStore.hasWhatsapp"
                :href="settingsStore.whatsappLink()!"
                target="_blank"
                rel="noopener noreferrer"
                class="transition-colors duration-300 hover:text-tmk-300"
              >
                {{ site.contact.whatsapp_display }}
              </a>
              <NuxtLink
                v-else
                :to="localePath('/sales')"
                class="transition-colors duration-300 hover:text-tmk-300"
              >
                {{ $t('sales.contactTeam') }}
              </NuxtLink>
            </p>

            <p v-if="settingsStore.hasEmail" class="flex gap-3 text-[0.8125rem] text-ink-300 lg:text-sm">
              <IconGlyph name="mail" :size="18" class="shrink-0 text-tmk-400" />
              <a
                :href="settingsStore.mailLink!"
                class="min-w-0 break-all transition-colors duration-300 hover:text-tmk-300"
              >
                {{ site.contact.email }}
              </a>
            </p>
          </address>
        </div>
      </div>

      <!-- Baris bawah -->
      <div
        class="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5 lg:mt-10 lg:pt-7"
      >
        <!-- Nama badan usaha ditaruh di baris hak cipta dan dirangkai di skrip agar spasinya tidak hilang. -->
        <p class="text-[0.6875rem] text-white/55 lg:text-xs">{{ hakCipta }}</p>

        <!-- Baris "media sosial segera hadir" dibuang; kembalikan kalau akunnya sudah ada. -->
        <div class="flex items-center gap-4">
          <button
            type="button"
            class="rounded-full border border-white/15 px-3 py-1 text-[0.6875rem] font-medium text-ink-300 transition-colors duration-300 hover:border-tmk-400/60 hover:text-tmk-300 lg:px-3.5 lg:py-1.5 lg:text-xs"
            @click="scrollTop"
          >
            {{ $t('footer.backToTop') }} ↑
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
definePageMeta({ heroOverlay: true })

const { L } = useLocalized()
const { t } = useI18n()
const settingsStore = useSettingsStore()
const localePath = useLocalePath()

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)

const site = computed(() => settingsStore.settings)

useSeoMeta({
  title: () => t('contact.title'),
  description: () => t('contact.description'),
  ogTitle: () => t('contact.title'),
  ogDescription: () => t('contact.description'),
})
</script>

<template>
  <div ref="root">
    <PageHero
      :eyebrow="$t('nav.contact')"
      :title="$t('contact.title')"
      :description="$t('contact.description')"
      :crumbs="[{ label: $t('nav.contact') }]"
    />

    <section class="section-tmk">
      <div class="container-tmk grid gap-9 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10">
        <!-- Informasi kontak -->
        <div v-if="site" class="space-y-8">
          <div data-reveal>
            <h2 class="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
              {{ $t('contact.address') }}
            </h2>
            <address class="mt-3 flex gap-3.5 not-italic">
              <IconGlyph name="pin" :size="20" class="mt-0.5 shrink-0 text-tmk-500" />
              <span class="text-[0.9375rem] leading-relaxed text-ink-600">
                <span v-for="line in site.contact.address_lines" :key="line" class="block">
                  {{ line }}
                </span>
              </span>
            </address>
          </div>

          <div data-reveal>
            <h2 class="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
              {{ $t('common.whatsapp') }} &amp; {{ $t('contact.phone') }}
            </h2>
            <ul class="mt-3 space-y-3">
              <li class="flex gap-3.5">
                <IconGlyph name="phone" :size="20" class="shrink-0 text-tmk-500" />
                <a
                  v-if="settingsStore.hasWhatsapp"
                  :href="settingsStore.whatsappLink()!"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-[0.9375rem] text-ink-600 underline-offset-4 transition-colors duration-300 hover:text-tmk-600 hover:underline"
                >
                  {{ site.contact.whatsapp_display }}
                </a>
                <span v-else class="text-[0.9375rem] text-ink-500">
                  {{ site.contact.whatsapp_display }}
                </span>
              </li>
              <li v-if="settingsStore.hasEmail" class="flex gap-3.5">
                <IconGlyph name="mail" :size="20" class="shrink-0 text-tmk-500" />
                <a
                  :href="settingsStore.mailLink!"
                  class="min-w-0 break-all text-[0.9375rem] text-ink-600 underline-offset-4 transition-colors duration-300 hover:text-tmk-600 hover:underline"
                >
                  {{ site.contact.email }}
                </a>
              </li>
            </ul>

            <!-- Selama nomor pusat belum aktif, arahkan ke sales wilayah. -->
            <p v-if="!settingsStore.hasWhatsapp" class="mt-4 text-sm leading-relaxed text-ink-500">
              {{ $t('sales.centralPending') }}
              <NuxtLink
                :to="localePath('/sales')"
                class="font-semibold text-tmk-600 underline-offset-4 hover:underline"
              >
                {{ $t('sales.seeAll') }}
              </NuxtLink>
            </p>
          </div>

          <div data-reveal>
            <h2 class="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
              {{ $t('contact.hours') }}
            </h2>
            <dl class="mt-3 overflow-hidden rounded-2xl border border-ink-200">
              <div
                v-for="(entry, index) in site.contact.business_hours"
                :key="index"
                class="flex items-center justify-between gap-4 px-4 py-3"
                :class="index % 2 === 1 && 'bg-surface-muted'"
              >
                <dt class="text-sm text-ink-600">{{ L(entry.days) }}</dt>
                <dd class="text-sm font-semibold text-ink-900">{{ entry.hours }}</dd>
              </div>
            </dl>
          </div>

          <!-- Peta -->
          <div data-reveal>
            <h2 class="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
              {{ $t('contact.maps') }}
            </h2>
            <div class="mt-3 overflow-hidden rounded-2xl border border-ink-200">
              <iframe
                :src="site.maps.embed"
                class="aspect-4/3 w-full"
                style="border: 0"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                :title="$t('contact.maps')"
              />
            </div>
            <a
              :href="site.maps.link"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-tmk-600 underline-offset-4 hover:underline"
            >
              {{ $t('contact.openMaps') }}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <!-- Formulir -->
        <div data-reveal>
          <ContactForm />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
/** Ajakan bertindak penutup halaman. */
const props = defineProps<{
  title?: string
  description?: string
}>()

const settingsStore = useSettingsStore()
const localePath = useLocalePath()
const { t } = useI18n()

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
const { contactTarget } = useContactAction()
const contact = computed(() => contactTarget())
</script>

<template>
  <section ref="root" class="pb-20 lg:pb-28">
    <div class="container-tmk">
      <div class="relative overflow-hidden rounded-[2rem] bg-ink-950 px-6 py-12 sm:px-12 lg:px-16 lg:py-14">
        <UiLatarGelap :opacity="0.2" :duration="140" />

        <div class="relative mx-auto max-w-3xl text-center">
          <!-- Ukuran judul turun satu tingkat di ponsel: dengan ukuran display,
               kalimat ajakan ini memakan lima baris besar di dalam kotak sempit. -->
          <h2 data-reveal class="text-title !text-white sm:text-display">
            {{ title ?? t('home.cta.title') }}
          </h2>
          <p data-reveal class="mt-5 text-[1.0625rem] leading-relaxed text-white/70">
            {{ description ?? t('home.cta.description') }}
          </p>

          <div data-reveal class="mt-9 flex flex-wrap justify-center gap-3">
            <UiButton
              :to="contact.to"
              :href="contact.href"
              :external="contact.external"
              size="lg"
              magnetic
            >
              {{ t('home.cta.primary') }}
            </UiButton>
            <UiButton :to="localePath('/produk')" size="lg" variant="light">
              {{ t('home.cta.secondary') }}
            </UiButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

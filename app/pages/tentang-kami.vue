<script setup lang="ts">
definePageMeta({ heroOverlay: true })

const { L, LL } = useLocalized()
const { t } = useI18n()
const localePath = useLocalePath()
const { data } = useCompany()

/* Satu `useReveal` cukup untuk seluruh halaman. */
const root = useTemplateRef<HTMLElement>('root')
useReveal(root)

const profile = computed(() => data.value?.data.profile)
const salesContacts = computed(() => data.value?.data.sales_contacts ?? [])

/* Visi, misi, dan posisi tampil sebagai tiga pilar setara. */
const pillars = computed(() =>
  profile.value
    ? [
        { key: 'vision', title: t('about.vision'), icon: 'leaf' as const, points: LL(profile.value.vision) },
        { key: 'mission', title: t('about.mission'), icon: 'sprout' as const, points: LL(profile.value.mission) },
        { key: 'position', title: t('about.position'), icon: 'network' as const, points: LL(profile.value.position) },
      ]
    : [],
)

useSeoMeta({
  /* Judul tab memakai "Tentang Kami" saja; nama merek sudah ditambahkan
     otomatis oleh titleTemplate, jadi "Tentang Tani Makmur" akan berulang. */
  title: () => t('nav.about'),
  description: () => t('about.description'),
  ogTitle: () => t('about.title'),
  ogDescription: () => t('about.description'),
})
</script>

<template>
  <div ref="root">
    <!-- Tinggi hero bawaan PageHero; ukuran judul dan jarak disetel lewat prop, bukan token global. -->
    <PageHero
      :eyebrow="$t('nav.about')"
      :title="$t('about.title')"
      :description="$t('about.description')"
      :crumbs="[{ label: $t('nav.about') }]"
      crumbs-class="!mb-5 lg:!mb-6"
      title-class="!mt-3 !max-w-3xl !leading-[1.06] !text-[clamp(1.625rem,1.1rem+2.3vw,3rem)]"
      description-class="!mt-4 !max-w-[60ch] !leading-relaxed !text-white/80 max-lg:!text-[0.9375rem]"
    />

    <!-- Cerita perusahaan -->
    <section class="section-tmk">
      <!-- `items-start` agar kolom kiri yang pendek tidak ikut setinggi kolom kanan. -->
      <div class="container-tmk grid items-start gap-7 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10">
        <div>
          <UiSectionHeading
            :eyebrow="$t('common.since') + ' 2018'"
            :title="$t('about.story')"
          />
        </div>

        <!-- Lebar baca dibatasi 68ch. -->
        <div v-if="profile" class="max-w-[68ch] space-y-4 lg:space-y-5">
          <p
            v-for="(paragraph, index) in profile.story"
            :key="index"
            data-reveal
            class="text-[0.9375rem] leading-relaxed text-ink-600 lg:text-[1.0625rem]"
          >
            {{ L(paragraph) }}
          </p>

          <ul class="!mt-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 lg:!mt-10 lg:gap-y-8">
            <li v-for="item in profile.achievements" :key="item.label.id" data-reveal>
              <HomeAchievement :item="item" />
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Visi, misi, posisi -->
    <section class="section-tmk bg-surface-muted">
      <div class="container-tmk">
        <UiSectionHeading
          :eyebrow="$t('nav.about')"
          :title="$t('about.vision') + ', ' + $t('about.mission') + ' & ' + $t('about.position')"
          align="center"
        />

        <ul class="mt-10 grid gap-5 lg:grid-cols-3">
          <li v-for="pillar in pillars" :key="pillar.key" data-reveal class="card-tmk p-7 lg:p-8">
            <span class="grid size-12 place-items-center rounded-2xl bg-tmk-50 text-tmk-600">
              <IconGlyph :name="pillar.icon" :size="24" />
            </span>
            <h3 class="text-heading mt-5">{{ pillar.title }}</h3>
            <ul class="mt-4 space-y-3">
              <li
                v-for="(point, index) in pillar.points"
                :key="index"
                class="flex gap-3 text-sm leading-relaxed text-ink-600"
              >
                <span class="mt-2 block size-1.5 shrink-0 rounded-full bg-tmk-400" aria-hidden="true" />
                {{ point }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </section>

    <!-- Nilai perusahaan -->
    <section v-if="profile" class="section-tmk">
      <div class="container-tmk">
        <UiSectionHeading
          :eyebrow="$t('nav.about')"
          :title="$t('about.values')"
        />

        <!-- Dua kolom, mengikuti jumlah pembeda pada brand guideline. -->
        <ul class="mt-7 grid lg:mt-8 gap-px overflow-hidden rounded-3xl bg-ink-200 sm:grid-cols-2">
          <li
            v-for="value in profile.values"
            :key="value.title.id"
            data-reveal
            class="group bg-white p-7 transition-colors duration-500 hover:bg-surface-muted"
          >
            <span
              class="grid size-11 place-items-center rounded-xl bg-leaf-50 text-leaf-600 transition-colors duration-500 group-hover:bg-leaf-600 group-hover:text-white"
            >
              <IconGlyph :name="value.icon" :size="21" />
            </span>
            <h3 class="mt-5 font-[family-name:var(--font-display)] text-base font-semibold text-ink-900">
              {{ L(value.title) }}
            </h3>
            <p class="mt-2.5 max-w-[56ch] text-sm leading-relaxed text-ink-500">
              {{ L(value.description) }}
            </p>
          </li>
        </ul>
      </div>
    </section>

    <!-- Linimasa: garis penghubungnya `border` tiap butir, tanpa `gap` agar tidak putus. -->
    <section v-if="profile" class="section-tmk">
      <div class="container-tmk">
        <UiSectionHeading :eyebrow="$t('nav.about')" :title="$t('about.timeline')" />

        <ol class="mt-10 lg:grid lg:grid-cols-5">
          <li
            v-for="entry in profile.timeline"
            :key="entry.year"
            data-reveal
            class="relative border-l border-ink-200 pb-9 pl-6 last:border-l-transparent last:pb-0 lg:border-l-0 lg:border-t lg:pb-0 lg:pl-0 lg:pr-7 lg:pt-7 lg:last:border-l-0 lg:last:pr-0"
          >
            <!-- Titik penanda menimpa garis; cincin sewarna latar memotong garis di bawahnya. -->
            <span
              class="absolute -left-[5px] top-1.5 size-2.5 rounded-full bg-tmk-500 ring-4 ring-surface lg:-top-[5px] lg:left-0"
              aria-hidden="true"
            />

            <span
              class="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-tmk-600"
            >
              {{ entry.year }}
            </span>

            <h3 class="mt-2 font-[family-name:var(--font-display)] text-base font-semibold text-ink-900">
              {{ L(entry.title) }}
            </h3>

            <p class="mt-2 max-w-[42ch] text-sm leading-relaxed text-ink-600 lg:text-[0.9375rem]">
              {{ L(entry.description) }}
            </p>
          </li>
        </ol>
      </div>
    </section>

    <!-- Keunggulan -->
    <section v-if="profile" class="section-tmk">
      <div class="container-tmk">
        <UiSectionHeading
          :eyebrow="$t('nav.about')"
          :title="$t('about.advantages')"
        />

        <!-- Di bawah 360 px ikon pindah ke atas teks agar kartu tidak meluber. -->
        <ul class="mt-7 grid lg:mt-8 gap-5 sm:grid-cols-2">
          <li
            v-for="advantage in profile.advantages"
            :key="advantage.title.id"
            data-reveal
            class="card-tmk card-lift flex flex-col gap-4 p-6 min-[360px]:flex-row min-[360px]:gap-5 sm:p-7"
          >
            <span class="grid size-12 shrink-0 place-items-center rounded-2xl bg-tmk-50 text-tmk-600">
              <IconGlyph :name="advantage.icon" :size="23" />
            </span>
            <div>
              <h3 class="text-heading">{{ L(advantage.title) }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-ink-500">
                {{ L(advantage.description) }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- Tim lapangan: ringkas saja, karena halaman /sales sudah memuat
         profil lengkap beserta filter wilayahnya. -->
    <section class="section-tmk bg-surface-muted">
      <div class="container-tmk">
        <!-- Ukuran deskripsi disamakan dengan teks isi halaman; `!` wajib untuk menimpa `text-lead`. -->
        <UiSectionHeading
          :eyebrow="$t('nav.sales')"
          :title="$t('about.team')"
          :description="$t('about.teamDescription')"
          description-class="!text-[0.9375rem] !leading-relaxed lg:!text-[1.0625rem]"
        />

        <h3 class="sr-only">{{ $t('sales.title') }}</h3>

        <ul class="mt-7 grid lg:mt-8 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <li v-for="contact in salesContacts.slice(0, 4)" :key="contact.id" data-reveal>
            <SalesCard :sales="contact" compact />
          </li>
        </ul>

        <div data-reveal class="mt-10">
          <UiButton :to="localePath('/sales')" variant="ghost">
            {{ $t('sales.seeAll') }}
            <template #icon-right>
              <span aria-hidden="true">→</span>
            </template>
          </UiButton>
        </div>
      </div>
    </section>
  </div>
</template>

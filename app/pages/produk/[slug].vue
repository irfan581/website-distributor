<script setup lang="ts">
definePageMeta({ heroOverlay: true })

const route = useRoute()
const slug = computed(() => String(route.params.slug))

const { L, LL } = useLocalized()
const { t } = useI18n()
const { formatDate } = useFormat()
const localePath = useLocalePath()

const { data, error } = await useProduct(slug)

/* Slug tak dikenal harus menghasilkan 404 sungguhan, bukan halaman kosong. */
if (error.value || !data.value?.data) {
  throw createError({ statusCode: 404, statusMessage: t('error.404Title'), fatal: true })
}

const product = computed(() => data.value!.data)

/* Tombol utama membuka pemilih wilayah, bukan langsung ke satu nomor: tiap
   wilayah punya sales sendiri, jadi pengunjung memilih yang menanganinya. */
const pickerOpen = ref(false)

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)

useSeoMeta({
  title: () => `${product.value.name} | ${L(product.value.category.name)}`,
  description: () => L(product.value.excerpt),
  ogTitle: () => product.value.name,
  ogDescription: () => L(product.value.excerpt),
  ogType: 'website',
})

/* Data terstruktur produk agar tampil sebagai hasil kaya di mesin pencari. */
useSchemaOrg([
  defineProduct({
    name: product.value.name,
    description: L(product.value.description),
    category: L(product.value.category.name),
    brand: product.value.brand ? { name: product.value.brand.name } : undefined,
  }),
])

/* Blok informasi hanya dirender bila datanya ada. */
const sections = computed(() =>
  [
    { key: 'benefits', title: t('product.benefits'), items: LL(product.value.benefits) },
    { key: 'usage', title: t('product.usage'), items: LL(product.value.usage) },
  ].filter((section) => section.items.length > 0),
)

/* Bila produk tidak punya keterangan sama sekali, seluruh bagian ini disembunyikan. */
const punyaSpesifikasi = computed(
  () =>
    product.value.specs.length > 0 ||
    product.value.packaging_options.length > 0 ||
    product.value.documents.length > 0,
)

const punyaBagianBawah = computed(() => punyaSpesifikasi.value || sections.value.length > 0)

/* Deskripsi susunan otomatis skrip katalog tidak ditampilkan; hanya yang ditulis manual. */
const deskripsiAsli = computed(() => {
  const teks = L(product.value.description)
  const otomatis = [`${product.value.name} termasuk kategori `, `${product.value.name} falls under the `]
  return otomatis.some((awal) => teks.startsWith(awal)) ? '' : teks
})
</script>

<template>
  <div ref="root">
    <!-- Kepala halaman: galeri berdampingan dengan informasi utama; jarak bawah lebih rapat. -->
    <section class="relative overflow-hidden bg-ink-950 pb-12 pt-28 text-white lg:pb-16 lg:pt-36">
      <UiLatarGelap :opacity="0.22" :duration="130" eager />

      <div class="container-tmk relative">
        <Breadcrumbs
          tone="light"
          class="mb-6 lg:mb-10"
          :items="[
            { label: $t('nav.products'), to: localePath('/produk') },
            { label: L(product.category.name), to: localePath(`/kategori/${product.category.slug}`) },
            { label: product.name },
          ]"
        />

        <!-- Kolom gambar lebih sempit (0,8 : 1) dan tingginya dibatasi `bingkai-detail`. Di ponsel nama produk tampil di atas foto. -->
        <div
          class="grid gap-7 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:items-start lg:gap-x-10 lg:gap-y-0"
        >
          <!-- Galeri -->
          <div class="lg:col-start-1 lg:row-span-2 lg:row-start-1">
            <ProductGallery
              :images="product.gallery"
              :category-slug="product.category.slug"
              :name="product.name"
            />
          </div>

          <!-- Kepala keterangan -->
          <div class="-order-1 lg:order-none lg:col-start-2 lg:row-start-1">
            <div class="flex flex-wrap items-center gap-2">
              <NuxtLink
                :to="localePath(`/kategori/${product.category.slug}`)"
                class="rounded-full bg-white/10 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-tmk-300 transition-colors duration-300 hover:bg-white/16"
              >
                {{ L(product.category.name) }}
              </NuxtLink>
              <span
                v-if="product.badge"
                class="rounded-full bg-tmk-600 px-3 py-1 text-[0.6875rem] font-semibold tracking-wide text-white"
              >
                {{ L(product.badge) }}
              </span>
            </div>

            <h1 class="text-display mt-4 !text-white lg:mt-5">{{ product.name }}</h1>
            <!-- Kandungan panjang (Neo Kristalon memuat tiga varian) dipotong
                 tiga baris di ponsel; isi lengkapnya ada di tabel Spesifikasi. -->
            <p class="mt-3 line-clamp-3 text-base text-tmk-300 sm:text-lg lg:line-clamp-none">
              {{ L(product.tagline) }}
            </p>
          </div>

          <!-- Badan keterangan -->
          <div class="flex flex-col lg:col-start-2 lg:row-start-2">
            <!-- Deskripsi hanya tampil bila ditulis manual; versi otomatis tetap dipakai untuk meta dan data terstruktur. -->
            <p v-if="deskripsiAsli" class="mt-6 text-[0.9375rem] leading-relaxed text-white/70 lg:mt-6">
              {{ deskripsiAsli }}
            </p>

            <!-- Ringkasan cepat. Merek dan kemasan sama-sama boleh kosong,
                 jadi kotaknya sendiri ikut disembunyikan bila keduanya tidak
                 ada, supaya tidak menyisakan bingkai hampa. -->
            <dl
              v-if="product.brand || product.packaging"
              class="grid gap-px overflow-hidden rounded-2xl bg-white/10 lg:mt-8"
              :class="[deskripsiAsli && 'mt-8', product.brand && product.packaging && 'sm:grid-cols-2']"
            >
              <div v-if="product.brand" class="bg-ink-950 p-4">
                <dt class="text-[0.6875rem] uppercase tracking-[0.14em] text-white/40">
                  {{ $t('product.brand') }}
                </dt>
                <dd class="mt-1.5 font-[family-name:var(--font-display)] font-semibold text-white">
                  {{ product.brand.name }}
                </dd>
              </div>
              <div v-if="product.packaging" class="bg-ink-950 p-4">
                <dt class="text-[0.6875rem] uppercase tracking-[0.14em] text-white/40">
                  {{ $t('product.packaging') }}
                </dt>
                <dd class="mt-1.5 font-[family-name:var(--font-display)] font-semibold text-white">
                  {{ product.packaging }}
                </dd>
              </div>
            </dl>

            <!-- Aksi -->
            <div class="mt-6 flex flex-wrap gap-3 sm:mt-8">
              <UiButton size="lg" magnetic @click="pickerOpen = true">
                {{ $t('product.askPrice') }}
              </UiButton>
              <UiButton :to="localePath('/hubungi-kami')" size="lg" variant="light">
                {{ $t('nav.contact') }}
              </UiButton>
            </div>

            <p class="mt-5 text-xs text-white/40">
              {{ $t('product.updatedAt', { date: formatDate(product.updated_at) }) }}
            </p>
          </div>
        </div>
      </div>

    </section>

    <!-- Spesifikasi dan penjelasan; jaraknya sendiri, bukan `section-tmk`, karena isinya bisa sangat pendek. -->
    <section v-if="punyaBagianBawah" class="py-14 lg:py-14">
      <!-- Dua kolom hanya bila kolom kanan berisi; bila tidak, lebar tabel dibatasi. -->
      <div
        class="container-tmk gap-9 lg:gap-10"
        :class="
          sections.length
            ? 'grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]'
            : 'max-w-3xl'
        "
      >
        <!-- Tabel spesifikasi; tiap blok punya penjaga karena datanya belum tentu ada. -->
        <div v-if="punyaSpesifikasi" data-reveal>
          <h2 v-if="product.specs.length" class="text-title">{{ $t('product.specs') }}</h2>

          <dl
            v-if="product.specs.length"
            class="mt-6 overflow-hidden rounded-2xl border border-ink-200"
          >
            <div
              v-for="(spec, index) in product.specs"
              :key="index"
              class="grid grid-cols-2 gap-4 px-5 py-3.5"
              :class="index % 2 === 1 && 'bg-surface-muted'"
            >
              <dt class="text-sm text-ink-500">{{ L(spec.label) }}</dt>
              <dd class="text-sm font-semibold text-ink-900">{{ spec.value }}</dd>
            </div>
          </dl>

          <!-- Pengganti kalimat yang sama di deskripsi otomatis, yang kini
               tidak ditampilkan. Hilang sendiri begitu manfaat atau cara pakai
               produk ini diisi. -->
          <p v-if="!sections.length" class="mt-4 text-sm leading-relaxed text-ink-500">
            {{ $t('product.pendingInfo') }}
          </p>

          <!-- Blok "Kemasan Tersedia" dihapus karena mengulang baris Kemasan di tabel. -->

          <!-- Dokumen -->
          <div v-if="product.documents.length" class="mt-8">
            <h3 class="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
              {{ $t('product.documents') }}
            </h3>
            <ul class="mt-3 space-y-2">
              <li
                v-for="doc in product.documents"
                :key="doc.id"
                class="flex items-center gap-3 rounded-xl border border-dashed border-ink-300 px-4 py-3"
              >
                <span class="grid size-9 shrink-0 place-items-center rounded-lg bg-ink-50 text-ink-400">
                  <IconGlyph name="certificate" :size="18" />
                </span>
                <span class="min-w-0">
                  <span class="block truncate text-sm font-medium text-ink-700">
                    {{ L(doc.title) }}
                  </span>
                  <span class="block text-xs text-ink-400">{{ $t('product.documentNote') }}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Keunggulan & cara pakai -->
        <div class="space-y-12">
          <div v-for="section in sections" :key="section.key" data-reveal>
            <h2 class="text-title">{{ section.title }}</h2>
            <ul class="mt-6 space-y-4">
              <li v-for="(item, index) in section.items" :key="index" class="flex gap-4">
                <span
                  class="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-tmk-50 font-[family-name:var(--font-display)] text-xs font-bold text-tmk-600"
                  aria-hidden="true"
                >
                  {{ index + 1 }}
                </span>
                <p class="text-[0.9375rem] leading-relaxed text-ink-600">{{ item }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Produk terkait -->
    <section v-if="product.related.length" class="section-tmk bg-surface-muted">
      <div class="container-tmk">
        <UiSectionHeading :title="$t('product.related')" as="h2" />

        <!-- Produk terkait dua kolom sejak ponsel agar tidak menumpuk terlalu tinggi. -->
        <ul class="mt-10 grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-4">
          <li v-for="item in product.related" :key="item.id" data-reveal>
            <ProductCard :product="item" />
          </li>
        </ul>
      </div>
    </section>

    <CtaBanner />

    <SalesPicker
      :open="pickerOpen"
      :product-name="product.name"
      @close="pickerOpen = false"
    />
  </div>
</template>

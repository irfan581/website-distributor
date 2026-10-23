<script setup lang="ts">
/** Latar semua bidang gelap. Lapisan dari bawah: foto, selubung rata, selubung mendatar, batik. */
withDefaults(
  defineProps<{
    /** Foto latar. `null` menghasilkan bidang gelap polos bermotif saja. */
    image?: string | null
    /** Kepekatan batik. */
    opacity?: number
    /** Detik untuk satu putaran batik. */
    duration?: number
    /** Muat foto segera; hanya untuk bidang di layar pertama. */
    eager?: boolean
    /** Latar versi lama: gradien oranye-hijau dan garis kontur, tanpa foto dan batik. */
    klasik?: boolean
  }>(),
  {
    image: '/gambar/hero/beranda.jpg',
    opacity: 0.24,
    duration: 130,
    eager: false,
    klasik: false,
  },
)
</script>

<template>
  <div class="absolute inset-0" aria-hidden="true">
    <!-- Varian lama: gradien oranye-hijau, garis kontur, dan satu bulatan kabur. -->
    <template v-if="klasik">
      <div
        class="absolute inset-0"
        style="
          background:
            radial-gradient(ellipse 62% 70% at 12% 0%, rgba(252, 128, 4, 0.3), transparent 62%),
            radial-gradient(ellipse 58% 74% at 92% 100%, rgba(0, 125, 62, 0.3), transparent 64%);
        "
      />
      <UiContourField tone="dark" :lines="7" :opacity="0.8" />
      <div
        data-parallax="0.6"
        class="absolute -right-16 top-6 size-72 rounded-full bg-tmk-500/10 blur-3xl"
      />
    </template>

    <template v-else>
    <!-- Foto bergeser mengikuti kursor; bungkusnya melebihi bidang 3% agar tepinya tidak tersingkap. -->
    <div v-if="image" data-parallax="0.35" class="absolute -inset-[3%]">
      <NuxtImg
        :src="image"
        alt=""
        format="webp"
        :loading="eager ? 'eager' : 'lazy'"
        :fetchpriority="eager ? 'high' : 'auto'"
        sizes="100vw"
        class="h-full w-full object-cover"
      />
    </div>
    <div class="absolute inset-0 bg-ink-950/40" />
    <div class="absolute inset-0 bg-gradient-to-r from-ink-950/90 via-ink-950/55 to-ink-950/20" />
    <UiBatikField :opacity="opacity" :duration="duration" />
    </template>
  </div>
</template>

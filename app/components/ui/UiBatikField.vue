<script setup lang="ts">
/** Motif batik kawung sebagai latar, murni SVG. Garis lidi dan kembang dua pola terpisah; yang digeser grupnya, bukan polanya. */
withDefaults(
  defineProps<{
    /** Kepekatan seluruh motif. Di atas foto, angka kecil sudah cukup. */
    opacity?: number
    /** Detik untuk satu putaran penuh. Semakin besar semakin lambat. */
    duration?: number
  }>(),
  { opacity: 0.5, duration: 90 },
)

const UBIN = { lebar: 300, tinggi: 360 }
</script>

<template>
  <!-- Sengaja TANPA `viewBox` agar ukuran ubin tetap di bidang selebar apa pun. -->
  <svg
    class="batik pointer-events-none absolute inset-0 h-full w-full"
    :style="{ opacity, '--batik-durasi': `${duration}s`, '--batik-ubin': `${UBIN.tinggi}px` }"
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <!-- Satu kembang empat kelopak, dipakai ulang di tiap titik kelompok -->
      <g id="batik-kembang">
        <g v-for="putar in 4" :key="putar" :transform="`rotate(${(putar - 1) * 90})`">
          <path d="M0 0 C 5 -9, 13 -13, 19 -21 C 12 -14, 4 -6, 0 0 Z" />
        </g>
      </g>

      <!-- Belah ketupat bergaris, sudut-sudut kelompok -->
      <path
        id="batik-ketupat"
        d="M0 -11 Q 5 -5, 11 0 Q 5 5, 0 11 Q -5 5, -11 0 Q -5 -5, 0 -11 Z"
      />

      <!-- Garis lidi: meruncing di kedua ujung, bukan garis lurus berujung tumpul -->
      <path id="batik-lidi" d="M0 -84 Q 1.4 0, 0 84 Q -1.4 0, 0 -84 Z" />

      <pattern
        id="batik-pola-lidi"
        :width="UBIN.lebar * 0.5"
        :height="UBIN.tinggi"
        patternUnits="userSpaceOnUse"
      >
        <g fill="#fc8004" fill-opacity="0.55">
          <use href="#batik-lidi" x="38" y="96" />
          <use href="#batik-lidi" x="38" y="276" />
          <use href="#batik-lidi" x="112" y="186" />
          <use href="#batik-lidi" x="112" y="6" />
        </g>
      </pattern>

      <pattern
        id="batik-pola-kawung"
        :width="UBIN.lebar"
        :height="UBIN.tinggi"
        patternUnits="userSpaceOnUse"
      >
        <!-- Dua kelompok per ubin, yang kedua digeser setengah ke kanan dan ke
             bawah supaya susunannya berselang-seling seperti pasangan bata,
             bukan berbaris lurus. -->
        <g v-for="(pusat, i) in [{ x: 75, y: 90 }, { x: 225, y: 270 }]" :key="i">
          <g
            v-for="(titik, j) in [
              { x: -46, y: -52, s: 0.7 }, { x: 0, y: -60, s: 0.92 }, { x: 46, y: -52, s: 0.7 },
              { x: -52, y: 0, s: 0.7 },   { x: 0, y: 0, s: 1 },      { x: 52, y: 0, s: 0.7 },
              { x: -46, y: 52, s: 0.7 },  { x: 0, y: 60, s: 0.92 },  { x: 46, y: 52, s: 0.7 },
            ]"
            :key="j"
            :transform="`translate(${pusat.x + titik.x} ${pusat.y + titik.y}) scale(${titik.s})`"
          >
            <use href="#batik-kembang" fill="#e64a19" fill-opacity="0.85" />
            <use href="#batik-ketupat" y="-30" fill="none" stroke="#fc8004" stroke-width="2.6" />
            <use href="#batik-ketupat" y="30" fill="none" stroke="#fc8004" stroke-width="2.6" />
            <g fill="#0c8a4c">
              <circle cx="-15" cy="-15" r="2.6" />
              <circle cx="15" cy="-15" r="2.6" />
              <circle cx="-15" cy="15" r="2.6" />
              <circle cx="15" cy="15" r="2.6" />
            </g>
          </g>
        </g>
      </pattern>
    </defs>

    <!-- Dua grup bersarang: yang luar mengecilkan motif, yang dalam bergerak. -->
    <g class="batik-skala">
      <g class="batik-lapis">
        <!-- Bidangnya melebihi layar di keempat sisi: selama animasi menggeser
             isinya, tepi bidang tidak boleh sampai terlihat. Ukurannya lewat
             CSS karena atribut SVG tidak menerima calc(). -->
        <rect class="batik-bidang" fill="url(#batik-pola-lidi)" />
        <rect class="batik-bidang" fill="url(#batik-pola-kawung)" />
      </g>
    </g>
  </svg>
</template>

<style scoped>
/* Ukuran bidang nisbi (300%, geser -100%) agar tetap menutup layar saat motif dikecilkan. */
.batik-bidang {
  x: -100%;
  y: -100%;
  width: 300%;
  height: 300%;
}

/* Di layar sempit ubinnya dikecilkan supaya motifnya tetap terbaca sebagai
   kain, bukan sebagai beberapa bentuk raksasa. Dua titik saja, bukan skala
   bertingkat: motif latar tidak perlu setepat itu. */
.batik-skala {
  transform-box: view-box;
  transform-origin: center;
  transform: scale(0.58);
}

@media (width >= 640px) {
  .batik-skala {
    transform: scale(0.78);
  }
}

@media (width >= 1024px) {
  .batik-skala {
    transform: none;
  }
}

.batik-lapis {
  animation: batik-hanyut var(--batik-durasi) linear infinite;
}

@keyframes batik-hanyut {
  from {
    transform: translateY(0);
  }
  to {
    /* Persis setinggi satu ubin — pada titik ini gambarnya identik dengan
       keadaan awal, jadi pengulangannya tidak terlihat. */
    transform: translateY(calc(-1 * var(--batik-ubin)));
  }
}

/* Gerak latar yang terus-menerus termasuk yang paling mengganggu bagi yang
   sensitif; motifnya tetap tampil, hanya diamnya saja. */
@media (prefers-reduced-motion: reduce) {
  .batik-lapis {
    animation: none;
  }
}
</style>

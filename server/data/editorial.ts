import type { Article, GalleryItem } from '#shared/types/content'


/** Artikel edukasi. Nanti menjadi tabel `articles` di dashboard. */
export const articles: Article[] = [
  {
    id: 1,
    slug: 'kenapa-pengapuran-harus-dulu',
    title: {
      id: 'Kenapa Pengapuran Harus Dilakukan Sebelum Pemupukan',
      en: 'Why Liming Must Come Before Fertilising',
    },
    excerpt: {
      id: 'Pada tanah masam, sebagian besar pupuk yang Anda tabur tidak pernah sampai ke tanaman. Ini penjelasannya.',
      en: 'On acidic soil, much of the fertilizer you spread never reaches the crop. Here is why.',
    },
    category: { id: 'Edukasi Pertanian', en: 'Farming Education' },
    author: 'Tim Agronomi Tani Makmur',
    published_at: '2026-05-14',
    reading_minutes: 6,
    image: null,
    placeholder: '#B8AE9C',
    tags: [
      { id: 'pH Tanah', en: 'Soil pH' },
      { id: 'Dolomit', en: 'Dolomite' },
      { id: 'Pemupukan', en: 'Fertilisation' },
    ],
    body: [
      {
        type: 'paragraph',
        text: {
          id: 'Banyak petani mengeluh sudah menabur pupuk dalam jumlah besar tetapi hasil panen tidak kunjung membaik. Sebelum menyalahkan mutu pupuknya, ada satu hal yang lebih dulu perlu diperiksa: tingkat keasaman tanah.',
          en: 'Many farmers report spreading large amounts of fertilizer with no improvement in yield. Before blaming fertilizer quality, one thing deserves checking first: soil acidity.',
        },
      },
      {
        type: 'heading',
        text: { id: 'Apa yang terjadi pada tanah masam', en: 'What happens on acidic soil' },
      },
      {
        type: 'paragraph',
        text: {
          id: 'Pada pH di bawah 5,5, unsur fosfor akan terikat oleh aluminium dan besi di dalam tanah membentuk senyawa yang tidak dapat diserap akar. Artinya, pupuk fosfat yang Anda beli tetap berada di tanah, tetapi dalam bentuk yang percuma bagi tanaman.',
          en: 'Below pH 5.5, phosphorus binds with aluminium and iron in the soil to form compounds roots cannot absorb. The phosphate fertilizer you paid for stays in the ground, in a form the crop cannot use.',
        },
      },
      {
        type: 'list',
        items: [
          { id: 'Efisiensi serapan fosfor bisa turun di bawah 30% pada tanah sangat masam.', en: 'Phosphorus uptake efficiency can drop below 30% on strongly acidic soil.' },
          { id: 'Aluminium yang larut pada pH rendah bersifat racun bagi ujung akar.', en: 'Aluminium dissolved at low pH is toxic to root tips.' },
          { id: 'Aktivitas mikroba pengurai bahan organik ikut menurun.', en: 'Microbial activity that decomposes organic matter also declines.' },
        ],
      },
      {
        type: 'heading',
        text: { id: 'Langkah yang benar', en: 'The right sequence' },
      },
      {
        type: 'paragraph',
        text: {
          id: 'Ukur pH tanah terlebih dahulu. Bila berada di bawah 5,5, taburkan dolomit 1 sampai 3 ton per hektar sesuai tingkat kemasaman, lalu bajak agar tercampur merata. Beri jeda dua sampai empat minggu sebelum pemupukan agar reaksi kapur berjalan tuntas.',
          en: 'Measure soil pH first. If it sits below 5.5, spread 1 to 3 tonnes of dolomite per hectare depending on acidity, then plough it in evenly. Allow two to four weeks before fertilising so the lime can fully react.',
        },
      },
      {
        type: 'quote',
        text: {
          id: 'Pengapuran bukan biaya tambahan, ia adalah syarat agar biaya pupuk Anda tidak terbuang.',
          en: 'Liming is not an added cost, it is the condition that keeps your fertilizer spend from going to waste.',
        },
      },
      {
        type: 'paragraph',
        text: {
          id: 'Satu hal yang sering terlewat: jangan menaburkan dolomit bersamaan dengan pupuk Urea atau ZA. Reaksinya akan melepaskan nitrogen ke udara dalam bentuk gas amonia, dan pupuk Anda menguap sebelum sempat diserap. Beri jeda minimal satu minggu.',
          en: 'One detail is often missed: never spread dolomite together with urea or ZA. The reaction releases nitrogen into the air as ammonia gas, and your fertilizer evaporates before it can be absorbed. Leave at least one week between them.',
        },
      },
    ],
    related: [],
  },
  {
    id: 2,
    slug: 'memilih-npk-sesuai-fase-tanam',
    title: {
      id: 'Memilih NPK Sesuai Fase Tanam, Bukan Sesuai Kebiasaan',
      en: 'Choosing NPK by Growth Stage, Not by Habit',
    },
    excerpt: {
      id: 'NPK 16-16-16 tidak selalu jawaban. Rasio yang tepat berubah mengikuti umur tanaman.',
      en: 'NPK 16-16-16 is not always the answer. The right ratio shifts with crop age.',
    },
    category: { id: 'Pengetahuan Produk', en: 'Product Knowledge' },
    author: 'Tim Agronomi Tani Makmur',
    published_at: '2026-04-22',
    reading_minutes: 5,
    image: null,
    placeholder: '#3E6FB0',
    tags: [
      { id: 'NPK', en: 'NPK' },
      { id: 'Fase Tanam', en: 'Growth Stage' },
      { id: 'Dosis', en: 'Dosage' },
    ],
    body: [
      {
        type: 'paragraph',
        text: {
          id: 'NPK 16-16-16 adalah pupuk paling dikenal di kalangan petani, dan memang serbaguna. Namun memakai rasio yang sama dari awal tanam hingga panen berarti melewatkan peluang menaikkan hasil di fase yang paling menentukan.',
          en: 'NPK 16-16-16 is the best-known fertilizer among farmers, and it is genuinely versatile. But using the same ratio from planting to harvest means missing the chance to lift yield at the stage that matters most.',
        },
      },
      {
        type: 'heading',
        text: { id: 'Fase vegetatif: nitrogen memimpin', en: 'Vegetative stage: nitrogen leads' },
      },
      {
        type: 'paragraph',
        text: {
          id: 'Di 30 hari pertama, tanaman sedang membangun daun, batang, dan anakan. Nitrogen adalah bahan baku utamanya. Rasio dengan N dominan seperti 30-6-8 memberi dorongan yang lebih tepat sasaran dibanding rasio seimbang.',
          en: 'In the first 30 days, the crop is building leaves, stems, and tillers. Nitrogen is the primary raw material. An N-dominant ratio such as 30-6-8 gives a better-targeted push than a balanced ratio.',
        },
      },
      {
        type: 'heading',
        text: { id: 'Fase generatif: kalium mengambil alih', en: 'Generative stage: potassium takes over' },
      },
      {
        type: 'paragraph',
        text: {
          id: 'Saat tanaman mulai berbunga dan mengisi buah atau bulir, kalium berperan menyalurkan hasil fotosintesis dari daun ke bagian yang dipanen. Di sinilah rasio seperti 12-12-17 bekerja lebih baik, bobot dan kualitas hasil ikut naik.',
          en: 'Once flowering begins and fruit or grain starts filling, potassium moves photosynthates from the leaves into the harvested parts. This is where a ratio like 12-12-17 performs better, weight and quality both improve.',
        },
      },
      {
        type: 'list',
        items: [
          { id: 'Jagung: N tinggi di 15 sampai 20 HST, K tinggi di 35 sampai 40 HST.', en: 'Corn: high N at 15 to 20 DAP, high K at 35 to 40 DAP.' },
          { id: 'Cabai: rasio seimbang sampai berbunga, lalu beralih ke K tinggi.', en: 'Chilli: balanced ratio until flowering, then switch to high K.' },
          { id: 'Padi: N di fase anakan, K menjelang pengisian bulir.', en: 'Rice: N at tillering, K approaching grain filling.' },
        ],
      },
      {
        type: 'paragraph',
        text: {
          id: 'Tidak perlu mengganti seluruh kebiasaan sekaligus. Mulailah dengan menyesuaikan satu aplikasi susulan di fase generatif, lalu bandingkan hasilnya dengan petak sebelah yang tetap memakai cara lama.',
          en: 'There is no need to change everything at once. Start by adjusting a single top-dressing at the generative stage, then compare the result against a neighbouring plot managed the old way.',
        },
      },
    ],
    related: [],
  },
  {
    id: 3,
    slug: 'mengendalikan-tikus-sawah-serempak',
    title: {
      id: 'Mengendalikan Tikus Sawah Harus Serempak Satu Hamparan',
      en: 'Field Rat Control Only Works Across a Whole Block',
    },
    excerpt: {
      id: 'Memberantas tikus di petak sendiri hanya memindahkan masalah ke tetangga, lalu kembali lagi.',
      en: 'Clearing rats from your own plot only moves the problem next door, then it returns.',
    },
    category: { id: 'Edukasi Pertanian', en: 'Farming Education' },
    author: 'Tim Agronomi Tani Makmur',
    published_at: '2026-03-08',
    reading_minutes: 4,
    image: null,
    placeholder: '#8B2E2E',
    tags: [
      { id: 'Hama Tikus', en: 'Rat Pests' },
      { id: 'Rodentisida', en: 'Rodenticide' },
      { id: 'Padi', en: 'Rice' },
    ],
    body: [
      {
        type: 'paragraph',
        text: {
          id: 'Tikus sawah memiliki jelajah harian yang jauh melampaui batas satu petak. Ketika satu petani memasang umpan sendirian, koloni tikus cukup berpindah ke petak sebelah dan kembali setelah umpan habis.',
          en: 'Field rats range far beyond the boundary of a single plot. When one farmer sets bait alone, the colony simply moves to the neighbouring plot and returns once the bait is gone.',
        },
      },
      {
        type: 'heading',
        text: { id: 'Kunci keberhasilan: waktu dan cakupan', en: 'The keys: timing and coverage' },
      },
      {
        type: 'list',
        items: [
          { id: 'Lakukan bersama seluruh kelompok tani dalam satu hamparan.', en: 'Act together as a whole farmer group across one contiguous block.' },
          { id: 'Mulai sejak masa persemaian, bukan setelah bulir mulai terisi.', en: 'Start at the nursery stage, not after grain filling begins.' },
          { id: 'Pasang 20 sampai 30 blok umpan per hektar di jalur aktif dan mulut lubang.', en: 'Place 20 to 30 bait blocks per hectare along active runways and burrow mouths.' },
          { id: 'Periksa setiap 3 sampai 4 hari dan ganti umpan yang habis.', en: 'Check every 3 to 4 days and replace consumed bait.' },
        ],
      },
      {
        type: 'quote',
        text: {
          id: 'Pengendalian tikus adalah pekerjaan bersama. Satu petak yang dilewatkan cukup untuk mengulang seluruh siklus.',
          en: 'Rat control is collective work. One skipped plot is enough to restart the entire cycle.',
        },
      },
      {
        type: 'paragraph',
        text: {
          id: 'Gunakan umpan antikoagulan yang bekerja dengan efek tertunda. Tikus tidak mengaitkan kematian dengan umpan, sehingga koloni tetap memakannya. Rodentisida yang bereaksi seketika justru membuat tikus waspada dan menolak umpan.',
          en: 'Use anticoagulant bait with a delayed effect. Rats do not associate the death with the bait, so the colony keeps feeding. Rodenticides that act instantly make rats wary and bait-shy.',
        },
      },
    ],
    related: [],
  },
  {
    id: 4,
    slug: 'menyemprot-pestisida-dengan-benar',
    title: {
      id: 'Lima Kesalahan Umum Saat Menyemprot Pestisida',
      en: 'Five Common Mistakes When Spraying Pesticides',
    },
    excerpt: {
      id: 'Produk bagus pun gagal bila cara aplikasinya keliru. Periksa lima hal ini sebelum menyemprot.',
      en: 'Even a good product fails when applied wrongly. Check these five things before you spray.',
    },
    category: { id: 'Pengetahuan Produk', en: 'Product Knowledge' },
    author: 'Tim Agronomi Tani Makmur',
    published_at: '2026-02-19',
    reading_minutes: 5,
    image: null,
    placeholder: '#6A4C93',
    tags: [
      { id: 'Pestisida', en: 'Pesticides' },
      { id: 'Aplikasi', en: 'Application' },
      { id: 'Keselamatan', en: 'Safety' },
    ],
    body: [
      {
        type: 'paragraph',
        text: {
          id: 'Keluhan "produknya tidak mempan" sering kali bukan soal produk, melainkan soal cara. Berikut lima kesalahan yang paling sering kami temui di lapangan.',
          en: 'The complaint that "the product does not work" is usually not about the product but the method. Here are the five mistakes we most often encounter in the field.',
        },
      },
      {
        type: 'list',
        items: [
          { id: 'Menyemprot saat terik siang, sebagian besar larutan menguap sebelum sempat bekerja.', en: 'Spraying in midday heat, much of the solution evaporates before it can act.' },
          { id: 'Menaikkan dosis melebihi anjuran, yang justru mempercepat munculnya resistensi hama.', en: 'Raising the dose above the label rate, which only speeds up pest resistance.' },
          { id: 'Melupakan bagian bawah daun, padahal di sanalah sebagian besar hama bersembunyi.', en: 'Missing leaf undersides, where most pests actually shelter.' },
          { id: 'Memakai bahan aktif yang sama terus-menerus sepanjang musim.', en: 'Using the same active ingredient continuously all season.' },
          { id: 'Menyemprot ketika kerusakan sudah meluas, bukan saat hama pertama terdeteksi.', en: 'Spraying once damage is widespread rather than at first detection.' },
        ],
      },
      {
        type: 'heading',
        text: { id: 'Keselamatan bukan pilihan tambahan', en: 'Safety is not optional' },
      },
      {
        type: 'paragraph',
        text: {
          id: 'Sarung tangan, masker, dan pakaian lengan panjang wajib dipakai pada setiap aplikasi, termasuk untuk produk yang dianggap "ringan". Cuci tangan dan ganti pakaian segera setelah selesai, dan jangan pernah mencuci alat semprot di saluran irigasi.',
          en: 'Gloves, a mask, and long sleeves are required for every application, including products considered "mild". Wash and change immediately afterwards, and never rinse sprayers in irrigation channels.',
        },
      },
      {
        type: 'paragraph',
        text: {
          id: 'Terakhir, perhatikan masa tunggu sebelum panen yang tertera pada kemasan. Ini bukan sekadar formalitas, ini yang menentukan hasil panen Anda aman dikonsumsi dan diterima pasar.',
          en: 'Finally, observe the pre-harvest interval printed on the label. This is not a formality, it determines whether your harvest is safe to eat and accepted by the market.',
        },
      },
    ],
    related: [],
  },
  {
    id: 5,
    slug: 'tani-makmur-menjangkau-jawa-tengah',
    title: {
      id: 'Tani Makmur Perluas Jangkauan ke Cepu dan Blora',
      en: 'Tani Makmur Extends Coverage to Cepu and Blora',
    },
    excerpt: {
      id: 'Dua wilayah baru di Jawa Tengah kini masuk rute pengiriman reguler kami.',
      en: 'Two new Central Java areas now sit on our regular delivery routes.',
    },
    category: { id: 'Berita Perusahaan', en: 'Company News' },
    author: 'Tani Makmur',
    published_at: '2026-01-30',
    reading_minutes: 3,
    image: null,
    placeholder: '#007d3e',
    tags: [
      { id: 'Perusahaan', en: 'Company' },
      { id: 'Distribusi', en: 'Distribution' },
    ],
    body: [
      {
        type: 'paragraph',
        text: {
          id: 'Mulai musim tanam ini, Cepu dan Blora resmi masuk ke dalam rute pengiriman reguler Tani Makmur. Penambahan ini melengkapi 15 kabupaten dan kota yang kami layani di Jawa Timur dan Jawa Tengah.',
          en: 'Starting this planting season, Cepu and Blora are officially part of Tani Makmur’s regular delivery routes. The addition completes the 15 regencies and cities we serve across East and Central Java.',
        },
      },
      {
        type: 'paragraph',
        text: {
          id: 'Perluasan ini merupakan tanggapan atas permintaan dari toko pertanian dan kelompok tani di wilayah perbatasan yang selama ini harus menempuh jarak jauh untuk memperoleh pupuk non-subsidi dengan harga wajar.',
          en: 'The expansion responds to requests from agri-stores and farmer groups in the border areas, who previously had to travel long distances for fairly priced non-subsidised fertilizer.',
        },
      },
      {
        type: 'list',
        items: [
          { id: 'Pengiriman reguler dua kali sepekan ke wilayah baru.', en: 'Regular deliveries twice a week to the new areas.' },
          { id: 'Tim sales lapangan siap melayani konsultasi produk di lokasi.', en: 'Field sales staff available for on-site product consultation.' },
          { id: 'Skema kemitraan terbuka bagi toko pertanian setempat.', en: 'Partnership schemes open to local agri-stores.' },
        ],
      },
      {
        type: 'paragraph',
        text: {
          id: 'Toko dan kelompok tani di Cepu maupun Blora yang ingin mengetahui ketersediaan produk dapat menghubungi tim kami melalui WhatsApp untuk mendapatkan jadwal kunjungan sales.',
          en: 'Stores and farmer groups in Cepu and Blora who would like to check product availability can reach our team on WhatsApp to arrange a sales visit.',
        },
      },
    ],
    related: [],
  },
]

/** Galeri kegiatan. Nanti menjadi tabel `galleries` di dashboard. */
export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: { id: 'Uji Tanah Bersama Petani', en: 'Soil Testing with Farmers' },
    caption: {
      id: 'Pengambilan sampel tanah bersama petani di Kebonsari dan Dolopo, dasar untuk menentukan jenis dan dosis pupuk yang tepat.',
      en: 'Soil sampling with farmers in Kebonsari and Dolopo, the basis for choosing the right fertilizer type and dosage.',
    },
    category: 'petani',
    image: '/gambar/galeri/004.jpg',
    placeholder: '#4D7C0F',
    ratio: 0.562,
    taken_at: '2026-05-14',
  },
  {
    id: 2,
    title: { id: 'Temu Petani di Lapangan', en: 'Meeting Farmers in the Field' },
    caption: {
      id: 'Petani menerima produk Tani Makmur dalam pertemuan kelompok tani.',
      en: 'Farmers receiving Tani Makmur products at a farmer group meeting.',
    },
    category: 'petani',
    image: '/gambar/galeri/bagi-produk-petani.jpg',
    placeholder: '#65A30D',
    ratio: 0.562,
    // Tanggal sebenarnya belum diketahui: salinan foto yang dipakai sudah
    // kehilangan EXIF. Angka di bawah cuma penahan supaya urutan galeri tidak
    // kacau, dan harus diganti begitu tanggal aslinya diketahui.
    taken_at: '2026-09-01',
  },
  {
    id: 3,
    title: { id: 'Tim Admin', en: 'The Admin Team' },
    caption: {
      id: 'Yang mencatat pesanan, menjadwalkan kiriman, dan menjawab telepon dari kios.',
      en: 'The people who record orders, schedule deliveries, and answer calls from kiosks.',
    },
    category: 'kegiatan',
    image: '/gambar/galeri/093.jpg',
    placeholder: '#EA580C',
    ratio: 0.562,
    taken_at: '2026-09-17',
  },
  {
    id: 4,
    title: { id: 'Sopir dan Kru Gudang', en: 'Drivers and Warehouse Crew' },
    caption: {
      id: 'Yang memuat, mengantar, dan menurunkan pupuk sampai ke kios dan lahan.',
      en: 'The people who load, deliver, and unload fertilizer to kiosks and fields.',
    },
    category: 'gudang',
    image: '/gambar/galeri/kru-gudang.jpg',
    placeholder: '#C2410C',
    ratio: 0.667,
    taken_at: '2026-09-01',
  },
  {
    id: 5,
    title: { id: 'Tim Sales', en: 'The Sales Team' },
    caption: {
      id: 'Tim yang setiap hari mendatangi kios dan petani di seluruh wilayah layanan.',
      en: 'The team that visits kiosks and farmers across the service area every day.',
    },
    category: 'kegiatan',
    image: '/gambar/galeri/260.jpg',
    placeholder: '#115E59',
    ratio: 1.333,
    taken_at: '2026-09-17',
  },
  {
    id: 6,
    title: { id: 'Buka Bersama dengan Mentari', en: 'Iftar with Mentari' },
    caption: {
      id: 'Buka puasa bersama tim Tani Makmur dan Mentari di Madiun.',
      en: 'Breaking the fast together with the Tani Makmur and Mentari teams in Madiun.',
    },
    category: 'kegiatan',
    image: '/gambar/galeri/buka-bersama-mentari.jpg',
    placeholder: '#166534',
    ratio: 0.562,
    taken_at: '2026-03-10',
  },
  {
    id: 7,
    title: { id: 'Rapat Bersama Tim Tawon', en: 'Meeting with the Tawon Team' },
    caption: {
      id: 'Pertemuan tim Tani Makmur dan Tawon membahas capaian dan rencana penjualan.',
      en: 'Tani Makmur and Tawon teams reviewing results and sales plans.',
    },
    category: 'kegiatan',
    image: '/gambar/galeri/rapat-tawon.jpg',
    placeholder: '#3F6212',
    ratio: 0.667,
    // Dari nama folder sumbernya, "Rapat Tawon 21225" — 21 Februari 2025.
    taken_at: '2025-02-21',
  },

  {
    id: 8,
    title: { id: 'Kios Pelanggan', en: 'A Partner Kiosk' },
    caption: {
      id: 'Sales Tani Makmur di kios pelanggan, di antara rak obat dan nutrisi tanaman.',
      en: 'A Tani Makmur sales rep at a partner kiosk, among shelves of crop protection and nutrition products.',
    },
    category: 'toko',
    image: '/gambar/galeri/kios-pelanggan.jpg',
    placeholder: '#837362',
    ratio: 0.562,
    // PENAHAN: yang diketahui cuma tanggal foto dikirim (28 September 2026),
    // bukan tanggal pemotretan. Nama kios dan lokasinya juga belum diketahui,
    // jadi sengaja tidak disebut di kapsi. Ganti begitu kantor memastikan.
    taken_at: '2026-09-28',
  },
  {
    id: 9,
    title: { id: 'Melayani Pembeli di Kios', en: 'Serving a Customer at the Kiosk' },
    caption: {
      id: 'Tim sales mendampingi pemilik kios melayani pembeli.',
      en: 'The sales team supporting a kiosk owner while serving a customer.',
    },
    category: 'toko',
    image: '/gambar/galeri/kios-serah-produk.jpg',
    placeholder: '#A18F81',
    ratio: 0.562,
    // PENAHAN: lihat catatan pada id 8.
    taken_at: '2026-09-28',
  },
  {
    id: 10,
    title: { id: 'Rapat Tim', en: 'Team Meeting' },
    caption: {
      id: 'Tim Tani Makmur berkumpul di ruang rapat kantor.',
      en: 'The Tani Makmur team gathered in the office meeting room.',
    },
    category: 'kegiatan',
    image: '/gambar/galeri/rapat-tim.jpg',
    placeholder: '#805F4E',
    ratio: 0.562,
    // PENAHAN: agenda rapatnya belum diketahui, jadi kapsinya sengaja umum —
    // lebih baik kurang lengkap daripada menyebut agenda yang tidak pernah ada.
    taken_at: '2026-09-28',
  },
  {
    id: 11,
    title: { id: 'Apresiasi untuk Kios', en: 'Appreciation for a Kiosk' },
    caption: {
      id: 'Penyerahan hadiah kepada kios mitra.',
      en: 'Presenting a prize to a partner kiosk.',
    },
    category: 'kegiatan',
    image: '/gambar/galeri/hadiah-kios.jpg',
    placeholder: '#867D73',
    ratio: 0.562,
    // PENAHAN: nama programnya belum diketahui. Jangan menyebut syarat atau
    // periode apa pun sebelum kantor memastikan — halaman promo dulu dihapus
    // justru karena isinya janji yang tidak pernah diucapkan.
    taken_at: '2026-09-28',
  },
  {
    id: 12,
    title: { id: 'Muat di Gudang', en: 'Loading at the Warehouse' },
    caption: {
      id: 'Kru gudang memindahkan pupuk ke bak truk sebelum berangkat.',
      en: 'Warehouse crew moving fertilizer onto the truck bed before departure.',
    },
    category: 'distribusi',
    image: '/gambar/galeri/muat-truk.jpg',
    placeholder: '#6F7A79',
    ratio: 1.233,
    // PENAHAN: lihat catatan pada id 8.
    taken_at: '2026-09-28',
  },
  {
    id: 13,
    title: { id: 'Bongkar Muat', en: 'Loading and Unloading' },
    caption: {
      id: 'Karung pupuk dipanggul satu per satu di gudang.',
      en: 'Fertilizer sacks carried one by one in the warehouse.',
    },
    category: 'distribusi',
    image: '/gambar/galeri/bongkar-gudang.jpg',
    placeholder: '#7E6E5F',
    ratio: 1.778,
    // PENAHAN: lihat catatan pada id 8.
    taken_at: '2026-09-28',
  },
  {
    id: 14,
    title: { id: 'Sopir Siap Berangkat', en: 'Driver Ready to Depart' },
    caption: {
      id: 'Truk angkutan pupuk bersubsidi siap meninggalkan gudang.',
      en: 'A subsidised fertilizer truck ready to leave the warehouse.',
    },
    category: 'distribusi',
    image: '/gambar/galeri/sopir-truk.jpg',
    placeholder: '#A18D84',
    ratio: 0.562,
    // PENAHAN: nama sopirnya sengaja tidak disebut, dan izin wajahnya tampil
    // di situs publik belum dipastikan. Kalau belum ada izin, ganti fotonya.
    taken_at: '2026-09-28',
  },
  {
    id: 15,
    title: { id: 'Kegiatan Gudang', en: 'Warehouse Activities' },
    caption: {
      id: 'Proses bongkar muat pupuk di gudang Tani Makmur.',
      en: 'Fertilizer loading and unloading process at the Tani Makmur warehouse.',
    },
    category: 'gudang',
    image: '/gambar/galeri/stok-pupuk.jpg',
    placeholder: '#878080',
    ratio: 1.248,
    // PENAHAN: lihat catatan pada id 8. Kategori 'gudang' karena subjeknya orang bekerja, bukan produk.
    taken_at: '2026-09-28',
  },

  {
    id: 16,
    title: { id: 'Sarasehan dan Ngopi Bersama', en: 'Sarasehan and Coffee Together' },
    caption: {
      id: 'Tim Tani Makmur pada acara Sarasehan dan Ngopi Bersama di Pendopo Muda Graha, Kabupaten Madiun.',
      en: 'The Tani Makmur team at the Sarasehan and Coffee Together event at Pendopo Muda Graha, Madiun Regency.',
    },
    category: 'kegiatan',
    image: '/gambar/galeri/sarasehan-madiun.jpg',
    placeholder: '#878184',
    ratio: 0.562,
    // Tanggal dan tempatnya terbaca langsung dari spanduk acara di foto:
    // Sabtu, 14 Februari 2026, Pendopo Muda Graha, Kabupaten Madiun.
    taken_at: '2026-02-14',
  },
  {
    id: 17,
    title: { id: 'One Day Promotion', en: 'One Day Promotion' },
    caption: {
      id: 'Tim di kios mitra pada acara One Day Promotion, dengan hadiah untuk pembeli pupuk.',
      en: 'The team at a partner kiosk during a One Day Promotion, with prizes for fertilizer buyers.',
    },
    category: 'kegiatan',
    image: '/gambar/galeri/promosi-sehari.jpg',
    placeholder: '#7C7476',
    ratio: 0.75,
    // PENAHAN: nama acara terbaca dari spanduknya, tapi tanggal, lokasi, dan
    // syarat hadiahnya belum diketahui. Jangan ditambahi sebelum kantor
    // memastikan — halaman promo dulu dihapus justru karena itu.
    taken_at: '2026-09-28',
  },
  {
    id: 18,
    title: { id: 'Bersama Petani di Acara Promosi', en: 'With Farmers at the Promotion' },
    caption: {
      id: 'Petani dan tim Tani Makmur berfoto bersama di akhir acara.',
      en: 'Farmers and the Tani Makmur team together at the close of the event.',
    },
    category: 'petani',
    image: '/gambar/galeri/promosi-sehari-petani.jpg',
    placeholder: '#5C5B63',
    ratio: 0.562,
    // PENAHAN: lihat catatan pada id 17.
    taken_at: '2026-09-28',
  },
  {
    id: 19,
    title: { id: 'Temu Warga', en: 'Meeting the Community' },
    caption: {
      id: 'Pertemuan dengan warga, duduk melingkar di rumah salah satu petani.',
      en: 'A gathering with the community, seated together at a farmer\u2019s home.',
    },
    category: 'petani',
    image: '/gambar/galeri/penyuluhan-warga.jpg',
    placeholder: '#6C7166',
    ratio: 0.562,
    // PENAHAN: yang terlihat orang duduk melingkar dan seseorang berbicara
    // dengan mikrofon. Apakah ini penyuluhan, sosialisasi produk, atau acara
    // lain belum diketahui, jadi judulnya sengaja netral.
    taken_at: '2026-09-28',
  },
  {
    id: 20,
    title: { id: 'Di Kebun Jambu', en: 'In the Guava Orchard' },
    caption: {
      id: 'Kunjungan ke kebun jambu milik petani.',
      en: 'A visit to a farmer\u2019s guava orchard.',
    },
    category: 'petani',
    image: '/gambar/galeri/kebun-jambu.jpg',
    placeholder: '#58644C',
    ratio: 1.501,
    // PENAHAN: lokasi dan nama pemilik kebunnya belum diketahui.
    taken_at: '2026-09-28',
  },
  {
    id: 21,
    title: { id: 'Kunjungan ke Petani Durian', en: 'Visiting a Durian Farmer' },
    caption: {
      id: 'Kunjungan ke tempat penjualan durian lokal milik petani.',
      en: 'A visit to a local durian farmer\u2019s outlet.',
    },
    category: 'kegiatan',
    image: '/gambar/galeri/kunjungan-durian.jpg',
    placeholder: '#897E69',
    ratio: 1.778,
    // PENAHAN: yang terbaca di poster belakang cuma "Berkah Alam — Durian
    // Lokal Asli Petani". Apakah itu nama tempatnya, dan apa hubungannya
    // dengan Tani Makmur, belum diketahui.
    taken_at: '2026-09-28',
  },

  {
    id: 22,
    title: { id: 'Armada Truk', en: 'The Truck Fleet' },
    caption: {
      id: 'Armada truk terparkir di halaman, difoto dari udara.',
      en: 'The truck fleet parked in the yard, photographed from the air.',
    },
    category: 'distribusi',
    image: '/gambar/galeri/armada-truk.jpg',
    placeholder: '#6F7A79',
    ratio: 0.562,
    // PENAHAN: tanggal dan lokasi pengambilan belum diketahui. Berkasnya
    // diterima 8 Oktober 2026 tanpa EXIF. Ganti begitu tanggal aslinya ada.
    taken_at: '2026-10-08',
  },
]

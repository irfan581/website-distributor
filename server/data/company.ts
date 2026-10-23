import type {
  CompanyProfile,
  CoverageArea,
  SalesContact,
  Service,
  Testimonial,
} from '#shared/types/content'

/** Profil perusahaan, jangkauan, layanan, testimoni, dan kontak sales. */

export const companyProfile: CompanyProfile = {
  story: [
    {
      id: 'Tani Makmur adalah toko pertanian di Kabupaten Madiun, Jawa Timur. Kami mendistribusikan pupuk non-subsidi dan produk perlindungan tanaman untuk petani, koperasi, toko pertanian, serta distributor di berbagai kabupaten di Jawa Timur hingga Jawa Tengah.',
      en: 'Tani Makmur is an agricultural store based in Madiun Regency, East Java. We distribute non-subsidised fertilisers and crop protection products to farmers, cooperatives, agri-stores, and distributors across East and Central Java.',
    },
    {
      id: 'Berdiri pada tahun 2018 sebagai showroom agar pelanggan lebih mudah mengenal produk dan layanan kami. Seiring waktu, Tani Makmur berkembang menjadi distributor yang tidak hanya bertransaksi, tetapi juga mengedukasi dan memberikan solusi pertanian yang berkelanjutan.',
      en: 'Founded in 2018 as a showroom so customers could get to know our products and services more easily. Over time, Tani Makmur grew into a distributor that does more than transact, we educate and deliver sustainable agricultural solutions.',
    },
    {
      id: 'Hari ini kami didukung jaringan produsen yang kuat, armada pengiriman yang fleksibel, serta tim sales lapangan yang hadir langsung di tengah petani. Prinsip kami sederhana: barang tersedia, harga wajar, dan pendampingan yang jujur.',
      en: 'Today we are backed by a strong network of producers, a flexible delivery fleet, and a field sales team present among farmers. Our principle is simple: goods available, fair pricing, and honest guidance.',
    },
  ],

  vision: [
    {
      id: 'Menjadi perusahaan distributor pupuk terkemuka di Indonesia.',
      en: 'To become a leading fertilizer distribution company in Indonesia.',
    },
    {
      id: 'Menjadi mitra terpercaya petani Indonesia dalam menyediakan pupuk berkualitas.',
      en: "To be the trusted partner of Indonesia's farmers in providing quality fertilizers.",
    },
  ],

  mission: [
    {
      id: 'Membangun jaringan distribusi yang menjangkau seluruh wilayah Indonesia.',
      en: 'Build a distribution network that reaches every region of Indonesia.',
    },
    {
      id: 'Mengembangkan produk dan layanan inovatif untuk memenuhi kebutuhan petani yang terus berkembang.',
      en: "Develop innovative products and services that meet farmers' ever-growing needs.",
    },
    {
      id: 'Menjalankan bisnis yang bertanggung jawab secara sosial dan lingkungan.',
      en: 'Run a business that is socially and environmentally responsible.',
    },
  ],

  position: [
    {
      id: 'Perusahaan yang terus tumbuh dan berinovasi agar tetap menjadi top of mind.',
      en: 'A company that keeps growing and innovating to stay top of mind.',
    },
    {
      id: 'Bukan sekadar distributor pupuk, tetapi rekan para pegiat pertanian, agrobisnis, serta penghobi tanaman.',
      en: 'Not merely a fertilizer distributor, but a partner to agricultural practitioners, agribusinesses, and plant enthusiasts.',
    },
    {
      id: 'Mendengar dan memberi solusi atas permasalahan agrikultur yang terus berkembang.',
      en: 'Listening and offering solutions to agricultural challenges as they evolve.',
    },
  ],

  /** "Pembeda" dari Visual Identity Guideline hal. 4; deskripsi disalin apa adanya, judul singkat tambahan sendiri. */
  values: [
    {
      title: { id: 'Mengutamakan Layanan', en: 'Service First' },
      description: {
        id: 'Mengutamakan service atau perlakuan kepada pelanggan petani dan kios serta komitmen kepada mitra dan stakeholder.',
        en: 'Putting service to our farmer and store customers first, alongside a firm commitment to partners and stakeholders.',
      },
      icon: 'handshake',
    },
    {
      title: { id: 'Mengedukasi dan Solutif', en: 'Educating and Solution-Driven' },
      description: {
        id: 'Tidak hanya bertransaksi namun juga mengedukasi serta solutif demi kemajuan yang berkelanjutan dan selaras dengan lingkungan.',
        en: 'More than transactions: educating and solving problems for progress that is sustainable and in step with the environment.',
      },
      icon: 'sprout',
    },
  ],

  advantages: [
    {
      title: { id: 'Jaringan Produsen Kuat', en: 'Strong Producer Network' },
      description: {
        id: 'Relasi erat dengan produsen pupuk BUMN dan swasta, ketersediaan barang relatif terjamin dengan harga yang stabil.',
        en: 'Close relationships with state-owned and private fertilizer producers, reliable availability at stable prices.',
      },
      icon: 'network',
    },
    {
      title: { id: 'Armada Pengiriman Fleksibel', en: 'Flexible Delivery Fleet' },
      description: {
        id: 'Armada angkut yang menjangkau pelosok desa hingga kirim ke seluruh Jawa, tepat waktu sesuai kebutuhan.',
        en: 'A fleet that reaches remote villages and ships across Java, on time as needed.',
      },
      icon: 'truck',
    },
    {
      title: { id: 'Jaringan Toko Berkembang', en: 'Growing Store Network' },
      description: {
        id: 'Jaringan toko dan kantor distribusi yang terus meluas, dimulai dari Madiun dan Jawa Timur.',
        en: 'An expanding network of stores and distribution offices, starting from Madiun and East Java.',
      },
      icon: 'store',
    },
    {
      title: { id: 'Pendampingan Teknis', en: 'Technical Guidance' },
      description: {
        id: 'Tujuh sales aktif di lapangan siap membantu rekomendasi produk sesuai kondisi lahan Anda.',
        en: 'Seven active field sales staff ready to recommend products suited to your land conditions.',
      },
      icon: 'handshake',
    },
  ],

  timeline: [
    {
      year: '2018',
      title: { id: 'Showroom Pertama di Madiun', en: 'First Showroom in Madiun' },
      description: {
        id: 'Tani Makmur berdiri sebagai showroom agar pelanggan dapat mengenal produk secara langsung.',
        en: 'Tani Makmur opened as a showroom so customers could see products first-hand.',
      },
    },
    {
      year: '2020',
      title: { id: 'Perluasan ke Karesidenan Madiun', en: 'Expansion Across Madiun Residency' },
      description: {
        id: 'Distribusi meluas ke Ngawi, Magetan, dan Ponorogo dengan penambahan armada angkut.',
        en: 'Distribution expanded to Ngawi, Magetan, and Ponorogo with additional delivery vehicles.',
      },
    },
    {
      year: '2022',
      title: { id: 'Lini Perlindungan Tanaman', en: 'Crop Protection Line' },
      description: {
        id: 'Katalog dilengkapi herbisida, insektisida, dan fungisida dari principal terpercaya.',
        en: 'The catalogue grew to include herbicides, insecticides, and fungicides from trusted principals.',
      },
    },
    {
      year: '2024',
      title: { id: 'Menembus Jawa Tengah', en: 'Reaching Central Java' },
      description: {
        id: 'Jangkauan menembus Cepu dan Blora, melengkapi wilayah layanan hingga ke Jawa Tengah.',
        en: 'Coverage reached Cepu and Blora, extending the service area into Central Java.',
      },
    },
    {
      year: '2026',
      title: { id: 'Digitalisasi Layanan', en: 'Digitalising Our Service' },
      description: {
        id: 'Katalog daring dan kanal permintaan penawaran dibuka agar mitra dapat memesan lebih cepat.',
        en: 'An online catalogue and quotation channel opened so partners can order faster.',
      },
    },
  ],

  /* Tiga angka terakhir dihitung ulang `/v1/company`; nilai di sini hanya cadangan. */
  achievements: [
    { value: 2018, suffix: '', label: { id: 'Berdiri & Melayani', en: 'Founded & Serving' }, is_year: true },
    { value: 12, suffix: '', label: { id: 'Produk Tersedia', en: 'Products Available' }, derive: 'products' },
    {
      value: 15,
      suffix: '',
      label: { id: 'Kabupaten/Kota Dijangkau', en: 'Regencies & Cities Covered' },
      derive: 'coverage',
    },
    { value: 7, suffix: '', label: { id: 'Sales di Lapangan', en: 'Field Sales Staff' }, derive: 'sales' },
  ],
}

/* -------------------------------------------------------------------------- */
/* Jangkauan distribusi                                                       */
/* -------------------------------------------------------------------------- */

/** x/y adalah posisi persen pada peta SVG stilasi, bukan lintang/bujur. */
export const coverageAreas: CoverageArea[] = [
  { id: 1, slug: 'madiun', name: 'Madiun', province: { id: 'Jawa Timur', en: 'East Java' }, x: 40, y: 52, is_hub: true },
  { id: 2, slug: 'ngawi', name: 'Ngawi', province: { id: 'Jawa Timur', en: 'East Java' }, x: 33, y: 40, is_hub: false },
  { id: 3, slug: 'magetan', name: 'Magetan', province: { id: 'Jawa Timur', en: 'East Java' }, x: 32, y: 55, is_hub: false },
  { id: 4, slug: 'ponorogo', name: 'Ponorogo', province: { id: 'Jawa Timur', en: 'East Java' }, x: 38, y: 68, is_hub: false },
  { id: 5, slug: 'pacitan', name: 'Pacitan', province: { id: 'Jawa Timur', en: 'East Java' }, x: 36, y: 84, is_hub: false },
  { id: 6, slug: 'nganjuk', name: 'Nganjuk', province: { id: 'Jawa Timur', en: 'East Java' }, x: 52, y: 50, is_hub: false },
  { id: 7, slug: 'kediri', name: 'Kediri', province: { id: 'Jawa Timur', en: 'East Java' }, x: 58, y: 62, is_hub: false },
  { id: 8, slug: 'jombang', name: 'Jombang', province: { id: 'Jawa Timur', en: 'East Java' }, x: 63, y: 45, is_hub: false },
  { id: 9, slug: 'trenggalek', name: 'Trenggalek', province: { id: 'Jawa Timur', en: 'East Java' }, x: 51, y: 78, is_hub: false },
  { id: 10, slug: 'tulungagung', name: 'Tulungagung', province: { id: 'Jawa Timur', en: 'East Java' }, x: 57, y: 76, is_hub: false },
  { id: 11, slug: 'blitar', name: 'Blitar', province: { id: 'Jawa Timur', en: 'East Java' }, x: 65, y: 72, is_hub: false },
  { id: 12, slug: 'bojonegoro', name: 'Bojonegoro', province: { id: 'Jawa Timur', en: 'East Java' }, x: 50, y: 28, is_hub: false },
  { id: 13, slug: 'tuban', name: 'Tuban', province: { id: 'Jawa Timur', en: 'East Java' }, x: 60, y: 18, is_hub: false },
  { id: 15, slug: 'blora', name: 'Blora', province: { id: 'Jawa Tengah', en: 'Central Java' }, x: 32, y: 22, is_hub: false },
  { id: 16, slug: 'wonogiri', name: 'Wonogiri', province: { id: 'Jawa Tengah', en: 'Central Java' }, x: 24, y: 76, is_hub: false },
]

/* -------------------------------------------------------------------------- */
/* Layanan                                                                     */
/* -------------------------------------------------------------------------- */

export const services: Service[] = [
  {
    id: 1,
    slug: 'distribusi-pertanian',
    title: { id: 'Distribusi Pertanian', en: 'Agricultural Distribution' },
    summary: {
      id: 'Pengiriman pupuk dan sarana produksi pertanian ke toko, koperasi, dan kelompok tani.',
      en: 'Delivery of fertilizers and farm inputs to stores, cooperatives, and farmer groups.',
    },
    description: {
      id: 'Kami mengelola rantai pasok dari produsen hingga ke gudang Anda. Armada kami menjangkau pelosok desa di 15 kabupaten dan kota, dengan jadwal pengiriman yang disesuaikan pada kalender musim tanam setempat.',
      en: 'We manage the supply chain from producer to your warehouse. Our fleet reaches remote villages across 15 regencies and cities, with delivery schedules aligned to the local planting calendar.',
    },
    icon: 'truck',
    image: '/gambar/galeri/muat-truk.jpg',
    points: [
      { id: 'Pengiriman terjadwal mengikuti musim tanam', en: 'Scheduled deliveries aligned to planting season' },
      { id: 'Armada fleksibel dari pikap hingga truk besar', en: 'Flexible fleet from pickups to large trucks' },
      { id: 'Konfirmasi ketersediaan stok sebelum pemesanan', en: 'Stock availability confirmed before ordering' },
    ],
  },
  {
    id: 2,
    slug: 'pesanan-grosir',
    title: { id: 'Pesanan Grosir', en: 'Wholesale Orders' },
    summary: {
      id: 'Harga khusus dan penjadwalan pengiriman untuk pembelian volume besar.',
      en: 'Special pricing and delivery scheduling for large-volume purchases.',
    },
    description: {
      id: 'Untuk koperasi, kelompok tani, perkebunan, dan instansi, kami menyediakan skema pembelian grosir dengan harga bertingkat dan pengiriman bertahap sesuai kapasitas gudang Anda.',
      en: 'For cooperatives, farmer groups, plantations, and institutions, we offer wholesale purchase schemes with tiered pricing and staged delivery to match your storage capacity.',
    },
    icon: 'warehouse',
    image: '/gambar/galeri/stok-pupuk.jpg',
    points: [
      { id: 'Harga bertingkat sesuai volume', en: 'Tiered pricing by volume' },
      { id: 'Pengiriman bertahap sesuai kapasitas gudang', en: 'Staged delivery to suit warehouse capacity' },
      { id: 'Dokumen lengkap untuk kebutuhan administrasi', en: 'Complete documentation for administrative needs' },
    ],
  },
  {
    id: 3,
    slug: 'kemitraan-bisnis',
    title: { id: 'Kemitraan Bisnis', en: 'Business Partnership' },
    summary: {
      id: 'Program sub-distributor dan mitra toko dengan dukungan penuh dari tim kami.',
      en: 'Sub-distributor and partner-store programmes with full support from our team.',
    },
    description: {
      id: 'Kami membuka kemitraan bagi toko pertanian dan sub-distributor yang ingin memperkuat lini produknya. Mitra memperoleh harga distributor, dukungan materi promosi, serta pendampingan penjualan di wilayahnya.',
      en: 'We welcome partnerships with agri-stores and sub-distributors looking to strengthen their product lines. Partners receive distributor pricing, promotional support, and sales guidance in their territory.',
    },
    icon: 'handshake',
    image: '/gambar/galeri/kios-pelanggan.jpg',
    points: [
      { id: 'Harga distributor untuk mitra resmi', en: 'Distributor pricing for official partners' },
      { id: 'Dukungan materi promosi dan pelatihan produk', en: 'Promotional materials and product training' },
      { id: 'Wilayah penjualan yang jelas', en: 'Clearly defined sales territory' },
    ],
  },
  {
    id: 4,
    slug: 'konsultasi-produk',
    title: { id: 'Konsultasi Produk', en: 'Product Consultation' },
    summary: {
      id: 'Rekomendasi produk dan dosis sesuai komoditas serta kondisi lahan.',
      en: 'Product and dosage recommendations based on crop and land conditions.',
    },
    description: {
      id: 'Salah memilih pupuk berarti biaya terbuang. Tim sales kami membantu menentukan jenis, dosis, dan waktu aplikasi yang tepat berdasarkan komoditas, fase tanam, serta kondisi pH dan tekstur tanah Anda.',
      en: 'Choosing the wrong fertilizer wastes money. Our sales team helps determine the right type, dosage, and timing based on your crop, growth stage, and soil pH and texture.',
    },
    icon: 'chat',
    image: '/gambar/galeri/004.jpg',
    points: [
      { id: 'Rekomendasi berdasarkan komoditas dan fase tanam', en: 'Recommendations by crop and growth stage' },
      { id: 'Panduan dosis tertulis untuk setiap produk', en: 'Written dosage guidance for every product' },
      { id: 'Konsultasi gratis lewat WhatsApp', en: 'Free consultation via WhatsApp' },
    ],
  },
  {
    id: 5,
    slug: 'solusi-pertanian',
    title: { id: 'Solusi Pertanian', en: 'Agricultural Solutions' },
    summary: {
      id: 'Paket pemupukan berimbang satu musim untuk hasil yang lebih terukur.',
      en: 'Balanced one-season fertilisation packages for more measurable results.',
    },
    description: {
      id: 'Kami menyusun paket kebutuhan satu musim tanam, mulai dari pengapuran, pemupukan dasar, susulan, hingga perlindungan tanaman, sehingga anggaran lebih terencana dan aplikasi tidak terlewat.',
      en: 'We assemble a full season package, from liming and base fertilisation to top dressing and crop protection, so budgets are planned and applications are never missed.',
    },
    icon: 'sprout',
    image: '/gambar/galeri/bagi-produk-petani.jpg',
    points: [
      { id: 'Perencanaan kebutuhan satu musim tanam', en: 'Planning for a full planting season' },
      { id: 'Kombinasi pupuk dan perlindungan tanaman', en: 'Combined fertiliser and crop protection' },
      { id: 'Evaluasi hasil bersama tim lapangan', en: 'Results reviewed with our field team' },
    ],
  },
]

/* -------------------------------------------------------------------------- */
/* Testimoni                                                                   */
/* -------------------------------------------------------------------------- */

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Pak Darto',
    role: { id: 'Petani Padi', en: 'Rice Farmer' },
    location: 'Ngawi',
    content: {
      id: 'Sudah tiga musim saya pakai pupuk dari Tani Makmur. Hasilnya jauh lebih baik dibanding sebelumnya, dan pengirimannya cepat. Pagi pesan, siang sudah sampai sawah.',
      en: 'Three seasons using fertilizer from Tani Makmur now. The results are far better than before, and delivery is fast. Order in the morning and it reaches the field by midday.',
    },
    rating: 5,
    initials: 'H',
  },
  {
    id: 2,
    name: 'Koperasi Tani Sejahtera',
    role: { id: 'Ketua Koperasi', en: 'Cooperative Chair' },
    location: 'Madiun',
    content: {
      id: 'Tani Makmur jadi pemasok tetap koperasi kami sejak 2019. Harganya kompetitif, stok selalu tersedia, dan tim salesnya responsif. Cocok untuk kebutuhan skala besar.',
      en: 'Tani Makmur has been our cooperative’s regular supplier since 2019. Competitive prices, stock always available, and a responsive sales team. A good fit for large-scale needs.',
    },
    rating: 5,
    initials: 'KTS',
  },
  {
    id: 3,
    name: 'Pak Sarno',
    role: { id: 'Petani Jagung', en: 'Corn Farmer' },
    location: 'Magetan',
    content: {
      id: 'NPK yang direkomendasikan tim Tani Makmur terbukti menaikkan bobot biji jagung saya. Mereka juga bantu hitung dosis sesuai kondisi lahan, bukan sekadar jualan.',
      en: 'The NPK recommended by the Tani Makmur team clearly increased my corn grain weight. They also helped calculate dosage for my land, not just selling.',
    },
    rating: 5,
    initials: 'S',
  },
  {
    id: 4,
    name: 'CV Agro Mandiri',
    role: { id: 'Sub-Distributor Kecamatan', en: 'District Sub-Distributor' },
    location: 'Ponorogo',
    content: {
      id: 'Sebagai sub-distributor, kami sangat terbantu dengan proses pemesanan yang mudah dan pengiriman tepat waktu. Margin yang ditawarkan juga masuk akal.',
      en: 'As a sub-distributor, the easy ordering process and on-time delivery help us a great deal. The margins offered are reasonable too.',
    },
    rating: 4,
    initials: 'AM',
  },
  {
    id: 5,
    name: 'Pak Wardi',
    role: { id: 'Pemilik Toko Pertanian', en: 'Agri-Store Owner' },
    location: 'Bojonegoro',
    content: {
      id: 'Pelayanannya profesional. Dokumen produk selalu tersedia, jadi saya mudah meyakinkan pelanggan soal kualitas barang yang saya jual.',
      en: 'The service is professional. Product documents are always available, so it is easy to reassure my customers about the quality of what I sell.',
    },
    rating: 5,
    initials: 'W',
  },
]

/* -------------------------------------------------------------------------- */
/* Kontak sales lapangan                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Tujuh sales area aktif, memakai nama panggilan. Supervisor dan akun uji coba TIDAK dimuat.
 * `regions` memakai slug wilayah; Cepu ikut Blora. `photo` masih null.
 */
export const salesContacts: SalesContact[] = [
  {
    id: 2,
    slug: 'yusuf',
    name: 'Budi',
    title: { id: 'Sales Area', en: 'Area Sales' },
    zone: 'Madiun & Magetan',
    regions: ['madiun', 'magetan'],
    coverage: ['Madiun', 'Magetan'],
    description: {
      id: 'Melayani petani dan toko pertanian di sekitar kantor pusat Madiun dan Magetan.',
      en: 'Serves farmers and agri-stores around the Madiun head office and Magetan.',
    },
    photo: null,
    whatsapp: '6281200000003',
    phone: '+62 812-0000-0003',
    email: null,
    initials: 'YU',
    is_active: true,
    sort_order: 2,
  },
  {
    id: 3,
    slug: 'ansor',
    name: 'Andi',
    title: { id: 'Sales Area', en: 'Area Sales' },
    zone: 'Ngawi',
    regions: ['ngawi'],
    coverage: ['Ngawi'],
    description: {
      id: 'Menangani wilayah Ngawi, termasuk kelompok tani dan koperasi di sekitarnya.',
      en: 'Covers the Ngawi area, including nearby farmer groups and cooperatives.',
    },
    photo: null,
    whatsapp: '6281200000004',
    phone: '+62 812-0000-0004',
    email: null,
    initials: 'AN',
    is_active: true,
    sort_order: 3,
  },
  {
    id: 4,
    slug: 'eko',
    name: 'Rudi',
    title: { id: 'Sales Area', en: 'Area Sales' },
    zone: 'Ponorogo',
    regions: ['ponorogo'],
    coverage: ['Ponorogo'],
    description: {
      id: 'Melayani kebutuhan pupuk dan perlindungan tanaman di wilayah Ponorogo.',
      en: 'Handles fertilizer and crop protection needs across the Ponorogo area.',
    },
    photo: null,
    whatsapp: '6281200000005',
    phone: '+62 812-0000-0005',
    email: null,
    initials: 'EK',
    is_active: true,
    sort_order: 4,
  },
  {
    id: 5,
    slug: 'agustin',
    name: 'Rina',
    title: { id: 'Sales Area', en: 'Area Sales' },
    zone: 'Nganjuk',
    regions: ['nganjuk'],
    coverage: ['Nganjuk'],
    description: {
      id: 'Menangani wilayah Nganjuk dan sekitarnya untuk toko pertanian maupun petani langsung.',
      en: 'Covers Nganjuk and its surroundings for both agri-stores and individual farmers.',
    },
    photo: null,
    whatsapp: '6281200000006',
    phone: '+62 812-0000-0006',
    email: null,
    initials: 'AG',
    is_active: true,
    sort_order: 5,
  },
  {
    id: 6,
    slug: 'yogi',
    name: 'Dedi',
    title: { id: 'Sales Area', en: 'Area Sales' },
    zone: 'Jombang & Kediri',
    regions: ['jombang', 'kediri'],
    coverage: ['Jombang', 'Kediri'],
    description: {
      id: 'Melayani Jombang dan Kediri, dua wilayah dengan kebutuhan hortikultura yang tinggi.',
      en: 'Serves Jombang and Kediri, two areas with strong horticultural demand.',
    },
    photo: null,
    whatsapp: '6281200000007',
    phone: '+62 812-0000-0007',
    email: null,
    initials: 'YO',
    is_active: true,
    sort_order: 6,
  },
  {
    id: 7,
    slug: 'doni',
    name: 'Hadi',
    title: { id: 'Sales Area', en: 'Area Sales' },
    zone: 'Blitar, Tulungagung, Trenggalek, Pacitan & Wonogiri',
    regions: ['blitar', 'tulungagung', 'trenggalek', 'pacitan', 'wonogiri'],
    coverage: ['Blitar', 'Tulungagung', 'Trenggalek', 'Pacitan', 'Wonogiri'],
    description: {
      id: 'Memegang wilayah selatan sampai menembus Wonogiri di Jawa Tengah.',
      en: 'Holds the southern territory, reaching across into Wonogiri in Central Java.',
    },
    photo: null,
    whatsapp: '6281200000008',
    phone: '+62 812-0000-0008',
    email: null,
    initials: 'DO',
    is_active: true,
    sort_order: 7,
  },
  {
    id: 8,
    slug: 'zamroni',
    name: 'Tono',
    title: { id: 'Sales Area', en: 'Area Sales' },
    zone: 'Bojonegoro, Tuban & Blora',
    regions: ['bojonegoro', 'tuban', 'blora'],
    coverage: ['Bojonegoro', 'Tuban', 'Blora'],
    description: {
      id: 'Memegang jalur utara dari Bojonegoro dan Tuban sampai menyeberang ke Blora di Jawa Tengah.',
      en: 'Holds the northern route from Bojonegoro and Tuban across into Blora in Central Java.',
    },
    photo: null,
    whatsapp: '6281200000009',
    phone: '+62 812-0000-0009',
    email: null,
    initials: 'ZA',
    is_active: true,
    sort_order: 8,
  },
]

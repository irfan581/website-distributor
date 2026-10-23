/**
 * Uji navigasi header dan tampilan mobile di peramban sungguhan.
 * Jalankan `npm run uji` (server dev harus hidup); alamat bisa diganti lewat argumen.
 * Playwright bukan dependensi proyek; dicari di beberapa lokasi umum termasuk cache `npx`.
 */
import { createRequire } from 'node:module'
import { existsSync, readdirSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { execSync } from 'node:child_process'

const require = createRequire(import.meta.url)

/** Mencari paket playwright tanpa mewajibkannya terpasang di proyek. */
function muatPlaywright() {
  const kandidat = []

  /* 1. Terpasang normal (proyek atau global lewat NODE_PATH). */
  kandidat.push('playwright')

  /* 2. Root global npm, mis. hasil `npm i -g playwright`. */
  try {
    const rootGlobal = execSync('npm root -g', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
    if (rootGlobal) kandidat.push(join(rootGlobal, 'playwright'))
  } catch {
    /* npm tidak tersedia — lanjut ke kandidat berikutnya. */
  }

  /* 3. Cache npx: nama foldernya hash, jadi seluruh isinya ditelusuri. */
  const cacheNpx = join(homedir(), '.npm', '_npx')
  if (existsSync(cacheNpx)) {
    for (const hash of readdirSync(cacheNpx)) {
      kandidat.push(join(cacheNpx, hash, 'node_modules', 'playwright'))
    }
  }

  for (const jalur of kandidat) {
    try {
      return require(jalur)
    } catch {
      /* Coba kandidat berikutnya. */
    }
  }

  console.error(
    '\nPlaywright tidak ditemukan. Pasang sekali saja dengan:\n' +
      '  npx playwright@latest --version\n' +
      'lalu jalankan ulang perintah ini.\n',
  )
  process.exit(1)
}

const { chromium } = muatPlaywright()

const BASE = process.argv[2] ?? 'http://localhost:3000'
const hasil = []
let gagal = 0

function cek(nama, lulus, detail = '') {
  hasil.push(`${lulus ? '  LULUS' : '  GAGAL'}  ${nama}${detail ? ` — ${detail}` : ''}`)
  if (!lulus) gagal++
}

console.log(`\nMenguji ${BASE}`)

/* Memakai Chrome yang sudah terpasang, tanpa mengunduh Chromium. */
const browser = await chromium.launch({ channel: 'chrome' })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto(BASE, { waitUntil: 'networkidle' })

const nav = page.locator('nav[aria-label="Menu"]')
const produk = nav.getByRole('link', { name: 'Produk', exact: false })
const layanan = nav.getByRole('link', { name: 'Layanan' })

/* Panel mega dikenali lewat judulnya. */
const megaPanel = page.getByText('Kategori Produk', { exact: true })

const jeda = () => page.waitForTimeout(450)

/* A. Mega menu terbuka saat Produk ditunjuk dan menutup saat kursor pindah. */
await produk.hover()
await jeda()
cek('hover Produk membuka mega menu', await megaPanel.isVisible())

await layanan.hover()
await jeda()
cek('geser ke Layanan menutup mega menu', !(await megaPanel.isVisible()))

/* B. Menggulir menutup mega menu. */
await page.mouse.move(0, 0)
await page.evaluate(() => window.scrollTo(0, 0))
await jeda()
await produk.hover()
await jeda()
cek('mega menu terbuka lagi', await megaPanel.isVisible())

await page.mouse.wheel(0, 400)
await jeda()
cek('gulir menutup mega menu', !(await megaPanel.isVisible()))

/* C. Warna bilah alamat di Chrome Android. */
const theme = await page.getAttribute('meta[name="theme-color"]', 'content')
cek('theme-color = #fc8004', theme === '#fc8004', `dapat ${theme}`)

/* D. Tampilan ponsel. */
const hp = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true })
await hp.goto(BASE, { waitUntil: 'networkidle' })

const tombolMenu = hp.getByRole('button', { name: 'Buka menu navigasi' })
cek('tombol hamburger tampil', await tombolMenu.isVisible())
cek('nav desktop tersembunyi', !(await hp.locator('nav[aria-label="Menu"]').isVisible()))

await tombolMenu.click()
await hp.waitForTimeout(600)
cek('menu mobile terbuka', await hp.getByRole('link', { name: 'Beranda' }).isVisible())

const meluber = await hp.evaluate(
  () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
)
cek('tidak ada scroll horizontal', !meluber)

/* E. Hero tidak boleh berkedip saat halaman dibuka (keadaan awal disembunyikan CSS). */
const pantau = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await pantau.addInitScript(() => {
  window.__rekam = []
  const mulai = performance.now()
  const tik = () => {
    const el = document.querySelector('[data-hero-text]')
    if (el) window.__rekam.push(Number(getComputedStyle(el).opacity))
    if (performance.now() - mulai < 4000) requestAnimationFrame(tik)
  }
  requestAnimationFrame(tik)
})
await pantau.goto(BASE, { waitUntil: 'networkidle' })
await pantau.waitForTimeout(4200)

const rekam = await pantau.evaluate(() => window.__rekam)
let sempatTerang = false
let berkedip = false
for (const o of rekam) {
  if (o > 0.9) sempatTerang = true
  else if (sempatTerang && o < 0.2) berkedip = true
}
cek('hero tidak berkedip saat dibuka', !berkedip)
cek('hero akhirnya tampil penuh', (rekam.at(-1) ?? 0) > 0.9, `opacity akhir ${rekam.at(-1)}`)

/* Baris judul diperiksa lewat POSISI, bukan opacity (opacity-nya selalu 1). */
const judul = await pantau.evaluate(() =>
  Array.from(document.querySelectorAll('[data-hero-line]')).map((el) => {
    const anak = el.getBoundingClientRect()
    const mask = el.parentElement.getBoundingClientRect()
    /* Seberapa banyak baris masih tertutup mask, dalam pecahan tingginya. */
    const tertutup = Math.max(0, anak.bottom - mask.bottom) / (anak.height || 1)
    return { teks: el.textContent.trim().slice(0, 20), tertutup: Number(tertutup.toFixed(2)) }
  }),
)
const judulTersembunyi = judul.filter((j) => j.tertutup > 0.1)
cek(
  'semua baris judul hero terlihat di dalam mask',
  judul.length > 0 && judulTersembunyi.length === 0,
  judulTersembunyi.length
    ? judulTersembunyi.map((j) => `"${j.teks}" tertutup ${j.tertutup * 100}%`).join(', ')
    : `${judul.length} baris`,
)

/* F. Animasi mati: konten wajib tetap terbaca. */
const diam = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
await diam.goto(BASE, { waitUntil: 'networkidle' })
await diam.waitForTimeout(1800)
const gelap = await diam.evaluate(() =>
  Array.from(
    document.querySelectorAll('[data-reveal],[data-hero-text],[data-hero-card],[data-hero-line]'),
  ).filter((el) => Number(getComputedStyle(el).opacity) < 0.9).length,
)
cek('gerak minimal: semua konten terbaca', gelap === 0, `${gelap} elemen gelap`)

/* G. Tiap halaman di ponsel (390 px) dan layar luar ponsel lipat (280 px): tidak meluber, tanpa galat. */
const HALAMAN = ['/', '/produk', '/tentang-kami', '/layanan', '/jangkauan-distribusi', '/galeri', '/sales', '/hubungi-kami']
for (const lebar of [390, 280]) {
  const p = await browser.newPage({ viewport: { width: lebar, height: 844 }, isMobile: true })
  const galat = []
  p.on('pageerror', (e) => galat.push(String(e).slice(0, 80)))
  for (const jalur of HALAMAN) {
    galat.length = 0
    await p.goto(new URL(jalur, BASE).href, { waitUntil: 'networkidle' })
    const lebih = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    cek(`${lebar}px ${jalur} tidak meluber`, lebih <= 1, lebih > 1 ? `lebih ${lebih}px` : '')
    cek(`${lebar}px ${jalur} tanpa galat skrip`, galat.length === 0, galat[0] ?? '')
  }
  await p.close()
}

console.log(hasil.join('\n'))
console.log(`\n${gagal === 0 ? 'SEMUA LULUS' : `${gagal} GAGAL`}\n`)

await browser.close()
process.exit(gagal === 0 ? 0 : 1)

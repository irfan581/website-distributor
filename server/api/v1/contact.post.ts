import type { ContactPayload } from '#shared/types/content'

/** POST /api/v1/contact. Validasi setara FormRequest Laravel; pesan baru dicatat di log. Padanan: ContactController@store. */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
/** Nomor Indonesia: 08xx, +628xx, atau 628xx, 9–15 digit. */
const PHONE_PATTERN = /^(\+?62|0)8[1-9][0-9]{6,12}$/

export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<ContactPayload>>(event)

  const errors: Record<string, string> = {}
  const name = body?.name?.trim() ?? ''
  const email = body?.email?.trim() ?? ''
  const phone = body?.phone?.replace(/[\s-]/g, '') ?? ''
  const subject = body?.subject?.trim() ?? ''
  const message = body?.message?.trim() ?? ''

  if (name.length < 2) errors.name = 'Nama minimal 2 karakter.'
  if (!EMAIL_PATTERN.test(email)) errors.email = 'Format email tidak valid.'
  if (!PHONE_PATTERN.test(phone)) errors.phone = 'Nomor telepon tidak valid.'
  if (subject.length < 3) errors.subject = 'Subjek minimal 3 karakter.'
  if (message.length < 10) errors.message = 'Pesan minimal 10 karakter.'

  if (Object.keys(errors).length > 0) {
    /* 422 + { errors } mengikuti format validasi bawaan Laravel. */
    throw createError({
      statusCode: 422,
      statusMessage: 'Data yang dikirim belum lengkap',
      data: { errors },
    })
  }

  const reference = `TMK-${Date.now().toString(36).toUpperCase()}`
  console.info(`[kontak] ${reference} — ${name} <${email}> — ${subject}`)

  return {
    data: {
      message: {
        id: 'Terima kasih. Pesan Anda sudah kami terima dan akan dibalas pada jam kerja.',
        en: 'Thank you. We have received your message and will reply during business hours.',
      },
      reference,
    },
  }
})

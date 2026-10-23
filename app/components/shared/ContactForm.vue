<script setup lang="ts">
import type { ContactPayload, ContactResponse } from '#shared/types/content'

/** Formulir kontak. Galat per kolom dibaca dari respons 422 `{ errors }` (format Laravel). */
const api = useApi()
const { L } = useLocalized()
const { t } = useI18n()
const { contactTarget } = useContactAction()

/* `company` opsional pada payload API, tetapi di formulir selalu berupa string
   agar dapat dipakai langsung oleh v-model. */
const form = reactive<Required<ContactPayload>>({
  name: '',
  email: '',
  phone: '',
  company: '',
  subject: '',
  message: '',
})

const errors = ref<Record<string, string>>({})
const submitting = ref(false)
const result = ref<ContactResponse | null>(null)
const generalError = ref('')

async function submit() {
  submitting.value = true
  errors.value = {}
  generalError.value = ''

  try {
    const response = await api<{ data: ContactResponse }>('/v1/contact', {
      method: 'POST',
      body: { ...form },
    })
    result.value = response.data
  } catch (error) {
    const fieldErrors = (error as { data?: { data?: { errors?: Record<string, string> } } })?.data
      ?.data?.errors

    if (fieldErrors) {
      errors.value = fieldErrors
    } else {
      generalError.value = t('contact.errorGeneric')
    }
  } finally {
    submitting.value = false
  }
}

function reset() {
  Object.assign(form, { name: '', email: '', phone: '', company: '', subject: '', message: '' })
  result.value = null
  errors.value = {}
  generalError.value = ''
}
</script>

<template>
  <div class="card-tmk p-7 sm:p-7">
    <!-- Keadaan berhasil -->
    <div v-if="result" class="py-6 text-center">
      <span class="mx-auto grid size-14 place-items-center rounded-2xl bg-leaf-50 text-leaf-600">
        <IconGlyph name="mail" :size="26" />
      </span>
      <h2 class="text-heading mt-5">{{ $t('contact.successTitle') }}</h2>
      <p class="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-500">
        {{ L(result.message) }}
      </p>
      <p class="mt-4 text-xs text-ink-400">
        {{ $t('contact.reference') }}:
        <span class="font-semibold text-ink-700">{{ result.reference }}</span>
      </p>
      <div class="mt-7">
        <UiButton variant="ghost" size="sm" @click="reset">
          {{ $t('contact.sendAnother') }}
        </UiButton>
      </div>
    </div>

    <!-- Formulir -->
    <form v-else novalidate @submit.prevent="submit">
      <h2 class="text-title">{{ $t('contact.formTitle') }}</h2>
      <p class="mt-2.5 text-sm leading-relaxed text-ink-500">
        {{ $t('contact.formDescription') }}
      </p>

      <div class="mt-8 grid gap-5 sm:grid-cols-2">
        <UiField
          v-model="form.name"
          :label="$t('contact.name')"
          :placeholder="$t('contact.namePlaceholder')"
          :error="errors.name"
          autocomplete="name"
          required
        />
        <UiField
          v-model="form.email"
          type="email"
          :label="$t('contact.email')"
          :placeholder="$t('contact.emailPlaceholder')"
          :error="errors.email"
          autocomplete="email"
          required
        />
        <UiField
          v-model="form.phone"
          type="tel"
          :label="$t('contact.phoneLabel')"
          :placeholder="$t('contact.phonePlaceholder')"
          :error="errors.phone"
          autocomplete="tel"
          required
        />
        <UiField
          v-model="form.company"
          :label="$t('contact.company')"
          :placeholder="$t('contact.companyPlaceholder')"
          :error="errors.company"
          autocomplete="organization"
        />

        <div class="sm:col-span-2">
          <UiField
            v-model="form.subject"
            :label="$t('contact.subject')"
            :placeholder="$t('contact.subjectPlaceholder')"
            :error="errors.subject"
            required
          />
        </div>

        <div class="sm:col-span-2">
          <UiField
            v-model="form.message"
            type="textarea"
            :label="$t('contact.message')"
            :placeholder="$t('contact.messagePlaceholder')"
            :error="errors.message"
            required
          />
        </div>
      </div>

      <p
        v-if="generalError"
        class="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        role="alert"
      >
        {{ generalError }}
      </p>

      <div class="mt-7 flex flex-wrap items-center gap-4">
        <UiButton type="submit" size="lg" :disabled="submitting">
          {{ submitting ? $t('contact.submitting') : $t('contact.submit') }}
        </UiButton>

        <NuxtLink
          v-bind="contactTarget()"
          class="text-sm text-ink-500 underline-offset-4 transition-colors duration-300 hover:text-tmk-600 hover:underline"
        >
          {{ $t('contact.orSales') }}
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

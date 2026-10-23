/** Titik masuk tunggal ke REST API; basisnya `NUXT_PUBLIC_API_BASE`. */
export function useApi() {
  const { apiBase } = useRuntimeConfig().public

  return $fetch.create({
    baseURL: apiBase,
    headers: { Accept: 'application/json' },
    /* Laravel mengembalikan 422 dengan { errors } — biarkan pemanggil yang menangani. */
    retry: 1,
    retryStatusCodes: [408, 425, 429, 500, 502, 503, 504],
  })
}

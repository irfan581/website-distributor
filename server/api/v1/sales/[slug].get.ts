/** GET /api/v1/sales/{slug}. Padanan Laravel: SalesController@show. */
export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')
  const sales = slug ? findSalesBySlug(slug) : null

  if (!sales) {
    throw createError({ statusCode: 404, statusMessage: 'Sales tidak ditemukan' })
  }

  return { data: sales }
})

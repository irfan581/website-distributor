/** GET /api/v1/products/{slug}. Padanan Laravel: ProductController@show. */
export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')
  const product = slug ? findProductBySlug(slug) : null

  if (!product) {
    throw createError({ statusCode: 404, statusMessage: 'Produk tidak ditemukan' })
  }

  return { data: product }
})

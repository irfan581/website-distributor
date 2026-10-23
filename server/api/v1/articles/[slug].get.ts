/** GET /api/v1/articles/{slug}. Padanan Laravel: ArticleController@show. */
export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')
  const article = slug ? findArticleBySlug(slug) : null

  if (!article) {
    throw createError({ statusCode: 404, statusMessage: 'Artikel tidak ditemukan' })
  }

  return { data: article }
})

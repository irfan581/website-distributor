/** GET /api/v1/articles. Query: page, per_page. Padanan Laravel: ArticleController@index. */
export default defineEventHandler((event) => {
  const query = getQuery(event)
  const page = Math.max(Number(query.page) || 1, 1)
  const perPage = Math.min(Number(query.per_page) || 9, 24)

  return findArticles(page, perPage)
})

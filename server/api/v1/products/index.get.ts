/** GET /api/v1/products. Query: q, category, brand, sort, featured, page, per_page. Padanan Laravel: ProductController@index. */
export default defineEventHandler((event) => {
  const query = getQuery(event)

  const perPage = Math.min(Number(query.per_page) || 12, 48)
  const page = Math.max(Number(query.page) || 1, 1)

  return findProducts({
    q: typeof query.q === 'string' && query.q.trim() ? query.q : undefined,
    category: typeof query.category === 'string' && query.category !== 'all' ? query.category : undefined,
    brand: typeof query.brand === 'string' && query.brand !== 'all' ? query.brand : undefined,
    sort: typeof query.sort === 'string' ? query.sort : 'catalog',
    featured: query.featured === 'true' || query.featured === '1',
    page,
    perPage,
  })
})

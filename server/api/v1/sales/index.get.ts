/** GET /api/v1/sales. Query: region. Hanya sales aktif. Padanan Laravel: SalesController@index. */
export default defineEventHandler((event) => {
  const query = getQuery(event)
  const region = typeof query.region === 'string' ? query.region : undefined

  return { data: findSales(region) }
})

/** GET /api/v1/brands. Padanan Laravel: BrandController@index. */
export default defineEventHandler(() => {
  return { data: findBrands() }
})

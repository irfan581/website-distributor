/** GET /api/v1/categories. Padanan Laravel: CategoryController@index. */
export default defineEventHandler(() => {
  return { data: findCategories() }
})

/** GET /api/v1/gallery. Query: category. Padanan Laravel: GalleryController@index. */
export default defineEventHandler((event) => {
  const query = getQuery(event)
  const category = typeof query.category === 'string' ? query.category : undefined

  return { data: findGallery(category) }
})

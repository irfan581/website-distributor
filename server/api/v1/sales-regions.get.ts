/** GET /api/v1/sales-regions: wilayah yang punya sales beserta jumlahnya. Padanan Laravel: SalesController@regions. */
export default defineEventHandler(() => {
  return { data: findSalesRegions() }
})

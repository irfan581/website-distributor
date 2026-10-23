import { productRecords } from '../../data/catalog'
import {
  companyProfile,
  coverageAreas,
  salesContacts,
  services,
  testimonials,
} from '../../data/company'

/** GET /api/v1/company: profil, jangkauan, layanan, testimoni, dan kontak sales. Padanan Laravel: CompanyController@index. */

/** Jumlah nyata untuk blok pencapaian dan kartu hero, dihitung dari data, bukan ditulis tangan. */
function hitungStatistik() {
  return {
    products: productRecords.length,
    coverage: coverageAreas.length,
    sales: salesContacts.length,
  }
}

export default defineEventHandler(() => {
  const stats = hitungStatistik()

  const achievements = companyProfile.achievements.map((item) =>
    item.derive ? { ...item, value: stats[item.derive] } : item,
  )

  return {
    data: {
      profile: { ...companyProfile, achievements },
      stats,
      coverage: coverageAreas,
      services,
      testimonials,
      sales_contacts: salesContacts,
    },
  }
})

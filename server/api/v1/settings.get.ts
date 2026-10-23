import { settings } from '../../data/settings'

/** GET /api/v1/settings. Padanan Laravel: SettingController@index. */
export default defineEventHandler(() => {
  return { data: settings }
})

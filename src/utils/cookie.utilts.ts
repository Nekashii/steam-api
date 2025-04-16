import { Cookie } from '../types/cookie.type'

export function getCookieString(cookie: Cookie): string {
  return Object.entries(cookie)
    .map(([key, value]) => `${key}=${value}`)
    .join('; ')
}

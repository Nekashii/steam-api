import { Cookie } from '../types/cookie.type'

export function getCookie(cookieString: string): Cookie {
  const cookie: Cookie = {}
  for (const part of cookieString.split(';')) {
    const [key, value] = part.trim().split('=')
    const values = value?.split(',').map(value => value.trim())
    cookie[key] = value && values.length > 1 ? values : value
  }
  return cookie
}

export function getCookieString(cookie: Cookie): string {
  return Object.entries(cookie)
    .map(([key, value]) => `${key}=${Array.isArray(value) ? value.join(', ') : value}`)
    .join('; ')
}

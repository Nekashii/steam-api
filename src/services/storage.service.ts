import { Cookie } from '../types/cookie.type'

export class StorageService {
  private readonly authCookieStorageKey = 'auth.cookie'

  constructor(private readonly storage: KVNamespace) {}

  async getPlaytimesAtMonthStart(prefix: string, userId: string): Promise<Record<string, number>> {
    const limits = JSON.parse((await this.storage.get(`${prefix}.${userId}.playtimesAtMonthStart`)) ?? '{}')
    return limits
  }

  async getPlaytimeAtMonthStart(prefix: string, userId: string, appId: string): Promise<number | undefined> {
    const limits = await this.getPlaytimesAtMonthStart(prefix, userId)
    const limit = limits[appId]
    return limit
  }

  async getPlaytimeLimits(prefix: string, userId: string): Promise<Record<string, number>> {
    const limits = JSON.parse((await this.storage.get(`${prefix}.${userId}.playtimeLimits`)) ?? '{}')
    return limits
  }

  async getPlaytimeLimit(prefix: string, userId: string, appId: string): Promise<number | undefined> {
    const limits = await this.getPlaytimeLimits(prefix, userId)
    const limit = limits[appId]
    return limit
  }

  async getAuthCooke(): Promise<Cookie> {
    return JSON.parse((await this.storage.get(this.authCookieStorageKey)) ?? '{}')
  }

  async setAuthCooke(cookie: Cookie): Promise<void> {
    await this.storage.put(this.authCookieStorageKey, JSON.stringify(cookie))
  }
}

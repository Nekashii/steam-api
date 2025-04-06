import { StorageService } from '../services/storage.service'

export async function refreshCookie(res: Response, storageService: StorageService): Promise<void> {
  const cookie = res.headers.get('Set-Cookie')
  if (cookie) await storageService.setAuthCooke(cookie)
}

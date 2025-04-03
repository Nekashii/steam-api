import { Context } from 'hono'
import { DataProfileGamelistDto } from '../dtos/data-profile-gameslist.dto'
import { UserGameStatsMapper } from '../mappers/user-game-stats.mapper'
import { StorageService } from '../services/storage.service'
import { UserStatus } from '../types/user-status.type'
import { trim } from '../utils/number.util'

export async function userGameStatsHandler(c: Context<{ Bindings: CloudflareBindings }>) {
  const { prefix, userId, appId } = c.req.param()
  const res = await fetch(`${c.env.STEAM_WEB_URL}/${prefix}/${userId}/games/?tab=all`, { headers: { Cookie: c.env.STEAM_AUTH_COOKIE } })
  let needLogin = false
  let userStatus!: UserStatus
  let avatar!: string
  let avatarFrame!: string | undefined
  let dataProfileGameslist!: DataProfileGamelistDto
  await new HTMLRewriter()
    .on('.login', {
      element: () => {
        needLogin = true
      },
    })
    .on('#gameslist_config', {
      element: e => {
        dataProfileGameslist = JSON.parse(e.getAttribute('data-profile-gameslist')!.replaceAll('&quot;', '"'))
      },
    })
    .on('.playerAvatar.medium', {
      element: e => {
        userStatus = e.getAttribute('class')!.split(' ').at(-1) as UserStatus
      },
    })
    .on('.playerAvatar.medium>img', {
      element: e => {
        avatar = e.getAttribute('src')!
      },
    })
    .on('.playerAvatar.medium>.profile_avatar_frame>img', {
      element: e => {
        avatarFrame = e.getAttribute('src')!
      },
    })
    .transform(res)
    .arrayBuffer()
  if (needLogin) return new Response(undefined, { status: 401 })
  if (!userStatus) return new Response(undefined, { status: 404 })
  const gameData = dataProfileGameslist.rgGames.find(({ appid }) => appid === Number(appId))
  if (!gameData) return new Response(undefined, { status: 404 })
  const userGameStats = UserGameStatsMapper.fromScrapedData(
    dataProfileGameslist.strProfileName,
    avatar,
    avatarFrame,
    userStatus,
    gameData,
    c.env
  )
  const storageService = new StorageService(c.env.STORAGE)
  const playtimeAtMonthStart = await storageService.getPlaytimeAtMonthStart(prefix, userId, appId)
  if (playtimeAtMonthStart) userGameStats.app.playtimeMonth = trim(userGameStats.app.playtimeForever - playtimeAtMonthStart)
  userGameStats.app.playtimeLimit = await storageService.getPlaytimeLimit(prefix, userId, appId)
  return c.json(userGameStats)
}

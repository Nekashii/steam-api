import { DataProfileGamelistDto } from '../dtos/data-profile-gameslist.dto'
import { UserGameStats } from '../models/user-game-stats.model'
import { UserStatus } from '../types/user-status.type'

export abstract class UserGameStatsMapper {
  static fromScrapedData(
    profileName: string,
    avatar: string,
    avatarFrame: string | undefined,
    status: UserStatus,
    { appid, name, capsule_filename, playtime_forever, playtime_2weeks }: DataProfileGamelistDto['rgGames'][number],
    { STEAM_SHARED_CDN_URL }: Cloudflare.Env
  ): UserGameStats {
    return {
      user: {
        profileName,
        avatar,
        avatarFrame: avatarFrame,
        status,
      },
      app: {
        name,
        coverLandscape: `${STEAM_SHARED_CDN_URL}/store_item_assets/steam/apps/${appid}/header.jpg`,
        coverPortrait: `${STEAM_SHARED_CDN_URL}/store_item_assets/steam/apps/${appid}/${capsule_filename}`,
        playtimeForever: playtime_forever,
        playtime2weeks: playtime_2weeks ?? 0,
      },
    }
  }
}

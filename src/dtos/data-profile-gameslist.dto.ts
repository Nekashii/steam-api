export interface DataProfileGamelistDto {
  strProfileName: string
  bViewingOwnProfile: boolean
  strSteamId: string
  gcpdGames: number[]
  nUserReviewCount: number
  nUserFollowedCount: number
  rgContentDescriptorPreferences: {
    content_descriptors_to_exclude: {
      content_descriptorid: number
      timestamp_added: unknown
    }[]
  }
  rgGames: {
    appid: number
    name: string
    playtime_forever: number
    img_icon_url: string
    has_community_visible_stats?: number
    capsule_filename: string
    has_workshop: number
    has_market: number
    has_dlc: number
    content_descriptorids?: number[]
    has_leaderboards?: number
    playtime_2weeks?: number
    sort_as?: string
  }[]
  rgPerfectUnownedGames: unknown[]
  rgRecentlyPlayedGames: {
    appid: number
    name: string
    playtime_forever: number
    playtime_2weeks: number
    playtime_disconnected: number
    has_community_visible_stats: number
  }[]
  achievement_progress: {
    appid: number
    unlocked: number
    total: number
    percentage: string
    all_unlocked: number
    cache_time: number
    vetted?: number
  }[]
}

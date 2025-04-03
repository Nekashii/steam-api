import { UserStatus } from '../types/user-status.type'

export interface UserGameStats {
  user: {
    profileName: string
    avatar: string
    avatarFrame?: string
    status: UserStatus
  }
  app: {
    name: string
    coverLandscape: string
    coverPortrait: string
    playtimeForever: number
    playtime2weeks: number
    playtimeMonth?: number
    playtimeLimit?: number
  }
}

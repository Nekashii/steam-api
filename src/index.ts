import { Hono } from 'hono'
import { userGameStatsHandler } from './handlers/user-game-stats.handler'

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.get('/:prefix/:userId/stats/:appId', userGameStatsHandler)

export default app

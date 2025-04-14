import { Hono } from 'hono'
import { userGameStatsHandler } from './handlers/user-game-stats.handler'

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.use(async ({ req, env: { AUTH_TOKEN }, text }, next) => {
  if (req.header('Authorization') !== AUTH_TOKEN) return text('unauthenticated', 401)
  await next()
})

app.get('/:prefix/:userId/stats/:appId', userGameStatsHandler)

export default app

import { Context } from 'hono'

export async function userGameStatsHandler(c: Context) {
  const { prefix, userId, gameId } = c.req.param()
  return c.json({ prefix, userId, gameId })
}

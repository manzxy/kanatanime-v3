import { Hono } from 'hono'
import app from '../server/index'

export const config = {
  runtime: 'nodejs'
}

const handler = async (req: Request) => {
  return app.fetch(req)
}

export default handler

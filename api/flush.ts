import type { VercelRequest, VercelResponse } from '@vercel/node'

import { _redis } from './_redis.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const auth = req.headers.authorization
  if (auth !== `Bearer ${process.env.ADMIN_FLUSH_TOKEN}`) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  const { resource } = req.query
  if (!resource || typeof resource !== 'string') {
    return res.status(400).json({ error: 'Missing resource' })
  }

  const keys = await _redis.keys(`strapi:${resource}*`)
  if (keys.length) {
    await _redis.del(...keys)
  }

  return res.json({
    flushed: keys.length,
    resource,
  })
}

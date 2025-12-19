import type { VercelRequest, VercelResponse } from '@vercel/node'

import { cache } from './cache.js'

function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const secret = req.query['x-cache-secret']

  if (secret !== process.env.CACHE_FLUSH_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  cache.clear()

  return res.status(200).json({ status: 'cache flushed' })
}

export default handler

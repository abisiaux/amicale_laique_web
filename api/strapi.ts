import type { VercelRequest, VercelResponse } from '@vercel/node'
import axios from 'axios'

import { _redis } from './_redis.js'

const STRAPI_URL = process.env.STRAPI_URL!
const STRAPI_TOKEN = process.env.STRAPI_TOKEN!

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const { path, ...query } = req.query

  if (!path || typeof path !== 'string') {
    return res.status(400).json({ error: 'Missing path param' })
  }

  // 🔑 clé de cache stable
  const cacheKey = `strapi:${path}`

  // 1️⃣ Cache HIT
  const cached = await _redis.get(cacheKey)
  if (cached) {
    res.setHeader('X-Cache', 'HIT')
    return res.status(200).json(cached)
  }

  // 2️⃣ Construire l’URL Strapi
  const qs = new URLSearchParams(
    Object.entries(query).flatMap(([k, v]) =>
      Array.isArray(v) ? v.map((x) => [k, x]) : [[k, v as string]]
    )
  ).toString()

  const targetUrl = `${STRAPI_URL}/api/${path}` + (qs ? `?${qs}` : '')

  // ─────────────────────────────────────────────────────────────
  // 6️⃣ Cache MISS → appel Strapi
  // ─────────────────────────────────────────────────────────────
  try {
    const response = await axios.get(targetUrl, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      timeout: 10000,
    })

    // Stockage cache
    await _redis.set(cacheKey, response.data)

    return res.status(200).setHeader('X-Cache', 'MISS').json(response.data)
  } catch (error) {
    console.error('Strapi error:', error)

    return res.status(503).json({ error: 'Strapi unavailable' })
  }
}

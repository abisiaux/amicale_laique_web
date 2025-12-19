import type { VercelRequest, VercelResponse } from '@vercel/node'
import axios from 'axios'

import { cache } from './cache.js'

const TTL = 1000 * 60 * 10 // 10 minutes

const AUTHORIZED_PATHS = [
  'services',
  'evenements',
  'actualites',
  'proces-verbaux',
  'membres',
]

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Sécurité : GET uniquement
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const { ['...path']: path = [] } = req.query

  const pathArray = Array.isArray(path) ? path : [path]
  const targetPath = pathArray.join('/')
  const queryString = req.url?.split('?')[1]

  // Vérification STRAPI_URL
  if (!process.env.STRAPI_URL) {
    console.error("STRAPI_URL non défini dans les variables d'environnement")
    return res.status(500).json({ error: 'STRAPI_URL non défini' })
  }

  // Vérification du chemin autorisé
  const firstSegment = targetPath.split('/')[0]
  if (!AUTHORIZED_PATHS.includes(firstSegment)) {
    return res.status(403).json({ error: 'Chemin non autorisé' })
  }

  const targetUrl = `${process.env.STRAPI_URL}/api/${targetPath}${
    queryString ? `?${queryString}` : ''
  }`

  const cacheKey = targetUrl
  const now = Date.now()

  // 1️⃣ Cache HIT
  const cached = cache.get(cacheKey)
  if (cached && now - cached.time < TTL) {
    res.setHeader('X-Cache', 'HIT')
    return res.status(200).json(cached.data)
  }

  try {
    const { data } = await axios.get(targetUrl, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
      timeout: 2000,
    })

    cache.set(cacheKey, { data, time: now })

    // Cache CDN Vercel
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=86400')
    res.setHeader('X-Cache', 'MISS')

    return res.status(200).json(data)
  } catch (error) {
    // Log détaillé pour debug
    console.error('Erreur proxy Strapi:', error?.message || error)
    // 3️⃣ Fallback cache si Strapi down
    if (cached) {
      res.setHeader('X-Cache', 'STALE')
      return res.status(200).json(cached.data)
    }

    return res.status(502).json({
      error: 'Strapi indisponible',
      details: error?.message || error,
    })
  }
}

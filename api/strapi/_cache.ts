type CacheEntry = {
  data: any
  time: number
}

export const _cache = new Map<string, CacheEntry>()

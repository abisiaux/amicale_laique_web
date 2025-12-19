type CacheEntry = {
  data: any
  time: number
}

export const cache = new Map<string, CacheEntry>()

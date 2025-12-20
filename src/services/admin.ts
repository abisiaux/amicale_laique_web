import axios from 'axios'

export const flushResource = async (resource: string) => {
  const token = import.meta.env.VITE_ADMIN_FLUSH_TOKEN

  const res = await axios.post(`/api/flush?resource=${resource}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.data
}

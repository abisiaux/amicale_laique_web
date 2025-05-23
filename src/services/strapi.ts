import axios from 'axios'
import toast from 'react-hot-toast'

import { API_TOKEN, API_URL, NB_ACTUALITE_PER_PAGE } from './config'

const strapi = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
})

const handleError = (error: unknown) => {
  console.error('Une erreur est survenue lors de l\'appel à l\'api', error)
  toast.error(
          'Une erreur est survenue, veuillez contacter l\'administrateur du site.'
      )
}

export const getProcesVerbaux = async () => {
  try {
    const response = await strapi.get(
      '/api/proces-verbaux?sort=date:desc&populate=*'
    )
    return response.data
  } catch (error) {
    handleError(error)
    return []
  }
}

export const getMediaById = async (mediaId: number) => {
  try {
    const response = await strapi.get(`/upload/files/${mediaId}`)
    return response.data
  } catch (error) {
    handleError(error)
    return null
  }
}

export const getProchainsEvenements = async () => {
  try {
    const response = await strapi.get(
      '/api/evenements?sort=date_heure_debut:asc&pagination[limit]=4&populate=*'
    )
    return response.data.data
  } catch (error) {
    handleError(error)
    return []
  }
}

export const getMembres = async () => {
  try {
    const response = await strapi.get('/api/membres?sort=id:asc&populate=*')
    return response.data.data
  } catch (error) {
    handleError(error)
    return []
  }
}

export const getActualite = async (documentId: string) => {
  try {
    const response = await strapi.get(
      `/api/actualites/${documentId}?populate=*`
    )
    return response.data.data
  } catch (error) {
    handleError(error)
    return []
  }
}

export const getActualites = async (currentPage: number = 1) => {
  try {
    const response = await strapi.get(
      `/api/actualites?sort=publishedAt:desc&pagination[page]=${currentPage}&pagination[pageSize]=${NB_ACTUALITE_PER_PAGE}&populate=*`
    )
    return response.data
  } catch (error) {
    handleError(error)
    return []
  }
}

export const getServices = async () => {
  try {
    const response = await strapi.get(
      '/api/services?sort=publishedAt:desc&populate=*'
    )
    return response.data
  } catch (error) {
    handleError(error)
    return []
  }
}

export const getService = async (documentId: string) => {
  try {
    const response = await strapi.get(`/api/services/${documentId}?populate=*`)
    return response.data.data
  } catch (error) {
    handleError(error)
    return []
  }
}

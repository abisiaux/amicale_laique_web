import axios from 'axios';

import {API_TOKEN, API_URL, NB_ACTUALITE_PER_PAGE} from './config';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: `Bearer ${API_TOKEN}`,
    },
});


export const getProcesVerbaux = async () => {
    try {
        const response = await api.get('/api/proces-verbaux?sort=date:desc&populate=*');
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des procès-verbaux', error);
        return [];
    }
};

export const getMediaById = async (mediaId: number) => {
    try {
        const response = await api.get(`/upload/files/${mediaId}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération du média :', error);
        return null;
    }
};

export const getProchainsEvenements = async () => {
    try {
        const response = await api.get('/api/evenements?sort=date_heure_debut:asc&pagination[limit]=4&populate=*');
        return response.data.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des prochains événements :', error);
        return [];
    }
};

export const getMembres = async () => {
    try {
        const response = await api.get('/api/membres?sort=id:asc&populate=*');
        return response.data.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des membres :', error);
        return [];
    }
};

export const getActualite = async (documentId: string) => {
    try {
        const response = await api.get(`/api/actualites/${documentId}?populate=*`);
        return response.data.data;
    } catch (error) {
        console.error(`Erreur lors de la récupération de l'actualité ${documentId} :`, error);
        return [];
    }
};

export const getActualites = async (currentPage: number = 1) => {
    try {
        const response = await api.get(`/api/actualites?sort=publishedAt:desc&pagination[page]=${currentPage}&pagination[pageSize]=${NB_ACTUALITE_PER_PAGE}&populate=*`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des actualités :', error);
        return [];
    }
};

export const getServices = async () => {
    try {
        const response = await api.get('/api/services?sort=publishedAt:desc&populate=*');
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des services', error);
        return [];
    }
};

export const getService = async (documentId: string) => {
    try {
        const response = await api.get(`/api/services/${documentId}?populate=*`);
        return response.data.data;
    } catch (error) {
        console.error(`Erreur lors de la récupération du service ${documentId} :`, error);
        return [];
    }
};

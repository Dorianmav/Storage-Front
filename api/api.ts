import axios, { AxiosError } from 'axios';
import { Manga } from '../models/Manga';
import { Platform } from 'react-native';

// In development, use the local IP for Android/iOS and localhost for web
const DEV_API_URL = Platform.select({
  web: 'http://localhost:3000/api/',
  default: 'http://10.0.2.2:3000/api/', // Special IP for Android emulator
});

const API_URL = process.env.EXPO_PUBLIC_API_URL || DEV_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
      return Promise.reject(new Error('La requête a pris trop de temps à répondre'));
    }
    if (!error.response) {
      console.error('Network error:', error.message);
      return Promise.reject(new Error('Impossible de se connecter au serveur. Vérifiez votre connexion.'));
    }
    return Promise.reject(error);
  }
);

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

interface ApiErrorResponse {
  message: string;
}

export const mangaApi = {
  // Récupérer tous les mangas
  getAllMangas: async (): Promise<ApiResponse<Manga[]>> => {
    try {
    //   console.log('API URL:', API_URL); // Log the API URL
      const { data } = await api.get<Manga[]>('mangas');
      return { data };
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      console.error('API Error:', {
        status: axiosError.response?.status,
        statusText: axiosError.response?.statusText,
        data: axiosError.response?.data,
        message: axiosError.message
      });
      return { 
        error: axiosError.response?.data?.message || 'Erreur lors de la récupération des mangas'
      };
    }
  },

  // Créer un nouveau manga via scraping
  createManga: async (name: string): Promise<ApiResponse<Manga>> => {
    try {
      const { data } = await api.post<Manga>('mangas', { name });
      return { data };
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      return { 
        error: axiosError.response?.data?.message || 'Erreur lors de la création du manga'
      };
    }
  },

  // Récupérer un manga par son ID
  getMangaById: async (id: number): Promise<ApiResponse<Manga>> => {
    try {
      const { data } = await api.get<Manga>(`mangas/${id}?include=volumes,auteur,editeurVF,editeurVO,genres,themes`);
      return { data };
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      return { 
        error: axiosError.response?.data?.message || 'Manga non trouvé'
      };
    }
  },

  // Supprimer un manga
  deleteManga: async (id: number): Promise<ApiResponse<void>> => {
    try {
      await api.delete(`mangas/${id}`);
      return {};
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      return { 
        error: axiosError.response?.data?.message || 'Erreur lors de la suppression du manga'
      };
    }
  },

  // Rechercher des mangas par titre
  searchMangasByTitle: async (query: string): Promise<ApiResponse<Manga[]>> => {
    try {
      const { data } = await api.get<Manga[]>(`mangas/search/${encodeURIComponent(query)}`);
      return { data };
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      return { 
        error: axiosError.response?.data?.message || 'Erreur lors de la recherche des mangas'
      };
    }
  },

  // Mettre à jour le statut d'un volume
  updateVolumeStatus: async (
    mangaId: number,
    volumeId: number,
    achete: boolean
  ): Promise<ApiResponse<Manga>> => {
    try {
      const { data } = await api.patch<Manga>(
        `mangas/${mangaId}/volumes/${volumeId}/status`,
        { achete }
      );
      return { data };
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      return { 
        error: axiosError.response?.data?.message || 'Erreur lors de la mise à jour du statut du volume'
      };
    }
  },

  // Mettre à jour le statut de plusieurs volumes
  updateVolumesStatus: async (
    mangaId: number,
    volumeIds: number[],
    achete: boolean
  ): Promise<ApiResponse<Manga>> => {
    try {
      const { data } = await api.patch<Manga>(
        `mangas/${mangaId}/volumes/status`,
        { volumeIds, achete }
      );
      return { data };
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      return { 
        error: axiosError.response?.data?.message || 'Erreur lors de la mise à jour du statut des volumes'
      };
    }
  },
};
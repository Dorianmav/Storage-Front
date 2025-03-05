import axios, { AxiosError } from 'axios';
import { Manga, MangaPreview } from '../features/manga/types/Manga';
import { Platform } from 'react-native';
import { config } from '../config/config';
import { mockMangaApi } from './mockApi';
import { FiltersResponse } from '../features/manga/types/Filter';

// In development, use the local IP for Android/iOS and localhost for web
const DEV_API_URL = Platform.select({
  web: 'http://localhost:3000/api/',
  default: 'http://10.0.2.2:3000/api/', // Special IP for Android emulator
});

const API_URL = process.env.EXPO_PUBLIC_API_URL || DEV_API_URL;

// Log the API URL for debugging
console.log('API URL:', API_URL);
console.log('Platform:', Platform.OS);
console.log('Is Mock API:', config.useMocks);

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('🚀 Request:', {
      method: config.method?.toUpperCase(),
      url: config.baseURL + config.url,
      data: config.data,
      headers: config.headers,
    });
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('✅ Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });
    return response;
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('⏱️ Request timeout');
      return Promise.reject(new Error('La requête a pris trop de temps à répondre'));
    }
    if (!error.response) {
      console.error('🌐 Network error:', error.message);
      return Promise.reject(new Error('Impossible de se connecter au serveur. Vérifiez votre connexion.'));
    }
    console.error('❌ Response Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

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

// Intercepteur pour les erreurs
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

// Types pour les réponses de l'API
export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

interface ApiErrorResponse {
  message: string;
}

// Types pour l'API
export interface MangaApi {
  getAllMangas: () => Promise<ApiResponse<Manga[]>>;
  getMangaById: (id: number) => Promise<ApiResponse<Manga>>;
  createManga: (titre: string) => Promise<ApiResponse<Manga>>;
  deleteManga: (id: number) => Promise<ApiResponse<void>>;
  getFilters: () => Promise<ApiResponse<FiltersResponse>>;
  getThreeLastMangas: () => Promise<ApiResponse<MangaPreview[]>>;
  searchMangasByTitle: (query: string) => Promise<ApiResponse<Manga[]>>;
  updateVolumeStatus: (mangaId: number, volumeId: number, achete: boolean) => Promise<ApiResponse<Manga>>;
  updateVolumesStatus: (mangaId: number, volumeIds: number[], achete: boolean) => Promise<ApiResponse<Manga>>;
}

// Export l'API appropriée en fonction de la configuration
export const mangaApi: MangaApi = config.useMocks ? mockMangaApi : {
  // Récupérer les filtres
  getFilters: async (): Promise<ApiResponse<FiltersResponse>> => {
    try {
      const { data } = await api.get<FiltersResponse>('/mangas/filters');
      return { data };
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      return {
        error: axiosError.response?.data?.message || 'Erreur lors de la récupération des filtres'
      };
    }
  },

  // Récupérer tous les mangas
  getAllMangas: async (): Promise<ApiResponse<Manga[]>> => {
    try {
      const { data } = await api.get<Manga[]>('/mangas');
      return { data };
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      return {
        error: axiosError.response?.data?.message || 'Erreur lors de la récupération des mangas'
      };
    }
  },

  // Récupérer un manga par ID
  getMangaById: async (id: number): Promise<ApiResponse<Manga>> => {
    try {
      const { data } = await api.get<Manga>(`/mangas/${id}?include=volumes,auteur,editeurVF,editeurVO,genres,themes`);
      return { data };
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      return {
        error: axiosError.response?.data?.message || 'Manga non trouvé'
      };
    }
  },

  // Récupérer les trois derniers mangas
  getThreeLastMangas: async (): Promise<ApiResponse<MangaPreview[]>> => {
    try {
      const { data } = await api.get<MangaPreview[]>('/mangas/three-last');
      return { data };
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      return {
        error: axiosError.response?.data?.message || 'Erreur lors de la récupération des derniers mangas'
      };
    }
  },

  // Créer un nouveau manga
  createManga: async (name: string): Promise<ApiResponse<Manga>> => {
    try {
      const { data } = await api.post<Manga>('/mangas', { name });
      return { data };
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      return {
        error: axiosError.response?.data?.message || 'Erreur lors de la création du manga'
      };
    }
  },

  // Supprimer un manga
  deleteManga: async (id: number): Promise<ApiResponse<void>> => {
    try {
      await api.delete(`/mangas/${id}`);
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
      const { data } = await api.get<Manga[]>(`/mangas/search/${encodeURIComponent(query)}`);
      return { data };
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      return {
        error: axiosError.response?.data?.message || 'Erreur lors de la recherche des mangas'
      };
    }
  },

  // Mettre à jour le statut d'un volume
  updateVolumeStatus: async (mangaId: number, volumeId: number, achete: boolean): Promise<ApiResponse<Manga>> => {
    try {
      const { data } = await api.patch<Manga>(`/mangas/${mangaId}/volumes/${volumeId}/status`,{ achete });
      return { data };
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      return {
        error: axiosError.response?.data?.message || 'Erreur lors de la mise à jour du volume'
      };
    }
  },

  // Mettre à jour le statut de plusieurs volumes
  updateVolumesStatus: async (mangaId: number, volumeIds: number[], achete: boolean): Promise<ApiResponse<Manga>> => {
    try {
      const { data } = await api.patch<Manga>(`/mangas/${mangaId}/volumes`, { volumeIds, achete });
      return { data };
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      return {
        error: axiosError.response?.data?.message || 'Erreur lors de la mise à jour des volumes'
      };
    }
  },
};
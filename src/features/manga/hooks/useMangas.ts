/**
 * Hooks de gestion des mangas
 * @module useMangas
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mangaApi } from '../../../services/api';
import { Manga } from '../types/Manga';

// Clés pour React Query
export const QUERY_KEYS = {
  mangas: ['mangas'] as const,
  manga: (id: number) => ['manga', id] as const,
  search: (query: string) => ['mangas', 'search', query] as const,
  filters: ['filters'] as const,
  treeLastMangas: ['treeLastMangas'] as const,
};

/**
 * Hook pour récupérer la liste des mangas
 * @returns {Object} Objet contenant les données, le statut de chargement et les erreurs
 */
export const useMangas = () => {
  return useQuery({
    queryKey: QUERY_KEYS.mangas,
    queryFn: async () => {
      const response = await mangaApi.getAllMangas();
      if (response.error) throw new Error(response.error);
      return response.data;
    },
  });
};

/**
 * Hook pour récupérer les filtres disponibles
 * @returns {Object} Objet contenant les filtres, le statut de chargement et les erreurs
 */
export const useFilters = () => {
  return useQuery({
    queryKey: QUERY_KEYS.filters,
    queryFn: async () => {
      const response = await mangaApi.getFilters();
      if (response.error) throw new Error(response.error);
      if (!response.data) throw new Error('Aucune donnée reçue');
      return response.data;
    },
  });
};

/**
 * Hook pour récupérer les trois derniers mangas ajoutés
 * @returns {Object} Objet contenant les mangas, le statut de chargement et les erreurs
 */
export const useTreeLastMangas = () => {
  return useQuery<Manga[]>({
    queryKey: QUERY_KEYS.treeLastMangas,
    queryFn: async () => {
      const response = await mangaApi.getTreeLastMangas();
      if (response.error) throw new Error(response.error);
      return response.data || [];
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 1000, // Les données sont considérées comme périmées après 1 seconde
  });
};

/**
 * Hook pour récupérer un manga spécifique par son ID
 * @param {number} id - ID du manga à récupérer
 * @returns {Object} Objet contenant le manga, le statut de chargement et les erreurs
 */
export const useManga = (id: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.manga(id),
    queryFn: async () => {
      const response = await mangaApi.getMangaById(id);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    enabled: !!id,
  });
};

/**
 * Hook pour créer un nouveau manga
 * @returns {Object} Objet contenant la fonction de création et les erreurs
 */
export const useAddManga = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => {
      const response = await mangaApi.createManga(name);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    onSuccess: () => {
      // Invalider le cache des mangas pour forcer un rechargement
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.mangas });
    },
  });
};

/**
 * Hook pour supprimer un manga
 * @returns {Object} Objet contenant la fonction de suppression et les erreurs
 */
export const useDeleteManga = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await mangaApi.deleteManga(id);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.mangas });
    },
  });
};

/**
 * Hook pour rechercher des mangas
 * @param {string} query - Chaîne de recherche
 * @returns {Object} Objet contenant les résultats, le statut de chargement et les erreurs
 */
// export const useSearchMangas = (query: string) => {
//   return useQuery({
//     queryKey: QUERY_KEYS.search(query),
//     queryFn: async () => {
//       const response = await mangaApi.searchMangasByTitle(query);
//       if (response.error) throw new Error(response.error);
//       return response.data;
//     },
//     enabled: !!query,
//   });
// };

/**
 * Hook pour mettre à jour le statut d'un volume
 * @returns {Object} Objet contenant la fonction de mise à jour et les erreurs
 */
export const useUpdateVolumeStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      mangaId,
      volumeId,
      achete,
    }: {
      mangaId: number;
      volumeId: number;
      achete: boolean;
    }) => {
      const response = await mangaApi.updateVolumeStatus(mangaId, volumeId, achete);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    onSuccess: (_, { mangaId }) => {
      // Invalider le cache du manga spécifique
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.manga(mangaId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.mangas });
    },
  });
};

/**
 * Hook pour mettre à jour le statut de plusieurs volumes
 * @returns {Object} Objet contenant la fonction de mise à jour et les erreurs
 */
export const useUpdateVolumesStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      mangaId,
      volumeIds,
      achete,
    }: {
      mangaId: number;
      volumeIds: number[];
      achete: boolean;
    }) => {
      const response = await mangaApi.updateVolumesStatus(mangaId, volumeIds, achete);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    onSuccess: (_, { mangaId }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.manga(mangaId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.mangas });
    },
  });
};

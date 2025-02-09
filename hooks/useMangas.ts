import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mangaApi } from '../api/api';

// Clés pour React Query
const QUERY_KEYS = {
  mangas: ['mangas'],
  manga: (id: number) => ['manga', id],
  search: (query: string) => ['mangas', 'search', query],
};

// Hook pour récupérer tous les mangas
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

// Hook pour récupérer un manga par ID
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

// Hook pour créer un manga
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

// Hook pour supprimer un manga
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

// Hook pour rechercher des mangas
export const useSearchMangas = (query: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.search(query),
    queryFn: async () => {
      const response = await mangaApi.searchMangasByTitle(query);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    enabled: !!query,
  });
};

// Hook pour mettre à jour le statut d'un volume
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

// Hook pour mettre à jour le statut de plusieurs volumes
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
import { ApiResponse } from './api';
import { Manga } from '../models/Manga';
import { mockMangas } from '../mocks/mangaData';
import { mockAuteurs } from '../mocks/mangaData';

// Fonction utilitaire pour simuler un délai réseau
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockMangaApi = {
  async getAllMangas(): Promise<ApiResponse<Manga[]>> {
    await delay(500); // Simule un délai réseau
    return { data: mockMangas };
  },

  async getMangaById(id: number): Promise<ApiResponse<Manga>> {
    await delay(300);
    const manga = mockMangas.find(m => m.id === id);
    if (!manga) {
      return { error: 'Manga non trouvé' };
    }
    return { data: manga };
  },

  async createManga(titre: string): Promise<ApiResponse<Manga>> {
    await delay(800);
    const newManga: Manga = {
      id: mockMangas.length + 1,
      titre: titre,
      titreOriginal: titre,
      image: 'https://example.com/placeholder.jpg',
      origine: 'Japon',
      anneeVF: new Date().getFullYear().toString(),
      type: 'Shonen',
      nbVolumesVO: '1',
      nbVolumesVF: '1',
      prix: '6.90',
      synopsis: 'Synopsis à venir...',
      lastPublishedVolumeId: null,
      comingSoonVolumeId: null,
      finished: false,
      Auteur: mockAuteurs[0],
      editeurVO: { id: 1, nom: 'À définir' },
      editeurVF: { id: 1, nom: 'À définir' },
      Genres: [{ id: 1, nom: 'Shonen' }],
      Themes: [{ id: 1, nom: 'Action' }],
      Volumes: Array.from({ length: 1 }, (_, i) => ({
        id: i + 1,
        numero: String(i + 1),
        titre: `Volume ${i + 1}`,
        dateParution: new Date().toISOString().split('T')[0],
        image: `https://example.com/placeholder-${i + 1}.jpg`,
        url: `https://example.com/manga/volume-${i + 1}`,
        achete: false
      }))
    };
    mockMangas.push(newManga);
    return { data: newManga };
  },

  async deleteManga(id: number): Promise<ApiResponse<void>> {
    await delay(400);
    const index = mockMangas.findIndex(m => m.id === id);
    if (index === -1) {
      return { error: 'Manga non trouvé' };
    }
    mockMangas.splice(index, 1);
    return { data: undefined };
  },

  async searchMangasByTitre(query: string): Promise<ApiResponse<Manga[]>> {
    await delay(300);
    const results = mockMangas.filter(manga => 
      manga.titre.toLowerCase().includes(query.toLowerCase())
    );
    return { data: results };
  },

  async updateVolumeStatus(
    mangaId: number,
    volumeId: number,
    achete: boolean
  ): Promise<ApiResponse<Manga>> {
    await delay(300);
    const manga = mockMangas.find(m => m.id === mangaId);
    if (!manga) {
      return { error: 'Manga non trouvé' };
    }
    
    const volume = manga.Volumes.find(v => v.id === volumeId);
    if (!volume) {
      return { error: 'Volume non trouvé' };
    }
    
    volume.achete = achete;
    return { data: manga };
  },

  async updateVolumesStatus(
    mangaId: number,
    volumeIds: number[],
    achete: boolean
  ): Promise<ApiResponse<Manga>> {
    await delay(500);
    const manga = mockMangas.find(m => m.id === mangaId);
    if (!manga) {
      return { error: 'Manga non trouvé' };
    }
    
    volumeIds.forEach(volumeId => {
      const volume = manga.Volumes.find(v => v.id === volumeId);
      if (volume) {
        volume.achete = achete;
      }
    });
    
    return { data: manga };
  },
};

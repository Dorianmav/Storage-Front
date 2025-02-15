import { ApiResponse, MangaApi } from './api';
import { Manga } from '../models/Manga';
import { mockMangas, mockAuteurs } from '../mocks/mangaData';
import { FiltersResponse } from '../models/Filter';

// Fonction utilitaire pour simuler un délai réseau
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockMangaApi: MangaApi = {
  async getAllMangas(): Promise<ApiResponse<Manga[]>> {
    await delay(500); // Simule un délai réseau
    return { data: mockMangas };
  },

  async getMangaById(id: number): Promise<ApiResponse<Manga>> {
    await delay(500);
    const manga = mockMangas.find(m => m.id === id);
    if (!manga) {
      return { error: 'Manga non trouvé' };
    }
    return { data: manga };
  },

  async createManga(name: string): Promise<ApiResponse<Manga>> {
    await delay(500);
    const newManga: Manga = {
      id: mockMangas.length + 1,
      titre: name,
      titreOriginal: name,
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
      Volumes: []
    };
    mockMangas.push(newManga);
    return { data: newManga };
  },

  async deleteManga(id: number): Promise<ApiResponse<void>> {
    await delay(500);
    const index = mockMangas.findIndex(m => m.id === id);
    if (index === -1) {
      return { error: 'Manga non trouvé' };
    }
    mockMangas.splice(index, 1);
    return {};
  },

  async getFilters(): Promise<ApiResponse<FiltersResponse>> {
    await delay(500); // Simuler un délai réseau
    
    const mockFilters: FiltersResponse = {
      Genre: [
        { id: 1, nom: 'Action', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 2, nom: 'Comédie', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 3, nom: 'Horreur', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      ],
      Theme: [
        { id: 4, nom: 'Adolescence', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 5, nom: 'Aliens', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 6, nom: 'Amour', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      ],
      Auteur: [
        { id: 7, nom: 'Tatsu Yukinobu', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 8, nom: 'Akira Toriyama', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 9, nom: 'Eiichiro Oda', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      ],
      Editeur: [
        { id: 10, nom: 'Shueisha', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 11, nom: 'Crunchyroll', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 12, nom: 'Kodansha', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      ],
      Format: [
        { id: 13, nom: 'Manga', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 14, nom: 'Manhwa', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 15, nom: 'Manhua', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      ],
      Langue: [
        { id: 16, nom: 'Japonais', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 17, nom: 'Coréen', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 18, nom: 'Chinois', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      ],
    };

    console.log('Mock filters:', mockFilters);
    return { data: mockFilters };
  },

  async getTreeLastMangas(): Promise<ApiResponse<Manga[]>> {
    await delay(500);
    // Retourne les 3 derniers mangas ajoutés
    const lastMangas = [...mockMangas]
      .slice(0, 3);
    return { data: lastMangas };
  },

  async searchMangasByTitle(query: string): Promise<ApiResponse<Manga[]>> {
    await delay(500);
    const searchResults = mockMangas.filter(manga => 
      manga.titre.toLowerCase().includes(query.toLowerCase())
    );
    return { data: searchResults };
  },

  async updateVolumeStatus(mangaId: number, volumeId: number, achete: boolean): Promise<ApiResponse<Manga>> {
    await delay(500);
    const manga = mockMangas.find(m => m.id === mangaId);
    if (!manga) {
      return { error: 'Manga non trouvé' };
    }
    const volume = manga.Volumes?.find(v => v.id === volumeId);
    if (!volume) {
      return { error: 'Volume non trouvé' };
    }
    volume.achete = achete;
    return { data: manga };
  },

  async updateVolumesStatus(mangaId: number, volumeIds: number[], achete: boolean): Promise<ApiResponse<Manga>> {
    await delay(500);
    const manga = mockMangas.find(m => m.id === mangaId);
    if (!manga) {
      return { error: 'Manga non trouvé' };
    }
    volumeIds.forEach(volumeId => {
      const volume = manga.Volumes?.find(v => v.id === volumeId);
      if (volume) {
        volume.achete = achete;
      }
    });
    return { data: manga };
  },
};

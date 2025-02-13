import { Manga } from '../models/Manga';
import { Auteur } from '../models/Auteur';
import { Editeur } from '../models/Editeur';
import { Genre } from '../models/Genre';
import { Theme } from '../models/Theme';
import { Volume } from '../models/Volume';

export const mockEditeurs: Editeur[] = [
  { id: 1, nom: 'Glénat' },
  { id: 2, nom: 'Kana' },
  { id: 3, nom: 'Shueisha' },
  { id: 4, nom: 'Shogakukan' }
];

export const mockGenres: Genre[] = [
  { id: 1, nom: 'Shonen' },
  { id: 2, nom: 'Seinen' },
  { id: 3, nom: 'Shojo' }
];

export const mockThemes: Theme[] = [
  { id: 1, nom: 'Action' },
  { id: 2, nom: 'Aventure' },
  { id: 3, nom: 'Fantastique' },
  { id: 4, nom: 'Mystère' }
];

export const mockAuteurs: Auteur[] = [
  { id: 1, nom: 'Eiichiro Oda' },
  { id: 2, nom: 'Masashi Kishimoto' },
  { id: 3, nom: 'Tsugumi Ohba' }
];

export const mockMangas: Manga[] = [
  {
    id: 1,
    titre: 'One Piece',
    titreOriginal: 'ワンピース',
    image: 'https://example.com/one-piece.jpg',
    origine: 'Japon',
    anneeVF: '2000',
    type: 'Shonen',
    nbVolumesVO: '105',
    nbVolumesVF: '105',
    prix: '6.90',
    synopsis: 'L\'histoire suit les aventures de Monkey D. Luffy, un jeune pirate élastique...',
    lastPublishedVolumeId: 105,
    comingSoonVolumeId: 106,
    finished: false,
    Auteur: mockAuteurs[0],
    editeurVO: mockEditeurs[2],
    editeurVF: mockEditeurs[0],
    Genres: [mockGenres[0]],
    Themes: [mockThemes[1], mockThemes[2]],
    Volumes: Array.from({ length: 105 }, (_, i) => ({
      id: i + 1,
      numero: String(i + 1),
      titre: `Volume ${i + 1}`,
      dateParution: `2000-${String(Math.floor(i / 12) + 1).padStart(2, '0')}-${String((i % 12) + 1).padStart(2, '0')}`,
      image: `https://example.com/one-piece-${i + 1}.jpg`,
      url: `https://example.com/one-piece/volume-${i + 1}`,
      achete: i < 50
    }))
  },
  {
    id: 2,
    titre: 'Naruto',
    titreOriginal: 'ナルト',
    image: 'https://example.com/naruto.jpg',
    origine: 'Japon',
    anneeVF: '2002',
    type: 'Shonen',
    nbVolumesVO: '72',
    nbVolumesVF: '72',
    prix: '6.90',
    synopsis: 'L\'histoire suit Naruto Uzumaki, un jeune ninja qui recherche la reconnaissance...',
    lastPublishedVolumeId: 72,
    comingSoonVolumeId: null,
    finished: true,
    Auteur: mockAuteurs[1],
    editeurVO: mockEditeurs[2],
    editeurVF: mockEditeurs[1],
    Genres: [mockGenres[0]],
    Themes: [mockThemes[0], mockThemes[1]],
    Volumes: Array.from({ length: 72 }, (_, i) => ({
      id: i + 1,
      numero: String(i + 1),
      titre: `Volume ${i + 1}`,
      dateParution: `2002-${String(Math.floor(i / 12) + 1).padStart(2, '0')}-${String((i % 12) + 1).padStart(2, '0')}`,
      image: `https://example.com/naruto-${i + 1}.jpg`,
      url: `https://example.com/naruto/volume-${i + 1}`,
      achete: i < 30
    }))
  },
  {
    id: 3,
    titre: 'Death Note',
    titreOriginal: 'デスノート',
    image: 'https://example.com/death-note.jpg',
    origine: 'Japon',
    anneeVF: '2007',
    type: 'Shonen',
    nbVolumesVO: '12',
    nbVolumesVF: '12',
    prix: '7.60',
    synopsis: 'Light Yagami, un étudiant brillant, découvre un carnet aux pouvoirs surnaturels...',
    lastPublishedVolumeId: 12,
    comingSoonVolumeId: null,
    finished: true,
    Auteur: mockAuteurs[2],
    editeurVO: mockEditeurs[3],
    editeurVF: mockEditeurs[1],
    Genres: [mockGenres[1]],
    Themes: [mockThemes[3], mockThemes[0]],
    Volumes: Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      numero: String(i + 1),
      titre: `Volume ${i + 1}`,
      dateParution: `2007-${String(Math.floor(i / 12) + 1).padStart(2, '0')}-${String((i % 12) + 1).padStart(2, '0')}`,
      image: `https://example.com/death-note-${i + 1}.jpg`,
      url: `https://example.com/death-note/volume-${i + 1}`,
      achete: true
    }))
  }
];

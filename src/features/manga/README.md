# Feature Manga

## Description
Module de gestion de collection de mangas permettant aux utilisateurs de suivre leur collection, gérer leurs volumes et organiser leur bibliothèque.

## Fonctionnalités
- 📚 Gestion de la collection de mangas
- 🔍 Recherche et filtrage
- 📱 Navigation adaptative
- 📖 Suivi des volumes (achetés/non achetés)
- 🏷️ Système de filtres (genres, thèmes, auteurs, éditeurs)

## Structure
```
manga/
├── components/           # Composants spécifiques aux mangas
│   ├── MangaList/       # Liste des mangas avec filtrage
│   ├── MangaViewPage/   # Page de détail d'un manga
│   ├── CardDetails/     # Affichage détaillé d'un manga
│   ├── VolumeCard/      # Carte pour un volume
│   └── CreateMangaModal # Modal de création de manga
├── hooks/               # Hooks personnalisés
│   └── useMangas.ts     # Hook de gestion des données manga
└── types/              # Types et interfaces
    ├── Manga.ts        # Interface Manga
    └── Filter.ts       # Types pour le système de filtres
```

## Hooks
### useMangas
Gère les opérations CRUD pour les mangas :
- `useMangas()` : Récupère la liste des mangas
- `useManga(id)` : Récupère un manga spécifique
- `useCreateManga()` : Crée un nouveau manga
- `useUpdateVolumeStatus()` : Met à jour le statut d'un volume

## Types
### Manga
```typescript
interface Manga {
  id: number;
  titre: string;
  description?: string;
  image?: string;
  Volumes?: Volume[];
  Genres?: Genre[];
  Themes?: Theme[];
  Auteur?: Auteur;
  Editeur?: Editeur;
}
```

### Filter
```typescript
interface FilterItem {
  id: number;
  name: string;
  type: 'Genre' | 'Theme' | 'Auteur' | 'Editeur';
}
```

## Composants
Chaque composant est documenté avec JSDoc dans son fichier source.

## Usage
```tsx
// Liste des mangas avec filtres
<MangaList />

// Page de détail d'un manga
<MangaViewPage route={{ params: { itemId: 1 } }} />
```

## Dépendances
- @react-navigation/native
- @tanstack/react-query
- @expo/vector-icons
- react-native-safe-area-context

// Types de filtres disponibles
export type FilterType = 'Genre' | 'Theme' | 'Auteur' | 'Editeur' | 'Format' | 'Langue';

// Catégorie de filtre individuelle
export interface FilterCategory {
  id: number;
  nom: string;
  createdAt: string;
  updatedAt: string;
}

// Réponse de l'API contenant toutes les catégories de filtres
export interface FiltersResponse {
  Genre: FilterCategory[];
  Theme: FilterCategory[];
  Auteur: FilterCategory[];
  Editeur: FilterCategory[];
  Format: FilterCategory[];
  Langue: FilterCategory[];
}

// Interface pour un filtre formaté pour l'UI
export interface FilterItem {
  id: number;
  type: FilterType;
  name: string;
  selected?: boolean;
}

// Fonction utilitaire pour convertir la réponse de l'API en items pour l'UI
export const convertFiltersResponseToItems = (filters: FiltersResponse): FilterItem[] => {
  const items: FilterItem[] = [];

  // Parcourir chaque type de filtre
  (Object.keys(filters) as FilterType[]).forEach(filterType => {
    // Convertir chaque catégorie en FilterItem
    filters[filterType].forEach(category => {
      items.push({
        id: category.id,
        type: filterType,
        name: category.nom,
        selected: false
      });
    });
  });

  return items;
};

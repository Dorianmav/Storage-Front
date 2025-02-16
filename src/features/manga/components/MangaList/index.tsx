/**
 * Composant MangaList - Affiche la liste des mangas avec des fonctionnalités de filtrage
 * 
 * @component
 * @example
 * ```tsx
 * <MangaList />
 * ```
 * 
 * Fonctionnalités :
 * - Recherche par titre
 * - Filtrage par genre, thème, auteur, éditeur
 * - Tri alphabétique
 * - Création de nouveau manga
 * - Navigation vers les détails
 */

import React, { useState, useMemo } from 'react';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Card } from '../../../../shared/components/Card';
import SearchBar from '../../../../shared/components/SearchBar';
import AlphabetFilter from '../../../../shared/components/AlphabetFilter';
import CustomFilterButton from '../../../../shared/components/CustomFilterButton';
import CustomButton from '../../../../shared/components/CustomButton';
import CreateMangaModal from '../CreateMangaModal';
import Colors from '../../../../theme/colors';
import { useMangas, useFilters } from '../../hooks/useMangas';
import { Manga } from '../../types/Manga';
import { convertFiltersResponseToItems, FilterItem } from '../../types/Filter';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigation/types';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { CardSize } from '../../../../theme/cardSizes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

// Configuration par défaut - vous pouvez ajuster ces valeurs selon vos préférences
const DEFAULT_CONFIG = {
  numColumns: 4,
  gap: 10,
  cardSize: 'medium' as CardSize,
};

const MangaBottomTab = createBottomTabNavigator();

const MangaListContent = () => {
  const { data: mangas, isLoading, error } = useMangas();
  const { data: filtersData, isLoading: filtersLoading } = useFilters();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'MangaList'>>();
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<FilterItem[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const filters = useMemo(() => {
    if (!filtersData) return [];
    const convertedFilters = convertFiltersResponseToItems(filtersData);
    return convertedFilters;
  }, [filtersData]);

  const handleFilterChange = (newFilters: FilterItem[]) => {
    setSelectedFilters(newFilters);
  };

  // Vous pouvez ajuster ces valeurs selon vos préférences
  const config = {
    ...DEFAULT_CONFIG,
    // Décommentez et modifiez ces lignes pour personnaliser l'affichage
    // numColumns: 3, // Nombre de colonnes (2, 3, 4, etc.)
    // gap: 15, // Espacement entre les cartes
    // cardSize: 'large' as CardSize, // Taille des cartes ('small', 'medium', 'large')
  };

  const filteredMangas = useMemo(() => {
    if (!mangas) return [];

    // Filtrer d'abord par recherche textuelle
    let filtered = mangas;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(manga =>
        manga.titre.toLowerCase().includes(query) ||
        (manga.titreOriginal && manga.titreOriginal.toLowerCase().includes(query)) ||
        (manga.Auteur && manga.Auteur.nom && manga.Auteur.nom.toLowerCase().includes(query))
      );
    }

    // Filtrer par lettre si sélectionnée
    if (selectedLetter) {
      filtered = filtered.filter(manga => {
        const firstChar = manga.titre.charAt(0).toUpperCase();
        if (selectedLetter === '#') {
          // Si on sélectionne #, on montre tous les titres qui commencent par un caractère non alphabétique
          return !/^[A-Z]/.test(firstChar);
        }
        return firstChar === selectedLetter;
      });
    }

    // Ensuite, appliquer les filtres sélectionnés
    if (selectedFilters.length > 0) {
      filtered = filtered.filter(manga => {
        return selectedFilters.every(filter => {
          switch (filter.type) {
            case 'Genre':
              return manga.Genres?.some((genre: { id: number; }) => genre.id === filter.id);
            case 'Theme':
              return manga.Themes?.some((theme: { id: number; }) => theme.id === filter.id);
            case 'Auteur':
              return manga.Auteur?.id === filter.id;
            case 'Editeur':
              return manga.editeurVF?.id === filter.id || manga.editeurVO?.id === filter.id;
            default:
              return true;
          }
        });
      });
    }

    return filtered;
  }, [mangas, searchQuery, selectedFilters, selectedLetter]);



  if (isLoading || filtersLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Erreur: {error.message}</Text>
      </View>
    );
  }

  const renderItem = (item: Manga) => (
    <View key={item.id} style={[styles.cardContainer, { width: `${100 / config.numColumns}%` }]}>
      <View style={{ padding: config.gap / 2 }}>
        <Card
          content={item}
          onPress={() => navigation.navigate('MangaDetails', { itemId: item.id })}
          size={config.cardSize}
          itemsPerRow={config.numColumns}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <View style={styles.searchBarWrapper}>
            <SearchBar
              onSearch={setSearchQuery}
            />
          </View>
          <CustomFilterButton
            items={filters}
            onSelectItem={handleFilterChange}
            selectedItems={selectedFilters}
          />
        </View>
        <AlphabetFilter
          onLetterSelect={setSelectedLetter}
          selectedLetter={selectedLetter}
        />
        <ScrollView>
          <View style={styles.grid}>
            {filteredMangas.map(renderItem)}
          </View>
        </ScrollView>
      </View>
      <CustomButton
        icon="plus"
        onPress={() => setIsCreateModalVisible(true)}
        variant="round"
        iconSize={24}
      />
      <CreateMangaModal
        visible={isCreateModalVisible}
        onClose={() => setIsCreateModalVisible(false)}
      />
    </View>
  );
};

const HomeRedirect = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
  React.useEffect(() => {
    const parent = navigation.getParent();
    if (parent) {
      parent.navigate('Home');
    }
  }, [navigation]);

  return null;
};

const MangaCategories = () => {
  return (
    <View style={styles.container}>
      <Text>Catégories</Text>
    </View>
  );
};

export default function MangaList() {
  return (
    <MangaBottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.text,
        tabBarStyle: {
          backgroundColor: Colors.background,
          borderTopWidth: 1,
          borderTopColor: Colors.neutral,
        },
      }}
    >
      <MangaBottomTab.Screen
        name="Liste"
        component={MangaListContent}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bookshelf" size={size} color={color} />
          ),
        }}
      />
      <MangaBottomTab.Screen
        name="BackToHome"
        component={HomeRedirect}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <MangaBottomTab.Screen
        name="Calendar"
        component={MangaCategories}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="calendar" size={size} color={color} />
          ),
        }}
      />
    </MangaBottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: DEFAULT_CONFIG.gap / 2,
  },
  cardContainer: {
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: DEFAULT_CONFIG.gap,
    gap: DEFAULT_CONFIG.gap,
  },
  searchBarWrapper: {
    width: '85%',
  },
  filterButton: {
    width: 40,
    height: 40,
    padding: 0,
    backgroundColor: Colors.accent,
    borderRadius: 20,
  },
});

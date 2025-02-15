import React, { useState, useMemo } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator, Text } from 'react-native';
import { useMangas, useFilters } from '../hooks/useMangas';
import Colors from '../constants/colors';
import { Card } from '../components/Card';
import { Manga } from '../models/Manga';
import SearchBar from '../components/SearchBar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { CardSize } from '../constants/cardSizes';
import CustomFilterButton from '../components/CustomFilterButton';
import CustomButton from '../components/CustomButton';
import CreateMangaModal from '../components/CreateMangaModal';
import { FilterItem, convertFiltersResponseToItems } from '../models/Filter';
import AlphabetFilter from '../components/AlphabetFilter';

// Configuration par défaut - vous pouvez ajuster ces valeurs selon vos préférences
const DEFAULT_CONFIG = {
  numColumns: 4,
  gap: 10,
  cardSize: 'medium' as CardSize,
};

const MangaList = () => {
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
              return manga.Genres?.some(genre => genre.id === filter.id);
            case 'Theme':
              return manga.Themes?.some(theme => theme.id === filter.id);
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

export default MangaList;

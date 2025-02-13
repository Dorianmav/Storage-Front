import React, { useState, useMemo } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator, Text } from 'react-native';
import { useMangas } from '../hooks/useMangas';
import Colors from '../constants/colors';
import { Card } from '../components/Card';
import { Manga } from '../models/Manga';
import SearchBar from '../components/SearchBar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { CardSize } from '../constants/cardSizes';
import CustomButton from '../components/CustomButton';
import CreateMangaModal from '../components/CreateMangaModal';

// Configuration par défaut - vous pouvez ajuster ces valeurs selon vos préférences
const DEFAULT_CONFIG = {
  numColumns: 4,
  gap: 10,
  cardSize: 'medium' as CardSize,
};

const MangaList = () => {
  const { data: mangas, isLoading, error } = useMangas();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'MangaList'>>();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

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
    if (!searchQuery.trim()) return mangas;

    const query = searchQuery.toLowerCase().trim();
    return mangas.filter(manga =>
      manga.titre.toLowerCase().includes(query) ||
      (manga.titreOriginal && manga.titreOriginal.toLowerCase().includes(query)) ||
      (manga.Auteur && manga.Auteur.nom && manga.Auteur.nom.toLowerCase().includes(query))
    );
  }, [mangas, searchQuery]);

  if (isLoading) {
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
        <SearchBar
          onSearch={setSearchQuery}
        />
        <ScrollView>
          <View style={styles.grid}>
            {filteredMangas.map(renderItem)}
          </View>
        </ScrollView>
      </View>
      <CustomButton
        icon='plus'
        onPress={() => setIsCreateModalVisible(true)}
        variant='round'
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
    flexDirection: 'column',
  },
});

export default MangaList;

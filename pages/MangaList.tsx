import React, { useState, useMemo } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Text, Dimensions } from 'react-native';
import { useMangas } from '../hooks/useMangas';
import Colors from '../constants/colors';
import { Card } from '../components/Card';
import { Manga } from '../models/Manga';
import SearchBar from '../components/SearchBar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const numColumns = 2;
const gap = 15;
const cardWidth = (width - (gap * (numColumns + 1))) / numColumns;

const MangaList = () => {
  const { data: mangas, isLoading, error } = useMangas();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'MangaList'>>();
  const [searchQuery, setSearchQuery] = useState('');

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

  // Fonction pour transformer la liste en paires pour l'affichage en grille
  const renderItem = ({ item }: { item: Manga }) => (
    <View style={styles.cardContainer}>
      <Card
        content={item}
        onPress={() => navigation.navigate('MangaDetails', { itemId: item.id })}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <SearchBar 
        onSearch={setSearchQuery}
      />
      <FlatList
        data={filteredMangas}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
  list: {
    padding: gap,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: gap,
  },
  cardContainer: {
    width: cardWidth,
  },
});

export default MangaList;

import React from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import { useMangas } from '../hooks/useMangas';
import { Card } from '../components/Card';

const MangaList = () => {
  const { data: mangas, isLoading, error } = useMangas();

  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text>Erreur: {error.message}</Text>;

  return (
    <FlatList
      data={mangas}
      renderItem={({ item }) => <Card content={item} />}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default MangaList;

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../../theme/colors';
import CustomSlider from '../../shared/components/CustomSlider';
import { useTreeLastMangas } from '../../features/manga/hooks/useMangas';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface HomePageProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
}


const HomePage: React.FC<HomePageProps> = ({ navigation }) => {
  const { data: treeLastMangas, isLoading, error } = useTreeLastMangas();

  const mangaImages = treeLastMangas?.map(manga => manga.image) || [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MonStockage</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.sliderContainer}>
          {!isLoading && !error && mangaImages.length > 0 && (
            <CustomSlider
              titre="Mangas"
              images={mangaImages}
              size="mini"
              onPress={() => navigation.navigate('MangaList')}
            />
          )}
          {/* <CustomSlider
            titre="Animes"
            images={images2}
            size="mini"
            onPress={() => navigation.navigate('Page2')}
          /> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 10,
  },
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default HomePage;
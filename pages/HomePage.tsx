import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Colors from '../constants/colors';
import CustomButton from '../components/CustomButton';
import CustomSlider from '../components/CustomSlider';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

interface SliderProps {
  images: string[];
  size: 'mini' | 'full';
  destination: string;
}

interface HomePageProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;

}

const HomePage: React.FC<HomePageProps> = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MonStockage</Text>
      <View style={styles.buttonContainer}>
        <CustomButton 
          title="Voir les composants" 
          onPress={() => navigation.navigate('Components')}
        />
        <CustomButton 
          title="Voir les mangas" 
          onPress={() => navigation.navigate('MangaList')}
        />
      </View>
      <View style={styles.cardSection}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  cardSection: {
    flex: 1,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 15,
    marginBottom: 10,
  },
  scrollViewContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
});

export default HomePage;
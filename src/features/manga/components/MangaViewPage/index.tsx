import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import Colors from '../../../../theme/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigation/types';
import { RouteProp } from '@react-navigation/native';
import { useManga, useUpdateVolumeStatus } from '../../hooks/useMangas';
import { CardDetails } from '../../components/CardDetails';
import { CustomTextArea } from '../../components/CustomTextArea';
import { VolumeCard } from '../../components/VolumeCard';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MangaDetails'>;
  route: RouteProp<RootStackParamList, 'MangaDetails'>;
};

const MangaViewPage: React.FC<Props> = ({ route }: Props) => {
  const { itemId } = route.params;
  const { data: manga, isLoading, error } = useManga(itemId);
  const updateVolumeMutation = useUpdateVolumeStatus();

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error || !manga) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>
          {error?.message || 'Une erreur est survenue'}
        </Text>
      </View>
    );
  }

  const handleAcheteChange = (volumeId: number, achete: boolean) => {
    updateVolumeMutation.mutate(
      { mangaId: manga.id, volumeId, achete },
      {
        onError: (error) => {
          console.error('Erreur lors de la mise à jour du statut:', error);
        }
      }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <CardDetails content={manga} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Synopsis</Text>
        <CustomTextArea content={manga} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Volumes</Text>
        <ScrollView>
        {manga.Volumes && manga.Volumes.length > 0 ? (
          <View style={styles.volumesGrid}>
            {manga.Volumes.map((volume) => (
              <View key={volume.id} style={styles.volumeContainer}>
                <VolumeCard
                  content={volume}
                  onAcheteChange={(volumeId: number, achete: boolean) => handleAcheteChange(volumeId, achete)}
                  size="medium"
                  itemsPerRow={4}
                />
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.noVolumes}>Aucun volume disponible</Text>
        )}
        </ScrollView>
      </View>
      <View style={styles.bottomPadding} />
    </ScrollView>
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
  section: {
    padding: 5,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: Colors.primary,
  },
  volumesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-between',
    gap: 10,
  },
  volumeContainer: {
    width: '23%',
  },
  noVolumes: {
    textAlign: 'center',
    color: Colors.text,
    fontSize: 16,
    marginTop: 10,
  },
  bottomPadding: {
    height: 30,
  },
});

export default MangaViewPage;

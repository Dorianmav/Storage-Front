import React from 'react';
import { StyleSheet, View, ScrollView, Text, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { CardDetails } from '../components/CardDetails';
import { CustomTextArea } from '../components/CustomTextArea';
import { VolumeCard } from '../components/VolumeCard';
import Colors from '../constants/colors';
import { useManga, useUpdateVolumeStatus } from '../hooks/useMangas';

type Props = NativeStackScreenProps<RootStackParamList, 'MangaDetails'>;

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
        <View style={styles.volumesGrid}>
          {manga.volumes?.map((volume, index) => (
            <View key={volume.id} style={styles.volumeContainer}>
              <VolumeCard
                content={volume}
                onAcheteChange={handleAcheteChange}
              />
            </View>
          ))}
        </View>
      </View>
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
    padding: 15,
    marginBottom: 20,
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
    justifyContent: 'space-between',
    gap: 15,
  },
  volumeContainer: {
    width: '48%',
  },
});

export default MangaViewPage;

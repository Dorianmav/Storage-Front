import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ActivityIndicator,
} from 'react-native';
import CustomModal from './CustomModal';
import CustomButton from './CustomButton';
import Colors from '../constants/colors';
import { mangaApi } from '../api/api';
import { useQueryClient } from '@tanstack/react-query';

interface CreateMangaModalProps {
  visible: boolean;
  onClose: () => void;
}

const CreateMangaModal: React.FC<CreateMangaModalProps> = ({
  visible,
  onClose,
}) => {
  const [mangaTitle, setMangaTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    if (!mangaTitle.trim()) {
      setError('Veuillez entrer un titre');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await mangaApi.createManga(mangaTitle.trim());
      if (result.error) {
        throw new Error(result.error);
      }
      
      // Invalider le cache pour recharger la liste
      await queryClient.invalidateQueries({ queryKey: ['mangas'] });
      
      setMangaTitle('');
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CustomModal visible={visible} onClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>Ajouter un manga</Text>
        <TextInput
          style={styles.input}
          placeholder="Titre du manga"
          value={mangaTitle}
          onChangeText={setMangaTitle}
          autoFocus
          placeholderTextColor={Colors.neutral}
        />
        {error && <Text style={styles.error}>{error}</Text>}
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Annuler"
            onPress={onClose}
            style={styles.cancelButton}
          />
          <CustomButton
            title={isLoading ? 'Création...' : 'Créer'}
            onPress={handleSubmit}
            disabled={isLoading}
            style={styles.submitButton}
          />
        </View>
        {isLoading && (
          <ActivityIndicator 
            size="small" 
            color={Colors.primary} 
            style={styles.loader} 
          />
        )}
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: Colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.neutral,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: Colors.text,
  },
  error: {
    color: "red",
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  cancelButton: {
    backgroundColor: Colors.neutral,
  },
  submitButton: {
    backgroundColor: Colors.primary,
  },
  loader: {
    marginTop: 16,
  },
});

export default CreateMangaModal;

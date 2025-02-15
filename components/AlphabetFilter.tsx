import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';

interface AlphabetFilterProps {
  onLetterSelect: (letter: string | null) => void;
  selectedLetter: string | null;
}

const AlphabetFilter: React.FC<AlphabetFilterProps> = ({ onLetterSelect, selectedLetter }) => {
  // Créer l'alphabet avec symbole
  const letters = ['#', ...Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ')];

  const handleLetterPress = (letter: string) => {
    if (selectedLetter === letter) {
      // Si la lettre est déjà sélectionnée, on désélectionne
      onLetterSelect(null);
    } else {
      onLetterSelect(letter);
    }
  };

  const rows = [
    letters.slice(0, 20),    // Première ligne: # A B C D E F G H
    letters.slice(20, 36),   // Deuxième ligne: I J K L M N O P Q
  ];

  return (
    <View style={styles.container}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((letter) => (
            <TouchableOpacity
              key={letter}
              style={[
                styles.letterButton,
                selectedLetter === letter && styles.selectedLetterButton
              ]}
              onPress={() => handleLetterPress(letter)}
            >
              <Text
                style={[
                  styles.letterText,
                  selectedLetter === letter && styles.selectedLetterText
                ]}
              >
                {letter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 2,
    marginBottom: 2,
  },
  letterButton: {
    backgroundColor: Colors.neutral,
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderRadius: 4,
    minWidth: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedLetterButton: {
    backgroundColor: Colors.primary,
  },
  letterText: {
    color: Colors.text,
    fontSize: 10,
    fontWeight: '500',
  },
  selectedLetterText: {
    color: '#fff',
  },
});

export default AlphabetFilter;

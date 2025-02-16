import React from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Platform } from 'react-native';
import Colors from '../../theme/colors';
import { FontAwesome } from '@expo/vector-icons';

interface SearchBarProps {
  onSearch: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = React.useState<string>('');

  const handleClear = (): void => {
    setSearchText('');
    onSearch('');
  };

  const handleSearch = (text: string): void => {
    setSearchText(text);
    onSearch(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={16} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Recherche"
          placeholderTextColor="#666"
          value={searchText}
          onChangeText={handleSearch}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <FontAwesome name="times" size={16} color="#666" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
      },
      android: {
        elevation: 16,
      },
    }),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 16,
      },
    }),
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    padding: 0,
  },
  clearButton: {
    padding: 5,
  },
});

export default SearchBar;
import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native';
import Colors from '../constants/colors';

interface FilterItem {
  id: number;
  name: string;
  selected?: boolean;
}

interface CustomFilterProps {
  items: FilterItem[];
  onFilterChange: (selectedItems: FilterItem[]) => void;
}

const CustomFilter: React.FC<CustomFilterProps> = ({ items, onFilterChange }) => {
  const [filterItems, setFilterItems] = useState<FilterItem[]>(
    items.map(item => ({ ...item, selected: false }))
  );

  const handleItemPress = (id: number) => {
    const updatedItems = filterItems.map(item =>
      item.id === id ? { ...item, selected: !item.selected } : item
    );
    setFilterItems(updatedItems);
    onFilterChange(updatedItems.filter(item => item.selected));
  };

  return (
    <ScrollView 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {filterItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.filterItem,
            item.selected && styles.selectedItem
          ]}
          onPress={() => handleItemPress(item.id)}
        >
          <Text style={[
            styles.filterText,
            item.selected && styles.selectedText
          ]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.tertiary,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    gap: 8,
    borderRadius: 8,
  },
  filterItem: {
    backgroundColor: Colors.neutral,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.25,
          shadowRadius: 8,
        },
        android: {
          elevation: 8,
        },
      }),
  },
  selectedItem: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    color: '#666',
    fontSize: 14,
  },
  selectedText: {
    color: '#fff',
  },
});

export default CustomFilter;
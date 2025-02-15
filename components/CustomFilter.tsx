import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../constants/colors';
import { FilterItem, FilterType } from '../models/Filter';
import CustomButton from './CustomButton';

interface CustomFilterProps {
  title: string;
  items: FilterItem[];
  onSelectItem: (items: FilterItem[]) => void;
  selectedItems?: FilterItem[];
}

// Activer LayoutAnimation pour Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const CustomFilter: React.FC<CustomFilterProps> = ({ title, items, onSelectItem, selectedItems = [] }) => {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});
  const [rotateAnimations, setRotateAnimations] = useState<Record<string, Animated.Value>>({});

  // Initialiser les animations pour chaque catégorie
  React.useEffect(() => {
    const animations: Record<string, Animated.Value> = {};
    Object.keys(items.reduce<Record<FilterType, FilterItem[]>>((acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = [];
      }
      acc[item.type].push(item);
      return acc;
    }, {} as Record<FilterType, FilterItem[]>)).forEach(type => {
      animations[type] = new Animated.Value(0);
    });
    setRotateAnimations(animations);
  }, [items]);

  const toggleCategory = (type: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenCategories(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
    
    Animated.timing(rotateAnimations[type], {
      toValue: openCategories[type] ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Grouper les items par type
  const groupedItems = items.reduce<Record<FilterType, FilterItem[]>>((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {} as Record<FilterType, FilterItem[]>);

  const handleItemPress = (item: FilterItem) => {
    const isSelected = selectedItems.some(
      (selectedItem) => selectedItem.id === item.id && selectedItem.type === item.type
    );

    if (isSelected) {
      onSelectItem(
        selectedItems.filter(
          (selectedItem) => !(selectedItem.id === item.id && selectedItem.type === item.type)
        )
      );
    } else {
      onSelectItem([...selectedItems, { ...item, selected: true }]);
    }
  };

  const renderFilterItem = (item: FilterItem) => {
    const isSelected = selectedItems.some(
      (selectedItem) => selectedItem.id === item.id && selectedItem.type === item.type
    );

    return (
      <TouchableOpacity
        key={`${item.type}-${item.id}`}
        style={[
          styles.filterItem,
          isSelected && styles.selectedFilterItem
        ]}
        onPress={() => handleItemPress(item)}
      >
        <Text style={[
          styles.filterText,
          isSelected && styles.selectedFilterText
        ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {Object.entries(groupedItems).map(([type, typeItems]) => {
          const rotateInterpolate = rotateAnimations[type]?.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg'],
          }) || '0deg';

          return (
            <View key={type} style={styles.categoryContainer}>
              <TouchableOpacity
                style={styles.header}
                onPress={() => toggleCategory(type)}
                activeOpacity={0.7}
              >
                <Text style={styles.title}>{type}</Text>
                <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
                  <AntDesign name="down" size={24} color="#333" />
                </Animated.View>
              </TouchableOpacity>
              {openCategories[type] && (
                <View style={styles.filterContainer}>
                  {typeItems.map(renderFilterItem)}
                </View>
              )}
            </View>
          );
        })}
      </View>
      <View >
        <CustomButton
          title="Effacer"
          onPress={() => onSelectItem([])}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: Colors.tertiary,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '600',
  },
  content: {
    backgroundColor: Colors.background,
    padding: 16,
    paddingBottom: 8, 
  },
  categoryContainer: {
    marginBottom: 12, 
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
    opacity: 0.8,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8, 
  },
  filterItem: {
    backgroundColor: Colors.neutral,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  selectedFilterItem: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    color: Colors.text,
    fontSize: 14,
  },
  selectedFilterText: {
    color: '#fff',
  },
});

export default CustomFilter;
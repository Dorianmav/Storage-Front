import React, { useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import CustomButton from './CustomButton';
import CustomFilterTest from './CustomFilter';
import { FilterItem } from '../models/Filter';
import Colors from '../constants/colors';

interface CustomFilterButtonProps {
  items: FilterItem[];
  onSelectItem: (selectedItems: FilterItem[]) => void;
  selectedItems: FilterItem[];
  iconSize?: number;
}

const CustomFilterButton: React.FC<CustomFilterButtonProps> = ({
  items,
  onSelectItem,
  selectedItems,
  iconSize = 15
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <CustomButton
        icon="filter"
        onPress={() => setIsModalVisible(true)}
        variant="roundInline"
        iconSize={iconSize}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <CustomFilterTest
              title="Filtres"
              items={items}
              onSelectItem={onSelectItem}
              selectedItems={selectedItems}
            />
            <CustomButton
              title="Fermer"
              onPress={() => setIsModalVisible(false)}
              style={styles.closeButton}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 16,
    gap: 16,
  },
  closeButton: {
    alignSelf: 'center',
  },
});

export default CustomFilterButton;

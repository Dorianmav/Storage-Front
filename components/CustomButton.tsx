import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform, GestureResponderEvent } from 'react-native';
import Colors from '../constants/colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface CustomButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  icon?: keyof typeof FontAwesome.glyphMap;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, icon }) => {
  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.buttonContent}>
        {icon && <FontAwesome name={icon} size={10} color="#fff" />}
        <Text style={[styles.buttonText, !icon && styles.centeredText]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: Colors.neutral,
    margin: 10,
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
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 5,
  },
  centeredText: {
    textAlign: 'center',
  },
});

export default CustomButton;

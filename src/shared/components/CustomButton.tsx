import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform, GestureResponderEvent, ViewStyle } from 'react-native';
import Colors from '../../theme/colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface CustomButtonProps {
  title?: string;
  onPress: (event: GestureResponderEvent) => void;
  icon?: keyof typeof FontAwesome.glyphMap;
  variant?: 'default' | 'round' | 'roundInline';
  iconSize?: number;
  style?: ViewStyle;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ 
  title, 
  onPress, 
  icon, 
  variant = 'default',
  iconSize = 20,
  style,
  disabled
}) => {
  const buttonStyle = [
    styles.button,
    variant === 'round' && styles.roundButton,
    variant === 'roundInline' && styles.roundInlineButton,
    style,
    disabled && styles.disabledButton
  ];

  const contentStyle = [
    styles.buttonContent,
    (variant === 'round' || variant === 'roundInline') && styles.roundButtonContent
  ];

  return (
    <TouchableOpacity 
      style={buttonStyle} 
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <View style={contentStyle}>
        {icon && (
          <FontAwesome 
            name={icon} 
            size={iconSize} 
            color="#fff" 
            style={title ? styles.iconWithText : undefined}
          />
        )}
        {title && (
          <Text style={[
            styles.buttonText, 
            !icon && styles.centeredText,
            disabled && styles.disabledText 
          ]}>
            {title}
          </Text>
        )}
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
  roundButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: Colors.primary,
    zIndex: 1000,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  roundInlineButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    padding: 0,
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.accent,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundButtonContent: {
    flexDirection: 'column',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  centeredText: {
    textAlign: 'center',
  },
  iconWithText: {
    marginRight: 8,
  },
  disabledText: {
    color: '#666',
  },
  disabledButton: {
    backgroundColor: '#999',
  },
});

export default CustomButton;

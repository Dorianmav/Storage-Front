import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Platform } from 'react-native';
import { Volume } from '../models/Manga';
import Colors from '../constants/colors';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { CardSize, getCardWidth, cardSizeStyles } from '../constants/cardSizes';

type VolumeCardProps = {
    content: Volume;
    onPress?: () => void;
    onAcheteChange?: (volumeId: number, achete: boolean) => void;
    size?: CardSize;
    itemsPerRow?: number;
};

export const VolumeCard = ({ content, onPress, onAcheteChange, size = 'medium', itemsPerRow = 2 }: VolumeCardProps) => {
    const [isChecked, setChecked] = useState(content.achete || false);
    const cardWidth = getCardWidth(size, itemsPerRow);
    const sizeStyle = cardSizeStyles[size];

    const handleCheckboxPress = (checked: boolean) => {
        setChecked(checked);
        if (onAcheteChange) {
            onAcheteChange(content.id, checked);
        }
    };

    return (
        <TouchableOpacity 
            style={[styles.container, { width: cardWidth }]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <View style={styles.imageContainer}>
                <Image 
                    source={{ uri: content.image }} 
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <View style={[styles.checkboxContainer, { padding: sizeStyle.padding }]}>
                <BouncyCheckbox
                    size={size === 'small' ? 12 : size === 'large' ? 20 : 16}
                    fillColor={Colors.accent}
                    unFillColor="#FFFFFF"
                    text="Acheté"
                    textStyle={{
                        textDecorationLine: "none",
                        color: '#333',
                        fontSize: sizeStyle.fontSize,
                    }}
                    iconStyle={{ borderColor: Colors.accent }}
                    onPress={handleCheckboxPress}
                    isChecked={isChecked}
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.neutral,
        borderRadius: 15,
        overflow: 'hidden',
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
                elevation: 5,
            },
        }),
    },
    imageContainer: {
        width: '100%',
        aspectRatio: 0.7,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    checkboxContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
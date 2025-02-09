import React, { useState } from 'react';
import { StyleSheet, View, Image, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { Volume } from '../models/Manga';
import Colors from '../constants/colors';
import BouncyCheckbox from "react-native-bouncy-checkbox";

type VolumeCardProps = {
    content: Volume;
    onPress?: () => void;
    onAcheteChange?: (volumeId: number, achete: boolean) => void;
};

const { width } = Dimensions.get('window');
const cardWidth = (width - 40) / 2;

export const VolumeCard = ({ content, onPress, onAcheteChange }: VolumeCardProps) => {
    const [isChecked, setChecked] = useState(content.achete || false);

    const handleCheckboxPress = (checked: boolean) => {
        setChecked(checked);
        if (onAcheteChange) {
            onAcheteChange(content.id, checked);
        }
    };

    return (
        <TouchableOpacity 
            style={styles.container}
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
            <View style={styles.checkboxContainer}>
                <BouncyCheckbox
                    size={20}
                    fillColor={Colors.accent}
                    unFillColor="#FFFFFF"
                    text="Acheté"
                    textStyle={{
                        textDecorationLine: "none",
                        color: '#333',
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
        width: cardWidth,
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
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
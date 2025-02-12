import React from 'react';
import { StyleSheet, View, Image, Text, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { Manga } from '../models/Manga';
import Colors from '../constants/colors';
import { CardSize, getCardWidth, cardSizeStyles } from '../constants/cardSizes';

type CardProps = {
    content: Manga;
    onPress?: () => void;
    size?: CardSize;
    itemsPerRow?: number;
};

export const Card = ({ content, onPress, size = 'medium', itemsPerRow = 2 }: CardProps) => {
    const cardWidth = getCardWidth(size, itemsPerRow);
    const sizeStyle = cardSizeStyles[size];

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
            <View style={[styles.titleContainer, { padding: sizeStyle.padding }]}>
                <Text style={[styles.title, { fontSize: sizeStyle.fontSize }]} numberOfLines={2}>
                    {content.titre}
                </Text>
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
    titleContainer: {
        backgroundColor: Colors.neutral,
    },
    title: {
        fontWeight: '600',
        textAlign: 'center',
        color: '#333',
    },
});

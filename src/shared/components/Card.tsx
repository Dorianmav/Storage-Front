/**
 * Composant Card - Affiche une carte avec image et informations
 * 
 * @component
 * @example
 * ```tsx
 * <Card
 *   content={manga}
 *   onPress={() => handlePress(manga.id)}
 *   size="medium"
 * />
 * ```
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {Object} props.content - Le contenu à afficher dans la carte
 * @param {function} props.onPress - Fonction appelée lors du clic sur la carte
 * @param {'mini' | 'small' | 'medium' | 'large'} [props.size='medium'] - Taille de la carte
 * @param {number} [props.itemsPerRow] - Nombre d'éléments par ligne (pour le calcul de la largeur)
 */

import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Platform } from 'react-native';
import { Manga } from '../../features/manga/types/Manga';
import Colors from '../../theme/colors';
import { CardSize, getCardWidth, cardSizeStyles } from '../../theme/cardSizes';

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

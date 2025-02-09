import React from 'react';
import { StyleSheet, View, Image, Text, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { Manga } from '../models/Manga';
import Colors from '../constants/colors';

type CardProps = {
    content: Manga;
    onPress?: () => void;
};

const { width } = Dimensions.get('window');
// Calculer la largeur de la carte en prenant en compte les marges
const cardWidth = (width - 40) / 2; // 40 = padding total (15 * 2 + 10 entre les cartes)

export const Card = ({ content, onPress }: CardProps) => {
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
            <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={2}>
                    {content.titre}
                </Text>
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
    titleContainer: {
        padding: 10,
        backgroundColor: Colors.neutral,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        color: '#333',
    },
});

import React from 'react'
import { Manga } from '../models/Manga'
import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native'
import Colors from '../constants/colors';

type CustomTextAreaProps = {
    content: Manga
}

const { width } = Dimensions.get('window');
const cardWidth = width - 30; // Marge de 15 de chaque côté
const contentWidth = cardWidth * 0.55; // 55% de la largeur de la carte (5% pour l'espacement)

export const CustomTextArea = ({ content }: CustomTextAreaProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{content.synopsis}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: cardWidth,
        backgroundColor: Colors.accent,
        borderRadius: 10,
        padding: 15,
        alignSelf: 'center',
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
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    contentContainer: {
        width: contentWidth
    },
    textContainer: {
        flex: 1,
        paddingLeft: 10,
    },
    text: {
        fontSize: 14,
        marginBottom: 4,
        flexWrap: 'wrap',
    }
});


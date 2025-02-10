import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, Platform } from 'react-native'
import { Manga } from '../models/Manga'
import Colors from '../constants/colors'

type CardDetailsProps = {
    content: Manga
}

const { width } = Dimensions.get('window');
const cardWidth = width - 30; // Marge de 15 de chaque côté
const imageWidth = cardWidth * 0.4; // 40% de la largeur de la carte
const contentWidth = cardWidth * 0.55; // 55% de la largeur de la carte (5% pour l'espacement)

export const CardDetails = ({ content }: CardDetailsProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{content.titre}</Text>
            <View style={styles.card}>  
                <Image source={{ uri: content.image }} style={styles.image} />
                <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text} numberOfLines={2}>
                            <Text style={styles.label}>Titre original : </Text>
                            {content.titreOriginal || 'Non disponible'}
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.label}>Origine : </Text>
                            {content.origine || 'Non disponible'}
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.label}>Type : </Text>
                            {content.type || 'Non disponible'}
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.label}>Année VF : </Text>
                            {content.anneeVF || 'Non disponible'}
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.label}>Auteur : </Text>
                            {content.Auteur?.nom || 'Non disponible'}
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.label}>Éditeur VF : </Text>
                            {content.editeurVF?.nom || 'Non disponible'}
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.label}>Volumes : </Text>
                            {content.nbVolumesVF || '?'} (VO: {content.nbVolumesVO || '?'})
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.label}>Prix : </Text>
                            {content.prix || 'Non disponible'}
                        </Text>
                        {/* <Text style={styles.progressText}>
                            41 / {content.nbVolumesVF}
                        </Text> */}
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: cardWidth,
        backgroundColor: Colors.neutral,
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
    image: {
        width: imageWidth,
        height: imageWidth * 1.5,
        borderRadius: 8,
    },
    contentContainer: {
        width: contentWidth,
        maxHeight: imageWidth * 1.5,
    },
    textContainer: {
        flex: 1,
        paddingLeft: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    text: {
        fontSize: 14,
        marginBottom: 4,
        flexWrap: 'wrap',
    },
    label: {
        fontWeight: '600',
    },
    progressText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
        color: '#666',
    },
});

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Colors from '../constants/colors';
import CustomButton from '../components/CustomButton';
import CustomSlider from '../components/CustomSlider';
import SearchBar from '../components/SearchBar';
import { CardDetails } from '../components/CardDetails';
import { Card } from '../components/Card';
import { VolumeCard } from '../components/VolumeCard';
import { CustomTextArea } from '../components/CustomTextArea';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import CustomFilterTest from '../components/CustomFilter';
import { FilterItem } from '../models/Filter';
import AlphabetFilter from '../components/AlphabetFilter';

type ComponentPageNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Components'>;

const ComponentPage = () => {
    const navigation = useNavigation<ComponentPageNavigationProp>();
    const [selectedFilters, setSelectedFilters] = useState<FilterItem[]>([]);
    const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
    const [filters, setFilters] = useState<FilterItem[]>([]);
    const [volumes, setVolumes] = useState([
        {
            id: 1,
            numero: "1",
            titre: "Reborn",
            dateParution: "2006",
            url: "https://www.nautiljon.com/manga/reborn/",
            image: "https://www.nautiljon.com/imagesmin/manga_volumes/00/29/492.webp?0",
            achete: false
        },
        {
            id: 2,
            numero: "2",
            titre: "Dandadan",
            dateParution: "2023",
            url: "https://www.nautiljon.com/manga/dandadan/",
            image: "https://www.nautiljon.com/imagesmin/manga_volumes/11/94/dandadan_1955249.webp?1670756411",
            achete: true
        },
        {
            id: 3,
            numero: "3",
            titre: "Reborn",
            dateParution: "2006",
            url: "https://www.nautiljon.com/manga/reborn/",
            image: "https://www.nautiljon.com/imagesmin/manga_volumes/00/29/492.webp?0",
            achete: true
        },
        {
            id: 4,
            numero: "4",
            titre: "Dandadan",
            dateParution: "2023",
            url: "https://www.nautiljon.com/manga/dandadan/",
            image: "https://www.nautiljon.com/imagesmin/manga_volumes/11/94/dandadan_1955249.webp?1670756411",
            achete: true
        }
    ]);

    const mockFilters = [
        // Genres
        { id: 1, type: "Genre" as const, name: 'Action' },
        { id: 2, type: "Genre" as const, name: 'Comédie' },
        { id: 3, type: "Genre" as const, name: 'Horreur' },
        { id: 4, type: "Genre" as const, name: 'Mystère' },
        { id: 5, type: "Genre" as const, name: 'Romance' },
        // Thèmes
        { id: 6, type: "Theme" as const, name: 'Adolescence' },
        { id: 7, type: "Theme" as const, name: 'Aliens' },
        { id: 8, type: "Theme" as const, name: 'Amour' },
        { id: 9, type: "Theme" as const, name: 'Fantômes' },
        // Auteurs
        { id: 10, type: "Auteur" as const, name: 'Tatsu Yukinobu' },
        { id: 11, type: "Auteur" as const, name: 'Akira Toriyama' },
        { id: 12, type: "Auteur" as const, name: 'Eiichiro Oda' },
        // Éditeurs
        { id: 13, type: "Editeur" as const, name: 'Shueisha' },
        { id: 14, type: "Editeur" as const, name: 'Crunchyroll' },
        { id: 15, type: "Editeur" as const, name: 'Kodansha' },
        // Format
        { id: 16, type: "Format" as const, name: 'Manga' },
        { id: 17, type: "Format" as const, name: 'Manhwa' },
        { id: 18, type: "Format" as const, name: 'Manhua' },
        // Langue
        { id: 19, type: "Langue" as const, name: 'Japonais' },
        { id: 20, type: "Langue" as const, name: 'Coréen' },
        { id: 21, type: "Langue" as const, name: 'Chinois' },
    ];

    useEffect(() => {
        setFilters(mockFilters);
    }, []);

    const handleFilterChange = (selectedItems: FilterItem[]) => {
        setSelectedFilters(selectedItems);
        console.log('Selected filters:', selectedItems);
    };

    const handleLetterSelect = (letter: string | null) => {
        setSelectedLetter(letter);
    };

    const manga = {
        id: 0,
        titre: 'Reborn',
        titreOriginal: 'Katekyô Hitman Reborn!',
        image: "https://www.nautiljon.com/imagesmin/manga_volumes/00/29/492.webp?0",
        origine: 'Japon - 2004',
        anneeVF: '2006',
        type: 'Manga',
        nbVolumesVO: '42',
        nbVolumesVF: '42',
        prix: '7.20€',
        synopsis: 'Synopsis de test pour le composant CustomTextArea. Ce texte permet de voir comment le composant gère un long texte qui pourrait nécessiter plusieurs lignes.',
        lastPublishedVolumeId: 1,
        comingSoonVolumeId: 2,
        finished: true,
        Auteur: { id: 0, nom: 'Akira Amano' },
        editeurVO: { id: 0, nom: 'Shueisha' },
        editeurVF: { id: 0, nom: 'Glénat' },
        Genres: [],
        Themes: [],
        Volumes: []
    };

    const images1 = [
        "https://www.nautiljon.com/imagesmin/manga_volumes/12/00/gachiakuta_1964000.webp?1706466108",
        "https://www.nautiljon.com/imagesmin/manga_volumes/11/94/dandadan_1955249.webp?1670756411",
        "https://www.nautiljon.com/imagesmin/manga_volumes/00/29/492.webp?0"
    ];

    const images2 = [
        "https://www.nautiljon.com/imagesmin/manga_volumes/11/94/dandadan_1955249.webp?1670756411",
        "https://www.nautiljon.com/imagesmin/manga_volumes/00/29/492.webp?0",
        "https://www.nautiljon.com/imagesmin/manga_volumes/12/00/gachiakuta_1964000.webp?1706466108"
    ];

    const handleAcheteChange = (volumeId: number, achete: boolean) => {
        setVolumes(prevVolumes =>
            prevVolumes.map(volume =>
                volume.id === volumeId
                    ? { ...volume, achete }
                    : volume
            )
        );
    };

    const handleSearch: (text: string) => void = (text: string): void => {
        alert(`Recherche: ${text}`);
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.pageTitle}>Composants</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>CustomButton</Text>
                <CustomButton
                    title="Retour à l'accueil"
                    icon="chevron-left"
                    onPress={() => navigation.navigate('Home')}
                />
                <CustomButton
                    variant="round"
                    icon="chevron-left"
                    onPress={() => navigation.navigate('Home')}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>SearchBar</Text>
                <SearchBar onSearch={handleSearch} />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>AlphabetFilter</Text>
                <AlphabetFilter onLetterSelect={handleLetterSelect} selectedLetter={selectedLetter} />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>CustomSlider</Text>
                <View style={styles.sliderContainer}>
                    <CustomSlider
                        titre="Mangas"
                        images={images1}
                        size="mini"
                        onPress={() => alert('Mangas')}
                    />
                    <CustomSlider
                        titre="Animes"
                        images={images2}
                        size="mini"
                        onPress={() => alert('Animes')}
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Card</Text>
                <ScrollView>
                    <View style={styles.cardRow}>
                        <Card content={manga} />
                        <Card content={manga} />
                    </View>
                    <View style={styles.cardRow}>
                        <Card content={manga} />
                        <Card content={manga} />
                    </View>
                </ScrollView>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>CardDetails</Text>
                <CardDetails content={manga} />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>CustomTextArea</Text>
                <CustomTextArea content={manga} />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>VolumeCard</Text>
                <ScrollView>
                    <View style={styles.cardRow}>
                        <VolumeCard
                            content={volumes[0]}
                            onAcheteChange={handleAcheteChange}
                        />
                        <VolumeCard
                            content={volumes[1]}
                            onAcheteChange={handleAcheteChange}
                        />
                    </View>
                    <View style={styles.cardRow}>
                        <VolumeCard
                            content={volumes[2]}
                            onAcheteChange={handleAcheteChange}
                        />
                        <VolumeCard
                            content={volumes[3]}
                            onAcheteChange={handleAcheteChange}
                        />
                    </View>
                </ScrollView>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>CustomFilterTest</Text>
                <CustomFilterTest
                    title="Filtres"
                    items={filters}
                    onSelectItem={handleFilterChange}
                    selectedItems={selectedFilters}
                />
            </View>

            <View style={styles.bottomPadding} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    section: {
        marginBottom: 30,
        paddingHorizontal: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        color: Colors.primary,
    },
    sliderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    bottomPadding: {
        height: 30,
    },
});

export default ComponentPage;
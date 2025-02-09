import React, { useState } from 'react';
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
import CustomFilter from '../components/CustomFilter';

type ComponentPageNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Components'>;
interface FilterItem {
    id: number;
    name: string;
}

const ComponentPage = () => {
    const navigation = useNavigation<ComponentPageNavigationProp>();
    const [selectedFilters, setSelectedFilters] = useState<FilterItem[]>([]);

    const genres = [
        { id: 1, name: 'Action' },
        { id: 2, name: 'Adventure' },
        { id: 3, name: 'Comedy' },
        { id: 4, name: 'Drama' },
        { id: 5, name: 'Fantasy' },
        { id: 6, name: 'Love' },
        { id: 7, name: 'SF' },
        { id: 8, name: 'Thriller' },
    ];

    const handleFilterChange = (selectedItems: FilterItem[]) => {
        setSelectedFilters(selectedItems);
        // Here you can implement your filter logic
        console.log('Selected filters:', selectedItems);
    };
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
        auteur: { id: 0, nom: 'Akira Amano' },
        editeurVO: { id: 0, nom: 'Shueisha' },
        editeurVF: { id: 0, nom: 'Glénat' },
        genres: [],
        themes: [],
        volumes: []
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
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>SearchBar</Text>
                <SearchBar onSearch={handleSearch} />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>CustomSlider</Text>
                <View style={styles.sliderContainer}>
                    <CustomSlider
                        titre="Mangas"
                        images={images1}
                        size="mini"
                        destination="Page1"
                    />
                    <CustomSlider
                        titre="Animes"
                        images={images2}
                        size="mini"
                        destination="Page2"
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
                <Text style={styles.sectionTitle}>CustomFilter</Text>
                <CustomFilter
                    items={genres}
                    onFilterChange={handleFilterChange}
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
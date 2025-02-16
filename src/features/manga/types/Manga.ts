import { Auteur } from "./Auteur"
import { Editeur } from "./Editeur"
import { Genre } from "./Genre"
import { Theme } from "./Theme"
import { Volume } from "./Volume"

export interface Manga {
    id: number
    titre: string
    titreOriginal: string
    image: string
    origine: string
    anneeVF: string
    type: string
    nbVolumesVO: string
    nbVolumesVF: string
    prix: string
    synopsis: string
    lastPublishedVolumeId: number | null
    comingSoonVolumeId: number | null
    finished: boolean
    Auteur: Auteur
    editeurVO: Editeur
    editeurVF: Editeur
    Genres: Genre[]
    Themes: Theme[]
    Volumes: Volume[]
    lastPublishedVolume?: {
        id: number
        numero: string
        titre: string
        dateParution: string
        url: string
    }
    comingSoonVolume?: {
        id: number
        numero: string
        titre: string
        dateParution: string
        url: string
    }
}

export { Volume }

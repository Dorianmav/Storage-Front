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
    lastPublishedVolumeId: number
    comingSoonVolumeId: number
    finished: boolean
    auteur: Auteur
    editeurVO: Editeur
    editeurVF: Editeur
    genres: Genre[]
    themes: Theme[]
    volumes: Volume[] 
}

export { Volume }

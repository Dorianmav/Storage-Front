# Storage Front

Application de gestion de collection de mangas.

## Développement

### Mode Mock

L'application dispose d'un système de mock pour travailler sans connexion au backend. Pour activer/désactiver les mocks :

1. Ouvrez le fichier `config/config.ts`
2. Modifiez la valeur de `useMocks`:
   - `true` : utilise les données mockées
   - `false` : utilise l'API réelle

Les données mockées comprennent :
- 3 mangas (One Piece, Naruto, Death Note)
- Éditeurs (Glénat, Kana, etc.)
- Auteurs
- Genres et thèmes

### Structure du projet

- `api/` : Contient la configuration de l'API et les mocks
  - `api.ts` : Configuration de l'API réelle
  - `mockApi.ts` : Implémentation des endpoints mockés
- `config/` : Configuration de l'application
- `mocks/` : Données mockées
  - `mangaData.ts` : Données de test pour le développement
- `models/` : Interfaces TypeScript

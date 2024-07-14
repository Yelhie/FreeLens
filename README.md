# FreeLens

Projet personnel de création d'un site d'agence fictive de photographes freelance en Fullstack.

## Technologies Utilisées

**Backend**

- Node.js
- Express.js
- Mongoose
- Multer
- jsonwebtoken
- bcryptjs
- TypeScript

**Base de Données**

- MongoDB

**Frontend**

- React
- Redux
- Sass

**Documentation**

- Swagger UI et JSDoc

## Fonctionnalités

**Backend**

- **Base de données** : MongoDB.
- **Routes API Photographes** :
  - GET, POST et DELETE pour récupérer les profils des photographes (valide où non), ajouter un nouveau photographe et supprimer un photographe par ID.
- **Routes API Médias** :
  - GET, POST, PACTH et DELETE pour récupérer les médias, ajouter un nouveau média, mettre à jour un média par ID et Supprimer un média par ID.
- **Routes API** :
  - POST api/user/register et api/user/login pour permettre la création et l'authentification des utilisateurs.
- **Stockage des fichiers médias** : En local avec Multer.
- **Suppression des fichiers** : En base de données et dans le dossier /uploads lors d'une suppression.
- **Sécurité** :
  - Génération de tokens JWT avec une durée de vie de 15 minutes.
  - Gestion des sessions avec expiration en base de données après 15 minutes.
  - Gestion des utilisateurs : système de login et d'inscription, association des rôles client ou photographe.
  - Vérification et association du rôle choisi en base de données au compte utilisateur.
  - Création d'un middleware pour protéger les routes nécessitant une authentification.
  - Ajout d'un pattern exigeant un minimum de 8 caractères, incluant au moins une lettre, un chiffre, une majuscule, une minuscule et un symbole pour les mots de passe.
- **Documentation API** : Création avec Swagger UI et JSDoc.
- **Typage** Migration des fichiers .js vers TypeScript et ajout de typage.

**Frontend**

- **Page d'accueil** : Présentation des différentes cartes de photographes.
- **Page profil des photographes** : Affichage des différentes photos des photographes.
- **État global des composants** : Géré avec Redux pour permettre une gestion et une actualisation correcte des différentes fonctionnalités.
- **Fonction de filtre** : Tri des œuvres sur les pages des photographes (par popularité, date, titre).
- **Register & Login** : Accessible via le header et un composant modal pour permettre l'enregistrement ou le login des utilisateurs.
- **Validation formulaire register côté client** : Vérification des champs de formulaire pour éviter les requêtes inutiles au serveur (champs remplis, double vérification des mots de passe, pattern de sécurité pour les mots de passe).
- **Icônes** : Icônes SVG intégrées directement dans les dossiers de l'application afin de garantir un affichage plus rapide sans dépendre de sites tiers.

## Installation

1. Dans le dossier backend exécutez les commandes npm suivantes :

```bash
# Installer les dépendances dans le dossier backend
npm install

# Démarrer le serveur local (port 3000)
npm run server start

```

2. Ajouter à votre base de donnée MongoDB les fichiers json présent dans le dossier ImportData.

J'ai laissé les fichiers .env dans le commit pour faciliter l'installation du projet en local. Si vous souhaitez utiliser un cluster MongoDB, vous devrez changer l'adresse MONGO_URL présente dans le fichier .env du dossier backend avec l'adresse de votre cluster MongoDB.

3. Dans le dossier frontend exécutez les commandes npm suivantes :

```bash
# Installer les dépendances dans le dossier frontend
npm install

# Démarrer le projet
npm run dev

```

Enfin, vous pouvez consulter la documentation Swaggerde de l'API à l'adresse http://localhost:3000/api-docs.

## Screenshots

**Home page**

![FreeLens home page](https://github.com/Yelhie/FreeLens/blob/master/screenshots/freelens_240501.jpg)

**Page profile photographe**

![FreeLens page profile](https://github.com/Yelhie/FreeLens/blob/master/screenshots/freelens_240503.jpg)

**Modal d'enregistrement**

![FreeLens modal](https://github.com/Yelhie/FreeLens/blob/master/screenshots/freelens_240526.jpg)

## Informations supplémentaires

- Design : [@Yelhie](https://github.com/Yelhie)
- Photos : [pexels](https://www.pexels.com/fr-fr/) et [pixabay](https://pixabay.com/fr/)

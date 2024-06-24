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

- Base de données avec MongoDB
- Routes API Photographes : GET, POST et DELETE pour récupérer les profils des photographes (valide où non), ajouter un nouveau photographe et supprimer un photographe par ID.
- Routes API Médias : GET, POST, PACTH et DELETE pour récupérer les médias, ajouter un nouveau média, mettre à jour un média par ID et Supprimer un média par ID.
- Routes API : POST api/user/register et api/user/login pour permettre la création et l'authentification des utilisateurs.
- Stockage des fichiers médias en local avec Multer.
- Suppression des fichiers en base de données et dans le dossier /uploads lors d'un DELETE.
- Génération de tokens JWT avec une durée de vie de 15 minutes.
- Gestion des sessions avec expiration en base de données après 15 minutes.
- Gestion des utilisateurs : système de login et d'inscription, association des rôles client ou photographe.
- Vérification et association du rôle choisi en base de données au compte utilisateur.
- Création d'un middleware pour protéger les routes nécessitant une authentification.
- Ajout d'un pattern exigeant un minimum de 8 caractères, incluant au moins une lettre, un chiffre, une majuscule, une minuscule et un symbole pour les mots de passe.
- Création d'une documentation API avec Swagger UI et JSDoc.

**Frontend**

- Page d'accueil : Présente les différentes cartes de photographes.
- Page profil des photographes : Regroupe leurs différentes photos.
- Fonction de filtre : Pour les œuvres sur les pages des photographes (Trier par : Popularité, Date, titre).

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

## Informations supplémentaires

- Design : [@Yelhie](https://github.com/Yelhie)
- Photos : [pexels](https://www.pexels.com/fr-fr/) et [pixabay](https://pixabay.com/fr/)

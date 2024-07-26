# FreeLens

Projet personnel de création d'un site d'agence fictive de photographes freelance en Fullstack.

**Avertissement** :

📌 Considérant cette approche bien plus stimulante, instructive et amusante, le projet est réalisé volontairement sans planification des fonctionnalités afin de m’inciter à adapter et corriger le code en fonction de l'évolution et des besoins qui apparaîtront au fur et à mesure. Cela me permet également de travailler sur les tests, de gérer la résolution de bugs, et d'en apprendre davantage sur la planification, la méthodologie et les problématiques qui peuvent apparaître lors de la réalisation de nouveaux projets.

## Technologies Utilisées

| Backend      | Frontend       | Base de données | Documentation API et Test |
| ------------ | -------------- | --------------- | ------------------------- |
| Node.js      | React          | MongoDB         | Swagger                   |
| Express.js   | Redux          |                 | Jest                      |
| Mongoose     | Sass           |                 |                           |
| Multer       | React Toastify |                 |                           |
| jsonwebtoken |                |                 |                           |
| bcryptjs     |                |                 |                           |
| TypeScript   |                |                 |                           |

## Fonctionnalités

### Backend

#### Routes API

- Mise en place des routes API GET, POST, PATCH et DELETE pour récupérer les profils des photographes, ajouter, modifier ou supprimer des photographes.

- Mise en place des routes API GET, POST, PATCH et DELETE pour récupérer les profils des clients, ajouter, modifier ou supprimer des médias.

- Mise en place des routes API GET, POST, PATCH et DELETE pour récupérer les médias, ajouter, modifier ou supprimer des médias.

- Mise en place des routes API POST pour créer et authentifier des utilisateurs.

#### Gestion des fichiers médias

- Stockage local des fichiers médias avec Multer avec limitation de taille et d'extension.

- Contrôle de la suppression des fichiers médias en base de données et dans le dossier /uploads

#### Sécurité

- Génération de tokens avec JWT ayant une durée de vie de 15 minutes.

- Gestion des sessions avec expiration en base de données après 15 minutes.

- Système de login et d'inscription, incluant :

  - Association des rôles client ou photographe.
  - Vérification et association du rôle choisi en base de données au compte utilisateur.
  - Création d'un middleware pour protéger les routes nécessitant une authentification.
  - Mise en place d'une politique de mot de passe imposant un minimum de 8 caractères, incluant au moins une lettre, un chiffre, une majuscule, une minuscule et un symbole.

#### Documentation API

- Création de la documentation API avec Swagger UI et JSDoc.

#### Typage

- Migration des fichiers de .js vers TypeScript et ajout de typage.

### Frontend

#### Pages principales

- Mise en place d'une page d'accueil présentant les différentes profils de photographes et les adresse des Agences.

- Mise en place d'une page profil des photographes affichant leurs photos, leurs informations et permettant de leur envoyer un message.

#### Fonction de filtre

- Une fonction filtre permet à l'utilisateur de trier les œuvres sur les pages des photographes par popularité, date ou titre.

#### Gestion de l'état

- L'état global de l'application est géré avec Redux pour permettre une gestion et une actualisation correcte des différentes fonctionnalités

#### Register & Login

- Mise en place d'une fonctionnalité d'enregistrement accessible via le header et un composant modal, permettant aux utilisateurs de s'enregistrer ou de se connecter à tout moment lors de leur navigation sur le site.

#### Icônes

- Intégration des icônes au format SVG directement dans les dossiers de l'application pour garantir un affichage plus rapide sans dépendre de sites tiers.

## Installation

1. Dans le dossier backend exécutez les commandes npm suivantes :

```bash
# Installer les dépendances dans le dossier backend
npm install

# Démarrer le serveur local (port 3000)
npm run dev

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

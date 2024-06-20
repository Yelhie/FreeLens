# FreeLens

Projet personnel de création d'un site d'agence fictive de photographes freelance en Fullstack.

## Technologies Utilisées

**Backend**

- Node.js
- Express.js
- Mongoose
- Multer

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
- Routes API Photographes : GET, POST et DELETE pour récupérer les profils des photographes, ajouter un nouveau photographe et supprimer un photographe par ID.
- Routes API Médias : GET, POST, PACTH et DELETE pour récupérer les médias, ajouter un nouveau média, mettre à jour un média par ID et Supprimer un média par ID.
- Stockage des fichiers médias en local avec Multer.
- Suppression des fichiers en base de données et dans le dossier /uploads lors d'un DELETE.
- Création d'une documentation API avec Swagger UI et JSDoc.

**Frontend**

- Page d'accueil : Présente les différentes cartes de photographes.
- Page profil des photographes : Regroupe leurs différentes photos.

## Installation

A venir...

Vous pouvez consulter la documentation Swagger à l'adresse http://localhost:3000/api-docs.

## Screenshots

**Home page**

![FreeLens home page](https://github.com/Yelhie/FreeLens/blob/master/screenshot/freelens_240501.jpg)

**Page profile photographe**

![FreeLens page profile](https://github.com/Yelhie/FreeLens/blob/master/screenshot/freelens_240503.jpg)

## Informations supplémentaires

- Design : [@Yelhie](https://github.com/Yelhie)
- Photos : [pexels](https://www.pexels.com/fr-fr/) et [pixabay](https://pixabay.com/fr/)

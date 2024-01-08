
# RAUDI

## Description

RAUDI est une nouvelle entreprise automobile qui s'imposer sur le marché de l'automboile. Lancé en 2020 par Monsieur RAUDI Erehuite, l'entreprise a eu quelques soucis à démarrer mais a su se démarquer de la concurrence grâce à des prix compétitives.

En 2023, RAUDI a vendu plus de 100 voitures sur l'année et a généré plus de 8 Millions de chiffre d'intérêt. Pour développer sa clientèle, RAUDI souhaite développer un site Internet pour toucher encore plus de client.

L'application contient l'application FRONT (app) et BACK (api) du site RAUDI.



## Tech Stack

**Client:**
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![ChartJS](https://img.shields.io/badge/Chart%20js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

**Server:**
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![Express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)


## Lancer l'application

Cloner le projet

```bash
  git clone https://github.com/SwerkF/raudi
```

Ouvrir 2 terminaux différents et se rendre dans le dossier API et APP

```bash
  # Terminal 1
  cd api
  
  # Terminal 2
  cd app
```

Installer les dépendances dans les 2 dossiers

```bash
  npm install
```

Démarrer l'application front

```bash
  # Terminal 1
  npm run dev
```

L'application se lance sur le lien suivant: http://localhost:5173

Démarrer l'application back

```bash
  # Terminal 2
  npm run start
```

L'API se lance sur le lien suivant: http://localhost:3000

Initialiser la base de données

Rendez vous sur Postman et rentre les 2 routes suivante :

```
http://localhost:3000/api/database
http://localhost:3000/api/database/fill
```


## Features

- Gestion des utilisateurs
- Gestion des modèles
- Gestion des moteurs
- Achat de la voiture
- Gestion des options
- Comptabilité du site
- Sécurisation des routes

## API Reference

### Database

- `GET /api/database` Créer base de données
- `GET /api/database/fill` Remplir base de données

### User

- `POST /api/user/register`
- `POST /api/user/login` 
- `GET /api/user` 
- `GET /api/user/me`
- `GET /api/user/:userId`
- `PUT /api/user/:userId` 
- `DELETE /api/user/:userId`
- `PUT /api/user/:userId/password`

### Achat

- `POST /api/achat`
- `GET /api/achat`
- `GET /api/achat/:achatId`
- `DELETE /api/achat/:achatId`

### Options

- `POST /api/options`
- `GET /api/options`
- `GET /api/options/:optionId`
- `PUT /api/options/:optionId`
- `DELETE /api/options/:optionId`

### Vehicule

- `POST /api/vehicule`
- `GET /api/vehicule`
- `GET /api/vehicule/:vehiculeId`
- `PUT /api/vehicule/:vehiculeId`
- `DELETE /api/vehicule/:vehiculeId`

### Modele

- `POST /api/modele`
- `GET /api/modele`
- `GET /api/modele/:modeleId`
- `PUT /api/modele/:modeleId`
- `DELETE /api/modele/:modeleId`

### Moteurs

- `GET /api/moteurs`
- `GET /api/moteurs/:moteurId`
- `POST /api/moteurs`
- `PUT /api/moteurs/:moteurId`
- `DELETE /api/moteurs/:moteurId`

## Auteurs

- [@Swerk](https://github.com/SwerkF)
- [@ikdg0](https://github.com/ikdg0)
- [@KiddMiguel](https://github.com/KiddMiguel)


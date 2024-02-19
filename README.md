# Mon Projet

Ce projet est une application web développée avec [Next.js](https://nextjs.org/), une bibliothèque React pour le rendu côté serveur (SSR) et le routage. L'application utilise également [Prisma](https://www.prisma.io/) pour la gestion de la base de données et [rss-parser](https://www.npmjs.com/package/rss-parser) pour l'analyse des flux RSS.

## Dépendances

### Dépendances de production

- **@prisma/client** (^5.9.1) : Prisma Client pour l'accès à la base de données.
- **next** (14.1.0) : Next.js pour le rendu côté serveur et le routage.
- **react** (^18) : Bibliothèque React pour la construction d'interfaces utilisateur.
- **react-dom** (^18) : Rendu côté client de React pour les navigateurs web.
- **rss-parser** (^3.13.0) : Parseur de flux RSS pour extraire des données à partir de flux RSS.

### Dépendances de développement

- **@types/node** (^20) : Types pour Node.js pour TypeScript.
- **@types/react** (^18) : Types pour React pour TypeScript.
- **@types/react-dom** (^18) : Types pour React DOM pour TypeScript.
- **eslint** (^8) : Linter JavaScript.
- **eslint-config-next** (14.1.0) : Configuration ESLint pour les projets Next.js.
- **prisma** (^5.9.1) : Outil Prisma CLI pour gérer la base de données.
- **typescript** (^5) : Langage de programmation TypeScript.

## Installation

1. Clonez ce dépôt.
2. Exécutez `npm install` pour installer les dépendances.

## Configuration

Assurez-vous de configurer votre base de données avec Prisma en modifiant le fichier `schema.prisma` et en exécutant les migrations nécessaires.

## Utilisation

- Démarrez l'application en exécutant `npm run dev`.
- Consultez la documentation de chaque dépendance pour en savoir plus sur son utilisation spécifique.

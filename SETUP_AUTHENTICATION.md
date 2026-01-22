# 🔐 Guide de Configuration - Authentification & Base de Données

Ce guide vous aidera à configurer l'authentification avec NextAuth et Vercel Postgres pour votre application d'apprentissage de l'espagnol.

## 📋 Table des matières

1. [Configuration Vercel Postgres](#1-configuration-vercel-postgres)
2. [Configuration Google OAuth](#2-configuration-google-oauth)
3. [Configuration GitHub OAuth](#3-configuration-github-oauth)
4. [Variables d'environnement](#4-variables-denvironnement)
5. [Initialisation de la base de données](#5-initialisation-de-la-base-de-données)
6. [Test de l'authentification](#6-test-de-lauthentification)

---

## 1. Configuration Vercel Postgres

### Étape 1 : Créer une base de données Postgres sur Vercel

1. Allez sur [Vercel Dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet `dulingo-es`
3. Allez dans l'onglet **Storage**
4. Cliquez sur **Create Database**
5. Sélectionnez **Postgres**
6. Choisissez la région la plus proche (ex: Washington, D.C., USA)
7. Cliquez sur **Create**

### Étape 2 : Récupérer les variables de connexion

1. Une fois la base créée, cliquez sur votre base de données
2. Allez dans l'onglet **.env.local**
3. Copiez toutes les variables qui commencent par `POSTGRES_`

Vous devriez avoir quelque chose comme :
```bash
POSTGRES_URL="postgres://default:xxxxx@xxxxx.postgres.vercel-storage.com:5432/verceldb"
POSTGRES_PRISMA_URL="postgres://default:xxxxx@xxxxx.postgres.vercel-storage.com:5432/verceldb?pgbouncer=true&connect_timeout=15"
POSTGRES_URL_NON_POOLING="postgres://default:xxxxx@xxxxx.postgres.vercel-storage.com:5432/verceldb"
POSTGRES_USER="default"
POSTGRES_HOST="xxxxx.postgres.vercel-storage.com"
POSTGRES_PASSWORD="xxxxx"
POSTGRES_DATABASE="verceldb"
```

---

## 2. Configuration Google OAuth

### Étape 1 : Créer un projet Google Cloud

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez un projet existant
3. Activez l'API **Google+ API**

### Étape 2 : Configurer l'écran de consentement OAuth

1. Allez dans **APIs & Services** > **OAuth consent screen**
2. Sélectionnez **External** (sauf si vous avez Google Workspace)
3. Remplissez les informations :
   - **App name** : ¡Aprende Español!
   - **User support email** : votre email
   - **Developer contact** : votre email
4. Ajoutez les scopes : `userinfo.email`, `userinfo.profile`
5. Ajoutez vos emails de test si l'app est en mode "Testing"

### Étape 3 : Créer les identifiants OAuth

1. Allez dans **APIs & Services** > **Credentials**
2. Cliquez sur **Create Credentials** > **OAuth client ID**
3. Sélectionnez **Web application**
4. Configurez :
   - **Name** : Dulingo ES Web
   - **Authorized JavaScript origins** :
     - `http://localhost:3000` (développement)
     - `https://votre-app.vercel.app` (production)
   - **Authorized redirect URIs** :
     - `http://localhost:3000/api/auth/callback/google`
     - `https://votre-app.vercel.app/api/auth/callback/google`
5. Cliquez sur **Create**
6. Copiez le **Client ID** et **Client Secret**

```bash
GOOGLE_CLIENT_ID="xxxxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="xxxxx"
```

---

## 3. Configuration GitHub OAuth

### Étape 1 : Créer une OAuth App sur GitHub

1. Allez sur [GitHub Settings](https://github.com/settings/developers)
2. Cliquez sur **OAuth Apps** > **New OAuth App**
3. Remplissez :
   - **Application name** : ¡Aprende Español!
   - **Homepage URL** : `http://localhost:3000` (ou votre URL de production)
   - **Authorization callback URL** : 
     - Dev : `http://localhost:3000/api/auth/callback/github`
     - Prod : `https://votre-app.vercel.app/api/auth/callback/github`
4. Cliquez sur **Register application**
5. Copiez le **Client ID**
6. Cliquez sur **Generate a new client secret** et copiez-le

```bash
GITHUB_ID="xxxxx"
GITHUB_SECRET="xxxxx"
```

---

## 4. Variables d'environnement

### Étape 1 : Créer le fichier .env.local

Créez un fichier `.env.local` à la racine du projet avec le contenu suivant :

```bash
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-generate-with-openssl

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret

# Vercel Postgres (copiez depuis le dashboard Vercel)
POSTGRES_URL="postgres://default:xxxxx@xxxxx.postgres.vercel-storage.com:5432/verceldb"
POSTGRES_PRISMA_URL="postgres://default:xxxxx@xxxxx.postgres.vercel-storage.com:5432/verceldb?pgbouncer=true&connect_timeout=15"
POSTGRES_URL_NON_POOLING="postgres://default:xxxxx@xxxxx.postgres.vercel-storage.com:5432/verceldb"
POSTGRES_USER="default"
POSTGRES_HOST="xxxxx.postgres.vercel-storage.com"
POSTGRES_PASSWORD="xxxxx"
POSTGRES_DATABASE="verceldb"
```

### Étape 2 : Générer NEXTAUTH_SECRET

Exécutez cette commande dans votre terminal :

```bash
openssl rand -base64 32
```

Copiez le résultat dans `NEXTAUTH_SECRET`.

### Étape 3 : Configurer les variables sur Vercel

1. Allez sur votre projet Vercel
2. **Settings** > **Environment Variables**
3. Ajoutez toutes les variables ci-dessus (sauf NEXTAUTH_URL)
4. Pour `NEXTAUTH_URL`, utilisez : `https://votre-app.vercel.app`

---

## 5. Initialisation de la base de données

### Méthode 1 : Via l'interface web (Recommandé)

1. Démarrez votre serveur de développement :
   ```bash
   npm run dev
   ```

2. Ouvrez votre navigateur et allez à :
   ```
   http://localhost:3000/api/init-db
   ```

3. Vous devriez voir : `✅ Database initialized successfully`

### Méthode 2 : Via Vercel Dashboard (Production)

1. Allez sur votre projet Vercel
2. Une fois déployé, ouvrez :
   ```
   https://votre-app.vercel.app/api/init-db
   ```

3. Les tables seront créées automatiquement

---

## 6. Test de l'authentification

### Test en local

1. Démarrez le serveur :
   ```bash
   npm run dev
   ```

2. Allez sur `http://localhost:3000`

3. Cliquez sur **"Créer un compte"**

4. Testez les 3 méthodes :
   - ✅ Email/Password
   - ✅ Google OAuth
   - ✅ GitHub OAuth

5. Vérifiez que :
   - La connexion fonctionne
   - Votre nom/email s'affiche en haut à droite
   - Les XP et streak sont à 0
   - Vous pouvez compléter un module et voir la progression augmenter

---

## 📊 Structure de la base de données

Voici les tables créées automatiquement :

### Table `users`
- `id` : ID unique de l'utilisateur
- `email` : Email de l'utilisateur (unique)
- `name` : Nom de l'utilisateur
- `password` : Mot de passe hashé (null pour OAuth)
- `image` : URL de l'avatar
- `provider` : Type d'authentification (credentials, google, github)

### Table `user_progress`
- `user_id` : Référence à l'utilisateur
- `total_xp` : Total des points XP
- `streak` : Nombre de jours consécutifs
- `last_activity_date` : Date de dernière activité

### Table `completed_modules`
- `user_id` : Référence à l'utilisateur
- `level` : Niveau (ex: a0, a1)
- `module_id` : ID du module complété
- `completed_at` : Date de complétion

### Tables NextAuth
- `sessions` : Gestion des sessions
- `accounts` : Comptes OAuth liés
- `verification_tokens` : Tokens de vérification

---

## 🚨 Dépannage

### Erreur : "Configuration" lors de la connexion OAuth

**Solution** : Vérifiez que :
- Les URLs de redirection sont correctes dans Google/GitHub
- Les variables d'environnement sont bien configurées
- `NEXTAUTH_URL` correspond à votre URL actuelle

### Erreur : "Database connection failed"

**Solution** : Vérifiez que :
- Toutes les variables `POSTGRES_*` sont correctement copiées
- La base de données Vercel est bien créée
- Vous avez appelé `/api/init-db` pour créer les tables

### OAuth fonctionne mais pas Email/Password

**Solution** : Vérifiez que :
- Vous avez bien appelé `/api/init-db`
- La table `users` existe
- Le mot de passe fait au moins 6 caractères

---

## ✅ Checklist finale

- [ ] Vercel Postgres créé et configuré
- [ ] Google OAuth configuré (Client ID + Secret)
- [ ] GitHub OAuth configuré (Client ID + Secret)
- [ ] `.env.local` créé avec toutes les variables
- [ ] `NEXTAUTH_SECRET` généré
- [ ] Variables d'environnement ajoutées sur Vercel
- [ ] Base de données initialisée (`/api/init-db`)
- [ ] Test de connexion Email/Password ✓
- [ ] Test de connexion Google ✓
- [ ] Test de connexion GitHub ✓
- [ ] Test de complétion d'un module ✓

---

## 🎉 Félicitations !

Votre système d'authentification est maintenant configuré ! Les utilisateurs peuvent :
- Se connecter avec Email/Password, Google ou GitHub
- Voir leur progression sauvegardée
- Garder leur streak de jours consécutifs
- Accumuler des XP

**Prochaines étapes suggérées :**
- Ajouter un système de badges/achievements
- Créer un tableau de classement (leaderboard)
- Ajouter des notifications par email
- Implémenter un système d'amis/défis

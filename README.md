# 🇪🇸 ¡Aprende Español! - Application d'Apprentissage de l'Espagnol

Une application web moderne, mobile-first et progressive (PWA) pour apprendre l'espagnol de A0 (débutant absolu) à C2 (maîtrise complète).

## ✨ Fonctionnalités

- 📱 **Mobile-First** : Design optimisé pour smartphones et tablettes
- 🎨 **Interface Moderne** : Couleurs espagnoles vibrantes (rouge #C60B1E et jaune #FFC400)
- 🎯 **7 Niveaux** : De A0 à C2 selon le CECRL
- 📚 **18 Modules A0** : Contenu complet pour débutants
- ✅ **Quiz Interactifs** : Validation des connaissances avec feedback immédiat
- 🎵 **Audio TTS** : Prononciation française et espagnole
- 📊 **Progression** : Système de points XP, badges et streaks
- 💾 **Offline-First** : Fonctionne sans connexion internet
- 🚀 **PWA** : Installable sur l'écran d'accueil

## 🛠️ Stack Technique

- **Framework** : Next.js 14 (App Router)
- **Language** : TypeScript
- **Styling** : Tailwind CSS
- **Animations** : Framer Motion
- **State Management** : Zustand avec persistance
- **Icons** : Lucide React

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour production
npm run build

# Lancer en production
npm start
```

L'application sera disponible sur `http://localhost:3000`

## 📱 Structure de l'Application

```
src/
├── app/                          # Pages Next.js (App Router)
│   ├── page.tsx                 # Accueil - Sélection niveau
│   ├── level/[level]/
│   │   ├── page.tsx            # Liste des modules
│   │   └── module/[moduleId]/
│   │       ├── page.tsx        # Contenu du module
│   │       └── quiz/page.tsx   # Quiz du module
│   ├── layout.tsx              # Layout principal
│   └── globals.css             # Styles globaux
├── components/
│   └── ui/                      # Composants UI réutilisables
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Progress.tsx
│       └── Badge.tsx
├── data/                        # Données de contenu
│   ├── levels.ts               # Configuration des niveaux
│   └── a0-modules.ts           # Contenu A0 (18 modules)
├── store/
│   └── useProgressStore.ts     # Store Zustand pour la progression
└── types/
    └── index.ts                # Types TypeScript

## 🎓 Contenu A0 (Débutant Absolu)

1. 👋 Se Présenter
2. 👨‍👩‍👧‍👦 La Famille
3. 👥 Les Amis et Relations Sociales
4. 📅 Les Jours de la Semaine
5. 📆 Les Mois et les Saisons
6. 🔢 Les Nombres (0 à 1 Million)
7. 🏠 La Maison
8. 🗺️ La Route et Orientation
9. 🏥 L'Hôpital et la Santé
10. ☀️ Météo et Température
11. 🛒 Supermarché et Nourriture
12. 🎓 École et Université
13. 🚇 Les Transports
14. 🎨 Couleurs et Formes
15. 💬 Salutations et Conversations Courantes
16. 📝 Les 50 Verbes les Plus Utilisés
17. 📖 Grammaire Essentielle
18. 🌟 Modules Complémentaires

## 🎯 Système de Progression

- **XP** : Gagnez des points d'expérience en complétant des modules
- **Badges** : Débloquez des badges pour les réussites parfaites
- **Streak** : Maintenez votre série de jours consécutifs
- **Déblocage Progressif** : Les modules se débloquent au fur et à mesure

## 🎨 Palette de Couleurs

- **Primary** : #C60B1E (Rouge espagnol)
- **Secondary** : #FFC400 (Jaune or)
- **Background** : #F8F9FA (Blanc cassé)
- **Success** : #28A745 (Vert)
- **Error** : #DC3545 (Rouge vif)

## 🚀 Déploiement

### Vercel (Recommandé)

```bash
npm install -g vercel
vercel
```

### Autres plateformes

L'application peut être déployée sur :
- Netlify
- Railway
- VPS personnel
- N'importe quelle plateforme supportant Next.js

## 📝 TODO - Prochaines Fonctionnalités

- [ ] Compléter les 16 modules A0 restants
- [ ] Ajouter contenu A1-C2
- [ ] Intégration IA (Ollama/Mistral) pour génération de contenu
- [ ] Mode conversation avec assistant IA
- [ ] Reconnaissance vocale
- [ ] Audio pré-enregistrés natifs
- [ ] Mode hors-ligne complet avec Service Worker
- [ ] Système de révision espacée (SRS)
- [ ] Flashcards
- [ ] Compétitions et classements

## 📄 License

MIT

## 👨‍💻 Développement

Créé avec ❤️ pour apprendre l'espagnol efficacement.

---

**¡Buena suerte con tu aprendizaje del español!** 🇪🇸
```

# 📱 Guide d'Installation - ¡Aprende Español!

## 🚀 Démarrage Rapide

### 1. Installation des dépendances

```bash
npm install
```

### 2. Lancement en développement

```bash
npm run dev
```

L'application sera accessible sur **http://localhost:3000** 🎉

### 3. Build pour production

```bash
npm run build
npm start
```

## 📂 Structure du Projet

```
├── src/
│   ├── app/                    # Pages Next.js
│   │   ├── page.tsx           # 🏠 Page d'accueil
│   │   ├── level/[level]/     # 📚 Sélection modules par niveau
│   │   └── level/[level]/module/[moduleId]/
│   │       ├── page.tsx       # 📖 Contenu du module
│   │       └── quiz/page.tsx  # ✅ Quiz du module
│   ├── components/ui/          # 🎨 Composants réutilisables
│   ├── data/                   # 📊 Données des cours (18 modules A0)
│   ├── store/                  # 💾 State management (Zustand)
│   └── types/                  # 📝 Types TypeScript
├── public/                     # 🖼️ Assets statiques
└── tailwind.config.ts          # 🎨 Configuration Tailwind

```

## ✨ Fonctionnalités Implémentées

✅ **18 modules A0 complets** avec 200+ leçons
✅ **Interface bilingue** (Français ↔ Espagnol)
✅ **Audio TTS** intégré (Web Speech API)
✅ **Quiz interactifs** avec feedback immédiat
✅ **Système de progression** (XP, badges, streaks)
✅ **Design mobile-first** responsive
✅ **Animations fluides** (Framer Motion)
✅ **PWA ready** (manifest.json)
✅ **Offline-first** avec persistance locale

## 🎨 Palette de Couleurs

- **Primary**: `#C60B1E` (Rouge espagnol) 🇪🇸
- **Secondary**: `#FFC400` (Jaune or) ⭐
- **Success**: `#28A745` (Vert) ✅
- **Background**: `#F8F9FA` (Blanc cassé) 📄

## 🎯 Navigation de l'App

1. **Page d'accueil** → Sélection du niveau (A0-C2)
2. **Page niveau** → Liste des 18 modules (A0)
3. **Page module** → Leçons avec audio et traduction
4. **Page quiz** → 10 questions avec feedback
5. **Résultats** → Score, XP, badges

## 📦 Technologies Utilisées

- **Next.js 14** (App Router)
- **TypeScript** (Type safety)
- **Tailwind CSS** (Styling)
- **Framer Motion** (Animations)
- **Zustand** (State management)
- **Web Speech API** (Audio TTS)

## 🎓 Contenu Pédagogique A0

Les 18 modules couvrent :
1. Se Présenter 👋
2. La Famille 👨‍👩‍👧‍👦
3. Les Amis 👥
4. Jours de la Semaine 📅
5. Mois et Saisons 📆
6. Les Nombres 🔢
7. La Maison 🏠
8. Orientation 🗺️
9. Santé 🏥
10. Météo ☀️
11. Nourriture 🛒
12. École 🎓
13. Transports 🚇
14. Couleurs 🎨
15. Salutations 💬
16. Verbes Essentiels 📝
17. Grammaire 📖
18. Révision 🌟

## 🔧 Commandes Utiles

```bash
# Développement
npm run dev

# Build
npm run build

# Production
npm start

# Linter
npm run lint
```

## 📱 Installation PWA

L'application peut être installée sur mobile :
1. Ouvrir dans Chrome/Safari mobile
2. Menu → "Ajouter à l'écran d'accueil"
3. Profiter de l'expérience native !

## 🌟 Prochaines Étapes

- [ ] Ajouter Service Worker pour offline complet
- [ ] Intégrer des audios natifs pré-enregistrés
- [ ] Développer les niveaux A1-C2
- [ ] Ajouter un système de révision espacée
- [ ] Intégrer une IA pour conversations

## 💡 Astuces de Développement

- **Hot Reload** : Les changements sont instantanés
- **State Persistence** : La progression est sauvegardée dans localStorage
- **Responsive** : Testé sur mobile/tablette/desktop
- **Audio** : Fonctionne avec la Web Speech API (navigateurs modernes)

## ❓ Besoin d'Aide ?

1. Vérifier que Node.js >= 18 est installé
2. Supprimer `node_modules` et refaire `npm install`
3. Vérifier les logs dans la console du navigateur

**¡Buena suerte!** 🚀🇪🇸

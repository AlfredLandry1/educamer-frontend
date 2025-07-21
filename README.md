# Educamer – Plateforme de suivi scolaire

## Présentation
Educamer est une application Next.js (TypeScript) moderne pour le suivi scolaire, la communication et la gamification de l'apprentissage. Elle propose un dashboard, des cours, des quiz, un forum, des notifications, un support, etc. Toutes les données sont mockées côté frontend pour la phase actuelle.

## Structure du projet

- **Framework** : Next.js 15 (App Router, TypeScript)
- **UI** : Tailwind CSS, shadcn/ui, lucide-react
- **Gestion d'état** : SWR, React Context
- **Tests** : Jest, React Testing Library, Cypress
- **PWA** : next-pwa
- **Déploiement** : Vercel

### Arborescence simplifiée
```
/ (racine)
  app/                # Pages Next.js (App Router)
  components/         # Composants UI et métier
  data/               # Mocks TypeScript (users, courses, etc.)
  services/           # Accès aux mocks, logique métier
  utils/              # Validation, helpers
  public/             # Assets statiques, service worker PWA
  docs/               # Toute la documentation technique et fonctionnelle
  next.config.js      # Config Next.js + PWA
  package.json        # Dépendances et scripts
  tsconfig.json       # Config TypeScript
```

## Documentation
Toute la documentation (organisation du code, guides UI, specs, pages, mocks, etc.) est centralisée dans le dossier [`docs/`](./docs/).

- [Organisation du code](./docs/educamer_code_organisation_guide.md)
- [Spécification des mocks](./docs/educamer_mock_data_spec.md)
- [Structure de la landing page](./docs/educamer_landing_structure.md)
- [Feuille de route UI](./docs/educamer_ui_roadmap.md)
- [Documentation technique frontend](./docs/educamer_frontend_technical_doc.md)
- [Spécification des pages](./docs/educamer_pages_spec.md)

## Démarrage local

```bash
pnpm install
pnpm dev
```

Ouvre [http://localhost:3000](http://localhost:3000) pour voir l'application.

## Lint, tests et build

```bash
pnpm lint      # Lint + Prettier
pnpm test      # Tests unitaires
pnpm build     # Build de production
```

## Déploiement sur Vercel

1. Pousse le projet sur GitHub/GitLab/Bitbucket
2. Va sur [vercel.com/import](https://vercel.com/import) et importe le repo
3. Vercel détecte Next.js automatiquement (build : `pnpm build`, output : `.next`)
4. Configure les variables d'environnement si besoin
5. Déploie !

> Le plugin PWA est compatible Vercel. Le service worker est généré dans `public/sw.js`.

## Remarques
- Toutes les données sont mockées dans `data/` et accessibles via les services.
- Respecte les conventions et la checklist dans `docs/` pour toute contribution.
- Pour toute question, consulte la documentation dans le dossier `docs/`.

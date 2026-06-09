# 🍎 Verger & Co — Site vitrine premium fruits & légumes

Site web premium pour primeur / vendeur de fruits et légumes, avec un **hero animé en
deux colonnes** (la chute des fruits dans le panier **se joue automatiquement** à l'arrivée
puis est **rejouable / scrubable au scroll**, rendu canvas image par image type Apple),
un catalogue produits filtrable, une page « à propos » et un formulaire de contact validé.

Niveau de finition « site premium » : typographie soignée (Poppins + Inter), palette
fruitée en OKLCH, micro-interactions, animations Framer Motion et transitions de page.

---

## 🛠 Stack technique

| Technologie       | Usage                                          |
| ----------------- | ---------------------------------------------- |
| **Next.js 16**    | Framework React (App Router) — SEO & perfs     |
| **TypeScript**    | Typage strict (full stack)                     |
| **Tailwind CSS 4**| Styling utilitaire + design tokens             |
| **Framer Motion** | Animations & micro-interactions                |
| **shadcn/ui**     | Composants (button, card, input, sheet…)       |
| **Lucide React**  | Icônes                                         |

---

## 🚀 Installation & lancement

> Prérequis : **Node.js ≥ 18.18** (testé sur Node 22).

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev
# → http://localhost:3000

# 3. Build de production
npm run build
npm run start

# (optionnel) Vérifications
npm run lint        # ESLint
npx tsc --noEmit    # Type-check TypeScript
```

> 💡 **Astuce dev** : ce projet est actuellement dans un dossier **OneDrive**, qui
> peut déclencher des recompilations « Fast Refresh » en boucle (OneDrive « touche »
> les fichiers pendant la synchro). Pour un confort optimal, déplacez le projet hors
> de OneDrive (ex. `C:\dev\verger-co`) ou mettez le dossier en pause de synchronisation.

---

## 📄 Pages

| Route        | Description                                                        |
| ------------ | ----------------------------------------------------------------- |
| `/`          | Accueil — hero scrollytelling, produits phares, panier, valeurs, CTA |
| `/produits`  | Catalogue filtrable par catégorie (Fruits / Légumes / Paniers)    |
| `/a-propos`  | Histoire, chiffres clés, valeurs                                   |
| `/contact`   | Coordonnées + formulaire validé                                   |

---

## 🖼 Remplacer les médias (vos vrais fichiers)

Tous les médias sont dans **`public/media/`**. Remplacez simplement les fichiers en
gardant les mêmes noms, ou ajustez les chemins dans le code. Les emplacements à éditer
sont signalés par des commentaires `REMPLACER PAR MON IMAGE / MA VIDEO`.

| Fichier / dossier                  | Où c'est utilisé                                       | Repère dans le code                       |
| ---------------------------------- | ------------------------------------------------------ | ----------------------------------------- |
| `public/media/frames/*.webp`       | **Hero scrollytelling** (séquence de la chute des fruits) | `src/components/home/hero-scroll.tsx`     |
| `public/media/fruits-falling.mp4`  | Vidéo **source** qui sert à générer les frames du hero | (voir ffmpeg ci-dessous)                  |
| `public/media/fruits-floating.png` | Image décorative (page À propos)                       | `src/app/a-propos/page.tsx`               |
| `public/media/panier-final.mp4`    | 2ᵉ vidéo (panier final) — **à ajouter**               | `src/components/home/video-showcase.tsx`  |

### 🍂 Le hero (chute des fruits)

Mise en page **2 colonnes** : texte à gauche, animation dans une carte encadrée à droite
(plus aucun chevauchement). La chute est rendue sur un `<canvas>` **image par image**
(technique « image sequence », rendu ultra fluide type Apple) :

- **Lecture automatique** à l'arrivée sur la page (≈ 2,6 s) → on voit toute la chute sans scroller.
- **Rejouable / scrubable au scroll** sur desktop, en ~½ écran seulement.
- Réglages dans [`hero-scroll.tsx`](src/components/home/hero-scroll.tsx) :
  `AUTOPLAY_MS` (durée de la lecture auto) et la hauteur de section `lg:h-[155vh]`
  (= longueur du scrub ; réduisez-la pour scruber encore plus court).

La vidéo a été découpée en **125 images `.webp`** dans `public/media/frames/`.

**Pour remplacer par votre propre vidéo :**

```bash
# 1. Remplacez la vidéo source
#    public/media/fruits-falling.mp4

# 2. Régénérez la séquence d'images (ffmpeg requis)
ffmpeg -y -i public/media/fruits-falling.mp4 -vf "scale=1280:-2" \
  -c:v libwebp -quality 80 -compression_level 6 \
  public/media/frames/frame-%03d.webp

# 3. Ajustez FRAME_COUNT dans src/components/home/hero-scroll.tsx
#    (= nombre d'images générées)
```

> Le fond blanc des images est automatiquement fondu dans le crème du site via
> `mix-blend-multiply` → raccord invisible. Aucune retouche nécessaire.
> Pour un vrai fond transparent, exportez plutôt des `.webp`/`.png` à canal alpha
> (le `mix-blend-multiply` peut alors être retiré dans `hero-scroll.tsx`).

### 🎬 La 2ᵉ vidéo (panier final)

Un **placeholder** est affiché tant que la vidéo n'est pas fournie. Pour l'activer :

1. Placez votre fichier dans `public/media/panier-final.mp4`.
2. Dans [`src/components/home/video-showcase.tsx`](src/components/home/video-showcase.tsx),
   décommentez l'import et le bloc `<ScrollVideo … />`, puis supprimez le placeholder.

Le composant [`ScrollVideo`](src/components/home/scroll-video.tsx) gère **les deux cas** via
la prop `mode` : `mode="blend"` (vidéo à fond blanc, fondu dans le design) ou
`mode="transparent"` (vidéo alpha WebM/HEVC superposée directement). La vidéo démarre
automatiquement quand elle entre dans le viewport et se met en pause en sortant.

---

## 🎬 Animations Framer Motion

- **Hero** : la chute des fruits se joue automatiquement puis est rejouable/scrubable au
  scroll, rendu canvas image par image ([`hero-scroll.tsx`](src/components/home/hero-scroll.tsx)).
- **Parallaxe souris** : la carte du hero suit légèrement la souris (desktop) — désactivée
  sur tactile et si `prefers-reduced-motion`.
- **Vidéo au scroll** : le composant `ScrollVideo` déclenche la lecture au viewport (2ᵉ vidéo).
- **Reveal au scroll** : sections révélées à l'apparition ([`Reveal`](src/components/shared/reveal.tsx)).
- **Boutons** : hover avec scale, élévation et ombres.
- **Transition de page** : fondu + glissement à chaque navigation
  ([`template.tsx`](src/app/template.tsx)).
- **Catalogue** : filtres animés + réagencement fluide des cartes (layout animations).

---

## 📱 Responsive

- **Desktop (≥ 1280px)** : hero sur 2 colonnes, grilles 3–4 colonnes.
- **Tablette (768–1279px)** : réorganisation adaptée, grilles 2 colonnes.
- **Mobile (< 768px)** : empilement vertical, **menu burger** (composant `Sheet`).

---

## 🗂 Structure

```
src/
├─ app/
│  ├─ layout.tsx          # Fonts, SEO global, Navbar + Footer
│  ├─ template.tsx        # Transition de page (Framer Motion)
│  ├─ page.tsx            # Accueil
│  ├─ produits/page.tsx
│  ├─ a-propos/page.tsx
│  ├─ contact/page.tsx
│  └─ globals.css         # Design tokens (OKLCH) + thèmes clair/sombre
├─ components/
│  ├─ ui/                 # shadcn/ui (button, card, input, textarea, label, badge, sheet)
│  ├─ layout/             # navbar, footer
│  ├─ home/               # hero-scroll (canvas), scroll-video, video-showcase, featured, values, cta
│  ├─ products/           # product-card, product-catalog
│  ├─ contact/            # contact-form
│  └─ shared/             # reveal, section-heading, page-transition
├─ hooks/                 # use-mouse-parallax
└─ lib/                   # utils (cn), motion (variants), products (données)
```

---

## 📨 Formulaire de contact

Validation **front-end complète** (nom, e-mail au bon format, sujet, message ≥ 10 caractères),
états de chargement/succès animés. À la soumission, les données sont **affichées dans la
console** (`📨 Nouveau message de contact`). Branchez votre API / service d'e-mail dans
[`src/components/contact/contact-form.tsx`](src/components/contact/contact-form.tsx)
(fonction `handleSubmit`).

---

## 🔍 SEO

Métadonnées dynamiques par page (`title` via template, `description`, Open Graph, Twitter card)
configurées dans `layout.tsx` et chaque `page.tsx`. Pages **pré-rendues en statique** pour
des performances optimales.

---

## 🎨 Personnalisation rapide

- **Couleurs** : variables OKLCH dans [`src/app/globals.css`](src/app/globals.css)
  (`--primary`, `--accent`, `--fruit-*`…).
- **Produits** : éditez le tableau dans [`src/lib/products.ts`](src/lib/products.ts).
- **Coordonnées** : `src/components/layout/footer.tsx` et `src/app/contact/page.tsx`.
- **Nom de marque** : « Verger & Co » dans `navbar.tsx` / `footer.tsx` / `layout.tsx`.

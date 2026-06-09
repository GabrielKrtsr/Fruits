/**
 * Données produits (catalogue de démonstration).
 * Remplacez par vos vrais produits ou branchez une API / CMS.
 */
export type ProductCategory = "Fruits" | "Légumes" | "Paniers";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  unit: string;
  emoji: string;
  description: string;
  season: string;
  origin: string;
  bio: boolean;
}

export const products: Product[] = [
  {
    id: "pomme-gala",
    name: "Pommes Gala",
    category: "Fruits",
    price: 2.9,
    unit: "kg",
    emoji: "🍎",
    description: "Croquantes et sucrées, cueillies à maturité dans nos vergers.",
    season: "Sept. – Mars",
    origin: "Vergers du Limousin",
    bio: true,
  },
  {
    id: "banane",
    name: "Bananes",
    category: "Fruits",
    price: 1.95,
    unit: "kg",
    emoji: "🍌",
    description: "Douces et fondantes, parfaites pour le goûter des petits.",
    season: "Toute l'année",
    origin: "Commerce équitable",
    bio: true,
  },
  {
    id: "orange",
    name: "Oranges à jus",
    category: "Fruits",
    price: 2.4,
    unit: "kg",
    emoji: "🍊",
    description: "Juteuses et gorgées de soleil, idéales pressées le matin.",
    season: "Déc. – Avril",
    origin: "Sicile",
    bio: false,
  },
  {
    id: "raisin",
    name: "Raisin noir",
    category: "Fruits",
    price: 3.8,
    unit: "kg",
    emoji: "🍇",
    description: "Grappes charnues au goût intense, sans pépins.",
    season: "Août – Oct.",
    origin: "Vallée du Rhône",
    bio: true,
  },
  {
    id: "fraise",
    name: "Fraises Gariguette",
    category: "Fruits",
    price: 4.5,
    unit: "barquette",
    emoji: "🍓",
    description: "Parfumées et délicates, la star du printemps.",
    season: "Avril – Juin",
    origin: "Périgord",
    bio: true,
  },
  {
    id: "kiwi",
    name: "Kiwis",
    category: "Fruits",
    price: 3.2,
    unit: "kg",
    emoji: "🥝",
    description: "Acidulés et riches en vitamine C, fondants à cœur.",
    season: "Nov. – Mai",
    origin: "Sud-Ouest",
    bio: false,
  },
  {
    id: "tomate",
    name: "Tomates anciennes",
    category: "Légumes",
    price: 3.6,
    unit: "kg",
    emoji: "🍅",
    description: "Variétés colorées, pleines de saveur pour vos salades.",
    season: "Juin – Sept.",
    origin: "Maraîchers locaux",
    bio: true,
  },
  {
    id: "carotte",
    name: "Carottes des sables",
    category: "Légumes",
    price: 1.8,
    unit: "kg",
    emoji: "🥕",
    description: "Tendres et sucrées, cultivées en pleine terre.",
    season: "Toute l'année",
    origin: "Créances",
    bio: true,
  },
  {
    id: "poivron",
    name: "Poivrons tricolores",
    category: "Légumes",
    price: 4.2,
    unit: "kg",
    emoji: "🫑",
    description: "Rouge, jaune, vert — croquants et savoureux.",
    season: "Juin – Oct.",
    origin: "Provence",
    bio: false,
  },
  {
    id: "salade",
    name: "Salade feuille de chêne",
    category: "Légumes",
    price: 1.2,
    unit: "pièce",
    emoji: "🥬",
    description: "Fraîche du matin, croquante et généreuse.",
    season: "Toute l'année",
    origin: "Maraîchers locaux",
    bio: true,
  },
  {
    id: "panier-saison",
    name: "Panier de saison",
    category: "Paniers",
    price: 24.9,
    unit: "panier",
    emoji: "🧺",
    description: "Un assortiment surprise de 6 à 8 fruits & légumes de saison.",
    season: "Toute l'année",
    origin: "Sélection du marché",
    bio: true,
  },
  {
    id: "panier-vitamine",
    name: "Panier vitaminé",
    category: "Paniers",
    price: 19.9,
    unit: "panier",
    emoji: "🍊",
    description: "Agrumes et fruits riches en vitamine C pour l'hiver.",
    season: "Nov. – Mars",
    origin: "Sélection du marché",
    bio: false,
  },
];

export const categories: Array<ProductCategory | "Tous"> = [
  "Tous",
  "Fruits",
  "Légumes",
  "Paniers",
];

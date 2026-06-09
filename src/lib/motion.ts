import type { Variants, Transition } from "framer-motion";

/** Courbe d'accélération douce et « premium » réutilisée partout. */
export const easeSoft: Transition["ease"] = [0.22, 1, 0.36, 1];

/** Conteneur qui orchestre l'apparition échelonnée de ses enfants (stagger). */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

/** Enfant qui apparaît en fondu + légère montée. */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeSoft },
  },
};

/** Apparition avec un léger zoom (cartes, médias). */
export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: easeSoft },
  },
};

/** Apparition latérale (depuis la gauche). */
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -36 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: easeSoft } },
};

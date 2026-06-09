"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

import { fadeInUp, staggerContainer } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Variante d'animation à appliquer (défaut : fondu + montée). */
  variants?: Variants;
  /** Décalage avant déclenchement quand l'élément entre dans le viewport. */
  amount?: number;
  /** N'animer qu'une seule fois (défaut : true). */
  once?: boolean;
  delay?: number;
}

/**
 * Enrobe un contenu pour le révéler quand il entre dans le viewport (scroll).
 * S'appuie sur `whileInView` de Framer Motion.
 */
export function Reveal({
  children,
  className,
  variants = fadeInUp,
  amount = 0.25,
  once = true,
  delay = 0,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={variants}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}

/**
 * Conteneur qui révèle ses enfants de façon échelonnée (stagger) au scroll.
 * Chaque enfant doit être un `<RevealItem>` (ou tout `motion` utilisant la variante).
 */
export function RevealGroup({
  children,
  className,
  amount = 0.2,
  once = true,
}: Omit<RevealProps, "variants" | "delay">) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  variants = fadeInUp,
}: Pick<RevealProps, "children" | "className" | "variants">) {
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}

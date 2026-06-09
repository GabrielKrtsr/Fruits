"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { easeSoft } from "@/lib/motion";

/**
 * Animation d'entrée jouée à chaque changement de route.
 * Utilisé dans `app/template.tsx`, qui se remonte à chaque navigation,
 * ce qui déclenche l'animation de fondu + glissement.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeSoft }}
    >
      {children}
    </motion.div>
  );
}

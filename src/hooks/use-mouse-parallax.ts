"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";

interface ParallaxResult {
  /** Décalage horizontal lissé, à multiplier par l'intensité voulue. */
  x: MotionValue<number>;
  /** Décalage vertical lissé. */
  y: MotionValue<number>;
}

/**
 * Suit très légèrement la souris pour un effet de parallaxe.
 * Renvoie des MotionValues normalisées entre -1 et 1, déjà lissées par un ressort.
 * Désactivé automatiquement sur les écrans tactiles / sans souris fine.
 */
export function useMouseParallax(): ParallaxResult {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 60, damping: 18, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 60, damping: 18, mass: 0.6 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!finePointer || reduced) return;

    const handleMove = (event: MouseEvent) => {
      // Normalise la position de la souris entre -1 et 1 par rapport au centre.
      const nx = (event.clientX / window.innerWidth) * 2 - 1;
      const ny = (event.clientY / window.innerHeight) * 2 - 1;
      rawX.set(nx);
      rawY.set(ny);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [rawX, rawY]);

  return { x, y };
}

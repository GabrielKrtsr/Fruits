"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

import { cn } from "@/lib/utils";

interface ScrollVideoProps {
  src: string;
  poster?: string;
  className?: string;
  /**
   * Mode d'intégration de la vidéo :
   * - "transparent" : la vidéo a un fond transparent (WebM/HEVC alpha) → superposée telle quelle.
   * - "blend" : la vidéo a un fond blanc → on le fond dans le design via un mode de fusion.
   */
  mode?: "transparent" | "blend";
  /** Sources additionnelles (ex. WebM alpha + MP4 de repli). */
  sources?: Array<{ src: string; type: string }>;
}

/**
 * Vidéo qui démarre automatiquement (muette, en boucle) lorsqu'elle entre
 * dans le viewport, et se met en pause lorsqu'elle en sort — pour les
 * performances et l'effet « déclenché au scroll ».
 */
export function ScrollVideo({
  src,
  poster,
  className,
  mode = "blend",
  sources,
}: ScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { amount: 0.4 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (inView) {
      // play() peut être rejeté si l'onglet n'est pas actif : on ignore l'erreur.
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [inView]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn("relative overflow-hidden", className)}
    >
      <video
        ref={videoRef}
        // Lecture déclenchée par le scroll : pas d'autoPlay natif.
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        className={cn(
          "h-full w-full object-cover",
          // En mode "blend", `mix-blend-multiply` fait disparaître le fond blanc
          // sur un arrière-plan clair. À remplacer par une vidéo transparente
          // (mode="transparent") dès que disponible.
          mode === "blend" && "mix-blend-multiply"
        )}
      >
        {sources?.map((s) => <source key={s.src} src={s.src} type={s.type} />)}
        <source src={src} type="video/mp4" />
        Votre navigateur ne prend pas en charge la lecture vidéo.
      </video>
    </motion.div>
  );
}

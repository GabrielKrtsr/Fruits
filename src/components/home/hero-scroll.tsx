"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, Leaf, Sparkles, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/motion";

/*
  ════════════════════════════════════════════════════════════════════════
  HERO « chute des fruits » — lecture auto + rejouable au scroll
  Mise en page 2 colonnes : texte à gauche, animation encadrée à droite.

  • À l'arrivée, la chute des fruits dans le panier se joue automatiquement.
  • Le scroll (court : ~½ écran sur desktop) permet de la rejouer / scruber.
  • Rendu canvas image par image (séquence .webp) → parfaitement fluide.

  👉 POUR REMPLACER PAR VOTRE VIDÉO : régénérez la séquence d'images dans
     /public/media/frames/ avec ffmpeg, puis ajustez FRAME_COUNT :
       ffmpeg -i MA_VIDEO.mp4 -vf "scale=1280:-2" -c:v libwebp -quality 80 \
         public/media/frames/frame-%03d.webp
  ════════════════════════════════════════════════════════════════════════
*/

const FRAME_COUNT = 125;
const LAST = FRAME_COUNT - 1;
const AUTOPLAY_MS = 2600; // durée de la lecture automatique
const framePath = (index: number) =>
  `/media/frames/frame-${String(index).padStart(3, "0")}.webp`;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function HeroScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetFrame = useRef(0);
  const currentFrame = useRef(0);
  const lastDrawn = useRef(-1);

  // Pilotage : autoplay tant que l'utilisateur n'a pas scrubé.
  const manualProgress = useRef(0);
  const hasScrolled = useRef(false);
  const autoStart = useRef<number | null>(null);

  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const inView = useInView(sectionRef, { amount: 0.4 });

  // Progression de scroll (utilisée pour le scrub sur desktop).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Parallaxe souris très légère sur la carte.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const cardX = useSpring(useTransform(mx, (v) => v * 10), {
    stiffness: 60,
    damping: 18,
  });
  const cardY = useSpring(useTransform(my, (v) => v * 10), {
    stiffness: 60,
    damping: 18,
  });

  // Préférences d'environnement.
  useEffect(() => {
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const deskMq = window.matchMedia("(min-width: 1024px)");
    const sync = () => {
      setReduced(motionMq.matches);
      setIsDesktop(deskMq.matches);
    };
    sync();
    motionMq.addEventListener("change", sync);
    deskMq.addEventListener("change", sync);
    return () => {
      motionMq.removeEventListener("change", sync);
      deskMq.removeEventListener("change", sync);
    };
  }, []);

  // Suivi souris (parallaxe), souris fine uniquement.
  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: MouseEvent) => {
      const r = cardRef.current?.getBoundingClientRect();
      if (!r) return;
      mx.set(((e.clientX - (r.left + r.width / 2)) / r.width) * 2);
      my.set(((e.clientY - (r.top + r.height / 2)) / r.height) * 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduced]);

  // Préchargement de la séquence d'images.
  useEffect(() => {
    let mounted = true;
    const imgs: HTMLImageElement[] = [];
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = framePath(i);
      if (i === 1) img.onload = () => mounted && setReady(true);
      imgs[i - 1] = img;
    }
    imagesRef.current = imgs;
    return () => {
      mounted = false;
    };
  }, []);

  // Sur desktop : le scroll prend la main (scrub) dès qu'on défile.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    manualProgress.current = v;
    if (isDesktop && v > 0.02) hasScrolled.current = true;
  });

  // (Re)déclenche la lecture auto quand le hero (ré)entre dans le viewport.
  useEffect(() => {
    if (inView && !hasScrolled.current && !reduced) {
      autoStart.current = null; // sera initialisé au prochain tick
      currentFrame.current = 0;
      lastDrawn.current = -1;
    }
  }, [inView, reduced]);

  // Boucle de rendu (dessin + autoplay + lissage).
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      lastDrawn.current = -1;
    };

    // Dessin « cover » (remplit la carte, ratio respecté = aucun rognage).
    const draw = (index: number) => {
      const img = imagesRef.current[index];
      if (!img || !img.complete || img.naturalWidth === 0) return false;
      const cw = canvas.width;
      const ch = canvas.height;
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = cw / ch;
      let dw: number;
      let dh: number;
      if (cr > ir) {
        dw = cw;
        dh = cw / ir;
      } else {
        dh = ch;
        dw = ch * ir;
      }
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      return true;
    };

    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const loop = (now: number) => {
      // 1) Détermine la frame cible : scrub manuel OU lecture auto.
      if (hasScrolled.current && isDesktop) {
        targetFrame.current = manualProgress.current * LAST;
      } else if (reduced) {
        targetFrame.current = 0; // mouvement réduit : image fixe (fruits)
      } else {
        if (autoStart.current === null) autoStart.current = now;
        const t = Math.min(1, (now - autoStart.current) / AUTOPLAY_MS);
        targetFrame.current = easeOutCubic(t) * LAST;
      }

      // 2) Lissage vers la frame cible.
      const diff = targetFrame.current - currentFrame.current;
      currentFrame.current += diff * 0.22;
      if (Math.abs(diff) < 0.15) currentFrame.current = targetFrame.current;

      const idx = Math.max(0, Math.min(LAST, Math.round(currentFrame.current)));
      if (idx !== lastDrawn.current) {
        if (draw(idx)) lastDrawn.current = idx;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [ready, isDesktop, reduced]);

  return (
    <section
      ref={sectionRef}
      className="relative h-auto lg:h-[155vh]"
      aria-label="Des fruits frais qui tombent dans le panier"
    >
      <div className="relative flex min-h-[calc(100vh-4.5rem)] items-center overflow-hidden lg:sticky lg:top-0 lg:h-screen lg:min-h-0">
        {/* Halo coloré discret */}
        <div className="hero-glow pointer-events-none absolute inset-0 -z-10 opacity-60" />

        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 pt-24 pb-12 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:py-0 lg:pt-20 lg:pb-0">
          {/* ── Colonne texte ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="flex flex-col items-start gap-6"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
            >
              <Sparkles className="size-4" />
              Frais, de saison &amp; cueillis à la main
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl"
            >
              La nature,
              <br />
              <span className="text-brand-gradient">
                croquée à pleines dents
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="max-w-md text-lg leading-relaxed text-muted-foreground"
            >
              Des fruits et légumes gorgés de soleil, cueillis à la main et
              réunis dans votre panier. Du verger à votre table, sans détour.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <Button asChild variant="gradient" size="lg">
                <Link href="/produits">
                  Découvrir nos produits
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/a-propos">Notre histoire</Link>
              </Button>
            </motion.div>

            <motion.ul
              variants={fadeInUp}
              className="mt-1 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground"
            >
              <li className="flex items-center gap-2">
                <Leaf className="size-4 text-fruit-green" />
                100 % de saison
              </li>
              <li className="flex items-center gap-2">
                <Truck className="size-4 text-fruit-orange" />
                Livraison locale 24 h
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="size-4 text-fruit-yellow" />
                Producteurs sélectionnés
              </li>
            </motion.ul>
          </motion.div>

          {/* ── Colonne média : carte encadrée avec l'animation ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative mx-auto w-full max-w-xl"
          >
            {/* Blobs décoratifs */}
            <div className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-fruit-orange/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-8 size-48 rounded-full bg-fruit-green/25 blur-3xl" />

            <motion.div
              ref={cardRef}
              style={isDesktop ? { x: cardX, y: cardY } : undefined}
              className="relative aspect-[1950/1064] w-full overflow-hidden rounded-3xl border border-border bg-white shadow-2xl shadow-foreground/10 ring-1 ring-black/5"
            >
              <canvas ref={canvasRef} className="h-full w-full" />

              {/* Loader tant que la 1ʳᵉ image n'est pas prête */}
              {!ready ? (
                <div className="absolute inset-0 flex items-center justify-center bg-white">
                  <span className="size-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
                </div>
              ) : null}

              {/* Petite étiquette */}
              <div className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
                🧺 Du verger à votre panier
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Indicateur de scroll (desktop) */}
        <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 lg:block">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-muted-foreground/30 p-1.5"
          >
            <span className="size-1.5 rounded-full bg-muted-foreground/50" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

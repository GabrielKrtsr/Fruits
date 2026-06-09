import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
// import { ScrollVideo } from "@/components/home/scroll-video";

/**
 * Section dédiée à la 2ᵉ vidéo (le panier final).
 * La chute des fruits est désormais gérée par le hero (HeroScroll).
 */
export function BasketShowcase() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Le résultat"
        title="Un panier prêt à savourer"
        description="Des fruits et légumes choisis un à un, réunis dans un panier généreux livré directement chez vous."
      />

      <Reveal className="mt-14" amount={0.2}>
        <div className="group relative aspect-video overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
          {/*
            REMPLACER PAR MA DEUXIEME VIDEO (panier final)
            1. Placez votre fichier dans /public/media/panier-final.mp4
               (et /panier-final.webm si vous avez une version transparente).
            2. Décommentez l'import de ScrollVideo en haut du fichier,
               puis remplacez le placeholder ci-dessous par :

            <ScrollVideo
              src="/media/panier-final.mp4"
              mode="blend"   // "blend" = fond blanc fondu ; "transparent" = vidéo alpha
              className="h-full w-full"
            />
          */}

          {/* Placeholder temporaire — visible tant que la 2ᵉ vidéo n'est pas fournie */}
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-fruit-green/10 via-background to-fruit-orange/10 p-8 text-center">
            <span className="text-7xl">🧺</span>
            <p className="font-display text-xl font-semibold text-foreground">
              Votre panier, prêt à savourer
            </p>
            <p className="max-w-md text-sm text-muted-foreground">
              Emplacement réservé à votre 2<sup>e</sup> vidéo (panier final).
              Déposez-la dans{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                /media/panier-final.mp4
              </code>{" "}
              et décommentez le composant vidéo.
            </p>
            <Badge variant="accent" className="mt-1">
              ▶ Lecture au défilement (au besoin)
            </Badge>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

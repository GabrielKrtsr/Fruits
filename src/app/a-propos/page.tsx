import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Quote, Sprout, Users, Calendar, Leaf } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { fadeInLeft, fadeInScale } from "@/lib/motion";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "L'histoire de Verger & Co : une famille de passionnés au service du goût, du circuit court et d'une agriculture respectueuse.",
};

const stats = [
  { icon: Calendar, value: "+15 ans", label: "au service du goût" },
  { icon: Users, value: "40", label: "producteurs partenaires" },
  { icon: Leaf, value: "100 %", label: "de saison" },
  { icon: Sprout, value: "24 h", label: "du champ au panier" },
];

export default function AProposPage() {
  return (
    <div className="pt-28 pb-10 sm:pt-32">
      {/* Intro */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal variants={fadeInLeft} className="flex flex-col gap-5">
            <Badge variant="accent" className="w-fit">
              Notre histoire
            </Badge>
            <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Une famille de{" "}
              <span className="text-brand-gradient">passionnés du goût</span>
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Tout a commencé sur un petit marché de quartier, avec une cagette
              de pommes et une conviction simple : un bon fruit, c&apos;est un
              fruit cultivé avec respect et cueilli au bon moment.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Depuis, Verger &amp; Co tisse des liens directs avec des
              producteurs qui partagent nos valeurs. Nous parcourons les vergers
              et les potagers pour vous rapporter le meilleur de chaque saison,
              sans intermédiaire ni compromis sur la fraîcheur.
            </p>
            <div className="flex gap-3">
              <Button asChild variant="gradient">
                <Link href="/produits">Découvrir nos produits</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contact">Nous rencontrer</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal variants={fadeInScale}>
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <div className="hero-glow absolute inset-0 rounded-full" />
              {/* REMPLACER PAR MON IMAGE (équipe / vergers) si souhaité */}
              <Image
                src="/media/fruits-floating.png"
                alt="Notre sélection de fruits et légumes de saison"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <RevealItem key={stat.label}>
              <Card className="flex flex-col items-center gap-2 p-8 text-center">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <stat.icon className="size-6" />
                </span>
                <p className="font-display text-3xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Valeurs / engagement */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Nos valeurs"
          title="Ce qui nous fait vibrer"
          description="Trois engagements qui guident chacune de nos décisions, de la cueillette à la livraison."
        />
        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Le respect du vivant",
              text: "Nous privilégions une agriculture raisonnée, des sols vivants et la biodiversité.",
            },
            {
              title: "La juste rémunération",
              text: "Nos producteurs sont payés à leur juste valeur, pour un modèle durable.",
            },
            {
              title: "Le goût avant tout",
              text: "On ne transige jamais sur la saveur : des variétés choisies pour leur caractère.",
            },
          ].map((value) => (
            <RevealItem key={value.title} className="h-full">
              <Card className="h-full p-7">
                <Quote className="size-8 text-accent" />
                <h3 className="mt-4 font-display text-xl font-semibold">
                  {value.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {value.text}
                </p>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
    </div>
  );
}

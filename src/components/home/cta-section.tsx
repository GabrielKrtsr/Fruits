import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { fadeInScale } from "@/lib/motion";

export function CtaSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal variants={fadeInScale}>
        <div className="relative overflow-hidden rounded-3xl bg-brand-gradient px-6 py-16 text-center shadow-2xl sm:px-12 md:py-20">
          {/* Cercles décoratifs */}
          <div className="pointer-events-none absolute -left-10 -top-10 size-44 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-12 -right-8 size-52 rounded-full bg-white/10 blur-2xl" />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Prêt à croquer la saison ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/90 sm:text-lg">
              Composez votre panier de fruits et légumes frais et faites-vous
              livrer en un clin d&apos;œil.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
              >
                <Link href="/produits">
                  Composer mon panier
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/contact">Nous contacter</Link>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

import { Leaf, HandHeart, Sprout, Truck } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { Card } from "@/components/ui/card";

const values = [
  {
    icon: Sprout,
    title: "Cultivé avec soin",
    description:
      "Des producteurs locaux qui respectent les saisons et la terre, pour un goût authentique.",
    color: "text-fruit-green",
    bg: "bg-fruit-green/10",
  },
  {
    icon: Leaf,
    title: "Frais & naturel",
    description:
      "Cueillis à maturité et livrés rapidement : un maximum de fraîcheur et de vitamines.",
    color: "text-fruit-orange",
    bg: "bg-fruit-orange/10",
  },
  {
    icon: Truck,
    title: "Circuit court",
    description:
      "Du champ à votre panier en moins de 24 h, sans intermédiaire inutile.",
    color: "text-fruit-red",
    bg: "bg-fruit-red/10",
  },
  {
    icon: HandHeart,
    title: "Juste & engagé",
    description:
      "Une rémunération équitable des producteurs et un emballage éco-responsable.",
    color: "text-fruit-berry",
    bg: "bg-fruit-berry/10",
  },
];

export function ValuesSection() {
  return (
    <section className="bg-muted/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Nos engagements"
          title="Pourquoi nous choisir"
          description="Bien plus qu'un primeur : un partenaire de votre alimentation saine et gourmande."
        />

        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <RevealItem key={value.title} className="h-full">
              <Card className="flex h-full flex-col gap-4 p-6 transition-shadow duration-300 hover:shadow-lg">
                <span
                  className={`flex size-12 items-center justify-center rounded-2xl ${value.bg} ${value.color}`}
                >
                  <value.icon className="size-6" />
                </span>
                <h3 className="font-display text-lg font-semibold">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

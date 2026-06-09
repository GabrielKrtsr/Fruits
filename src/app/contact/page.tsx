import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { ContactForm } from "@/components/contact/contact-form";
import { fadeInLeft } from "@/lib/motion";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Une question, une commande spéciale ou une envie de partenariat ? Contactez Verger & Co par téléphone, e-mail ou via notre formulaire.",
};

const infos = [
  {
    icon: Phone,
    label: "Téléphone",
    value: "01 23 45 67 89",
    href: "tel:+33123456789",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "bonjour@verger-co.fr",
    href: "mailto:bonjour@verger-co.fr",
  },
  {
    icon: MapPin,
    label: "Adresse",
    value: "12 rue du Marché, 75011 Paris",
  },
  {
    icon: Clock,
    label: "Horaires",
    value: "Mar. – Dim. · 8 h – 19 h 30",
  },
];

export default function ContactPage() {
  return (
    <div className="pt-28 pb-10 sm:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Parlons fruits & légumes"
          description="Une question, une commande spéciale, une envie de partenariat ? Nous sommes à votre écoute."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-5">
          {/* Coordonnées */}
          <Reveal variants={fadeInLeft} className="lg:col-span-2">
            <div className="flex flex-col gap-4">
              {infos.map((info) => {
                const content = (
                  <Card className="flex items-center gap-4 p-5 transition-shadow duration-300 hover:shadow-md">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <info.icon className="size-5" />
                    </span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {info.label}
                      </p>
                      <p className="font-medium text-foreground">{info.value}</p>
                    </div>
                  </Card>
                );
                return info.href ? (
                  <a key={info.label} href={info.href} className="block">
                    {content}
                  </a>
                ) : (
                  <div key={info.label}>{content}</div>
                );
              })}

              {/* Carte (placeholder) */}
              <Card className="overflow-hidden p-0">
                <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-fruit-green/15 to-fruit-orange/15 text-center text-sm text-muted-foreground">
                  <span className="flex flex-col items-center gap-2">
                    <MapPin className="size-6 text-primary" />
                    Emplacement carte
                    <span className="text-xs">
                      (intégrez ici une carte Google Maps / Leaflet)
                    </span>
                  </span>
                </div>
              </Card>
            </div>
          </Reveal>

          {/* Formulaire */}
          <Reveal className="lg:col-span-3">
            <Card className="p-6 sm:p-8">
              <h2 className="font-display text-xl font-semibold">
                Envoyez-nous un message
              </h2>
              <p className="mt-1 mb-6 text-sm text-muted-foreground">
                Remplissez le formulaire ci-dessous, nous vous répondons sous
                24 h.
              </p>
              <ContactForm />
            </Card>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

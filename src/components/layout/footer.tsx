import Link from "next/link";
import { Leaf, Mail, MapPin, Phone } from "lucide-react";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/produits", label: "Produits" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-muted/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex size-10 items-center justify-center rounded-full bg-brand-gradient text-white shadow-md">
              <Leaf className="size-5" />
            </span>
            <span className="font-display text-xl font-bold tracking-tight">
              Verger&nbsp;<span className="text-brand-gradient">&amp;&nbsp;Co</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Des fruits et légumes frais, de saison et cueillis à la main par des
            producteurs passionnés. Du verger à votre table, sans détour.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
            Navigation
          </h3>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2.5">
              <Phone className="size-4 text-primary" />
              <a href="tel:+33123456789" className="hover:text-primary">
                01 23 45 67 89
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="size-4 text-primary" />
              <a href="mailto:bonjour@verger-co.fr" className="hover:text-primary">
                bonjour@verger-co.fr
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>12 rue du Marché, 75011 Paris</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} Verger &amp; Co. Tous droits réservés.
          </p>
          <p className="flex items-center gap-1.5">
            Fait avec passion <span className="text-fruit-red">♥</span> et des
            produits de saison
          </p>
        </div>
      </div>
    </footer>
  );
}

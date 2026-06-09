import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { products } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealGroup } from "@/components/shared/reveal";
import { ProductCard } from "@/components/products/product-card";

export function FeaturedProducts() {
  const featured = products
    .filter((p) => p.category === "Fruits")
    .slice(0, 3);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Nos coups de cœur"
        title="Les stars du moment"
        description="Une sélection des fruits les plus savoureux du marché, à déguster sans modération."
      />

      <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </RevealGroup>

      <div className="mt-12 flex justify-center">
        <Button asChild size="lg" variant="default">
          <Link href="/produits">
            Voir tout le catalogue
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}

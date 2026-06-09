import type { Metadata } from "next";

import { SectionHeading } from "@/components/shared/section-heading";
import { ProductCatalog } from "@/components/products/product-catalog";

export const metadata: Metadata = {
  title: "Nos produits",
  description:
    "Découvrez notre catalogue de fruits et légumes frais et de saison : pommes, fraises, tomates anciennes, paniers gourmands et bien plus.",
};

export default function ProduitsPage() {
  return (
    <div className="pt-28 pb-10 sm:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Le marché"
          title="Nos fruits & légumes"
          description="Tous nos produits sont sélectionnés chaque matin pour leur fraîcheur et leur saveur. Filtrez par catégorie pour trouver votre bonheur."
        />

        <div className="mt-14">
          <ProductCatalog />
        </div>
      </div>
    </div>
  );
}

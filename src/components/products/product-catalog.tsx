"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  categories,
  products,
  type ProductCategory,
} from "@/lib/products";
import { cn } from "@/lib/utils";
import { staggerContainer } from "@/lib/motion";
import { ProductCard } from "@/components/products/product-card";

type Filter = ProductCategory | "Tous";

export function ProductCatalog() {
  const [active, setActive] = useState<Filter>("Tous");

  const visible = useMemo(
    () =>
      active === "Tous"
        ? products
        : products.filter((p) => p.category === active),
    [active]
  );

  return (
    <div>
      {/* Filtres par catégorie */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => {
          const isActive = active === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              className={cn(
                "relative rounded-full px-5 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isActive ? (
                <motion.span
                  layoutId="catalog-filter"
                  className="absolute inset-0 -z-10 rounded-full bg-brand-gradient shadow-md"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              ) : (
                <span className="absolute inset-0 -z-10 rounded-full border border-border bg-background/60" />
              )}
              {category}
            </button>
          );
        })}
      </div>

      {/* Grille animée */}
      <motion.div
        layout
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

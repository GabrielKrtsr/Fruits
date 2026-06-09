"use client";

import { motion } from "framer-motion";
import { Leaf, Plus } from "lucide-react";

import type { Product } from "@/lib/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { fadeInUp } from "@/lib/motion";

const categoryTint: Record<Product["category"], string> = {
  Fruits: "from-fruit-red/15 to-fruit-orange/15",
  Légumes: "from-fruit-green/15 to-fruit-yellow/15",
  Paniers: "from-fruit-orange/15 to-fruit-green/15",
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div variants={fadeInUp} whileHover={{ y: -6 }} className="h-full">
      <Card className="group flex h-full flex-col overflow-hidden border-border/70 transition-shadow duration-300 hover:shadow-xl">
        {/* Visuel emoji sur fond dégradé (remplaçable par une vraie photo) */}
        <div
          className={`relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br ${categoryTint[product.category]}`}
        >
          <motion.span
            className="text-7xl drop-shadow-sm"
            whileHover={{ scale: 1.12, rotate: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            {product.emoji}
          </motion.span>
          <div className="absolute left-3 top-3 flex gap-2">
            <Badge variant="secondary">{product.category}</Badge>
            {product.bio ? (
              <Badge variant="bio">
                <Leaf className="size-3" />
                Bio
              </Badge>
            ) : null}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-lg font-semibold leading-tight">
              {product.name}
            </h3>
            <p className="whitespace-nowrap font-display text-lg font-bold text-primary">
              {product.price.toFixed(2).replace(".", ",")} €
              <span className="text-xs font-normal text-muted-foreground">
                /{product.unit}
              </span>
            </p>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <dl className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <div className="flex gap-1">
              <dt className="font-medium text-foreground/70">Saison :</dt>
              <dd>{product.season}</dd>
            </div>
            <div className="flex gap-1">
              <dt className="font-medium text-foreground/70">Origine :</dt>
              <dd>{product.origin}</dd>
            </div>
          </dl>

          <Button
            variant="outline"
            size="sm"
            className="mt-auto w-full group-hover:border-primary/50 group-hover:bg-primary/5"
          >
            <Plus className="size-4" />
            Ajouter au panier
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

import { HeroScroll } from "@/components/home/hero-scroll";
import { BasketShowcase } from "@/components/home/video-showcase";
import { FeaturedProducts } from "@/components/home/featured-products";
import { ValuesSection } from "@/components/home/values-section";
import { CtaSection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroScroll />
      <FeaturedProducts />
      <BasketShowcase />
      <ValuesSection />
      <CtaSection />
    </>
  );
}

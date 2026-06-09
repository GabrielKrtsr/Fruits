import { PageTransition } from "@/components/shared/page-transition";

/**
 * `template.tsx` se remonte à chaque navigation (contrairement à `layout.tsx`),
 * ce qui permet de rejouer l'animation d'entrée à chaque changement de route.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}

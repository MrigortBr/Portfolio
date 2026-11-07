import { RefObject, useEffect, useState } from "react";

/**
 * true enquanto o elemento está na tela (a partir de `threshold` visível) e
 * false quando ele sai — assim as animações de entrada repetem a cada visita.
 */
export function useInView(ref: RefObject<Element | null>, threshold = 0.15) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= threshold)
          setInView(true);
        else if (!entry.isIntersecting) setInView(false);
      },
      { threshold: [0, threshold] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return inView;
}

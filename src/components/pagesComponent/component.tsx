import { Dispatch, RefObject, SetStateAction, useEffect, useRef } from "react";
import { PageContainer } from "./style";
import { Pages } from "@/data/page";

type prop = {
  refs: RefObject<(HTMLDivElement | null)[]>;
  pageIndex: number;
  setPageIndex: Dispatch<SetStateAction<number>>;
};

const TOTAL_PAGES = Pages.length;
// Tempo mínimo entre trocas (duração aproximada do scroll suave)
const COOLDOWN_MS = 700;
// Silêncio necessário para considerar que o gesto terminou
const GESTURE_IDLE_MS = 200;
// Ignora "tremidas" mínimas do touchpad
const MIN_DELTA = 4;

/** Algum elemento rolável entre o alvo e o container ainda pode rolar nesse sentido? */
function canScrollInside(
  target: EventTarget | null,
  container: HTMLElement,
  deltaY: number
) {
  let el = target as HTMLElement | null;
  while (el && el !== container) {
    const { overflowY } = getComputedStyle(el);
    const scrollable =
      (overflowY === "auto" || overflowY === "scroll") &&
      el.scrollHeight > el.clientHeight + 1;
    if (scrollable) {
      if (deltaY > 0 && el.scrollTop + el.clientHeight < el.scrollHeight - 1)
        return true;
      if (deltaY < 0 && el.scrollTop > 0) return true;
    }
    el = el.parentElement;
  }
  return false;
}

export default function PagesComponent({
  refs,
  pageIndex,
  setPageIndex,
}: prop) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lockUntil = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Um gesto (roda do mouse ou touchpad com inércia) gera dezenas de eventos.
    // Só o primeiro troca a página; enquanto os eventos continuarem chegando,
    // a trava é estendida, e só libera quando o gesto termina.
    const handleWheel = (e: WheelEvent) => {
      const now = performance.now();

      // Seção com conteúdo rolável (ex.: Competências em telas baixas):
      // a roda rola o conteúdo primeiro; a página só troca num gesto novo,
      // depois que o conteúdo chegou ao fim.
      if (canScrollInside(e.target, container, e.deltaY)) {
        lockUntil.current = Math.max(lockUntil.current, now + GESTURE_IDLE_MS);
        return;
      }

      if (now < lockUntil.current) {
        lockUntil.current = Math.max(lockUntil.current, now + GESTURE_IDLE_MS);
        return;
      }

      if (Math.abs(e.deltaY) < MIN_DELTA) return;

      if (e.deltaY > 0 && pageIndex < TOTAL_PAGES - 1) {
        lockUntil.current = now + COOLDOWN_MS;
        setPageIndex(pageIndex + 1);
      } else if (e.deltaY < 0 && pageIndex > 0) {
        lockUntil.current = now + COOLDOWN_MS;
        setPageIndex(pageIndex - 1);
      }
    };

    // Listener NÃO passivo: assim o handler roda antes do navegador rolar o
    // conteúdo e enxerga a posição de rolagem anterior ao giro da roda.
    // (O onWheel do React é passivo, e o Chrome rolava antes de o código ver.)
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [pageIndex, setPageIndex]);

  return (
    <PageContainer ref={containerRef}>
      {Pages.map((p, i) => {
        return (
          <p.component
            key={i}
            setPageIndex={setPageIndex}
            ref={(el: HTMLDivElement | null) => {
              refs.current[i] = el;
            }}
          />
        );
      })}
    </PageContainer>
  );
}

import { RefObject, useLayoutEffect } from "react";

/** Crescimento máximo (px) aplicado em --g */
const MAX_GROWTH = 260;
/** Folga mantida no fim do container (px) */
const FIT_MARGIN = 4;

/**
 * Ajusta a variável CSS --g do container para o conteúdo ocupar a altura
 * disponível: busca binária pelo maior valor que ainda cabe.
 * O quanto o conteúdo ocupa depende da largura (quebra de linha),
 * por isso é medido em vez de calculado só por CSS.
 */
export function useFitToHeight(
  ref: RefObject<HTMLElement | null>,
  maxGrowth = MAX_GROWTH
) {
  // useLayoutEffect: o primeiro ajuste acontece antes de a tela ser pintada,
  // então o conteúdo já aparece no tamanho final (sem "pular" depois)
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // só refaz o ajuste quando o tamanho do container realmente muda
    let lastSize = "";
    let frame = 0;

    // O container só fica maior que a área visível (scrollHeight >
    // clientHeight) quando o conteúdo não cabe.
    const fits = () => el.scrollHeight <= el.clientHeight + 1;

    const fit = () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        el.style.setProperty("--g", "0px");
        return;
      }

      // Durante a busca o conteúdo passa da altura várias vezes. Com overflow
      // escondido, nenhuma barra de rolagem aparece/some no meio do caminho —
      // era isso que mudava a largura do texto e fazia a tela "piscar".
      const prevOverflow = el.style.overflowY;
      el.style.overflowY = "hidden";

      let low = 0;
      let high = maxGrowth;
      for (let i = 0; i < 9; i++) {
        const mid = (low + high) / 2;
        el.style.setProperty("--g", `${mid}px`);
        if (fits()) low = mid;
        else high = mid;
      }
      // pequena folga para não encostar no limite
      el.style.setProperty(
        "--g",
        `${Math.max(0, Math.floor(low) - FIT_MARGIN)}px`
      );

      el.style.overflowY = prevOverflow;
      // a barra pode surgir agora (telas baixas); registra o tamanho final
      // para que essa mudança não dispare outro ajuste em loop
      lastSize = `${el.offsetWidth}x${el.offsetHeight}`;
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fit);
    };

    fit();
    document.fonts?.ready.then(schedule);

    const observer = new ResizeObserver(() => {
      const size = `${el.offsetWidth}x${el.offsetHeight}`;
      if (size !== lastSize) schedule();
    });
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [ref, maxGrowth]);
}

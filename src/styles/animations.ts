import { keyframes } from "styled-components";

/*
 * Animações de entrada compartilhadas entre as seções.
 * Padrão do portfólio: simples, tocam ao entrar na seção e repetem a cada
 * visita. Usam escala/rotação/opacidade (evitam translate) para não mexer no
 * layout nem criar rolagem extra.
 */

export const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
/** easing com leve "passada" do ponto final — efeito de mola */
export const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";

/** seletor para "quando o container estiver visível" */
export const whenVisible = "[data-visible='true']";

export const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

export const popIn = keyframes`
  from { opacity: 0; transform: scale(0.6); }
  to   { opacity: 1; transform: none; }
`;

export const softPopIn = keyframes`
  from { opacity: 0; transform: scale(0.94); }
  to   { opacity: 1; transform: none; }
`;

export const iconIn = keyframes`
  from { opacity: 0; transform: rotate(-120deg) scale(0.3); }
  to   { opacity: 1; transform: none; }
`;

/** cresce de cima para baixo (linhas de timeline) */
export const growDown = keyframes`
  from { transform: scaleY(0); }
  to   { transform: scaleY(1); }
`;

/** anel que pulsa em volta de um ponto ("atual") */
export const pulseRing = keyframes`
  0%   { transform: scale(1); opacity: 0.55; }
  80%, 100% { transform: scale(2.4); opacity: 0; }
`;

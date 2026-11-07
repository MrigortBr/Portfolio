import styled, { css, keyframes } from "styled-components";
import type { SkillGroup } from "./data";

const MOBILE = "@media (max-width: 768px)";
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
/** easing com leve "passada" do ponto final — dá o efeito de mola */
const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";

/* ---------- Animações de entrada ----------
   Todas usam escala/rotação (nunca translate), para não ultrapassar a caixa
   dos cards e não atrapalhar a medição de altura do useFitToHeight. */

const glowIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const iconIn = keyframes`
  from { opacity: 0; transform: rotate(-120deg) scale(0.3); }
  to   { opacity: 1; transform: none; }
`;

const popIn = keyframes`
  from { opacity: 0; transform: scale(0.6); }
  to   { opacity: 1; transform: none; }
`;

const tileIn = keyframes`
  0%   { opacity: 0; transform: scale(0.4) rotate(-10deg); }
  60%  { opacity: 1; transform: scale(1.06) rotate(2deg); }
  100% { opacity: 1; transform: none; }
`;

/* brilho que atravessa o card da Stack principal uma vez */
const sheen = keyframes`
  from { background-position: 160% 0; }
  to   { background-position: -60% 0; }
`;

/** seletor: "quando o card que me contém estiver visível" */
const whenVisible = "[data-visible='true']";

export const StackContainer = styled.div`
  flex-direction: column;
  gap: 1.6vh;
  user-select: none;
  overflow: hidden;

  ${MOBILE} {
    height: auto !important;
    min-height: 100%;
    overflow: visible;
    padding-top: 4vh !important;
    /* espaço para a Activity Bar flutuante */
    padding-bottom: 19vh !important;
  }
`;

export const Grid = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-areas:
    "core core languages databases"
    "front front back back"
    "data data ai ai"
    "devops devops tools tools";
  /* linhas no tamanho do conteúdo: quem preenche a altura é o --g (abaixo) */
  gap: 12px;
  padding: 0 1vw 1vh 0;

  /* --g (px) é calculado pelo componente (useFitToHeight): é o quanto chips,
     ícones e textos crescem para o conteúdo preencher a altura disponível. */
  --g: 0px;

  /* se não couber na altura, rola por dentro (a roda rola aqui antes de trocar de seção) */
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.custom?.searchBorder}
    transparent;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-areas:
      "core core"
      "languages databases"
      "front back"
      "data ai"
      "devops tools";
  }

  ${MOBILE} {
    grid-template-columns: 1fr;
    grid-template-areas:
      "core"
      "languages"
      "databases"
      "front"
      "back"
      "data"
      "ai"
      "devops"
      "tools";
    overflow: visible;
    padding: 0;
    gap: 12px;
  }
`;

export const GroupCard = styled.section<{
  $area: SkillGroup["id"];
  $core: boolean;
}>`
  grid-area: ${({ $area }) => $area};
  position: relative;
  display: flex;
  flex-direction: column;
  padding: calc(12px + var(--g) * 0.06) calc(14px + var(--g) * 0.06)
    calc(14px + var(--g) * 0.06);
  border-radius: calc(16px + var(--g) * 0.02);
  background: ${({ theme }) =>
    `color-mix(in srgb, ${theme.colors.background} 55%, transparent)`};
  border: 1px solid ${({ theme }) => theme.colors.custom?.border};

  /* entrada do card: aparece crescendo levemente, em cascata (--delay) */
  opacity: 0;
  transform: scale(0.96);
  transition:
    opacity 500ms ease var(--delay),
    transform 650ms ${EASE} var(--delay),
    border-color 250ms ease;

  &${whenVisible} {
    opacity: 1;
    transform: none;
  }

  /* no celular cada card anima ao aparecer na tela: sem atraso de cascata */
  ${MOBILE} {
    --delay: 0ms !important;
  }

  /* o brilho colorido do canto acende depois que o card entra */
  &::before {
    opacity: 0;
  }
  &${whenVisible}::before {
    animation: ${glowIn} 900ms ease calc(var(--delay) + 250ms) both;
  }

  /* brilho suave na cor do grupo, vindo do canto */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    background: radial-gradient(
      120% 90% at 0% 0%,
      color-mix(in srgb, var(--accent) 14%, transparent),
      transparent 60%
    );
  }

  ${({ $core }) =>
    $core &&
    css`
      &::before {
        background: linear-gradient(
          135deg,
          color-mix(in srgb, var(--accent) 24%, transparent),
          transparent 75%
        );
      }

      /* faixa de luz que passa uma vez pelo card */
      &::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        background: linear-gradient(
            105deg,
            transparent 40%,
            rgba(255, 255, 255, 0.14) 50%,
            transparent 60%
          )
          no-repeat;
        background-size: 250% 100%;
        background-position: 160% 0;
      }
      &${whenVisible}::after {
        animation: ${sheen} 1100ms ease-in-out 900ms both;
      }
    `}

  &:hover {
    border-color: color-mix(in srgb, var(--accent) 45%, transparent);
  }

  & > * {
    position: relative;
  }

  @media (prefers-reduced-motion: reduce) {
    &,
    & *,
    &::before,
    &::after {
      animation: none !important;
      transition: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }
`;

export const GroupHeader = styled.header`
  display: flex;
  align-items: center;
  gap: calc(12px + var(--g) * 0.02);
  margin-bottom: calc(10px + var(--g) * 0.06);

  & h2 {
    font-family: Inter, sans-serif;
    font-size: calc(1rem + var(--g) * 0.02);
    font-weight: 600;
    letter-spacing: -0.01em;
    color: ${({ theme }) => theme.colors.text};
  }

  & p {
    margin-top: 1px;
    font-size: calc(0.78rem + var(--g) * 0.01);
    color: ${({ theme }) => theme.colors.customPallete?.unselectedColor};
  }
`;

export const GroupIcon = styled.span`
  flex-shrink: 0;
  width: calc(32px + var(--g) * 0.05);
  height: calc(32px + var(--g) * 0.05);
  display: grid;
  place-items: center;
  border-radius: calc(10px + var(--g) * 0.01);
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 16%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);

  & > svg {
    width: calc(18px + var(--g) * 0.025);
    height: calc(18px + var(--g) * 0.025);
  }

  ${GroupCard}${whenVisible} & {
    animation: ${iconIn} 700ms ${SPRING} calc(var(--delay) + 120ms) backwards;
  }
`;

export const Count = styled.span`
  margin-left: auto;
  padding: 2px 9px;
  border-radius: 99px;
  font-size: calc(0.72rem + var(--g) * 0.008);
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.colors.customPallete?.unselectedColor};
  border: 1px solid ${({ theme }) => theme.colors.custom?.border};

  opacity: 0;
  ${GroupCard}${whenVisible} & {
    opacity: 1;
    animation: ${popIn} 450ms ${SPRING} calc(var(--delay) + 300ms) backwards;
  }
`;

/* ---------- Chips (grupos comuns) ---------- */

export const Chips = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: calc(8px + var(--g) * 0.035);
  list-style: none;
`;

export const Chip = styled.li`
  display: inline-flex;
  align-items: center;
  gap: calc(7px + var(--g) * 0.015);
  padding: calc(4px + var(--g) * 0.035) calc(9px + var(--g) * 0.045);
  border-radius: calc(9px + var(--g) * 0.015);
  font-size: calc(0.8rem + var(--g) * 0.016);
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.customPallete?.backgroundHover};
  border: 1px solid ${({ theme }) => theme.colors.custom?.border};
  transition:
    transform 200ms ${EASE},
    border-color 200ms ease;

  & > svg {
    flex-shrink: 0;
    width: calc(15px + var(--g) * 0.03);
    height: calc(15px + var(--g) * 0.03);
  }

  &:hover {
    transform: translateY(-2px);
    border-color: color-mix(in srgb, var(--accent) 60%, transparent);
  }

  @media (max-width: 1366px) {
    font-size: calc(0.76rem + var(--g) * 0.016);
  }

  /* chips aparecem um a um (--i = posição no card) */
  opacity: 0;
  ${GroupCard}${whenVisible} & {
    opacity: 1;
    animation: ${popIn} 450ms ${SPRING}
      calc(var(--delay) + 200ms + var(--i) * 40ms) backwards;
  }
`;

/* ---------- Stack principal (destaque) ---------- */

export const CoreList = styled.ul`
  display: grid;
  /* desktop: os 7 itens da stack principal sempre em uma linha */
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: calc(8px + var(--g) * 0.03);
  list-style: none;
  /* os blocos crescem para preencher a altura do card */
  flex: 1;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(auto-fit, minmax(78px, 1fr));
    gap: 10px;
  }
`;

export const CoreItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: calc(8px + var(--g) * 0.03);
  padding: 10px 4px 8px;
  border-radius: calc(12px + var(--g) * 0.015);
  text-align: center;
  font-size: calc(clamp(0.68rem, 0.8vw, 0.8rem) + var(--g) * 0.012);
  white-space: nowrap;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.customPallete?.backgroundHover};
  border: 1px solid ${({ theme }) => theme.colors.custom?.border};
  transition:
    transform 220ms ${EASE},
    border-color 220ms ease;

  & > svg {
    width: calc(26px + var(--g) * 0.1);
    height: calc(26px + var(--g) * 0.1);
  }

  &:hover {
    transform: translateY(-3px);
    border-color: color-mix(in srgb, var(--accent) 60%, transparent);
  }

  ${MOBILE} {
    & > svg {
      width: 22px;
      height: 22px;
    }
  }

  /* blocos da Stack principal "saltam" em sequência */
  opacity: 0;
  ${GroupCard}${whenVisible} & {
    opacity: 1;
    animation: ${tileIn} 650ms ${EASE}
      calc(var(--delay) + 150ms + var(--i) * 70ms) backwards;
  }
`;

import styled, { css, keyframes } from "styled-components";
import {
  fadeIn,
  popIn,
  softPopIn,
  SPRING,
  whenVisible,
} from "@/styles/animations";

export type SlidePosition = "active" | "prev" | "next" | "hidden";

const MOBILE = "@media (max-width: 768px)";
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fill = keyframes`
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
`;

/* ---------- Animações de entrada ----------
   Disparadas quando a seção está visível (data-visible no container).
   Os seletores usam a classe da própria seção de projetos. */

const SECTION_SEL = `.projects-section${whenVisible}`;

/** botões de navegação mantêm o translateY(-50%) durante a animação */
const navIn = keyframes`
  from { opacity: 0; transform: translateY(-50%) scale(0.4); }
  to   { opacity: 1; transform: translateY(-50%); }
`;

/* ---------- Estrutura ---------- */

export const ProjectsContainer = styled.div.attrs({
  className: "projects-section",
})`
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
    gap: 1.4vh;
  }
`;

export const ProjectsHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 4px 16px;
  width: 100%;
  padding-right: 1vw;
`;

export const ProjectsTitle = styled.h1`
  color: ${({ theme }) => theme.colors.customPallete?.purplePrimary};
  font-size: clamp(2.1875rem, 2.6vw, 6.25rem);
  position: relative;
  padding-left: 10px;

  &::before {
    content: "";
    position: absolute;
    width: 5px;
    height: 80%;
    top: 10%;
    left: 0;
    background-color: ${({ theme }) =>
      theme.colors.customPallete?.purpleTranslucent};
  }
`;

export const Counter = styled.span`
  font-family: Inter, sans-serif;
  font-variant-numeric: tabular-nums;
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.customPallete?.unselectedColor};
  white-space: nowrap;

  & > strong {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }
`;

/* ---------- Palco do carrossel ---------- */

export const Stage = styled.div`
  /* largura do slide ativo: cabe na largura e na altura, sempre 16:9 */
  --w: min(64cqw, calc(90cqh * 16 / 9));
  --shift: 60%;

  position: relative;
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
  container-type: size;
  perspective: 1400px;
  overflow: hidden;
  outline: none;
  touch-action: pan-y;
  mask-image: linear-gradient(
    to right,
    transparent 0,
    #000 7%,
    #000 93%,
    transparent 100%
  );

  &:focus-visible {
    box-shadow: inset 0 0 0 2px
      ${({ theme }) => theme.colors.customPallete?.purplePrimary};
    border-radius: 12px;
  }

  ${MOBILE} {
    --w: 80cqw;
    --shift: 74%;
    flex: 0 0 auto;
    height: 52vw;
    mask-image: none;
  }

  /* entrada: o palco do carrossel cresce levemente */
  ${SECTION_SEL} & {
    animation: ${softPopIn} 750ms ${SPRING} 80ms backwards;
  }
`;

const positions: Record<SlidePosition, ReturnType<typeof css>> = {
  active: css`
    transform: translate(-50%, -50%);
    opacity: 1;
    z-index: 3;
    filter: none;
    cursor: zoom-in;
  `,
  prev: css`
    transform: translate(-50%, -50%) translateX(calc(var(--shift) * -1))
      scale(0.74) rotateY(16deg);
    opacity: 0.7;
    z-index: 2;
    filter: brightness(0.55) saturate(0.7);
    cursor: pointer;
  `,
  next: css`
    transform: translate(-50%, -50%) translateX(var(--shift)) scale(0.74)
      rotateY(-16deg);
    opacity: 0.7;
    z-index: 2;
    filter: brightness(0.55) saturate(0.7);
    cursor: pointer;
  `,
  hidden: css`
    transform: translate(-50%, -50%) scale(0.6);
    opacity: 0;
    z-index: 1;
    pointer-events: none;
  `,
};

export const Slide = styled.div<{ $pos: SlidePosition }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--w);
  aspect-ratio: 16 / 9;
  border-radius: 18px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.custom?.header};
  border: 1px solid ${({ theme }) => theme.colors.custom?.border};
  will-change: transform;
  transition:
    transform 650ms ${EASE},
    opacity 650ms ease,
    filter 650ms ease,
    box-shadow 650ms ease;

  ${({ $pos }) => positions[$pos]}

  box-shadow: ${({ $pos, theme }) =>
    $pos === "active"
      ? `0 24px 60px -20px ${theme.colors.customPallete?.purpleTranslucent}, 0 10px 30px -10px rgba(0,0,0,.45)`
      : "0 10px 30px -12px rgba(0,0,0,.4)"};

  &:hover {
    filter: ${({ $pos }) =>
      $pos === "prev" || $pos === "next"
        ? "brightness(0.8) saturate(0.9)"
        : undefined};
  }

  /* leve escurecimento embaixo para o selo "Ampliar" ficar legível */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.35),
      transparent 22%,
      transparent 75%,
      rgba(0, 0, 0, 0.35)
    );
    opacity: ${({ $pos }) => ($pos === "active" ? 1 : 0)};
    transition: opacity 400ms ease;
    pointer-events: none;
    z-index: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: opacity 200ms ease;
  }
`;

export const Shot = styled.div<{ $visible: boolean }>`
  position: absolute;
  inset: 0;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 700ms ease;

  & > img {
    object-fit: cover;
    object-position: top center;
    -webkit-user-drag: none;
  }
`;

/* Barras de progresso estilo "stories" */
export const Progress = styled.div<{ $paused: boolean }>`
  position: absolute;
  top: 12px;
  left: 14px;
  right: 14px;
  display: flex;
  gap: 6px;
  z-index: 2;

  & span {
    animation-play-state: ${({ $paused }) => ($paused ? "paused" : "running")};
  }
`;

export const Segment = styled.button`
  flex: 1;
  height: 4px;
  padding: 0;
  border: 0;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.35);
  overflow: hidden;
  cursor: pointer;

  /* área de clique maior que a barra */
  position: relative;
  &::before {
    content: "";
    position: absolute;
    inset: -8px 0;
  }

  & > span {
    display: block;
    height: 100%;
    width: 100%;
    background: #fff;
    transform-origin: left;
    transform: scaleX(0);
  }

  &[data-state="done"] > span {
    transform: scaleX(1);
  }

  &[data-state="current"] > span {
    animation: ${fill} var(--duration) linear forwards;
  }
`;

export const ExpandHint = styled.span`
  position: absolute;
  right: 14px;
  bottom: 14px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 99px;
  font-size: 0.8rem;
  color: #fff;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  opacity: 0;
  transform: translateY(6px);
  transition:
    opacity 250ms ease,
    transform 250ms ease;

  ${Slide}:hover & {
    opacity: 1;
    transform: translateY(0);
  }

  ${MOBILE} {
    opacity: 1;
    transform: none;
    padding: 4px 10px;
    font-size: 0.7rem;
  }
`;

export const NavButton = styled.button`
  position: absolute;
  top: 50%;
  z-index: 5;
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #fff;
  background: rgba(20, 20, 20, 0.5);
  backdrop-filter: blur(8px);
  cursor: pointer;
  transform: translateY(-50%);
  transition:
    background 200ms ease,
    transform 200ms ease;

  &.prev {
    left: calc(50% - var(--w) / 2 - 23px);
  }
  &.next {
    right: calc(50% - var(--w) / 2 - 23px);
  }

  & > svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.customPallete?.purplePrimary};
    transform: translateY(-50%) scale(1.06);
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme }) => theme.colors.customPallete?.purplePrimary};
    outline-offset: 2px;
  }

  ${MOBILE} {
    display: none;
  }

  ${SECTION_SEL} & {
    animation: ${navIn} 500ms ${SPRING} 550ms backwards;
  }
`;

/* ---------- Indicadores ---------- */

export const Dots = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

export const Dot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? "28px" : "8px")};
  height: 8px;
  padding: 0;
  border: 0;
  border-radius: 99px;
  cursor: pointer;
  background: ${({ $active, theme }) =>
    $active
      ? theme.colors.customPallete?.purplePrimary
      : theme.colors.customPallete?.unselectedColor};
  opacity: ${({ $active }) => ($active ? 1 : 0.4)};
  transition:
    width 350ms ${EASE},
    background 300ms ease,
    opacity 300ms ease;

  &:hover {
    opacity: 1;
  }

  ${SECTION_SEL} & {
    animation: ${popIn} 450ms ${SPRING} calc(450ms + var(--i) * 60ms) backwards;
  }
`;

/* ---------- Informações do projeto ---------- */

export const Info = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 1.2vh 2.5vw;
  width: min(100%, 1000px);
  margin: 0 auto;
  padding: 0 1vw 1vh;
  animation: ${fadeUp} 500ms ${EASE} both;

  ${MOBILE} {
    grid-template-columns: 1fr;
    padding: 0 2vw;
  }
`;

export const InfoText = styled.div`
  & > h2 {
    font-family: Inter, sans-serif;
    font-size: clamp(1.4rem, 2vw, 2.2rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.colors.text};
  }

  & > p {
    margin-top: 0.35rem;
    max-width: 64ch;
    font-size: clamp(0.85rem, 0.95vw, 1rem);
    line-height: 1.55;
    color: ${({ theme }) => theme.colors.customPallete?.unselectedColor};
  }

  /* nome e descrição entram em sequência (também a cada troca de projeto) */
  ${SECTION_SEL} & > h2 {
    animation: ${softPopIn} 500ms ${SPRING} 80ms backwards;
  }
  ${SECTION_SEL} & > p {
    animation: ${fadeIn} 600ms ease 180ms backwards;
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  ${SECTION_SEL} & > * {
    animation: ${popIn} 450ms ${SPRING} 260ms backwards;
  }
`;

export const ActionButton = styled.a<{ $variant: "primary" | "ghost" }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  transition:
    transform 200ms ease,
    background 200ms ease,
    box-shadow 200ms ease;

  ${({ $variant, theme }) =>
    $variant === "primary"
      ? css`
          color: #fff;
          background: ${theme.colors.customPallete?.purplePrimary};
          box-shadow: 0 8px 20px -8px
            ${theme.colors.customPallete?.purplePrimary};
        `
      : css`
          color: ${theme.colors.text};
          background: transparent;
          border: 1px solid ${theme.colors.custom?.searchBorder};
        `}

  &:hover {
    transform: translateY(-2px);
    background: ${({ $variant, theme }) =>
      $variant === "ghost"
        ? theme.colors.customPallete?.backgroundHover
        : undefined};
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme }) => theme.colors.customPallete?.purplePrimary};
    outline-offset: 2px;
  }

  ${MOBILE} {
    padding: 8px 14px;
    font-size: 0.8rem;
  }
`;

export const Tags = styled.ul`
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  list-style: none;

  & > li {
    padding: 4px 11px;
    border-radius: 99px;
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.customPallete?.backgroundHover};
    border: 1px solid ${({ theme }) => theme.colors.custom?.border};
  }

  ${MOBILE} {
    & > li {
      font-size: 0.68rem;
      padding: 3px 9px;
    }
  }

  ${SECTION_SEL} & > li {
    animation: ${popIn} 400ms ${SPRING} calc(300ms + var(--i) * 35ms) backwards;
  }
`;

/* ---------- Equipe (projetos em grupo) ---------- */

export const Team = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
`;

export const GroupBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 99px;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.customPallete?.purplePrimary};
  background: ${({ theme }) =>
    `color-mix(in srgb, ${theme.colors.customPallete?.purplePrimary} 14%, transparent)`};
  border: 1px solid
    ${({ theme }) =>
      `color-mix(in srgb, ${theme.colors.customPallete?.purplePrimary} 35%, transparent)`};

  & > svg {
    width: 14px;
    height: 14px;
  }
`;

export const Avatar = styled.span`
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  font-size: 0.8rem;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.customPallete?.purplePrimary},
    ${({ theme }) => theme.colors.customPallete?.purpleSecondary}
  );
`;

export const Member = styled.a<{ $me?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 5px 12px 5px 5px;
  border-radius: 99px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.customPallete?.backgroundHover};
  border: 1px solid
    ${({ $me, theme }) =>
      $me
        ? `color-mix(in srgb, ${theme.colors.customPallete?.purplePrimary} 45%, transparent)`
        : theme.colors.custom?.border};
  transition:
    transform 200ms ease,
    border-color 200ms ease;
  animation: ${popIn} 450ms ${SPRING} calc(150ms + var(--i) * 80ms) backwards;

  & > span {
    display: flex;
    flex-direction: column;
    line-height: 1.2;
  }

  & strong {
    font-size: 0.8rem;
    font-weight: 600;
  }

  & em {
    font-style: normal;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.customPallete?.unselectedColor};
  }

  & small {
    font-size: 0.7rem;
    color: ${({ theme }) => theme.colors.customPallete?.unselectedColor};
  }

  & > .out {
    width: 13px;
    height: 13px;
    color: ${({ theme }) => theme.colors.customPallete?.unselectedColor};
    transition: transform 200ms ease;
  }

  &[href]:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.customPallete?.purplePrimary};
  }

  &[href]:hover > .out {
    transform: translate(2px, -2px);
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme }) => theme.colors.customPallete?.purplePrimary};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

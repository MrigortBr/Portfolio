import styled from "styled-components";
import {
  EASE,
  growDown,
  iconIn,
  popIn,
  pulseRing,
  softPopIn,
  SPRING,
  whenVisible,
} from "@/styles/animations";

const MOBILE = "@media (max-width: 768px)";
/** intervalo entre um item da timeline e o próximo */
const STEP = "220ms";

export const ExperienceContainer = styled.div`
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

/* ---------- Timeline ---------- */

const RAIL = "40px";

export const Timeline = styled.ol`
  --rail: ${RAIL};

  position: relative;
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: safe center;
  gap: 16px;
  list-style: none;
  padding: 4px 1vw 8px 0;

  /* rola por dentro se não couber (a roda rola aqui antes de trocar de seção) */
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.custom?.searchBorder}
    transparent;

  ${MOBILE} {
    --rail: 26px;
    overflow: visible;
    padding: 0;
    gap: 14px;
  }
`;

export const Item = styled.li`
  position: relative;
  display: grid;
  grid-template-columns: var(--rail) minmax(0, 1fr);

  /* linha vertical ligando os itens: desenha de cima para baixo */
  &::before {
    content: "";
    position: absolute;
    left: calc(var(--rail) / 2 - 1px);
    top: 30px;
    bottom: -16px;
    width: 2px;
    border-radius: 2px;
    background: linear-gradient(
      to bottom,
      var(--accent),
      color-mix(in srgb, var(--accent) 15%, transparent)
    );
    transform-origin: top;
    transform: scaleY(0);
  }

  &:last-child::before {
    display: none;
  }

  ${Timeline}${whenVisible} &::before {
    transform: scaleY(1);
    animation: ${growDown} 700ms ${EASE} calc(var(--i) * ${STEP} + 350ms)
      backwards;
  }
`;

export const Node = styled.span<{ $current: boolean }>`
  position: relative;
  justify-self: center;
  margin-top: 24px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 22%, transparent);

  /* anel pulsante nos itens em andamento */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: var(--accent);
    display: ${({ $current }) => ($current ? "block" : "none")};
  }

  opacity: 0;
  ${Timeline}${whenVisible} & {
    opacity: 1;
    animation: ${popIn} 500ms ${SPRING} calc(var(--i) * ${STEP} + 100ms)
      backwards;
  }
  ${Timeline}${whenVisible} &::after {
    animation: ${pulseRing} 2s ease-out calc(var(--i) * ${STEP} + 700ms)
      infinite;
  }

  ${MOBILE} {
    width: 12px;
    height: 12px;
    margin-top: 20px;
  }
`;

export const Icon = styled.span`
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 16%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 32%, transparent);
  transition: transform 350ms ${SPRING};

  & > svg {
    width: 22px;
    height: 22px;
  }
`;

export const Card = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px 20px 18px;
  border-radius: 16px;
  background: ${({ theme }) =>
    `color-mix(in srgb, ${theme.colors.background} 55%, transparent)`};
  border: 1px solid ${({ theme }) => theme.colors.custom?.border};
  transition:
    border-color 250ms ease,
    box-shadow 250ms ease;

  /* brilho suave da cor do item no canto */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    background: radial-gradient(
      100% 120% at 0% 0%,
      color-mix(in srgb, var(--accent) 12%, transparent),
      transparent 55%
    );
  }

  & > * {
    position: relative;
  }

  &:hover {
    border-color: color-mix(in srgb, var(--accent) 50%, transparent);
    box-shadow: 0 16px 36px -20px var(--accent);
  }

  &:hover ${Icon} {
    transform: rotate(-8deg) scale(1.08);
  }

  /* entrada do card e do ícone */
  opacity: 0;
  ${Timeline}${whenVisible} & {
    opacity: 1;
    animation: ${softPopIn} 550ms ${SPRING} calc(var(--i) * ${STEP} + 180ms)
      backwards;
  }
  ${Timeline}${whenVisible} & ${Icon} {
    animation: ${iconIn} 700ms ${SPRING} calc(var(--i) * ${STEP} + 280ms)
      backwards;
  }

  @media (prefers-reduced-motion: reduce) {
    &,
    & * {
      animation: none !important;
      opacity: 1 !important;
    }
  }

  ${MOBILE} {
    padding: 14px;
  }
`;

export const CardHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 14px;

  & h3 {
    font-family: Inter, sans-serif;
    font-size: 1.05rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: ${({ theme }) => theme.colors.text};
  }

  & p {
    margin-top: 2px;
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.customPallete?.unselectedColor};
  }

  & > aside {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  ${MOBILE} {
    flex-wrap: wrap;

    & > aside {
      margin-left: 0;
      width: 100%;
      justify-content: flex-start;
    }
  }
`;

export const KindTag = styled.span`
  padding: 3px 10px;
  border-radius: 99px;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
`;

export const Period = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.customPallete?.unselectedColor};

  & > svg {
    width: 13px;
    height: 13px;
  }
`;

/** tempo no cargo */
export const Duration = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: 99px;
  font-size: 0.72rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.customPallete?.backgroundHover};
  border: 1px solid ${({ theme }) => theme.colors.custom?.border};

  & > svg {
    width: 12px;
    height: 12px;
    color: var(--accent);
  }
`;

export const CurrentBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border-radius: 99px;
  font-size: 0.72rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.custom?.border};

  &::before {
    content: "";
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.25);
  }
`;

export const Summary = styled.p`
  font-size: 0.88rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.85;
`;

export const Highlights = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 6px;
  list-style: none;

  & > li {
    display: flex;
    gap: 8px;
    align-items: flex-start;
    font-size: 0.84rem;
    line-height: 1.45;
    color: ${({ theme }) => theme.colors.customPallete?.unselectedColor};
  }

  & svg {
    flex-shrink: 0;
    margin-top: 3px;
    width: 14px;
    height: 14px;
    color: var(--accent);
  }

  /* destaques aparecem em sequência depois do card */
  ${Timeline}${whenVisible} & > li {
    animation: ${softPopIn} 450ms ${EASE}
      calc(var(--i) * ${STEP} + 420ms + var(--j) * 90ms) backwards;
  }
`;

export const Stack = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  list-style: none;

  & > li {
    padding: 3px 10px;
    border-radius: 99px;
    font-size: 0.72rem;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.customPallete?.backgroundHover};
    border: 1px solid ${({ theme }) => theme.colors.custom?.border};
    transition:
      border-color 200ms ease,
      transform 200ms ${EASE};
  }

  & > li:hover {
    transform: translateY(-2px);
    border-color: color-mix(in srgb, var(--accent) 60%, transparent);
  }

  ${Timeline}${whenVisible} & > li {
    animation: ${popIn} 400ms ${SPRING}
      calc(var(--i) * ${STEP} + 600ms + var(--j) * 40ms) backwards;
  }
`;

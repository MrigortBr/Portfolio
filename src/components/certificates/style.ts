import styled, { css } from "styled-components";
import {
  EASE,
  iconIn,
  popIn,
  softPopIn,
  SPRING,
  whenVisible,
} from "@/styles/animations";

const MOBILE = "@media (max-width: 768px)";

export const CertificatesContainer = styled.div`
  flex-direction: column;
  gap: 1.4vh;
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

/* ---------- Filtros ---------- */

export const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  ${MOBILE} {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 4px;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const FilterButton = styled.button<{ $active: boolean }>`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 14px;
  border-radius: 99px;
  font-size: 0.82rem;
  font-weight: 500;
  cursor: pointer;
  /* cor da categoria em tons suaves; o ativo ganha fundo e borda na cor */
  border: 1px solid
    ${({ $active, theme }) =>
      $active
        ? "color-mix(in srgb, var(--accent) 65%, transparent)"
        : theme.colors.custom?.border};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ $active, theme }) =>
    $active
      ? "color-mix(in srgb, var(--accent) 20%, transparent)"
      : theme.colors.customPallete?.backgroundHover};
  box-shadow: ${({ $active }) =>
    $active
      ? "0 6px 18px -10px color-mix(in srgb, var(--accent) 80%, transparent)"
      : "none"};

  /* pontinho com a cor da categoria */
  &::before {
    content: "";
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 22%, transparent);
  }
  transition:
    background 250ms ease,
    color 250ms ease,
    border-color 250ms ease,
    box-shadow 250ms ease,
    transform 200ms ${EASE};

  & > span {
    padding: 1px 7px;
    border-radius: 99px;
    font-size: 0.7rem;
    font-variant-numeric: tabular-nums;
    background: ${({ $active, theme }) =>
      $active
        ? "color-mix(in srgb, var(--accent) 35%, transparent)"
        : theme.colors.custom?.border};
  }

  &:hover {
    transform: scale(1.04);
  }

  &:active {
    transform: scale(0.97);
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme }) => theme.colors.customPallete?.purplePrimary};
    outline-offset: 2px;
  }

  /* entrada: filtros aparecem um a um */
  opacity: 0;
  ${Filters}${whenVisible} & {
    opacity: 1;
    animation: ${popIn} 450ms ${SPRING} calc(var(--i) * 50ms) backwards;
  }
`;

/* ---------- Grade de certificados ---------- */

export const CardsGrid = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 290px), 1fr));
  align-content: start;
  gap: 12px;
  padding: 4px 1vw 24px 2px;

  /* rola por dentro; a roda rola aqui antes de trocar de seção */
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.custom?.searchBorder}
    transparent;
  /* esmaece as bordas de cima e de baixo quando há conteúdo escondido ali */
  --fade-top: 0px;
  --fade-bottom: 32px;
  &[data-at-top="false"] {
    --fade-top: 32px;
  }
  &[data-at-bottom="true"] {
    --fade-bottom: 0px;
  }
  mask-image: linear-gradient(
    to bottom,
    transparent 0,
    #000 var(--fade-top),
    #000 calc(100% - var(--fade-bottom)),
    transparent 100%
  );

  ${MOBILE} {
    overflow: visible;
    mask-image: none;
    padding: 4px 0 0;
  }
`;

export const Logo = styled.span`
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.custom?.border};
  transition: transform 350ms ${SPRING};

  & > img {
    width: 30px;
    height: 30px;
    object-fit: contain;
  }

  /* certificado sem logo: ícone na cor da categoria */
  & > .fallback {
    width: 22px;
    height: 22px;
    color: var(--accent);
  }
`;

export const Card = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px 16px;
  border-radius: 14px;
  background: ${({ theme }) =>
    `color-mix(in srgb, ${theme.colors.background} 55%, transparent)`};
  border: 1px solid ${({ theme }) => theme.colors.custom?.border};
  transition:
    transform 250ms ${EASE},
    border-color 250ms ease,
    box-shadow 250ms ease;

  /* brilho suave na cor da categoria, vindo do canto do card */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    background: radial-gradient(
      120% 100% at 0% 0%,
      color-mix(in srgb, var(--accent) 11%, transparent),
      transparent 55%
    );
    transition: opacity 250ms ease;
  }

  & > * {
    position: relative;
  }

  &:hover {
    transform: translateY(-3px);
    border-color: color-mix(in srgb, var(--accent) 50%, transparent);
    box-shadow: 0 14px 30px -18px var(--accent);
  }

  &:hover ${Logo} {
    transform: rotate(-8deg) scale(1.08);
  }

  /* entrada: cards em cascata, logos girando */
  opacity: 0;
  ${CardsGrid}${whenVisible} & {
    opacity: 1;
    animation: ${softPopIn} 500ms ${SPRING} calc(120ms + var(--i) * 35ms)
      backwards;
  }
  ${CardsGrid}${whenVisible} & ${Logo} {
    animation: ${iconIn} 650ms ${SPRING} calc(200ms + var(--i) * 35ms) backwards;
  }

  @media (prefers-reduced-motion: reduce) {
    &,
    & * {
      animation: none !important;
      opacity: 1 !important;
    }
  }
`;

export const CardHeader = styled.header`
  display: flex;
  align-items: flex-start;
  gap: 12px;

  & h3 {
    font-family: Inter, sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    line-height: 1.3;
    color: ${({ theme }) => theme.colors.text};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  & p {
    margin-top: 3px;
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.customPallete?.unselectedColor};
  }
`;

const muted = css`
  color: ${({ theme }) => theme.colors.customPallete?.unselectedColor};
`;

export const Meta = styled.div`
  display: flex;
  gap: 14px;
  font-size: 0.75rem;
  ${muted}

  & > span {
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }

  & svg {
    width: 13px;
    height: 13px;
    color: var(--accent);
  }
`;

export const Tags = styled.ul`
  margin-top: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  list-style: none;

  & > li {
    padding: 2px 9px;
    border-radius: 99px;
    font-size: 0.7rem;
    color: ${({ theme }) => theme.colors.text};
    background: color-mix(in srgb, var(--accent) 10%, transparent);
    border: 1px solid color-mix(in srgb, var(--accent) 24%, transparent);
  }
`;

import styled, { css, keyframes } from "styled-components";
import {
  EASE,
  iconIn,
  popIn,
  softPopIn,
  SPRING,
  whenVisible,
} from "@/styles/animations";

type Keyframes = ReturnType<typeof keyframes>;

const MOBILE = "@media (max-width: 768px)";
const SECTION_SEL = ".about-section";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const fillBar = keyframes`
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
`;

/** animação de entrada disparada quando a seção está visível */
const enter = (
  anim: Keyframes,
  delay: string,
  dur = "600ms",
  ease = EASE
) => css`
  opacity: 0;
  ${SECTION_SEL}${whenVisible} & {
    opacity: 1;
    animation: ${anim} ${dur} ${ease} ${delay} backwards;
  }
`;

const muted = css`
  color: ${({ theme }) => theme.colors.customPallete?.unselectedColor};
`;

const surface = css`
  background: ${({ theme }) =>
    `color-mix(in srgb, ${theme.colors.background} 55%, transparent)`};
  border: 1px solid ${({ theme }) => theme.colors.custom?.border};
`;

export const AboutContainer = styled.div.attrs({ className: "about-section" })`
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

export const Body = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(240px, 300px) minmax(0, 1fr);
  gap: 2vw;
  /* o card da foto acompanha a altura da coluna de informações */
  align-items: stretch;
  /* a linha ocupa toda a altura da seção (ou cresce, se o conteúdo for maior) */
  grid-template-rows: minmax(min-content, 1fr);
  /* --g é definido pelo useFitToHeight: o quanto o conteúdo cresce */
  --g: 0px;
  padding-right: 1vw;
  overflow-y: auto;
  scrollbar-width: thin;

  ${MOBILE} {
    grid-template-columns: 1fr;
    grid-template-rows: none;
    overflow: visible;
    padding: 0;
    gap: 16px;
  }
`;

/* ---------- Coluna do perfil ---------- */

export const Profile = styled.aside`
  ${surface}
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 6px;
  padding: 22px 20px;
  border-radius: 18px;

  & > h3 {
    margin-top: 10px;
    font-family: Inter, sans-serif;
    font-size: 1.15rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
  }

  & > p {
    font-size: 0.82rem;
    ${muted}
  }

  ${enter(softPopIn, "0ms", "700ms", SPRING)}
`;

export const Photo = styled.div`
  position: relative;
  width: min(100%, 200px);
  aspect-ratio: 1;
  border-radius: 50%;
  padding: 5px;
  overflow: hidden;

  /* anel colorido girando em volta da foto */
  & > .ring {
    position: absolute;
    inset: -50%;
    background: conic-gradient(
      ${({ theme }) => theme.colors.customPallete?.purplePrimary},
      #38bdf8,
      ${({ theme }) => theme.colors.customPallete?.purpleSecondary},
      #fb923c,
      ${({ theme }) => theme.colors.customPallete?.purplePrimary}
    );
    animation: ${spin} 8s linear infinite;
  }

  & > .frame {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    border: 4px solid ${({ theme }) => theme.colors.custom?.fileSelected};
  }

  & img {
    object-fit: cover;
    object-position: center 18%;
    transition: transform 500ms ${EASE};
  }

  &:hover img {
    transform: scale(1.06);
  }

  ${SECTION_SEL}${whenVisible} & {
    animation: ${iconIn} 900ms ${SPRING} 150ms backwards;
  }
`;

export const Location = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
  padding: 4px 12px;
  border-radius: 99px;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.customPallete?.backgroundHover};
  border: 1px solid ${({ theme }) => theme.colors.custom?.border};

  & > svg {
    width: 13px;
    height: 13px;
    color: ${({ theme }) => theme.colors.customPallete?.purplePrimary};
  }
`;

export const SectionLabel = styled.h4`
  align-self: stretch;
  margin: 14px 0 10px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-align: left;
  ${muted}
`;

export const LangList = styled.ul`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;
  text-align: left;

  & > li > span {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.text};
  }

  & em {
    font-style: normal;
    font-size: 0.72rem;
    ${muted}
  }

  & i {
    display: block;
    margin-top: 5px;
    height: 5px;
    border-radius: 99px;
    overflow: hidden;
    background: ${({ theme }) => theme.colors.custom?.border};
  }

  & b {
    display: block;
    width: var(--value);
    height: 100%;
    border-radius: inherit;
    transform-origin: left;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.customPallete?.purplePrimary},
      ${({ theme }) => theme.colors.customPallete?.purpleSecondary}
    );
  }

  /* barras de nível enchem em sequência */
  ${SECTION_SEL}${whenVisible} & b {
    animation: ${fillBar} 900ms ${EASE} calc(500ms + var(--i) * 150ms) backwards;
  }
`;

/* ---------- Coluna de conteúdo ---------- */

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: calc(16px + var(--g) * 0.08);
  min-width: 0;
`;

export const Bio = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > p {
    font-size: calc(clamp(0.92rem, 1vw, 1.05rem) + var(--g) * 0.012);
    line-height: 1.7;
    ${muted}
  }

  & strong {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }

  ${enter(softPopIn, "150ms")}
`;

export const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: calc(12px + var(--g) * 0.03);

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const Stat = styled.button`
  ${surface}
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  column-gap: calc(14px + var(--g) * 0.03);
  row-gap: 2px;
  align-items: center;
  padding: calc(16px + var(--g) * 0.06) calc(18px + var(--g) * 0.04);
  border-radius: 14px;
  text-align: left;
  cursor: pointer;
  font: inherit;
  overflow: hidden;
  transition:
    transform 250ms ${EASE},
    border-color 250ms ease,
    box-shadow 250ms ease;

  /* brilho suave na cor do item */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(
      120% 120% at 0% 0%,
      color-mix(in srgb, var(--accent) 14%, transparent),
      transparent 60%
    );
  }

  & > * {
    position: relative;
  }

  & > .icon {
    display: grid;
    place-items: center;
    grid-row: 1 / 3;
    width: calc(44px + var(--g) * 0.08);
    height: calc(44px + var(--g) * 0.08);
    border-radius: 12px;
    color: var(--accent);
    background: color-mix(in srgb, var(--accent) 16%, transparent);
    transition: transform 300ms ${SPRING};
  }

  & > .icon svg {
    width: calc(21px + var(--g) * 0.04);
    height: calc(21px + var(--g) * 0.04);
  }

  & > strong {
    font-family: Inter, sans-serif;
    align-self: end;
    font-size: calc(clamp(1.5rem, 2vw, 2.1rem) + var(--g) * 0.05);
    font-weight: 800;
    line-height: 1;
    font-variant-numeric: tabular-nums;
    color: ${({ theme }) => theme.colors.text};
  }

  & > .label {
    align-self: start;
    font-size: calc(0.78rem + var(--g) * 0.012);
    ${muted}
  }

  & > .go {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 16px;
    height: 16px;
    color: var(--accent);
    opacity: 0;
    transform: translate(-4px, 4px);
    transition:
      opacity 200ms ease,
      transform 250ms ${EASE};
  }

  &:hover {
    transform: translateY(-3px);
    border-color: color-mix(in srgb, var(--accent) 55%, transparent);
    box-shadow: 0 14px 30px -18px var(--accent);
  }

  &:hover > .icon {
    transform: rotate(-10deg) scale(1.1);
  }

  &:hover > .go {
    opacity: 1;
    transform: none;
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  opacity: 0;
  ${SECTION_SEL}${whenVisible} & {
    opacity: 1;
    animation: ${popIn} 500ms ${SPRING} calc(300ms + var(--i) * 90ms) backwards;
  }
`;

export const Education = styled.ol`
  display: flex;
  flex-direction: column;
  gap: calc(10px + var(--g) * 0.03);
  list-style: none;

  & > li {
    ${surface}
    display: flex;
    align-items: center;
    gap: calc(14px + var(--g) * 0.03);
    padding: calc(12px + var(--g) * 0.06) calc(16px + var(--g) * 0.04);
    border-radius: 14px;
    transition:
      transform 250ms ${EASE},
      border-color 250ms ease;
  }

  & > li:hover {
    transform: translateX(4px);
    border-color: ${({ theme }) => theme.colors.customPallete?.purplePrimary};
  }

  & .logo {
    flex-shrink: 0;
    width: calc(40px + var(--g) * 0.06);
    height: calc(40px + var(--g) * 0.06);
    display: grid;
    place-items: center;
    border-radius: 11px;
    background: #fff;
    color: ${({ theme }) => theme.colors.customPallete?.purplePrimary};
    border: 1px solid ${({ theme }) => theme.colors.custom?.border};
  }

  & .logo svg {
    width: 20px;
    height: 20px;
  }

  & strong {
    display: block;
    font-size: calc(0.9rem + var(--g) * 0.012);
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }

  & small {
    font-size: calc(0.78rem + var(--g) * 0.008);
    ${muted}
  }

  & .period {
    margin-left: auto;
    flex-shrink: 0;
    padding: 3px 10px;
    border-radius: 99px;
    font-size: 0.72rem;
    font-variant-numeric: tabular-nums;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.customPallete?.backgroundHover};
    border: 1px solid ${({ theme }) => theme.colors.custom?.border};
  }

  & .period.current {
    color: #22c55e;
    border-color: rgba(34, 197, 94, 0.4);
    background: rgba(34, 197, 94, 0.1);
  }

  ${SECTION_SEL}${whenVisible} & > li {
    animation: ${softPopIn} 500ms ${SPRING} calc(650ms + var(--i) * 110ms)
      backwards;
  }

  ${MOBILE} {
    & > li {
      flex-wrap: wrap;
    }
  }
`;

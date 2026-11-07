import styled, { css, keyframes } from "styled-components";
import {
  EASE,
  fadeIn,
  iconIn,
  softPopIn,
  SPRING,
  whenVisible,
} from "@/styles/animations";

type Keyframes = ReturnType<typeof keyframes>;

const MOBILE = "@media (max-width: 768px)";
const MONO = `ui-monospace, "Cascadia Code", "JetBrains Mono", Consolas, monospace`;
const SECTION_SEL = ".thanks-section";

const float = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  50%      { transform: translate(-5%, 6%) scale(1.1); }
`;

/* letras caindo do alto com leve giro */
const letterIn = keyframes`
  0%   { opacity: 0; transform: translateY(-0.6em) rotate(-12deg) scale(0.6); }
  60%  { opacity: 1; transform: translateY(0.06em) rotate(3deg) scale(1.05); }
  100% { opacity: 1; transform: none; }
`;

const wave = keyframes`
  0%, 100% { transform: none; }
  50%      { transform: translateY(-0.12em); }
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

export const ThankYouContainer = styled.div.attrs({
  className: "thanks-section",
})`
  position: relative;
  overflow: hidden;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
  text-align: center;
  user-select: none;

  & > * {
    position: relative;
    z-index: 1;
  }

  ${MOBILE} {
    height: auto !important;
    min-height: 100%;
    justify-content: flex-start;
    padding: 8vh 5vw 20vh !important;
  }
`;

export const Blob = styled.span`
  position: absolute !important;
  z-index: 0 !important;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  animation: ${float} 16s ease-in-out infinite;

  &.a {
    width: 34vw;
    height: 34vw;
    right: -6vw;
    top: -10vw;
    opacity: 0.3;
    background: ${({ theme }) => theme.colors.customPallete?.purplePrimary};
  }

  &.b {
    width: 28vw;
    height: 28vw;
    left: -8vw;
    bottom: -12vw;
    opacity: 0.22;
    background: ${({ theme }) => theme.colors.customPallete?.purpleSecondary};
    animation-delay: -8s;
  }
`;

export const Eyebrow = styled.p`
  font-family: ${MONO};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.customPallete?.purplePrimary};

  ${enter(fadeIn, "0ms")}
`;

export const Title = styled.h1`
  display: flex;
  justify-content: center;
  font-family: Inter, sans-serif;
  font-size: clamp(3.2rem, 7vw, 7.5rem);
  font-weight: 800;
  /* altura de linha folgada: com background-clip: text, o que passa da
     caixa da letra é cortado (era o que cortava a perna do "g") */
  line-height: 1.2;
  letter-spacing: -0.04em;

  & > span {
    display: inline-block;
    background: linear-gradient(
      180deg,
      ${({ theme }) => theme.colors.text} 30%,
      ${({ theme }) => theme.colors.customPallete?.purplePrimary} 130%
    );
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    padding-bottom: 0.08em;
    opacity: 0;
    transition: transform 250ms ${SPRING};
  }

  /* cada letra entra em sequência; depois, uma "onda" suave percorre o título */
  ${SECTION_SEL}${whenVisible} & > span {
    opacity: 1;
    animation:
      ${letterIn} 650ms ${EASE} calc(100ms + var(--i) * 60ms) backwards,
      ${wave} 2.8s ease-in-out calc(1.2s + var(--i) * 90ms) infinite;
  }

  & > span:hover {
    animation-play-state: paused;
    transform: translateY(-0.15em) rotate(-6deg);
  }
`;

export const Subtitle = styled.p`
  max-width: 46ch;
  font-size: clamp(1rem, 1.2vw, 1.2rem);
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.customPallete?.unselectedColor};

  ${enter(softPopIn, "550ms")}
`;

export const Cards = styled.div`
  width: min(100%, 760px);
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  ${MOBILE} {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 16px;
  text-align: left;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) =>
    `color-mix(in srgb, ${theme.colors.background} 55%, transparent)`};
  border: 1px solid ${({ theme }) => theme.colors.custom?.border};
  overflow: hidden;
  transition:
    transform 250ms ${EASE},
    border-color 250ms ease,
    box-shadow 250ms ease;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.6;
    background: radial-gradient(
      120% 120% at 0% 0%,
      color-mix(in srgb, var(--brand) 16%, transparent),
      transparent 60%
    );
    transition: opacity 250ms ease;
  }

  & > * {
    position: relative;
  }

  & > .icon {
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    display: grid;
    place-items: center;
    border-radius: 12px;
    color: var(--brand);
    background: color-mix(in srgb, var(--brand) 14%, transparent);
    border: 1px solid color-mix(in srgb, var(--brand) 30%, transparent);
    transition: transform 300ms ${SPRING};
  }

  & > .icon svg {
    width: 22px;
    height: 22px;
  }

  & > .text {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  & strong {
    font-size: 0.95rem;
    font-weight: 600;
  }

  & small {
    font-size: 0.78rem;
    color: ${({ theme }) => theme.colors.customPallete?.unselectedColor};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: color-mix(in srgb, var(--brand) 55%, transparent);
    box-shadow: 0 16px 34px -18px var(--brand);
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover > .icon {
    transform: rotate(-10deg) scale(1.1);
  }

  &:focus-visible {
    outline: 2px solid var(--brand);
    outline-offset: 2px;
  }

  /* entrada em cascata, ícones girando */
  opacity: 0;
  ${SECTION_SEL}${whenVisible} & {
    opacity: 1;
    animation: ${softPopIn} 550ms ${SPRING} calc(700ms + var(--i) * 100ms)
      backwards;
  }
  ${SECTION_SEL}${whenVisible} & > .icon {
    animation: ${iconIn} 700ms ${SPRING} calc(800ms + var(--i) * 100ms)
      backwards;
  }

  @media (prefers-reduced-motion: reduce) {
    &,
    & * {
      animation: none !important;
      opacity: 1 !important;
    }
  }
`;

export const CopyButton = styled.button<{ $copied: boolean }>`
  margin-left: auto;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: 9px;
  cursor: pointer;
  color: ${({ $copied, theme }) =>
    $copied ? "#22c55e" : theme.colors.customPallete?.unselectedColor};
  background: ${({ theme }) => theme.colors.customPallete?.backgroundHover};
  border: 1px solid
    ${({ $copied, theme }) =>
      $copied ? "rgba(34, 197, 94, 0.5)" : theme.colors.custom?.border};
  transition:
    color 200ms ease,
    border-color 200ms ease,
    transform 200ms ${SPRING};

  &:hover {
    transform: scale(1.08);
    color: ${({ theme }) => theme.colors.text};
  }

  & > svg {
    width: 15px;
    height: 15px;
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 8px;

  ${enter(softPopIn, "1150ms")}
`;

/* ---------- Boneco (entra por último e fecha a composição) ---------- */

const riseIn = keyframes`
  0%   { opacity: 0; transform: translateY(45%) rotate(8deg) scale(0.9); }
  65%  { opacity: 1; transform: translateY(-3%) rotate(-2deg) scale(1.02); }
  100% { opacity: 1; transform: none; }
`;

const breathe = keyframes`
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-6px); }
`;

const point = keyframes`
  0%, 100% { transform: rotate(0deg); }
  50%      { transform: rotate(-9deg); }
`;

export const Figure = styled.div`
  position: absolute !important;
  right: 1.5vw;
  bottom: 0;
  width: clamp(190px, 21vw, 360px);
  pointer-events: none;

  & > svg {
    display: block;
    width: 100%;
    height: auto;
    animation: ${breathe} 5s ease-in-out infinite;
  }

  /* dedo apontando para cima (para os contatos) */
  .undrawdemo_svg__finger {
    transform-box: fill-box;
    transform-origin: bottom center;
    animation: ${point} 1.4s ease-in-out infinite;
  }

  opacity: 0;
  ${SECTION_SEL}${whenVisible} & {
    opacity: 1;
    animation: ${riseIn} 900ms ${EASE} 1450ms backwards;
  }

  @media (max-width: 1100px) {
    width: clamp(160px, 18vw, 220px);
    opacity: 0.9;
  }

  ${MOBILE} {
    position: relative !important;
    right: auto;
    margin-top: 6px;
    width: min(60%, 240px);
  }

  @media (prefers-reduced-motion: reduce) {
    &,
    & * {
      animation: none !important;
      opacity: 1 !important;
    }
  }
`;

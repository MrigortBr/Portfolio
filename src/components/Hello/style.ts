import styled, { css, keyframes } from "styled-components";

type Keyframes = ReturnType<typeof keyframes>;
import {
  EASE,
  fadeIn,
  popIn,
  softPopIn,
  SPRING,
  whenVisible,
} from "@/styles/animations";

const MOBILE = "@media (max-width: 768px)";
const MONO = `ui-monospace, "Cascadia Code", "JetBrains Mono", Consolas, monospace`;

const blink = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

const float = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  50%      { transform: translate(4%, -6%) scale(1.08); }
`;

// seletor do container, usado para disparar as animações quando ele está visível
const HelloContainerSel = ".hello-section";

/** atalho: aplica uma animação de entrada quando a seção está visível */
const enter = (
  anim: Keyframes,
  delay: string,
  dur = "600ms",
  ease = EASE
) => css`
  opacity: 0;
  ${HelloContainerSel}${whenVisible} & {
    opacity: 1;
    animation: ${anim} ${dur} ${ease} ${delay} backwards;
  }
`;

export const HelloContainer = styled.div.attrs({ className: "hello-section" })`
  position: relative;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  gap: 4vw;
  padding: 0 4vw !important;
  user-select: none;

  ${MOBILE} {
    height: auto !important;
    min-height: 100%;
    flex-direction: column;
    justify-content: flex-start;
    gap: 4vh;
    padding: 9vh 5vw 20vh !important;
  }
`;

/* manchas de cor desfocadas que flutuam devagar no fundo */
export const Blob = styled.span`
  position: absolute;
  z-index: 0;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.35;
  pointer-events: none;
  animation: ${float} 14s ease-in-out infinite;

  &.a {
    width: 38vw;
    height: 38vw;
    left: -10vw;
    top: -12vw;
    background: ${({ theme }) => theme.colors.customPallete?.purplePrimary};
  }

  &.b {
    width: 30vw;
    height: 30vw;
    right: -8vw;
    bottom: -10vw;
    background: ${({ theme }) => theme.colors.customPallete?.purpleSecondary};
    animation-delay: -7s;
    opacity: 0.25;
  }
`;

export const Intro = styled.div`
  position: relative;
  z-index: 1;
  flex: 1 1 0;
  max-width: 640px;
  display: flex;
  flex-direction: column;
  gap: 14px;

  ${MOBILE} {
    max-width: 100%;
  }
`;

export const Caret = styled.span`
  display: inline-block;
  width: 0.55em;
  height: 1.05em;
  margin-left: 2px;
  vertical-align: text-bottom;
  background: ${({ theme }) => theme.colors.customPallete?.purplePrimary};
  animation: ${blink} 1s steps(1) infinite;
`;

export const Greeting = styled.p`
  font-family: ${MONO};
  font-size: clamp(0.95rem, 1.2vw, 1.25rem);
  color: ${({ theme }) => theme.colors.customPallete?.unselectedColor};
  min-height: 1.5em;

  /* o globals.css força "Segoe UI" em todo elemento; aqui herda a mono */
  & * {
    font-family: inherit;
  }

  & > .slash {
    color: ${({ theme }) => theme.colors.customPallete?.purplePrimary};
  }

  ${enter(fadeIn, "0ms", "500ms")}
`;

export const Name = styled.h1`
  font-family: Inter, sans-serif;
  font-size: clamp(2.6rem, 4.8vw, 5.6rem);
  font-weight: 800;
  line-height: 1.02;
  letter-spacing: -0.035em;
  background: linear-gradient(
    120deg,
    ${({ theme }) => theme.colors.text} 10%,
    ${({ theme }) => theme.colors.customPallete?.purplePrimary} 55%,
    ${({ theme }) => theme.colors.customPallete?.purpleSecondary} 95%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;

  ${enter(softPopIn, "120ms", "700ms", SPRING)}
`;

export const Role = styled.h2`
  font-family: Inter, sans-serif;
  font-size: clamp(1.1rem, 1.6vw, 1.6rem);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};

  ${enter(softPopIn, "260ms")}
`;

export const Bio = styled.p`
  max-width: 54ch;
  font-size: clamp(0.95rem, 1.05vw, 1.1rem);
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.customPallete?.unselectedColor};

  ${enter(softPopIn, "380ms")}
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;

  ${enter(softPopIn, "500ms")}
`;

export const StackIcons = styled.ul`
  display: flex;
  gap: 10px;
  margin-top: 14px;
  list-style: none;

  & > li {
    width: 40px;
    height: 40px;
    display: grid;
    place-items: center;
    border-radius: 11px;
    background: ${({ theme }) => theme.colors.customPallete?.backgroundHover};
    border: 1px solid ${({ theme }) => theme.colors.custom?.border};
    transition: transform 250ms ${SPRING};
    opacity: 0;
  }

  & > li:hover {
    transform: translateY(-4px) rotate(-6deg);
  }

  & svg {
    width: 20px;
    height: 20px;
  }

  ${HelloContainerSel}${whenVisible} & > li {
    opacity: 1;
    animation: ${popIn} 450ms ${SPRING} calc(650ms + var(--i) * 70ms) backwards;
  }
`;

/* ---------- Ilustração ---------- */

/* cabeça: olha em volta devagar e acena levemente */
const headMove = keyframes`
  0%, 100% { transform: rotate(0deg); }
  20%      { transform: rotate(-6deg); }
  35%      { transform: rotate(-6deg) translateY(1px); }
  55%      { transform: rotate(4deg); }
  70%      { transform: rotate(4deg); }
  85%      { transform: rotate(-1deg) translateY(2px); }
`;

/* linhas de código na tela do monitor "digitando" */
const screenLine = keyframes`
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.25; }
`;

const bob = keyframes`
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-10px); }
`;

export const Figure = styled.div`
  position: relative;
  z-index: 1;
  flex: 0 1 46%;
  max-width: 640px;
  display: flex;
  justify-content: center;

  /* desktop: programador na mesa, flutuando de leve */
  & > .desk {
    width: 100%;
    height: auto;
    filter: drop-shadow(
      0 30px 40px
        ${({ theme }) =>
          `color-mix(in srgb, ${theme.colors.customPallete?.purplePrimary} 25%, transparent)`}
    );
    animation: ${bob} 6s ease-in-out infinite;
  }

  & > .phone {
    display: none;
  }

  /* partes do SVG (classes prefixadas pelo SVGR com o nome do arquivo) */
  .programmer_svg__head {
    transform-box: view-box;
    /* gira em torno do pescoço */
    transform-origin: 104px 96px;
    animation: ${headMove} 7s ease-in-out infinite;
  }

  .programmer_svg__code {
    animation: ${screenLine} 2.4s ease-in-out infinite;
  }
  .programmer_svg__code:nth-of-type(3n + 1) {
    animation-delay: -0.8s;
  }
  .programmer_svg__code:nth-of-type(3n + 2) {
    animation-delay: -1.6s;
  }

  @media (prefers-reduced-motion: reduce) {
    .programmer_svg__head,
    .programmer_svg__code,
    & > .desk {
      animation: none;
    }
  }

  opacity: 0;
  ${HelloContainerSel}${whenVisible} & {
    opacity: 1;
    animation: ${softPopIn} 900ms ${SPRING} 300ms backwards;
  }

  /* celular: boneco com o celular (animações originais do SVG) */
  ${MOBILE} {
    flex: none;
    width: 100%;

    & > .desk {
      display: none;
    }

    & > .phone {
      display: block;
      width: min(70%, 280px);
      height: auto;
    }

    .undrawCell_svg__flash {
      animation: flash 1s infinite ease-in-out;
    }

    .undrawCell_svg__leg-right-group,
    .undrawCell_svg__leg-left-group {
      transform-box: fill-box;
      transform-origin: top center;
      animation: legs 1.2s ease-in-out infinite alternate;
    }

    @keyframes legs {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(5deg);
      }
    }

    @keyframes flash {
      0%,
      100% {
        filter: drop-shadow(0 0 0px white);
      }
      50% {
        filter: drop-shadow(0 0 50px rgba(255, 255, 255, 1));
      }
    }
  }
`;

/* ---------- Código desenhado no fundo ---------- */

export const BackgroundCode = styled.div`
  position: absolute;
  z-index: 0;
  right: -2vw;
  top: 50%;
  width: 62%;
  transform: translateY(-50%) rotate(-4deg);
  pointer-events: none;
  opacity: 0.16;
  /* esmaece as bordas para virar "textura" de fundo */
  mask-image: radial-gradient(
    ellipse 70% 65% at 50% 50%,
    #000 40%,
    transparent 100%
  );

  & > pre {
    font-size: clamp(1rem, 1.55vw, 1.6rem);
    padding: 0;
  }

  ${MOBILE} {
    display: none;
  }
`;

export const Code = styled.pre`
  margin: 0;
  padding: 16px 18px 20px 0;
  font-family: ${MONO};
  font-size: clamp(0.78rem, 0.9vw, 0.92rem);
  line-height: 1.75;
  color: #d4d4d4;
  white-space: pre-wrap;
  /* altura fixa = todas as linhas, para o card não "crescer" enquanto digita */
  min-height: calc(9 * 1.75em + 36px);

  & * {
    font-family: inherit;
  }

  & > .line {
    display: grid;
    grid-template-columns: 44px 1fr;
  }

  & .ln {
    text-align: right;
    padding-right: 16px;
    color: #6e7681;
  }

  & .kw {
    color: #c586c0;
  }
  & .var {
    color: #4fc1ff;
  }
  & .prop {
    color: #9cdcfe;
  }
  & .str {
    color: #ce9178;
  }
  & .punc {
    color: #d4d4d4;
  }
  & .com {
    color: #6a9955;
    font-style: italic;
  }
  & .bool {
    color: #569cd6;
  }

  ${MOBILE} {
    font-size: 0.7rem;
    & > .line {
      grid-template-columns: 30px 1fr;
    }
    & .ln {
      padding-right: 10px;
    }
  }
`;

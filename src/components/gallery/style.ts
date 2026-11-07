import styled, { css, keyframes } from "styled-components";

const MOBILE = "@media (max-width: 768px)";
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const overlayIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const overlayOut = keyframes`
  from { opacity: 1; }
  to   { opacity: 0; }
`;

const enter = keyframes`
  from {
    opacity: 0;
    transform: translateX(calc(var(--dir) * 48px)) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
`;

const contentIn = keyframes`
  from { opacity: 0; transform: scale(0.96); }
  to   { opacity: 1; transform: scale(1); }
`;

const contentOut = keyframes`
  from { opacity: 1; transform: scale(1); }
  to   { opacity: 0; transform: scale(0.96); }
`;

const glass = css`
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(10px);
`;

export const Overlay = styled.div<{ $closing: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 5000;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto auto;
  gap: 12px;
  padding: 16px 20px 14px;
  background: rgba(8, 8, 12, 0.88);
  backdrop-filter: blur(14px);
  outline: none;
  user-select: none;
  animation: ${({ $closing }) => ($closing ? overlayOut : overlayIn)} 250ms ease
    forwards;

  & > * {
    animation: ${({ $closing }) => ($closing ? contentOut : contentIn)} 300ms
      ${EASE} both;
  }

  ${MOBILE} {
    padding: 12px 10px 16px;
    gap: 10px;
  }
`;

/* ---------- Topo ---------- */

export const TopBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const Counter = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  font-family: Inter, sans-serif;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.06em;

  & > strong {
    color: #fff;
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: -0.01em;
  }
`;

export const TopActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const IconButton = styled.button`
  ${glass}
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  cursor: pointer;
  transition:
    background 200ms ease,
    transform 200ms ease;

  & > svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.18);
  }

  &:active {
    transform: scale(0.94);
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme }) => theme.colors.customPallete?.purplePrimary};
    outline-offset: 2px;
  }
`;

/* ---------- Imagem ---------- */

export const Viewer = styled.div`
  position: relative;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 72px;
  touch-action: pan-y;

  ${MOBILE} {
    padding: 0;
  }
`;

export const Frame = styled.div<{ $direction: 1 | -1; $zoomed: boolean }>`
  --dir: ${({ $direction }) => $direction};

  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 14px;
  cursor: ${({ $zoomed }) => ($zoomed ? "zoom-out" : "zoom-in")};
  animation: ${enter} 450ms ${EASE} both;

  @media (prefers-reduced-motion: reduce) {
    animation-duration: 1ms;
  }
`;

export const ZoomLayer = styled.div`
  position: absolute;
  inset: 0;
  transition: transform 350ms ${EASE};
  will-change: transform;

  & > img {
    object-fit: contain;
    -webkit-user-drag: none;
    pointer-events: none;
  }
`;

export const NavArrow = styled.button`
  ${glass}
  position: absolute;
  top: 50%;
  z-index: 2;
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  cursor: pointer;
  transform: translateY(-50%);
  transition:
    background 200ms ease,
    transform 200ms ease;

  &.prev {
    left: 4px;
  }
  &.next {
    right: 4px;
  }

  & > svg {
    width: 26px;
    height: 26px;
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
`;

/* ---------- Miniaturas ---------- */

export const Thumbs = styled.div`
  display: flex;
  justify-content: safe center;
  gap: 10px;
  overflow-x: auto;
  padding: 4px 2px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Thumb = styled.button<{ $active: boolean }>`
  position: relative;
  flex: 0 0 auto;
  width: 112px;
  aspect-ratio: 16 / 9;
  padding: 0;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.06);
  border: 2px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.customPallete?.purplePrimary : "transparent"};
  opacity: ${({ $active }) => ($active ? 1 : 0.45)};
  transform: ${({ $active }) => ($active ? "translateY(-2px)" : "none")};
  transition:
    opacity 250ms ease,
    border-color 250ms ease,
    transform 250ms ${EASE};

  & > img {
    object-fit: cover;
    object-position: top center;
  }

  &:hover {
    opacity: 1;
  }

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }

  ${MOBILE} {
    width: 72px;
    border-radius: 8px;
  }
`;

export const Hint = styled.p`
  text-align: center;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.45);

  & > kbd {
    font-family: inherit;
    font-size: 0.7rem;
    padding: 1px 6px;
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.06);
  }

  ${MOBILE} {
    display: none;
  }
`;

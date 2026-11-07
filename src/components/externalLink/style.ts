import styled, { keyframes } from "styled-components";
import { SPRING } from "@/styles/animations";

const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const fadeOut = keyframes`from { opacity: 1; } to { opacity: 0; }`;
const popIn = keyframes`
  from { opacity: 0; transform: scale(0.9) translateY(10px); }
  to   { opacity: 1; transform: none; }
`;
const popOut = keyframes`
  from { opacity: 1; transform: none; }
  to   { opacity: 0; transform: scale(0.95); }
`;

export const Backdrop = styled.div<{ $closing: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 6000;
  display: grid;
  place-items: center;
  padding: 16px;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  animation: ${({ $closing }) => ($closing ? fadeOut : fadeIn)} 180ms ease
    forwards;
`;

export const Dialog = styled.div<{ $closing: boolean }>`
  position: relative;
  width: min(100%, 440px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 28px 26px 22px;
  border-radius: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.custom?.fileSelected};
  border: 1px solid ${({ theme }) => theme.colors.custom?.searchBorder};
  box-shadow:
    0 30px 60px -20px rgba(0, 0, 0, 0.6),
    0 20px 50px -30px
      ${({ theme }) => theme.colors.customPallete?.purplePrimary};
  animation: ${({ $closing }) => ($closing ? popOut : popIn)} 260ms ${SPRING}
    forwards;

  & > .icon {
    width: 52px;
    height: 52px;
    display: grid;
    place-items: center;
    border-radius: 16px;
    margin-bottom: 6px;
    color: ${({ theme }) => theme.colors.customPallete?.purplePrimary};
    background: ${({ theme }) =>
      `color-mix(in srgb, ${theme.colors.customPallete?.purplePrimary} 16%, transparent)`};
  }

  & > .icon svg {
    width: 24px;
    height: 24px;
  }

  & > h2 {
    font-family: Inter, sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
  }

  & > p,
  & > small {
    font-size: 0.85rem;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.customPallete?.unselectedColor};
  }

  & > small {
    margin-top: 6px;
    font-size: 0.72rem;
  }
`;

export const Url = styled.code`
  max-width: 100%;
  padding: 6px 12px;
  border-radius: 9px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: ui-monospace, Consolas, monospace;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.customPallete?.backgroundHover};
  border: 1px solid ${({ theme }) => theme.colors.custom?.border};
`;

export const Actions = styled.div`
  width: 100%;
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;

  & > button {
    flex: 1 1 auto;
    padding: 10px 14px;
    font-size: 0.85rem;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border-radius: 9px;
  border: 0;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.customPallete?.unselectedColor};
  background: transparent;

  &:hover {
    background: ${({ theme }) => theme.colors.customPallete?.backgroundHover};
    color: ${({ theme }) => theme.colors.text};
  }

  & > svg {
    width: 16px;
    height: 16px;
  }
`;

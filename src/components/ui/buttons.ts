import styled, { css } from "styled-components";
import { EASE } from "@/styles/animations";

type Variant = { $variant?: "primary" | "ghost" };

/** Visual compartilhado dos botões de ação (primário roxo / contorno) */
const buttonBase = css<Variant>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 11px 20px;
  border-radius: 12px;
  font-family: Inter, sans-serif;
  font-size: 0.92rem;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid transparent;
  transition:
    transform 200ms ${EASE},
    background 200ms ease,
    box-shadow 200ms ease,
    border-color 200ms ease;

  ${({ $variant = "primary", theme }) =>
    $variant === "primary"
      ? css`
          color: #fff;
          background: ${theme.colors.customPallete?.purplePrimary};
          box-shadow: 0 10px 24px -10px
            ${theme.colors.customPallete?.purplePrimary};

          &:hover {
            box-shadow: 0 14px 30px -10px
              ${theme.colors.customPallete?.purplePrimary};
          }
        `
      : css`
          color: ${theme.colors.text};
          background: transparent;
          border-color: ${theme.colors.custom?.searchBorder};

          &:hover {
            background: ${theme.colors.customPallete?.backgroundHover};
            border-color: ${theme.colors.customPallete?.purplePrimary};
          }
        `}

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme }) => theme.colors.customPallete?.purplePrimary};
    outline-offset: 2px;
  }

  & > svg {
    width: 17px;
    height: 17px;
  }
`;

export const Button = styled.button<Variant>`
  ${buttonBase}
`;

export const LinkButton = styled.a<Variant>`
  ${buttonBase}
`;

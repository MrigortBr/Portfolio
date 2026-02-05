import styled from "styled-components";
import CustomIcon from "../CustomIconActivity/component";

export const AcitivityBar = styled.div`
  background-color: ${(prop) => prop.theme.colors.custom?.header};
  width: 100%;
  grid-row-start: 2;
  grid-row-end: 4;
`;

export const IconWrapper = styled(CustomIcon)<{ $Select: boolean }>`
  width: 100%;
  height: fit-content;
  min-width: 16px;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 100ms;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;

    width: 2px;
    height: 100%;

    background-color: ${({ theme }) =>
      theme.colors.customPallete?.purpleSecondary};

    opacity: ${({ $Select }) => ($Select ? 1 : 0)};
    transform: scaleY(${({ $Select }) => ($Select ? 1 : 0)});

    transition:
      opacity 200ms ease,
      transform 200ms ease;
  }

  & > svg {
    width: 50%;
    min-width: 24px;
    height: fit-content;
    aspect-ratio: 1 / 1;
    fill: ${(prop) =>
      prop.$Select
        ? `${prop.theme.colors.customPallete?.selectedColor}`
        : `${prop.theme.colors.customPallete?.unselectedColor}`};
    transition: 500ms;
  }

  & > svg:hover {
    cursor: pointer;
    fill: ${(prop) => prop.theme.colors.customPallete?.selectedColor};
  }

  &:hover span {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
`;

export const Tooltip = styled.span`
  --height-tooltip: 2.5vh;

  position: absolute;
  bottom: 25%;
  left: 100%;
  transform: translate(-50%, 8px);
  background-color: #333;
  color: #eee;
  padding: 2px 8px;
  border-radius: 4px;
  height: var(--height-tooltip);
  white-space: nowrap;
  font-size: 13px;
  opacity: 0;
  pointer-events: none;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
  user-select: none;
  z-index: 10;
  border: 1px solid #6c63ff;
  &::after {
    content: "";
    position: absolute;
    top: calc(50% - calc(var(--height-tooltip) * 0.15));
    right: calc(100% - (var(--height-tooltip) * 0.15));
    width: calc(var(--height-tooltip) * 0.3);
    height: calc(var(--height-tooltip) * 0.3);
    background: linear-gradient(
      to bottom right,
      #333 0%,
      #333 50%,
      #333 50%,
      #333 100%
    );
    border: 1px solid #6c63ff;
    border-top: 0;
    border-left: 0;
    transform: rotate(135deg);
  }
`;

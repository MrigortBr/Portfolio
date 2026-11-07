import styled, { keyframes } from "styled-components";

export const SwitchContainer = styled.div<{ $light: boolean }>`
  width: 4vw;
  min-width: 56px;
  height: 28px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 20px;

  display: grid;
  grid-template-columns: 50% 50%;
  align-items: center;
  background-color: ${(prop) => prop.theme.colors.custom?.search};
  border: 1px solid ${(prop) => prop.theme.colors.custom?.searchBorder};
  right: 2%;
  position: absolute;
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    width: 26px;
    height: 26px;
    border-radius: 100%;
    top: 0;
    background-color: ${(prop) => prop.theme.colors.custom?.searchBorder};
    z-index: 3;

    transition: 500ms;

    left: ${(prop) => (prop.$light ? 0 : "calc(100% - 26px)")};
  }
`;

export const SwitchItemWrapper = styled.div`
  z-index: 999;
  display: flex;

  &.left {
    height: 14px;
    width: 14px;
    margin-left: 6px;
  }

  &.right {
    height: 14px;
    width: 14px;
    margin-left: auto;
    margin-right: 6px;
  }

  & > svg {
    height: 14px;
    width: 14px;
  }
`;

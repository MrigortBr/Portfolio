import styled, { keyframes } from "styled-components";

export const SwitchContainer = styled.div<{ $light: boolean }>`
  width: 4vw;
  min-width: 48px;
  height: 3vh;
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
    width: 3vh;
    height: 3vh;
    border-radius: 100%;
    top: 0;
    background-color: #454545;
    z-index: 3;

    transition: 500ms;

    left: ${(prop) => (prop.$light ? 0 : "calc(100% - 3vh)")};
  }
`;

export const SwitchItemWrapper = styled.div`
  z-index: 999;
  display: flex;

  &.left {
    height: 1.5vh;
    width: 1.5vh;
    margin-left: 0.75vh;
  }

  &.right {
    height: 1.5vh;
    width: 1.5vh;
    margin-left: auto;
    margin-right: 0.75vh;
  }

  & > svg {
    height: 1.5vh;
    width: 1.5vh;
  }
`;

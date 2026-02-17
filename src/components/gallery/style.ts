import styled, { css, keyframes } from "styled-components";

const openAnimation = keyframes`
  from {
    width: 0vw;
    height: 0vh;
    opacity: 0;
    left: 50%;
    top: 50%;
  }
  to {
    width: 100vw;
    height: 100vh;
    opacity: 1;
    left: 0;
    top: 0;
  }
`;

const closeAnimation = keyframes`
  from {
    width: 100vw;
    height: 100vh;
    opacity: 1;   
    left: 0;
    top: 0;
  }
  to {
    width: 0vw;
    height: 0vh;
    opacity: 0;
    left: 50%;
    top: 50%;
  }
`;

export const GalleryContainer = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1000;
  background-color: black;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;

  animation: ${({ $isOpen }) =>
    $isOpen
      ? css`
          ${openAnimation} 0.5s ease forwards
        `
      : css`
          ${closeAnimation} 0.5s ease forwards
        `};

  & > * {
    z-index: 1001;
  }

  & > header {
    width: 100%;
    height: 10vh;
    display: flex;
    padding: 1%;
  }

  & > header > p {
    width: 100%;
    text-align: center;
    font-family: Inter;
    font-size: clamp(1rem, 0.5vw, 3rem);
    margin: auto;
    color: white;
  }

  @media (max-width: 768px) {
    width: 100vw;

    display: flex;

    & > header {
      top: 10vh;
      z-index: 1500;
      position: absolute;
    }
  }
`;

export const CloseButton = styled.button`
  width: 5vh;
  height: 5vh;
  font-size: 5vh;
  background-color: transparent;
  border: none;
  outline: none;

  font-family: "SN Pro", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  color: ${(prop) => prop.theme.colors.customPallete?.purplePrimary};
  cursor: pointer;

  transition: 500ms;

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    z-index: 1600;
    margin-right: 1vw;
  }
`;

export const GalleryContent = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 5% 90% 5%;
  height: 90vh;
  & > button {
    width: 5vh;
    height: 5vh;
    font-size: 3vh;
    background-color: transparent;
    border: 1px solid lightblue;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    margin: auto;

    font-family: "SN Pro", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
    color: ${(prop) => prop.theme.colors.customPallete?.purplePrimary};
    background-color: ${(prop) =>
      prop.theme.colors.customPallete?.purpleTranslucentSecondary};

    cursor: pointer;

    transition: 500ms;

    &:hover {
      transform: scale(1.1);
    }

    &:focus {
      outline: none;
    }
  }

  @media (max-width: 768px) {
    align-items: center;
    justify-content: center;
    margin-top: 10vh;
    grid-template-columns: 10% 80% 10%;
  }
`;

export const ImagesWrapper = styled.div`
  display: flex; /* alinhamento horizontal */
  overflow-x: hidden;
  overflow-y: hidden;
  width: 90vw;

  ::-webkit-scrollbar {
    display: none; /* esconde scrollbar no Chrome/Safari */
  }

  @media (max-width: 768px) {
    width: 80vw;
  }
`;

export const ImgContainer = styled.div`
  width: 90vw;
  height: 85vh;
  display: flex;
  align-items: center;

  & > img {
    width: 90vw;
    object-fit: contain;
    max-height: 85vh;
  }
`;

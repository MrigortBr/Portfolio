import Image from "next/image";
import styled, { css, keyframes } from "styled-components";

export const ProjectsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ProjectsTitle = styled.h1`
  color: ${(prop) => prop.theme.colors.customPallete?.purplePrimary};
  font-size: clamp(2.1875rem, 2.6vw, 6.25rem);
  width: 100%;
  text-align: left;
  position: relative;
  height: fit-content;
  padding-left: 10px;
  user-select: none;

  &::before {
    content: "";
    position: absolute;
    width: 5px;
    height: 80%;
    top: 10%;
    background-color: ${(prop) =>
      prop.theme.colors.customPallete?.purpleTranslucent};
    left: 0;
  }

  @media (max-width: 768px) {
    margin-top: 5vh;
  }
`;

export const ProjectsWrapper = styled.div`
  width: 100%;
  height: 80vh;
  max-height: 80vh;
  margin-top: 1vh;
  display: grid;
  grid-template-columns: 50% 50%;
  flex-wrap: wrap;
  padding: 1%;
  box-sizing: border-box;
  position: relative;

  @media (max-width: 768px) {
    margin-top: 5vh;
    height: 100%;
    grid-template-columns: 50% 50%;
    grid-template-rows: 30% 50%;
  }
`;

export const OtherProject = styled.div`
  height: 100%;
  width: 90%;
  z-index: 1;
  display: flex;
  margin: auto;

  & > img {
    margin-top: 10%;
  }

  @media (max-width: 768px) {
    width: 60vw;
    left: 15vw;
    height: calc(60vw * 9 / 16);

    margin-top: 0;
    margin: none;

    & > img {
      width: 100%;
      height: 100%;
    }
  }
`;

export const CurrentProject = styled.div`
  top: 10%;
  height: 50%;
  width: 50%;
  z-index: 999;
  position: absolute;
  left: 25%;
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 70vw;
    left: 15vw;
    height: calc(70vw * 9 / 16);

    top: 0;

    & > img {
      width: 100%;
      height: 100%;
    }
  }
`;

export const ProjectPicture = styled(Image)<{ $opacity?: number }>`
  width: 100%;
  height: 40vh;
  box-shadow: 0px 0px 50px 1px
    ${(prop) => prop.theme.colors.customPallete?.purpleTranslucent};
  border-radius: 20px;
  transition: 500ms;
  object-fit: cover;

  opacity: ${({ $opacity }) => ($opacity != undefined ? $opacity : 1)};

  &:hover {
    cursor: ${({ $opacity }) =>
      $opacity != undefined ? "zoom-in" : "pointer"};

    transform: scale(1.1);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0px 0px 15px 1px rgba(138, 43, 226, 0.4);
  }
  50% {
    box-shadow: 0px 0px 25px 4px rgba(138, 43, 226, 0.8);
  }
`;

const shake = keyframes`
  0%{
    transform: rotate(5deg)
  }
  50% {
        transform: rotate(-5deg)
  }
`;

export const LanguagesWrapper = styled.div`
  display: grid;
  grid-column-start: 1;
  grid-column-end: 3;
  width: 100%;
  grid-template-columns: 15% 70% 15%;

  & > svg {
    width: 5vh;
    height: fit-content;
    color: ${(prop) => prop.theme.colors.customPallete?.purplePrimary};
    cursor: pointer;
    box-shadow: 0px 0px 30px 0px
      ${(prop) => prop.theme.colors.customPallete?.purpleSecondary};
    border-radius: 50%;
    margin-bottom: 2vh;
    transition: 500ms;
  }

  & > svg:hover {
    transform: scale(1.1);
    box-shadow: 0px 0px 50px 3px
      ${(prop) => prop.theme.colors.customPallete?.purpleSecondary};
  }

  @media (max-width: 768px) {
    height: 100%;
    width: 100%;
    grid-template-columns: 50% 50%;
    grid-template-rows: 70% 30%;
    row-gap: 10%;

    & > svg {
      grid-row-start: 2;
      grid-row-end: 2;
      margin: auto 0;
      margin-bottom: 0;
    }
  }
`;

export const Languages = styled.div`
  width: 100%;
  height: 30%;

  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* centraliza o conjunto */
  align-items: center;
  gap: 10px; /* espaçamento entre as tags */

  margin: 0 auto;

  & > p {
    background-color: ${(prop) =>
      prop.theme.colors.customPallete?.purpleTranslucent};

    display: inline-block; /* importante */
    width: auto; /* proporcional ao texto */
    padding: 6px 16px;
    border-radius: 20px;

    box-shadow: 0px 0px 30px 1px
      ${(prop) => prop.theme.colors.customPallete?.purpleTranslucent};

    transition: 0.3s ease;
    white-space: nowrap; /* impede quebra interna */
    animation:
      ${fadeInUp} 0.6s ease forwards,
      ${glow} 3s ease-in-out infinite,
      ${shake} 0.5s ease forwards;
  }

  & > p:hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    font-size: clamp(0.6rem, 1vw, 1rem);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    grid-column-start: 1;
    grid-column-end: 3;
    flex-direction: row;
    flex-wrap: wrap;

    & > p {
      margin: 0;
    }
  }
`;

export const ButtonSwitch = styled.button<{ $visible: boolean }>`
  width: 5vh;
  height: 5vh;
  font-size: 3vh;
  border: 1px solid lightblue;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  outline: none;
  margin: auto;

  display: ${({ $visible }) => ($visible ? "flex" : "none")};

  font-family: "SN Pro", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  z-index: 1000;
  background-color: ${(prop) => prop.theme.colors.customPallete?.purplePrimary};
  top: 10vh;

  cursor: pointer;

  transition: 500ms;

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
  }

  position: absolute;
`;

import styled, { keyframes } from "styled-components";
import { TextWrapper as Tw } from "@/components/Hello/style";

export const ThankYouConatiner = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  z-index: 1000;

  & > * {
    z-index: 1000;
  }

  @media (max-width: 768px) {
    align-items: center;
    justify-content: center;
  }
`;

export const TextWrapper = styled(Tw)`
  text-align: center;

  & > h1 {
    z-index: 1000;
  }

  @media (max-width: 768px) {
    height: 50%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    & > h1 {
      margin: 0;
      font-size: clamp(2rem, 3rem, 4rem);
    }
  }
`;

const shake = keyframes`
    0%{
        transform: scale(1.1)
    }

    100%{
        transform: scale(1.0)
    }

`;

export const ContactItens = styled.div`
  width: 100%;
  padding: 0 30%;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: content;
  margin-top: auto;

  margin-bottom: 2vh;

  & > span {
    margin: auto;
    box-shadow: 1px 1px 10px 5px
      ${(prop) => prop.theme.colors.customPallete?.purpleTranslucent};
    background-color: ${(prop) =>
      prop.theme.colors.customPallete?.purpleTranslucent};
    border-radius: 100%;
    width: 5vh;
    height: 5vh;
    animation: ${shake} 1s infinite;
    transition: 500ms;
  }

  & > span > svg {
    width: 100%;
    height: 100%;
    margin: auto;
    fill: ${(prop) => prop.theme.colors.customPallete?.purpleSecondary};
    cursor: pointer;
    transition: 500ms;
  }

  & > span > svg:hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    margin-bottom: 20vh;
    width: 100%;
    padding: 0 10%;
  }
`;

export const FigureContainer = styled.div`
  display: flex;
  position: absolute;
  z-index: 3;
  width: 35vw;
  height: 35vw;
  bottom: -5vh;
  right: 0vw;

  & > svg {
    width: 100%;
    height: 100%;
  }

  & > * {
    z-index: 3;
  }

  @media (max-width: 768px) {
    bottom: 5vh;
    right: -5vw;
  }

  .undrawdemo_svg__finger {
    transform-box: fill-box;
    transform-origin: bottom center;
    animation: moveLeft 1.2s ease-in-out infinite alternate;
  }

  @keyframes moveLeft {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(-5deg);
    }
  }
`;

import styled, { keyframes } from "styled-components";

export const HelloContainer = styled.div`
  position: relative;
`;

export const TextWrapper = styled.div`
  width: 50%;
  height: fit-content;
  max-height: 70%;
  box-sizing: border-box;
  align-items: center;
  margin: auto;

  & > h1 {
    font-family: "Inter";
    font-size: clamp(3rem, 3.5vw, 6.25rem);
    white-space: normal; /* permite quebra de linha */
    overflow-wrap: break-word; /* força quebra em palavras longas */
    width: 100%;
    font-weight: 400;
  }

  & > .upper {
    font-size: clamp(5rem, 5.25vw, 11.875rem);
    color: ${(prop) => prop.theme.colors.customPallete?.purplePrimary};
    font-weight: 900;
  }

  & > .lower {
    font-size: clamp(2.1875rem, 2.6vw, 6.25rem);
    width: 100%;
    font-weight: 400;
  }

  @media (max-width: 768px) {
    width: 90%;

    & > h1 {
      font-family: "Inter";
      font-size: clamp(1rem, 1.5vw, 4.25rem);
      white-space: normal; /* permite quebra de linha */
      overflow-wrap: break-word; /* força quebra em palavras longas */
      width: 100%;
      font-weight: 400;
    }

    & > .upper {
      font-size: clamp(3rem, 3.25vw, 9.875rem);
      color: ${(prop) => prop.theme.colors.customPallete?.purplePrimary};
      font-weight: 900;
    }

    & > .lower {
      font-size: clamp(0.9875rem, 2.6vw, 4.25rem);
      width: 100%;
      font-weight: 400;
    }
  }
`;

export const ImageWrapper = styled.div`
  width: 45%;
  display: flex;
  padding: 2%;
  & > img {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 768px) {
    position: absolute;
    bottom: 6vh;
    right: -6vh;
    z-index: 1000;

    & > svg {
      width: 100%;
      height: 100%;
    }

    .undrawCell_svg__flash {
      animation: flash 1s infinite ease-in-out;
    }

    .undrawCell_svg__leg-right-group {
      transform-box: fill-box;
      transform-origin: top center;
      animation: moveRight 1.2s ease-in-out infinite alternate;
    }

    .undrawCell_svg__leg-left-group {
      transform-box: fill-box;
      transform-origin: top center;
      animation: moveLeft 1.2s ease-in-out infinite alternate;
    }

    @keyframes moveLeft {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(5deg);
      }
    }

    @keyframes moveRight {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(5deg);
      }
    }
    @keyframes flash {
      0% {
        opacity: 1;
        filter: drop-shadow(0 0 0px white);
      }
      50% {
        opacity: 1;
        filter: drop-shadow(0 0 50px rgba(255, 255, 255, 1));
      }
      100% {
        opacity: 1;
        filter: drop-shadow(0 0 0px white);
      }
    }
  }
`;

export const ButtonShadow = styled.button`
  color: #fff;
  font-family: Inter;
  font-size: clamp(2.1875rem, 2.6vw, 6.25rem);
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 20px;
  border-radius: 20px;
  background: ${(prop) => prop.theme.colors.customPallete?.purplePrimary};
  border: 2px solid transparent;
  margin-top: 5%;
  margin-left: 5%;
  transition: 0.5s;

  &:hover {
    cursor: pointer;
    box-shadow: 5px 5px 50px 5px
      ${(prop) => prop.theme.colors.customPallete?.purplePrimary};
  }

  @media (max-width: 768px) {
    width: 70%;
    margin: 10vh 15%;
    padding: 2%;
    font-size: clamp(1.1875rem, 1.6vw, 3.25rem);
  }
`;

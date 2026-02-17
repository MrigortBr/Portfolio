import styled, { keyframes } from "styled-components";

export const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  flex-wrap: wrap;
  user-select: none;

  @media (max-width: 768px) {
    gap: 2vh;
  }
`;

export const AboutTitle = styled.h1`
  color: ${(prop) => prop.theme.colors.customPallete?.purplePrimary};
  font-size: clamp(2.1875rem, 2.6vw, 6.25rem);
  width: 100%;
  text-align: center;
  text-decoration: underline;
  @media (max-width: 768px) {
    text-decoration: none;
  }
`;

export const AboutTextWrapper = styled.div`
  width: 60%;
  height: fit-content;
  display: flex;
  font-size: clamp(1rem, 0.5vw, 3rem);
  font-family: Inter;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-top: 2%;

  & > p {
    height: fit-content;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    width: 90%;
    font-size: clamp(0.7rem, 1vw, 1rem);

    & > p {
      width: 100%;
    }
  }
`;

const morph = keyframes`
  0%, 100% {
  border-radius: 40% 60% 70% 30% / 40% 40% 60% 50%;
  }
  34% {
    border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%;
  }
  67% {
    border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%;}
  `;

export const ImageWrapper = styled.div`
  background: plum;
  padding: 2%;
  height: clamp(15vh, 20vh, 25vh);
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
  overflow: hidden;
  animation: ${morph} 3s linear infinite;
  position: relative;
  margin-left: 5%;

  & > img {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    height: 75%;
    width: 30%;
  }
`;

export const ExperienceWrapper = styled.div`
  display: flex;
  width: 50%;
  margin: 3% auto 3% auto;

  & > ul {
    width: 100%;

    display: flex;
    align-items: center;
    justify-items: center;
  }

  & > ul > li {
    margin: auto;
    list-style: none;
    border-radius: 10px;
    padding: 1% 3%;
    background-color: ${(prop) =>
      prop.theme.colors.customPallete?.purpleTranslucent};
    box-shadow: 1px 1px 20px 1px
      ${(prop) => prop.theme.colors.customPallete?.purpleTranslucent};
    transition: 500ms;
  }

  & .value {
    font-weight: 700;
  }

  & > ul > li > p {
    text-align: center;
    cursor: pointer;
  }

  & > ul > li:hover {
    box-shadow: 5px 5px 50px 5px
      ${(prop) => prop.theme.colors.customPallete?.purpleTranslucent};
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 90%;
    font-size: clamp(0.6rem, 1vw, 1rem);
  }
`;

export const Skills = styled.div`
  height: max-content;
  width: 100%;
  display: flex;
  gap: 5%;
  margin-top: 1%;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 100%;

    & > div {
      width: 20%;
    }
  }
`;

export const SkillsTitle = styled.h1`
  color: ${(prop) => prop.theme.colors.customPallete?.purplePrimary};
  font-size: clamp(2.1875rem, 2.6vw, 6.25rem);
  width: 100%;
  text-align: center;
  margin-bottom: 1%;
  text-decoration: underline;

  @media (max-width: 768px) {
    text-decoration: none;
  }
`;

const booble = keyframes`
    0%{
        transform: scale(1)
    }
    50%{
        transform: scale(1.03)
    }
    100%{
        transform: scale(1)
    }
`;

export const ItemSkill = styled.div`
  background-color: ${(prop) =>
    prop.theme.colors.customPallete?.purpleTranslucent};
  width: fit-content;
  border-radius: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 5px;
  height: 15vh;
  width: 15vh;
  margin-top: 2vh;
  padding: 1%;
  box-sizing: content-box;
  transition: 500ms;
  box-shadow: 1px 1px 20px 1px
    ${(prop) => prop.theme.colors.customPallete?.purpleTranslucent};
  animation-name: ${booble};
  animation-duration: 3s;
  animation-iteration-count: infinite;

  & > div {
    height: 50%;
    aspect-ratio: 1/1;
  }

  & > div > img {
    width: 100%;
    height: 100%;
  }

  & > p {
    width: 100%;
    text-align: center;
    font-weight: 600;
  }

  &:hover {
    box-shadow: 5px 5px 50px 5px
      ${(prop) => prop.theme.colors.customPallete?.purpleTranslucent};
    transform: rotate(30deg);
  }

  @media (max-width: 768px) {
    height: 10vh;

    & > div {
      display: flex;
      justify-content: center;
      align-items: centerl;
    }

    & > div > img {
      width: 80%;
      height: 80%;
    }

    & > p {
      display: none;
    }
  }
`;

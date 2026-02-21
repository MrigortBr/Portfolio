import styled, { keyframes } from "styled-components";
import { AboutTitle } from "../aboutme/style";

export const CertificatesContainer = styled.div`
  display: flex;
  gap: 0;
  user-select: none;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: fit-content;

    gap: 0;
  }
`;

export const CertificatesTitle = styled(AboutTitle)`
  text-decoration: none;
  width: 100%;

  @media (max-width: 768px) {
    height: fit-content;
  }
`;

export const CertificatesListContainer = styled.div`
  width: 100%;
  height: 90%;
  padding: 1% 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1%;
  position: relative;

  @media (max-width: 768px) {
    margin-top: 0;
    padding: 2vh 1%;
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

export const CertificatesListItem = styled.div`
  width: 20vw;
  height: 18vh;
  padding: 2%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  background: linear-gradient(
    145deg,
    ${(prop) => prop.theme.colors.customPallete?.purpleGradientTranslucent},
    ${(prop) =>
      prop.theme.colors.customPallete?.purpleGradientTranslucentSecondary}
  );
  border-radius: 20px;

  & > h1 {
    font-size: clamp(1rem, 0.5vw, 3rem);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    & > img {
      border-radius: 100%;
    }
  }

  & > p {
    font-family: "SN Pro", sans-serif;
    font-weight: 400;
    width: 100%;
    text-align: center;
  }

  @media (max-width: 768px) {
    width: 90%;
    font-size: clamp(0.6rem, 1vw, 1rem);

    & > h1 {
      width: 100%;
      font-size: clamp(0.6rem, 1vw, 1rem);
    }
  }

  @media (max-width: 1366px) {
    & > h1 {
      font-size: clamp(0.5rem, 0.5vw, 3rem);
    }

    & > p {
      font-size: clamp(0.5rem, 0.5vw, 3rem);
    }
  }
`;

export const Tags = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
`;

export const Tag = styled.div`
  background-color: #2d1f44;
  padding: 8px 16px;
  border-radius: 5px;
  font-size: 14px;
  color: #f3f4f6;
  transition: all 0.2s ease;
  font-family: "SN Pro", sans-serif;
  margin-top: 10px;

  &:hover {
    transform: translateY(-2px);
    background: #2d1f44;
    transform: rotate(5deg);
  }

  @media (max-width: 768px) {
    font-size: clamp(0.6rem, 1vw, 1rem);

    & > h1 {
      font-size: clamp(0.6rem, 1vw, 1rem);
    }
  }

  @media (max-width: 1366px) {
    font-size: clamp(0.5rem, 0.5vw, 3rem);
  }
`;

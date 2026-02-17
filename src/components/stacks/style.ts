import styled from "styled-components";
import { AboutTitle } from "../aboutme/style";

export const StackContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: fit-content;
    min-height: 300vh;
  }
`;

export const StackTitle = styled(AboutTitle)`
  text-decoration: none;
`;

export const StackCard = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 20vh 30vh;
  padding: 2%;
  gap: 3vh 0;
  align-items: top;
  justify-content: center;

  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    height: fit-content;
  }
`;

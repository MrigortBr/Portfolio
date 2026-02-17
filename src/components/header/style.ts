import styled from "styled-components";
import { VscSearch } from "react-icons/vsc";

export const VisualHeader = styled.header`
  display: flex;
  background-color: ${(props) => props.theme.colors.custom?.header};
  border-bottom: 1px solid ${(props) => props.theme.colors.custom?.border};
  position: relative;
  width: 100%;
  height: 100%;
  align-items: center;
  box-sizing: border-box;
  grid-column-start: 1;
  grid-column-end: 4;

  @media (max-width: 768px) {
    width: 100vw;
    height: 5vh;
  }
`;

export const VisualSearchWrapper = styled.div`
  width: 25%;
  height: 75%;
  background-color: ${(props) => props.theme.colors.custom?.search};
  border: 1px solid ${(props) => props.theme.colors.custom?.searchBorder};
  color: ${(props) => props.theme.colors.custom?.searchText};
  margin: auto;
  border-radius: 20px;
  padding: 0 1%;
  align-items: center;
  justify-content: center;
  display: flex;

  @media (max-width: 768px) {
    width: 50vw;
  }
`;

export const VisualSearch = styled.span`
  width: fit-content;
  height: 100%;
  border: 0;
  background-color: transparent;
  text-align: center;
  user-select: none;

  &:focus {
    outline: 0;
  }
`;

export const SearchIcon = styled(VscSearch)`
  transform: translateX(-50%);
  color: gray;
  pointer-events: none;
`;

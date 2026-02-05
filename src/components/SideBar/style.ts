import styled from "styled-components";

export const SideBar = styled.div`
  height: 100%;
  width: 15.58vw;
  background-color: ${(props) => props.theme.colors.custom?.header};
  border-left: 1px solid ${(props) => props.theme.colors.custom?.border};
  border-right: 1px solid ${(props) => props.theme.colors.custom?.border};
  grid-row-start: 2;
  grid-row-end: 4;
`;

export const TitleSideBar = styled.h3`
  font-size: 13px;
  margin-left: 5%;
  margin-top: 5%;
  font-weight: 100;
`;

export const FolderWrapper = styled.span`
  display: flex;
  align-items: center;
  gap: 1%;
  padding: 0;
  height: 1.2rem;
  margin-top: 1%;
  margin-left: 2.5%;
  & > svg {
    height: 100%;
  }
`;

export const FolderTitle = styled.h4`
  display: flex;
  align-items: center;
  gap: 1%;
  padding: 0;
  font-size: 13px;
  font-weight: 400;
`;

export const FilesList = styled.ul`
  width: 100%;
  margin-top: 1%;
  margin-left: auto;
  height: 80vh;
  max-height: 80vh;
  font-size: 13px;
`;

export const FileItem = styled.li<{ $selected: boolean }>`
  list-style: none;
  display: flex;
  gap: 2%;
  align-items: center;
  padding: 1% 0% 1% 10%;

  transition: 300ms;

  background-color: ${(prop) =>
    prop.$selected
      ? prop.theme.colors.customPallete?.backgroundSelected
      : prop.theme.colors.custom?.header};

  &:hover {
    background-color: ${(prop) =>
      prop.$selected
        ? prop.theme.colors.customPallete?.backgroundSelected
        : prop.theme.colors.customPallete?.backgroundHover};
    cursor: pointer;
  }
`;

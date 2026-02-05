import styled from "styled-components";

export const FileContainer = styled.div`
  width: 100%;
  background-color: ${(prop) => prop.theme.colors.custom?.header};
  border-bottom: 1px solid ${(props) => props.theme.colors.custom?.border};
`;

export const FileWrapper = styled.div`
  height: 100%;
  width: fit-content;
  background-color: ${(prop) => prop.theme.colors.custom?.fileSelected};
  padding: 0% 1%;
  display: flex;
  align-items: center;
  font-size: 14px;
  justify-content: center;
  border-top: 1px solid
    ${(prop) => prop.theme.colors.customPallete?.purpleSecondary};
`;

export const FileTitle = styled.p`
  margin-left: 5px;
`;

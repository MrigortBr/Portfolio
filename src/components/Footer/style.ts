import styled from "styled-components";

export const FooterContainer = styled.footer`
  width: 100%;
  background-color: ${(prop) => prop.theme.colors.custom?.header};
  grid-column-start: 1;
  grid-column-end: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid ${(prop) => prop.theme.colors.custom?.border};
  position: relative;
`;

export const FooterInfoContainer = styled.div`
  position: absolute;
  left: 1%;
`;

export const FooterInfo = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const FooterCredits = styled.p`
  cursor: pointer;
  font-weight: bold;
  & > a {
    color: ${(prop) => prop.theme.colors.customPallete?.purpleSecondary};
    text-decoration: underline;
  }
`;

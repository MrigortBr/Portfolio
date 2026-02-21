import styled from "styled-components";

export const Card = styled.div`
  background: linear-gradient(
    145deg,
    ${(prop) => prop.theme.colors.customPallete?.purpleGradientTranslucent},
    ${(prop) =>
      prop.theme.colors.customPallete?.purpleGradientTranslucentSecondary}
  );

  padding: 30px;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  grid-column-start: 3;
  grid-row-start: 1;
  grid-row-end: 4;

  color: white;

  @media (max-width: 768px) {
    margin-bottom: 0;
    height: fit-content;
  }

  @media (max-width: 1366px) {
    height: 90%;
    max-height: 95%;
  }
`;

export const Title = styled.h2`
  margin-bottom: 25px;
  font-size: 20px;
  color: ${(prop) => prop.theme.colors.text};
`;

export const SkillContainer = styled.div`
  margin-bottom: 20px;
`;

export const SkillHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
  color: ${(prop) => prop.theme.colors.text};
`;

export const BarBackground = styled.div`
  width: 100%;
  height: 8px;
  background: #2a2f3a;
  border-radius: 10px;
  overflow: hidden;
`;

export const BarFill = styled.div<{ $percentage: number }>`
  height: 100%;
  width: ${({ $percentage }) => $percentage}%;
  background: linear-gradient(
    90deg,
    ${(prop) => prop.theme.colors.customPallete?.purplePrimary},
    ${(prop) => prop.theme.colors.customPallete?.purpleSecondary}
  );
  border-radius: 10px;
  transition: width 0.6s ease-in-out;
`;

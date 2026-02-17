import styled from "styled-components";

export const Card = styled.div`
  background: linear-gradient(
    145deg,
    ${(prop) => prop.theme.colors.customPallete?.purpleGradientTranslucent},
    ${(prop) =>
      prop.theme.colors.customPallete?.purpleGradientTranslucentSecondary}
  );
  padding: 24px;
  border-radius: 20px;
  width: 90%;
  height: fit-content;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
`;

export const Badge = styled.div`
  font-weight: bold;
  padding: 8px 10px;
  border-radius: 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: ${(prop) => prop.theme.colors.text};
`;

export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const Tag = styled.div<{ $color: string }>`
  background-color: ${({ $color }) => $color};
  padding: 8px 16px;
  border-radius: 5px;
  font-size: 14px;
  color: #f3f4f6;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background: #2d1f44;
    cursor: pointer;
    transform: rotate(5deg);
  }
`;

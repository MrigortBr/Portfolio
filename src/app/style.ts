import styled from "styled-components";

export const VisualMain = styled.main`
  display: grid;
  /* cabeçalho e barras com altura mínima, para não espremer os controles */
  grid-template-rows:
    minmax(46px, 4.6vh) minmax(32px, 3.2vh) minmax(0, 1fr)
    minmax(28px, 3.3vh);
  grid-template-columns: 3vw 15.58vw 81.42vw;
  height: 100vh;
  width: 100vw;

  & .page {
    width: 100%;
    height: 100%;
    background-color: ${(prop) => prop.theme.colors.custom?.fileSelected};
    scroll-snap-align: start;
    padding: 1vw;
    display: flex;
  }

  & .blur5px {
    filter: blur(5px);
  }

  @media (max-width: 768px) {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
`;

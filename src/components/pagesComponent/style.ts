import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  scrollbar-width: none;

  /* Desktop: a troca de página é controlada pelo onWheel (scrollIntoView);
     o scroll nativo fica desligado para não brigar com ele. */
  overflow: hidden;
  scroll-snap-type: y mandatory;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 95vh;
    margin-top: 0;
    overflow-x: hidden;
    overflow-y: scroll;
  }
`;

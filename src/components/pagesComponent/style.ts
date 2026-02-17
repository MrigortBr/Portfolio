import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  scrollbar-width: 0px;

  overflow-y: scroll;
  scroll-snap-type: y mandatory;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 95vh;
    margin-top: 0;
    overflow-x: hidden;
  }
`;

import styled from "styled-components";

export const PageContainer = styled.div`
  background-color: red;
  width: 100%;
  height: 100%;
  overflow: auto;
  scrollbar-width: 0px;

  overflow-y: scroll;
  scroll-snap-type: y mandatory;

  &::-webkit-scrollbar {
    display: none;
  }
`;

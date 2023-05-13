import styled from "styled-components";

export const ChartHolder = styled.div`
  position: relative;
  min-height: 20rem;

  > canvas {
    width: unset !important;
    max-width: 100%;
  }
`;

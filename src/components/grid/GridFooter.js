import styled from "@emotion/styled"

const GridFooter = styled.div`
  @media screen and (min-width: 1201px) {
    grid-area: 2 / 3 / 3 / 13;
  }
  @media screen and (min-width: 768px) and (max-width: 1200px) {
    grid-area: 2 / 3 / 3 / 11;
  }
  @media screen and (max-width: 767px) {
    grid-area: 3 / 1 / 4 / 11;
  }
`

export default GridFooter

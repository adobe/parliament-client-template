import styled from "@emotion/styled"

const GridNav = styled.div`
  @media screen and (min-width: 768px) {
    grid-area: 1 / 1 / 3 / 2;
  }
  @media screen and (max-width: 767px) {
    grid-area: 1 / 1 / 2 / 11;
  }
`

export default GridNav

import styled from "@emotion/styled"

const GridContent = styled.div`
  padding-top: 30px;
  padding-left: 16px;
  padding-right: 16px;

  @media screen and (min-width: 1201px) {
    grid-area: 1 / 2 / 2 / 11;
  }
  @media screen and (min-width: 768px) and (max-width: 1200px) {
    grid-area: 1 / 2 / 2 / 11;
  }
  @media screen and (max-width: 767px) {
    grid-area: 2 / 1 / 3 / 11;
  }
`

export default GridContent

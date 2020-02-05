import styled from "@emotion/styled"

const Grid = styled.div`
    display: grid;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    @media screen and (min-width: 1201px) {
    grid-template-rows: 1fr 30px
    grid-template-columns: minmax(280px, 280px) repeat(11, 1fr);
    }
    @media screen and (min-width: 768px) and (max-width: 1200px) {
    grid-template-rows: 1fr 30px
    grid-template-columns: minmax(280px, 280px) repeat(9, 1fr);
    }
    @media screen and (max-width: 767px) {
    grid-template-rows: 1fr 1fr 30px
    grid-template-columns: repeat(10, 1fr);
    }
`

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

const GridNav = styled.div`
  @media screen and (min-width: 768px) {
    grid-area: 1 / 1 / 3 / 2;
  }
  @media screen and (max-width: 767px) {
    grid-area: 1 / 1 / 2 / 11;
  }
`

export { Grid, GridContent, GridFooter, GridNav }

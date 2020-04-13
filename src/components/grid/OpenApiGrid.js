import styled from "@emotion/styled"

const OpenApiGrid = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 30px 1fr 30px;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`

const OpenApiGridNav = styled.div`
  grid-area: 1 / 1 / 2 / 1;
`

const OpenApiGridContent = styled.div`
  padding-top: 30px;
  grid-area: 2 / 1 / 3 / 1;
`

const OpenApiGridFooter = styled.div`
  grid-area: 3 / 1 / 4 / 1;
`

export { OpenApiGrid, OpenApiGridContent, OpenApiGridFooter, OpenApiGridNav }

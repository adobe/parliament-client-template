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

export default Grid

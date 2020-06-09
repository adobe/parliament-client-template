/** @jsx jsx */
import { jsx } from "@emotion/core"
import { graphql } from "gatsby"
import DocLayout from "../components/doclayout"
import { Footer } from "@parliament/parliament-ui-components"
import SiteNav from "../components/SiteNav"
import SEO from "../components/seo"
import renderAst from "../utils/AFMRehype"

import "../components/recipe.css"

import {
  Grid,
  GridNav,
  GridContent,
  GridFooter,
} from "@parliament/parliament-ui-components"

const MarkdownTemplate = props => {
  const { file } = props.data
  const { childMarkdownRemark } = file
  const { htmlAst } = childMarkdownRemark

  const { gitRemote, pages } = props.pageContext

  return (
    <DocLayout>
      <SEO title={props.pageContext.seo} />
      <Grid>
        <GridNav className="spectrum--light">
          <SiteNav
            currentPage={props.location.pathname}
            gitRemote={gitRemote}
            pages={pages}
          />
        </GridNav>
        <GridContent>
          <div class="recipeContent">{renderAst(htmlAst)}</div>
        </GridContent>
        <GridFooter>
          <Footer />
        </GridFooter>
      </Grid>
    </DocLayout>
  )
}

export default MarkdownTemplate

export const query = graphql`
  query MarkdownTemplateQuery2($id: String!) {
    file(id: { eq: $id }) {
      id
      name
      childMarkdownRemark {
        htmlAst
      }
    }
  }
`

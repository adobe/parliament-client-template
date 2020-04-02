/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Provider from "@react/react-spectrum/Provider"

import {
  Header,
  Footer,
  useLaunchScript,
} from "@parliament/parliament-ui-components"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  useLaunchScript(
    "//assets.adobedtm.com/00dcc6d24e46/e61b3825fe76/launch-3cd4277d5923.min.js"
  )

  return (
    <Provider theme="lightest">
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        css={css`
          margin: 0 auto;
          max-width: 960;
          padding: 0px 1.0875rem 1.45rem;
          padding-top: 0;
        `}
      >
        <main>{children}</main>
      </div>
      <Footer />
    </Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

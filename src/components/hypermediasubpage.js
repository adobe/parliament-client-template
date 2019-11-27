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
// import { TreeView } from "@react/react-spectrum/TreeView"

import "./layout.css"

const HypermediaSubLayout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query HyperMediaSubTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Provider theme="lightest">
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
    </Provider>
  )
}

HypermediaSubLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default HypermediaSubLayout

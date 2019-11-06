import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Nav } from "@parliament/parliament-ui-components"

const SiteNav = props => {
  const data = useStaticQuery(
    graphql`
      query SiteNavQuery {
        allRawJsonFile(filter: { view_type: { eq: "mdbook" } }) {
          edges {
            node {
              id
              pages
            }
          }
        }
        gitRemote {
          protocol
          resource
          full_name
          organization
          name
          ref
        }
      }
    `
  )

  const urlPrefix = `${data.gitRemote.organization}/${data.gitRemote.name}/${data.gitRemote.ref}`

  return (
    <Nav
      data={data.allRawJsonFile.edges[0].node.pages}
      path={props.currentPage}
      urlPrefix={urlPrefix}
    />
  )
}

SiteNav.propTypes = {
  currentPage: PropTypes.string,
}

SiteNav.defaultProps = {
  currentPage: "",
}

export default SiteNav

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Nav } from "@parliament/parliament-ui-components"
import Provider from "@react/react-spectrum/Provider"
import Title from "./Title"
import SearchBar from "./SearchBar"

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
    <Provider theme="light">
      <div style={{ width: "256px" }}>
        <div style={{ padding: "30px 24px 24px 24px", width: "256px" }}>
          <a style={{ textDecorationLine: "none" }} href="/">
            <Title />
            <SearchBar />
          </a>
        </div>
        <div style={{ padding: "0px 24px 24px 24px", width: "256px" }}>
          <Nav
            data={data.allRawJsonFile.edges[0].node.pages}
            selected={props.currentPage}
            urlPrefix={urlPrefix}
          />
        </div>
      </div>
    </Provider>
  )
}

SiteNav.propTypes = {
  currentPage: PropTypes.string,
}

SiteNav.defaultProps = {
  currentPage: "",
}

export default SiteNav

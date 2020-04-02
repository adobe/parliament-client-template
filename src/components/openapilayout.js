/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import Provider from "@react/react-spectrum/Provider"
import { useLaunchScript } from "@parliament/parliament-ui-components"

import "./layout.css"

const OpenApiLayout = ({ children }) => {
  useLaunchScript(
    "//assets.adobedtm.com/00dcc6d24e46/e61b3825fe76/launch-3cd4277d5923.min.js"
  )

  return (
    <Provider theme="lightest">
      <main>{children}</main>
    </Provider>
  )
}

OpenApiLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default OpenApiLayout

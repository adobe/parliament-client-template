/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import { Provider } from "@react-spectrum/provider"
import { theme } from "@react-spectrum/theme-default"
import useLaunchScript from "./useLaunchScript"

import "./layout.css"

const DocLayout = ({ children }) => {
  useLaunchScript(
    "//assets.adobedtm.com/00dcc6d24e46/e61b3825fe76/launch-3cd4277d5923.min.js"
  )

  return (
    <Provider theme={theme} colorScheme="light">
      <main>{children}</main>
    </Provider>
  )
}

DocLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DocLayout

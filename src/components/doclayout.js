/**
 *  Copyright 2020 Adobe. All rights reserved.
 *  This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License. You may obtain a copy
 *  of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software distributed under
 *  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *  OF ANY KIND, either express or implied. See the License for the specific language
 *  governing permissions and limitations under the License.
 */

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

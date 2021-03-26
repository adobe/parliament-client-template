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

import React from "react"
import PropTypes from "prop-types"

import { graphql, useStaticQuery } from "gatsby"

import { defaultTheme, Provider, SSRProvider } from "@adobe/react-spectrum"
import {
  Footer,
  Grid,
  GridHeader,
  GridNav,
  GridContent,
  GridFooter,
  GridRightRail,
} from "@adobe/parliament-ui-components"

import HeaderBar from "./HeaderBar"
import SEO from "./seo"

import "./layout.css"

const DocLayout = ({
  children,
  title,
  location,
  gitRemote,
  currentPage,
  pages,
  forceMobile = false,
  sideNav,
  rightRail,
}) => {
  const { allSiteTabs, allHeaderTabs } = useStaticQuery(
    graphql`
      query {
        allHeaderTabs {
          edges {
            node {
              path
              id
              title
            }
          }
        }
        allSiteTabs {
          edges {
            node {
              path
              id
              title
            }
          }
        }
      }
    `
  )

  const tabs = [
    ...allSiteTabs.edges.map(({ node }) => node),
    ...allHeaderTabs.edges.map(({ node }) => node),
  ]

  return (
    <SSRProvider>
      <SEO title={title} />
      <Provider
        theme={defaultTheme}
        colorScheme="light"
        scale="medium"
        UNSAFE_className="spectrum spectrum--light spectrum--medium"
      >
        <Grid>
          <GridHeader>
            <HeaderBar
              location={location}
              gitRemote={gitRemote}
              pages={pages}
              forceMobile={forceMobile}
              tabs={tabs}
            />
          </GridHeader>
          {sideNav && <GridNav>{sideNav}</GridNav>}
          {sideNav ? (
            <GridContent>{children}</GridContent>
          ) : (
            <div style={{ gridArea: "2 / 1 / 3 / 14" }}>{children}</div>
          )}
          {rightRail && <GridRightRail>{rightRail}</GridRightRail>}
          <GridFooter>
            <Footer />
          </GridFooter>
        </Grid>
      </Provider>
    </SSRProvider>
  )
}

DocLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DocLayout

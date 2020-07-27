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

/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { Link } from "gatsby"
import {
  Grid,
  GridNav,
  GridContent,
  GridContentInner,
  GridFooter,
  Footer,
} from "@adobe/parliament-ui-components"

import DocLayout from "../components/doclayout"
import SEO from "../components/seo"
import SiteNav from "../components/SiteNav"

const SearchResults = ({ data, location }) => {
  const { parliamentNavigation } = data
  console.log(location.state.results)
  return (
    <DocLayout>
      <SEO title="Search Results" />
      <Grid>
        <GridNav>
          <SiteNav
            currentPage={location.pathname}
            gitRemote={location.state.gitRemote}
            pages={parliamentNavigation.pages}
          />
        </GridNav>
        <GridContent id="contentMain">
          <GridContentInner>
            <h1>Search Results</h1>
            <ul>
              {location.state.results.map(result => {
                return (
                  <li>
                    <Link to={result.path}>{result.id}</Link>
                  </li>
                )
              })}
            </ul>
          </GridContentInner>
        </GridContent>
        <div
          id="rightRail"
          css={css`
            padding-top: 30px;
            padding-left: 16px;
            padding-right: 16px;

            @media screen and (min-width: 1201px) {
              grid-area: 1 / 11 / 2 / 13;
            }
            @media screen and (max-width: 1200px) {
              display: none;
            }
          `}
        >
          Powered by{" "}
          <a href="https://docs.corp.adobe.com/parliament-docs/README.md">
            Parliament
          </a>
        </div>
        <GridFooter>
          <Footer />
        </GridFooter>
      </Grid>
    </DocLayout>
  )
}

export default SearchResults

export const query = graphql`
  query SearchPageQuery {
    parliamentNavigation {
      pages
    }
  }
`

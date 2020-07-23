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

import { useEffect } from "react"
import { navigate } from "gatsby"
// import { stripManifestPath } from "@adobe/parliament-ui-components"

const IndexTemplate = props => {
  /*
  const homePage = stripManifestPath(props.data.parliamentNavigation.homePage, {
    org: props.pageContext.gitRemote.organization,
    name: props.pageContext.gitRemote.name,
    branch: props.pageContext.gitRemote.ref,
  })
  */

  useEffect(() => {
    navigate(props.pageContext.redirect, {
      replace: true,
    })
  })
  return null
}

/*
export const query = graphql`
  query HomePageQuery {
    parliamentNavigation {
      homePage
    }
  }
`
*/

export default IndexTemplate

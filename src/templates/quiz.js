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
import { useEffect, useState } from "react"
import { css, jsx } from "@emotion/react"
import { graphql, navigate  } from "gatsby"
import CourseNav from "../components/CourseNav"
import DocLayout from "../components/doclayout"
import ExperimentalBadge from "../components/ExperimentalBadge"
import QuizQuestion from "../components/QuizQuestion"
import RenderMdx from "../components/RenderMdx"
import SiteMenu from "../components/SiteMenu"

import { AlertDialog, DialogTrigger, Flex, Meter, View } from "@adobe/react-spectrum"
import {
  Contributors,
  Link,
} from "@adobe/parliament-ui-components"

const QuizTemplate = ({ data, location, pageContext }) => {
  const { file, parliamentNavigation, site } = data
  const { pages } = parliamentNavigation
  const { siteMetadata } = site
  const { sourceFiles } = siteMetadata
  const { absolutePath, childMdx } = file
  const { body, headings, tableOfContents, timeToRead, frontmatter } = childMdx
  const { contributors, gitRemote, dirname } = pageContext
  const pathToFiles = sourceFiles.endsWith("/")
    ? sourceFiles
    : `${sourceFiles}/`
  const relativePath = absolutePath.replace(pathToFiles, "")

  let [questionStates, recordAnswers] = useState({ progress: 0, score: 0 })
  const calcProgress = () => {
    const answered = Object.entries(questionStates).filter(o => o.pop().answered).length
    const total = Object.keys(questionStates).length - 2
    const correct = Object.entries(questionStates).filter(o => o.pop().correct).length

    questionStates.progress = answered / total * 100
    questionStates.score = correct / total * 100
  }

  const QuizQuestionComp = ({ children, ...props }) => {
    let [state, setSelected] = useState({ selected: [], correct: null, answered: false })
    const questionProps = {
      children,
      selected: state.selected,
      setSelected: setSelected,
      ...props
    }

    // UHHHHH.....
    questionStates[children.map((c) => c.props.children.toString()).join('')] = state
    calcProgress()
    recordAnswers(questionStates)

    return QuizQuestion(questionProps) 
  }

  return (
    <DocLayout
      title={pageContext.seo}
      location={location}
      gitRemote={gitRemote}
      currentPage={location.pathname}
      pages={parliamentNavigation.pages}
      sideNav={
        <SiteMenu
          currentPage={location.pathname}
          gitRemote={gitRemote}
          pages={parliamentNavigation.pages}
          CustomNavComponent={CourseNav}
        />
      }
      rightRail={
        <aside
          css={css`
            position: fixed;
            top: var(--spectrum-global-dimension-size-800);
              height: 100%;
          `}
        >

          <Meter marginTop={8} marginBottom={16} label="Progress" value={questionStates.progress} />
          <br/>

          <Link href="https://jira.corp.adobe.com/projects/EON/issues">
            Something off with this quiz? File an EON.
          </Link>

          <hr />

          Powered by{" "}
          <Link href="https://developers.corp.adobe.com/parliament-docs/README.md">
            Parliament
          </Link>
        </aside>
      }
    >
      <div
        css={css`
          float: right;
          z-index: 100;
        `}
      >
      </div>

      <ExperimentalBadge />
      <RenderMdx overrides={ {ul: QuizQuestionComp} }>
        {body}
      </RenderMdx>

      <Flex
        direction="column"
        justifyContent="space-between"
        gap="size-100"
        marginTop="size-800"
        marginBottom="size-400"
      >
        <View>
          <Contributors
            href={`${gitRemote.protocol}://${gitRemote.resource}/${gitRemote.full_name}/blob/${gitRemote.ref}/${relativePath}`}
            contributors={contributors}
            date={
              contributors[0]
                ? new Date(contributors[0].date).toLocaleDateString()
                : new Date().toLocaleDateString()
            }
          />
        </View>
      </Flex>
    </DocLayout>
  )
}

export default QuizTemplate

export const query = graphql`
  query QuizTemplateQuery($id: String!) {
    file(id: { eq: $id }) {
      id
      name
      absolutePath
      childMdx {
        body
        headings { value }
        frontmatter { courseVersion }
      }
    }
    parliamentNavigation {
      pages
    }
    site {
      siteMetadata {
        sourceFiles
      }
    }
  }
`

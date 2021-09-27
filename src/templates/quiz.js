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
import { css, jsx } from "@emotion/react"

import { graphql } from "gatsby"
import QuizLayout from "../components/quizlayout"
import ExperimentalBadge from "../components/ExperimentalBadge"
import { Next } from "../components/NextPrev"
import QuizNextPrev from "../components/QuizNextPrev"
import renderQuizAst from "../util/QuizRehype"
import SiteMenu from "../components/SiteMenu"
import QuizMeter from "../components/QuizMeter"
import QuizResults from "../components/QuizResults"
import { findSelectedPageNextPrev } from "../util/index"
import { useVersionedLocalStore } from "../util/localstore"
import RightRail from "../components/RightRail"

import { Flex, View, Well } from "@adobe/react-spectrum"
import { Contributors, Link } from "@adobe/parliament-ui-components"

const QuizTemplate = ({ data, location, pageContext }) => {
  const { file, parliamentNavigation, site } = data
  const { siteMetadata } = site
  const { sourceFiles } = siteMetadata
  const { absolutePath, childMarkdownRemark } = file
  const { htmlAst, frontmatter } = childMarkdownRemark
  const { contributors, gitRemote, dirname } = pageContext
  const pathToFiles = sourceFiles.endsWith("/")
    ? sourceFiles
    : `${sourceFiles}/`
  const relativePath = absolutePath.replace(pathToFiles, "")
  const { nextPage, previousPage } = findSelectedPageNextPrev(
    location.pathname,
    parliamentNavigation.pages,
    dirname,
    "Quiz"
  )

  const { courseVersion } = frontmatter
  const [alreadyPassed, markVisited] = useVersionedLocalStore(
    dirname,
    location.pathname,
    courseVersion
  )

  return (
    <QuizLayout
      title={pageContext.seo}
      location={location}
      gitRemote={gitRemote}
      currentPage={location.pathname}
      pages={parliamentNavigation.pages}
      sideNav={
        <SiteMenu
          currentPage={location.pathname}
          pages={parliamentNavigation.pages}
          depth={2}
        />
      }
      rightRail={
        <RightRail>
          <QuizMeter />
          <br />
          <Link href="https://jira.corp.adobe.com/projects/EON/issues">
            Something wrong with this quiz? File an EON.
          </Link>
          <hr />
          Powered by{" "}
          <Link href="https://developers.corp.adobe.com/parliament-docs/README.md">
            Parliament
          </Link>
        </RightRail>
      }
    >
      <div
        css={css`
          float: right;
          z-index: 100;
        `}
      ></div>

      <ExperimentalBadge />
      {alreadyPassed && (
        <Well marginTop={32}>
          <span>
            <span role="img" aria-label="tada">
              🎉
            </span>{" "}
            You already ACED this quiz!
          </span>
          <Next nextPage={nextPage} title="You may skip this page!" />
        </Well>
      )}
      <QuizResults />
      {renderQuizAst(htmlAst)}

      <Flex
        direction="column"
        justifyContent="space-between"
        gap="size-100"
        marginTop="size-800"
        marginBottom="size-400"
      >
        <View>
          <QuizNextPrev
            markProgression={markVisited}
            nextPage={nextPage}
            previousPage={previousPage}
            alreadyPassed={alreadyPassed}
          />

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
    </QuizLayout>
  )
}

export default QuizTemplate

export const query = graphql`
  query QuizTemplateQuery($id: String!) {
    file(id: { eq: $id }) {
      id
      name
      absolutePath
      childMarkdownRemark {
        htmlAst
        headings {
          value
        }
        frontmatter {
          courseVersion
        }
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

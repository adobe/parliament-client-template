/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/** @jsx jsx */
import { jsx } from "@emotion/react"
import "@spectrum-css/typography"
import { navigate } from "gatsby"

import "rsuite/dist/styles/rsuite-default.css"
import { Steps } from "rsuite"

const styles = {
  display: 'inline-table',
  verticalAlign: 'top'
};

const step = (page) =>
  <Steps.Item title={page.title} />

const linkedStep = (page) =>
  page.path
    ? <Steps.Item onClick={() => { navigate(page.path) }} title=<a href="#">{page.title}</a> />
    : step(page)

const ProgressBar = ({ pages, currentIx }) => {
  if (!pages) { return ""; }

  return (
    <div>
      <Steps current={currentIx ? currentIx : 0} vertical style={styles}>
        {
          pages.map((page, ix) => {
            if (!page.path || currentIx === ix) {
              return step(page)
            }

            return linkedStep(page)
          })
        }
      </Steps>
    </div>
  )
}

export default ProgressBar

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

import "rsuite/dist/styles/rsuite-default.css"
import { Steps } from "rsuite"

const styles = {
  width: '200px',
  display: 'inline-table',
  verticalAlign: 'top'
};

const ProgressBar = ({ sections, currentIx }) => {
  if (!sections) { return ""; }

  return (
    <div>
      <Steps current={currentIx ? currentIx : 0} vertical style={styles}>
        {sections.map((sectionTitle) => (
          <Steps.Item title={sectionTitle} />
        ))}
      </Steps>
    </div>
  )
}

export default ProgressBar

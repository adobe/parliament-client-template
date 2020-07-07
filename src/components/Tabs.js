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

import React, { Fragment } from "react"

import "@spectrum-css/tabs"

const TabView = ({ children }) => {
  return (
    <div className="spectrum-Tabs spectrum-Tabs--horizontal">
      {children}
      <div className="spectrum-Tabs-selectionIndicator"></div>
    </div>
  )
}

const Tab = ({ label, children }) => {
  return (
    <Fragment>
      <div className="spectrum-Tabs-item" tabindex="0">
        <span className="spectrum-Tabs-itemLabel">{label}</span>
        {children}
      </div>
    </Fragment>
  )
}

export { TabView, Tab }

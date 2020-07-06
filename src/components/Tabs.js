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

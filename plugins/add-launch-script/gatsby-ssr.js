import React from "react"

export const onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  if (
    process.env.NODE_ENV === "production" ||
    pluginOptions.includeInDevelopment
  ) {
    const scriptUrl = pluginOptions.scriptUrl || ""
    setHeadComponents([<script key="launch" src={scriptUrl} async />])
  }
}

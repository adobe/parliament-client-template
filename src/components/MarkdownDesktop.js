/** @jsx jsx */
import React from "react"
import { css, jsx } from "@emotion/core"
import { Footer } from "@parliament/parliament-ui-components"

const MarkdownDesktop = ({ siteNav, content, pageActions }) => {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: minmax(280px, 280px) repeat(11, 1fr);
        grid-template-rows: 1fr 30px
        grid-column-gap: 0px;
        grid-row-gap: 0px;
      `}
    >
      <div
        css={css`
          grid-area: 1 / 1 / 3 / 2;
        `}
        className="spectrum--light"
      >
        {siteNav}
      </div>
      <div
        css={css`
          grid-area: 1 / 2 / 2 / 11;
          padding-top: 30px;
          padding-left: 16px;
          padding-right: 16px;
        `}
      >
        {content}
      </div>
      <div
        css={css`
          grid-area: 1 / 11 / 2 / 13;
          padding-top: 30px;
          padding-left: 16px;
          padding-right: 16px;
        `}
      >
        {pageActions}
      </div>
      <div
        css={css`
          grid-area: 2 / 3 / 3 / 13;
        `}
      >
        <Footer />
      </div>
    </div>
  )
}

export default MarkdownDesktop

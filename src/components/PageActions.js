/** @jsx jsx */
import React from "react"
import { css, jsx } from "@emotion/core"
import {
  ActionButtons,
  TableOfContents,
} from "@parliament/parliament-ui-components"

const PageActions = ({
  gitRemote,
  relativePath,
  tableOfContents,
  modifiedTime,
  timeToRead,
}) => {
  return (
    <React.Fragment>
      <div
        css={css`
          @media screen and (min-width: 1201px) {
            display: block;
          }
          @media screen and (max-width: 1200px) {
            display: none;
          }
        `}
      >
        {tableOfContents ? (
          <TableOfContents tableOfContents={tableOfContents} />
        ) : (
          ""
        )}
        {modifiedTime && timeToRead ? (
          <p>
            <span
              css={css`
                display: block;
              `}
            >
              Last update: {modifiedTime}
            </span>
            <span
              css={css`
                display: block;
              `}
            >
              {timeToRead} min read
            </span>
          </p>
        ) : (
          ""
        )}
      </div>
    </React.Fragment>
  )
}

export default PageActions

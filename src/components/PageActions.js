/** @jsx jsx */
import React, { Fragment } from "react"
import { css, jsx } from "@emotion/core"
import { Feedback } from "@parliament/parliament-ui-components"
import Heading from "@react/react-spectrum/Heading"

const PageActions = ({
  gitRemote,
  relativePath,
  tableOfContents,
  modifiedTime,
  timeToRead,
}) => {
  return (
    <>
      <div
        css={css`
          padding-bottom: 20px;
        `}
      >
        {gitRemote !== null ? (
          <Feedback
            gitUrl={`${gitRemote.protocol}://${gitRemote.resource}/${gitRemote.full_name}`}
            filePath={relativePath}
            branch={gitRemote.ref}
          />
        ) : (
          ""
        )}
      </div>
      <div>
        <Heading variant="subtitle3">On this page</Heading>
        <span
          className="toc"
          dangerouslySetInnerHTML={{ __html: tableOfContents }}
        ></span>
      </div>
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
    </>
  )
}

export default PageActions

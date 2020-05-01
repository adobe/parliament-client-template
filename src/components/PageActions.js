/** @jsx jsx */
import React from "react"
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
    <React.Fragment>
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
          <div
            css={css`
              height: 70vh;
              overflow-y: auto;
              overflow-x: hidden;
            `}
          >
            <Heading variant="subtitle3">On this page</Heading>
            <span
              className="toc"
              dangerouslySetInnerHTML={{ __html: tableOfContents }}
            ></span>
          </div>
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

/** @jsx jsx */
import React from "react"
import { css, jsx } from "@emotion/core"
import { Feedback } from "@parliament/parliament-ui-components"
import Heading from "@react/react-spectrum/Heading"
import { useMediaQuery } from "react-responsive"

const PageActions = ({
  gitRemote,
  relativePath,
  tableOfContents,
  modifiedTime,
  timeToRead,
}) => {
  const isDesktop = useMediaQuery({ minWidth: 1201 })
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
      {isDesktop ? (
        <React.Fragment>
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
        </React.Fragment>
      ) : (
        ""
      )}
    </React.Fragment>
  )
}

export default PageActions

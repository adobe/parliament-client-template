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
import { css, jsx } from "@emotion/react"
import { createRef, useState } from "react"
import nextId from "react-id-generator"
import classNames from "classnames"
import Highlight, { defaultProps } from "prism-react-renderer"
import "@spectrum-css/typography"
import "@spectrum-css/tooltip"
import "@adobe/prism-adobe"
import { ActionButton, defaultTheme, Provider } from "@adobe/react-spectrum"
import PropTypes from "prop-types"
// import { destructureProps, parseMetastring } from "../utils"

const parseMetastring = (metastring) => {
  const matches = metastring.match(/{.*?(?=})}/g)
  const options = {}
  if (matches) {
    for (let i = 0; i < matches.length; i++) {
      const option = matches[i].slice(1, -1).split(":")
      const value = option[1] ? option[1].trim() : ""
      if (value.toLowerCase() === "true") {
        options[option[0]] = true
      } else if (value.toLowerCase() === "false") {
        options[option[0]] = false
      } else {
        options[option[0]] = value
      }
    }
  }
  return options
}

const openTooltip = (setIsTooltipOpen) => {
  setIsTooltipOpen(true)
  setTimeout(() => {
    setIsTooltipOpen(false)
  }, 3000)
}

const copy = (textarea, document, setIsTooltipOpen) => {
  textarea.current.select()
  document.execCommand("copy")
  openTooltip(setIsTooltipOpen)
}

const RE = /{([\d,-]+)}/

const calculateLinesToHighlight = (meta) => {
  if (!RE.test(meta)) {
    return () => false
  }
  const lineNumbers = RE.exec(meta)[1]
    .split(`,`)
    .map((v) => v.split(`-`).map((x) => parseInt(x, 10)))
  console.log(lineNumbers)

  return (index) => {
    const lineNumber = index + 1
    const inRange = lineNumbers.some(([start, end]) =>
      end ? lineNumber >= start && lineNumber <= end : lineNumber === start
    )
    return inRange
  }
}

const CodeUI = (props) => {
  const {
    children,
    className = "",
    theme = "dark",
    copyButton = true,
    lineNumbers = true,
    ["data-meta"]: metastring = "",
    ...otherProps
  } = props.children[0].props
  const tooltipId = nextId()
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)
  const language = className.replace(/language-/, "")

  const shouldHighlightLine = calculateLinesToHighlight(metastring)
  const options = parseMetastring(metastring)
  const isCopyButton = options.copy ?? copyButton
  const isLineNumbers = options.numberLines ?? lineNumbers

  return (
    <Provider
      theme={defaultTheme}
      colorScheme={theme}
      scale="medium"
      UNSAFE_style={{
        borderRadius: "var(--spectrum-global-dimension-size-50)",
        marginTop: "1.0rem",
        marginBottom: "1.45rem",
      }}
      {...otherProps}
    >
      <Highlight {...defaultProps} code={children[0]} language={language}>
        {({ className, tokens, getLineProps, getTokenProps }) => {
          const lines = tokens.slice(0, -1)
          const isMultiLine = lines.length > 1
          const textarea = createRef()

          return (
            <pre className={classNames(className, "spectrum-Code4")}>
              {isCopyButton && (
                <div
                  css={css`
                    position: relative;
                  `}
                >
                  <textarea
                    readOnly
                    aria-hidden="true"
                    tabIndex="-1"
                    css={css`
                      position: fixed;
                      left: -999px;
                      opacity: 0;
                    `}
                    ref={textarea}
                    value={children}
                  />
                  <ActionButton
                    aria-describedby={tooltipId}
                    onPress={() => {
                      copy(textarea, document, setIsTooltipOpen)
                    }}
                    UNSAFE_style={{
                      position: "absolute",
                      top: "0",
                      right: "0",
                    }}
                  >
                    Copy
                  </ActionButton>
                  <span
                    role="tooltip"
                    id={tooltipId}
                    css={css`
                      display: block;
                      position: absolute;
                      top: ${isMultiLine ? "4px" : "-2px"};
                      right: var(--spectrum-global-dimension-static-size-600);
                      left: initial;
                      font-family: var(
                        --spectrum-alias-body-text-font-family,
                        var(--spectrum-global-font-family-base)
                      );
                    `}
                    className={classNames(
                      "spectrum-Tooltip spectrum-Tooltip--left",
                      {
                        "is-open": isTooltipOpen,
                      }
                    )}
                  >
                    <span className="spectrum-Tooltip-label">
                      Copied to your clipboard
                    </span>
                    <span className="spectrum-Tooltip-tip" />
                  </span>
                </div>
              )}
              {tokens.slice(0, -1).map((line, i) => {
                const { style: lineStyles, ...lineProps } = getLineProps({
                  line,
                  key: i,
                })

                if (shouldHighlightLine(i)) {
                  lineProps.className = `${lineProps.className} highlight-line`
                }

                return (
                  <div
                    key={i}
                    css={css`
                      display: table-row;
                    `}
                    {...lineProps}
                  >
                    {isMultiLine && isLineNumbers && (
                      <span
                        css={css`
                          display: table-cell;
                          color: var(--spectrum-global-color-gray-500);
                          text-align: left;
                          padding-right: var(
                            --spectrum-global-dimension-static-size-100
                          );
                          user-select: none;
                        `}
                      >
                        {i + 1}
                      </span>
                    )}
                    <span {...lineProps}>
                      {line.map((token, key) => {
                        const { style: tokenStyles, ...tokenProps } =
                          getTokenProps({ token, key })
                        return <span key={key} {...tokenProps} />
                      })}
                    </span>
                  </div>
                )
              })}
            </pre>
          )
        }}
      </Highlight>
    </Provider>
  )
}

CodeUI.propTypes = {
  theme: PropTypes.oneOf(["light", "dark"]),
}

export { CodeUI }

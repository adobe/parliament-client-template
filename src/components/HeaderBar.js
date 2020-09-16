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

/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { useEffect, useRef, useState } from "react"
import { Link } from "gatsby"
import Logo from "../images/adobe_logo-2.svg"
import { ActionButton, Divider, Flex, View } from "@adobe/react-spectrum"
import SiteMenu from "./SiteMenu"

import Menu from "@spectrum-icons/workflow/ShowMenu"

import { useMediaQuery } from "react-responsive"

const stretched = css`
  height: 100%;
`

const HeaderBar = ({ siteTitle, forceMobile, ...props }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  let [isPopoverOpen, setPopoverOpen] = useState(false)
  const node = useRef()

  const handleClickOutside = e => {
    if (node.current.contains(e.target)) {
      return
    }
    setPopoverOpen(false)
  }

  useEffect(() => {
    if (isPopoverOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isPopoverOpen])

  return (
    <header
      role="banner"
      css={css`
        ${stretched}
        border-bottom: var(--spectrum-global-dimension-static-size-10) solid var(--spectrum-global-color-gray-200);
        box-sizing: border-box;
      `}
    >
      <nav css={stretched} role="navigation" aria-label="Global">
        <View height="100%" paddingStart="size-300" paddingEnd="size-300">
          <Flex alignItems="center" height="100%">
            {isMobile || forceMobile ? (
              <ActionButton
                isQuiet
                onPress={() => {
                  setPopoverOpen(!isPopoverOpen)
                }}
              >
                <Menu UNSAFE_style={{ paddingRight: 0, paddingLeft: 0 }} />
              </ActionButton>
            ) : (
              undefined
            )}
            <a
              href="https://developers.corp.adobe.com"
              css={css`
                text-decoration-line: none;
              `}
            >
              <Flex alignItems="center" height="100%">
                <Logo
                  css={css`
                    width: var(--spectrum-global-dimension-static-size-450);
                    height: var(--spectrum-global-dimension-static-size-400);
                    display: block;
                    margin-right: var(
                      --spectrum-global-dimension-static-size-200
                    );
                  `}
                />
                <strong className="spectrum-Heading--XXS">Developer</strong>
              </Flex>
            </a>
            <Divider
              orientation="vertical"
              marginStart="size-300"
              size="M"
              height="100%"
            />
            <Link
              css={css`
                text-decoration-line: none;
              `}
              to="/"
            >
              <View paddingStart="size-300">
                <span className="spectrum-Body spectrum-Body--XXS">
                  {siteTitle}
                </span>
              </View>
            </Link>
          </Flex>
        </View>
      </nav>
      <div
        className={`spectrum-Site-sideBar ${isPopoverOpen ? " is-open" : ""}`}
        ref={node}
        css={css`
          margin-top: 64px;
        `}
      >
        <SiteMenu isMobile={isMobile} {...props} />
      </div>
    </header>
  )
}

HeaderBar.defaultProps = {
  siteTitle: process.env.GATSBY_SOURCE_TITLE,
}

export default HeaderBar

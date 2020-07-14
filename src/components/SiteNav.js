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
import { useEffect, useRef, useState, Fragment } from "react"
import PropTypes from "prop-types"
import { ActionButton } from "@adobe/parliament-ui-components"

import Menu from "@spectrum-icons/workflow/ShowMenu"

import SiteMenu from "./SiteMenu"
import Title from "./Title"

import { useMediaQuery } from "react-responsive"

import "./sitenav.css"

const SiteNav = props => {
  const { forceMobile } = props
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
    <Fragment>
      {!isMobile && !forceMobile ? (
        <SiteMenu isMobile={isMobile} {...props} />
      ) : (
        <div>
          <div
            css={css`
              display: flex;
              flex-direction: row;
              padding: 12px;
              text-align: center;
            `}
          >
            <ActionButton
              isQuiet
              onPress={() => {
                setPopoverOpen(!isPopoverOpen)
              }}
            >
              <Menu size="S" />
            </ActionButton>
            <Title isMobile={isMobile} forceMobile={forceMobile} />
          </div>
          <div
            className={`spectrum-Site-sideBar ${
              isPopoverOpen ? " is-open" : ""
            }`}
            ref={node}
          >
            <SiteMenu isMobile={isMobile} {...props} />
          </div>
        </div>
      )}
    </Fragment>
  )
}

SiteNav.propTypes = {
  forceMobile: PropTypes.bool,
}

SiteNav.defaultProps = {
  forceMobile: false,
}

export default SiteNav

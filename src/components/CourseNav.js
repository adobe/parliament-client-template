/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { stripManifestPath, defaultFocus } from '@adobe/parliament-ui-components'

import '@spectrum-css/sidenav'

const nav = (data, gitInfo, defaultFocus, currDepth, maxDepth) => {
  if (currDepth >= maxDepth) {
    return ''
  }

  return (
    <ul className='spectrum-SideNav  spectrum-SideNav--multiLevel'>
      {data.map((node, index) => {
        const updatedPath = stripManifestPath(node.path, gitInfo)
        const isSelected =
          node.title === defaultFocus
            ? 'spectrum-SideNav-item is-selected'
            : 'spectrum-SideNav-item'

        return (
          <li className={isSelected} key={index}>
            <a
              href='#'
              className='spectrum-SideNav-itemLink'
              onClick={() => {
                if (updatedPath) {
                  if (
                    updatedPath.startsWith('http://') ||
                    updatedPath.startsWith('https://')
                  ) {
                    document.location.href = updatedPath
                  } else {
                    navigate(updatedPath)
                  }
                }
              }}
            >
              {node.title}
            </a>
            {node.pages ? nav(node.pages, gitInfo, defaultFocus, currDepth + 1, maxDepth) : ''}
          </li>
        )
      })}
    </ul>
  )
}

const CourseNav = ({ data, selected, gitInfo, ...props }) => {
  const maxDepth = props.depth ? props.depth : 2
  return (
    <nav aria-label='Side Navigation' {...props}>
      {nav(data, gitInfo, defaultFocus(data, selected, gitInfo), 0, maxDepth)}
    </nav>
  )
}

CourseNav.propTypes = {
  data: PropTypes.array,
  selected: PropTypes.string,
  gitInfo: PropTypes.object,
  depth: PropTypes.number,
}

CourseNav.defaultProps = {
  data: [],
  selected: '',
  gitInfo: {},
  depth: 2,
}

export default CourseNav

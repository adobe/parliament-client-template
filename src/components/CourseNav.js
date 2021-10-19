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
import { withPrefix, Link as GatsbyLink } from "gatsby"

import '@spectrum-css/sidenav'

const liStyles = { paddingLeft: `calc(var(--spectrum-global-dimension-size-150))` }

const isPathSelected = (path, selected) => {
    const compare = selected.endsWith('/')
      ? selected.substring(0, selected.length - 1)
      : selected
    return path === compare
}

const navItemClass = (path, selectedPathUri, seenPaths) => {
  let className = isPathSelected(path, selectedPathUri)
                  ? 'spectrum-SideNav-item is-selected'
                  : 'spectrum-SideNav-item'

  const fullPath = withPrefix(path)
  if (seenPaths.includes(fullPath) || selectedPathUri === fullPath) {
    return className
  }

  return `${className} is-disabled`
}

const navListItemLink = (liIndex, path, title, selected, seenPaths) => (
  <li className={navItemClass(path, selected, seenPaths)} key={liIndex}>
    <GatsbyLink
      to={path}
      className='spectrum-SideNav-itemLink'
      style={liStyles}
    >
      {title}
    </GatsbyLink>
  </li>
)

const navListItemDeadLink = (liIndex, path, title, selected, seenPaths) =>
  navListItemLink(liIndex, '#', title, selected, seenPaths)

const moduleCanBeNavigatedTo = (seenPaths, currentFullPath, nodePathWithPrefix) =>
    currentFullPath ===  nodePathWithPrefix ||
      seenPaths.some(path => path === nodePathWithPrefix)

const nav = (data, selected, seenPaths) => {
  return (
    <ul className='spectrum-SideNav spectrum-SideNav--multiLevel'>
      {data.map(
        (node, index) => {
          const { path, title } = node
          const nodeFullPath = withPrefix(path)

          if (moduleCanBeNavigatedTo(seenPaths, selected, nodeFullPath)) {
            return navListItemLink(index, path, title, selected, seenPaths)
          }

          return navListItemDeadLink(index, path, title, selected, seenPaths)
        }
      )}
    </ul>
  )
}

/**
 * data - array of page objects with path & title attributes.
 *        Path attribute does NOT have prefixes
 *        (pulled directly from GraphQL query)
 * selected - FULL path of the page that user is currently on (includes prefix)
 * seenPaths - array of FULL page paths (currently from local store, which stores full paths)
 */
const CourseNav = ({ data = [], selected = '', ...props }) => {
  const { seenPaths } = props
  const defaultFocus = selected.charAt(0) === '/' ? selected : `/${selected}`
  return (
    <nav aria-label='Course Side Navigation' {...props}>
      {nav(data, defaultFocus, seenPaths)}
    </nav>
  )
}

CourseNav.propTypes = {
    data: PropTypes.array,
    selected: PropTypes.string,
    seenPaths: PropTypes.array,
}

export { CourseNav }

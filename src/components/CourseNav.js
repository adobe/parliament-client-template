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
import { Link as GatsbyLink } from "gatsby"

import '@spectrum-css/sidenav'

const isPathSelected = (path, selected) => {
    const compare = selected.endsWith('/')
      ? selected.substring(0, selected.length - 1)
      : selected
    return path === compare
}

const liStyles = { paddingLeft: `calc(var(--spectrum-global-dimension-size-150))` }

const navItemClass = (path, selectedPathUri, completedModulePaths) => {
  let className = isPathSelected(path, selectedPathUri)
                  ? 'spectrum-SideNav-item is-selected'
                  : 'spectrum-SideNav-item'

  if (completedModulePaths.includes(path) || selectedPathUri === path) {
    return className
  }

  return `${className} is-disabled`
}

const navListItemLink = (liIndex, path, title, selected, completedModulePaths) => (
  <li className={navItemClass(path, selected, completedModulePaths)} key={liIndex}>
    <GatsbyLink
      to={path}
      className='spectrum-SideNav-itemLink'
      style={liStyles}
    >
      {title}
    </GatsbyLink>
  </li>
)

const navListItemDeadLink = (liIndex, path, title, selected, completedModulePaths) =>
  navListItemLink(liIndex, '#', title, selected, completedModulePaths)

// here to get around page paths being pre-pended with different roots. Only valid in the context of projects
// 🤷‍♂️
const moduleCanBeNavigatedTo = (completedModulePaths, selected, modulePath) =>
  selected.endsWith(modulePath) || modulePath.endsWith(selected) ||
    completedModulePaths.some(path => path.endsWith(modulePath) || modulePath.endsWith(path))

const nav = (data, selected, completedModulePaths) => {
    return (
      <ul className='spectrum-SideNav spectrum-SideNav--multiLevel'>
        {data.map(
          (node, index) => {
            if (moduleCanBeNavigatedTo(completedModulePaths, selected, node.path)) {
              return navListItemLink(index, node.path, node.title, selected, completedModulePaths)
            }

            return navListItemDeadLink(index, node.path, node.title, selected, completedModulePaths)
          }
        )}
      </ul>
    )
}

const CourseNav = ({ data = [], selected = '', ...props }) => {
  const { completedModulePaths } = props
  const defaultFocus = selected.charAt(0) === '/' ? selected : `/${selected}`
  return (
        <nav aria-label='Course Side Navigation' {...props}>
          {nav(data, defaultFocus, completedModulePaths)}
        </nav>
      )
}

CourseNav.propTypes = {
    data: PropTypes.array,
    selected: PropTypes.string,
    depth: PropTypes.number
}

export { CourseNav }

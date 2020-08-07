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

/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import PropTypes from 'prop-types'
import { Link } from "@adobe/parliament-ui-components"
import { View } from '@react-spectrum/view'

import '@spectrum-css/typography'
import '@spectrum-css/link'

const TableOfContents = ({ tableOfContents }) => {
  const index = tableOfContents.items && tableOfContents.items.length - 1

  const tableOfContentsItems = {
    items: tableOfContents.items && tableOfContents.items[index].items
  }

  return (
    <View
      elementType='nav'
      role='navigation'
      aria-label='Article Outline'
      marginY='size-400'
    >
      <h4
        className='spectrum-Detail--L'
        css={css`
          color: var(--spectrum-global-color-gray-600);
        `}
      >
        On this page
      </h4>
      <span
        css={css`
          * {
            list-style: none;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-decoration: none;
            max-width: 200px;
          }
        `}
      >
        <ul
          className='spectrum-Body--M'
          css={css`
            margin: 0;
            padding-left: 0;
          `}
        >
          {tableOfContentsItems.items &&
            tableOfContentsItems.items.map(renderItem, index)}
        </ul>
      </span>
    </View>
  )
}

const renderItem = (item, index) => (
  <li
    key={index}
    css={css`
      margin-top: var(--spectrum-global-dimension-static-size-150);
      margin-bottom: 0;
    `}
  >
    {item.items ? (
      <ul
        css={css`
          list-style: none;
          padding-left: var(--spectrum-global-dimension-static-size-200);
          margin-left: 0;
          margin-bottom: 0;
          margin-top: 0;
        `}
      >
        <Link
          href={item.url}
          css={css`
            margin-left: -16px;
          `}
        >
          {item.title}
        </Link>
        {item.items.map(renderItem)}
      </ul>
    ) : (
      <Link href={item.url}>{item.title}</Link>
    )}
  </li>
)

TableOfContents.propTypes = {
  tableOfContents: PropTypes.object
}

TableOfContents.defaultProps = {
  tableOfContents: {}
}

export default TableOfContents

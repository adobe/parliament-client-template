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

import './index.css'

const TableOfContents = ({ tableOfContents }) => {
  const index = tableOfContents.items && tableOfContents.items.length - 1

  const tocOutline = {
    items: tableOfContents.items && tableOfContents.items[index].items
  }

  return (
    <React.Fragment>
      <h6>ON THIS PAGE</h6>
      <span className='tableOfContents'>
        <ul>{tocOutline.items && tocOutline.items.map(renderItem)}</ul>
      </span>
    </React.Fragment>
  )
}

const renderItem = (item) => (
  <li className='item' key={item.title}>
    {item.items ? (
      <ul>
        <a href={item.url}>{item.title}</a>
        {item.items.map(renderItem)}
      </ul>
    ) : (
      <a href={item.url}>{item.title}</a>
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

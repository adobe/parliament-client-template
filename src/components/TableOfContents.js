import React from 'react'
import PropTypes from 'prop-types'
import { parse } from 'node-html-parser'
import { Heading } from '@react-spectrum/text'

// const stripOuterH1 = function (toc) {
//   let html = ''
//   const root = parse(toc)
//   console.log(root)
//   const headerOneList = root.querySelector('ul')
//   if (headerOneList) {
//     const headerTwoList = headerOneList.querySelector('ul')
//     if (headerTwoList) {
//       html = headerTwoList.toString()
//     }
//   }
//   return html
// }

/*
const createToC = (tableOfContents, maxDepth, stripH1) => {
  const depth = 1
  const root = parse(tableOfContents)
}
*/

const TableOfContents = ({ tableOfContents, depth, stripH1 }) => {
  // Removing the H1 from the ToC
  const body = tableOfContents
  return (
    <div
      style={{
        height: '70vh',
        overflowY: 'auto',
        overflowX: 'hidden'
      }}
    >
      <Heading level={5}>On this page</Heading>
      <span className='toc'>
        <MDXRenderer>{body}</MDXRenderer>
      </span>
    </div>
  )
}

TableOfContents.propTypes = {
  tableOfContents: PropTypes.string,
  depth: PropTypes.number,
  stripH1: PropTypes.bool
}

TableOfContents.defaultProps = {
  tableOfContents: '',
  depth: 2,
  stripH1: true
}
export default TableOfContents

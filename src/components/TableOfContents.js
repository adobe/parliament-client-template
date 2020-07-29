import React from "react"
import PropTypes from "prop-types"
import { Heading } from "@react-spectrum/text"

const TableOfContents = ({ tableOfContents }) => {
  return (
    <div style={{ height: "70vh", overflowY: "auto", overflowX: "hidden" }}>
      <Heading level={5}>On this page</Heading>
      <span className="toc">
        <ul>{tableOfContents.items.map(renderItem)}</ul>
      </span>
    </div>
  )
}

const renderItem = item => (
  <li className="item" key={item.title}>
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
  tableOfContents: PropTypes.object,
}

TableOfContents.defaultProps = {
  tableOfContents: {},
}

export default TableOfContents

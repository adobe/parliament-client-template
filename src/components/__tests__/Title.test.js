import React from "react"
import { render } from "@testing-library/react"

import Title from "../Title"

describe(`Title`, () => {
  it(`renders title`, () => {
    const testTitle = `Test Title`
    const { getByText } = render(<Title siteTitle={testTitle} />)

    const text = getByText(testTitle)

    expect(text).toBeInTheDocument()
  })
})

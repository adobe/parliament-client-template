import React from "react"
import Heading from "@react/react-spectrum/Heading"
import Logo from "../images/adobe_logo-2.svg"

const Title = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Logo
        style={{
          width: "45px",
          height: "40px",
          marginRight: "16px",
          paddingTop: "1px",
        }}
      />
      <Heading variant="subtitle1">{process.env.GATSBY_SOURCE_TITLE}</Heading>
    </div>
  )
}

export default Title

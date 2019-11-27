import { useEffect } from "react"
import { navigate } from "gatsby"

const IndexTemplate = props => {
  useEffect(() => {
    navigate(props.pageContext.redirect, {
      replace: true,
    })
  }, [])
  return null
}

export default IndexTemplate

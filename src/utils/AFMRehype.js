import { createElement } from "react"
import rehypeReact from "rehype-react"

import Alert from "@react/react-spectrum/Alert"

const renderAst = new rehypeReact({
  createElement: createElement,
  components: { alert: Alert },
}).Compiler

export default renderAst

import { createElement } from "react"
import rehypeReact from "rehype-react"

import Alert from "@react/react-spectrum/Alert"
import IncludeMarkdown from "../components/IncludeMarkdown"

const renderAst = new rehypeReact({
  createElement: createElement,
  components: { alert: Alert, includemarkdown: IncludeMarkdown },
}).Compiler

export default renderAst

import { createElement } from "react"
import rehypeReact from "rehype-react"

import Alert from "@react/react-spectrum/Alert"
import { TabView, Tab } from "@react/react-spectrum/TabView"
import IncludeMarkdown from "../components/IncludeMarkdown"

const renderAst = new rehypeReact({
  createElement: createElement,
  components: {
    alert: Alert,
    includemarkdown: IncludeMarkdown,
    tab: Tab,
    tabview: TabView,
  },
}).Compiler

export default renderAst

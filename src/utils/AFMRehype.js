import { createElement } from "react"
import rehypeReact from "rehype-react"

import {
  Alert,
  Table,
  TBody,
  TH,
  TD,
  THead,
  TR,
} from "@parliament/parliament-ui-components"
import { TabView, Tab } from "@react/react-spectrum/TabView"
import IncludeMarkdown from "../components/IncludeMarkdown"

const renderAst = new rehypeReact({
  createElement: createElement,
  components: {
    alert: Alert,
    includemarkdown: IncludeMarkdown,
    tab: Tab,
    tabview: TabView,
    spectrumtable: Table,
    spectrumtbody: TBody,
    spectrumth: TH,
    spectrumtd: TD,
    spectrumthead: THead,
    spectrumtr: TR,
  },
}).Compiler

export default renderAst

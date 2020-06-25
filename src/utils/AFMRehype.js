import { createElement } from "react"
import rehypeReact from "rehype-react"

import Alert from "@react/react-spectrum/Alert"
import { Table, TBody, TH, TD, THead, TR } from "@react/react-spectrum/Table"
/*
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "@react-spectrum/table"
*/
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

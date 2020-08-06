import {
  Alert,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  Table,
  TBody,
  Th,
  Td,
  THead,
  Tr,
} from "@adobe/parliament-ui-components"

import Paragraph from './IncludeParagraph'

import IncludeMarkdown from "../components/IncludeMarkdown"

export const componentsMapping = {
  alert: Alert,
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  h5: Heading5,
  h6: Heading6,
  includemarkdown: IncludeMarkdown,
  // tab: Tab,
  // tabview: TabView,
  table: Table,
  tbody: TBody,
  th: Th,
  td: Td,
  thead: THead,
  tr: Tr,
  p: Paragraph,
  ul: List,
}
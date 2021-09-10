/**
 *  Copyright 2020 Adobe. All rights reserved.
 *  This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License. You may obtain a copy
 *  of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software distributed under
 *  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *  OF ANY KIND, either express or implied. See the License for the specific language
 *  governing permissions and limitations under the License.
 */

import React, { createElement } from "react"
import rehypeReact from "rehype-react"

import {
  Alert,
  InlineCode,
  Code as Pre,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  JsonSchema,
  Link,
  List,
  Paragraph,
  RequestMaker,
  RequestBody,
  Query,
  Headers,
  Parameter,
  Table,
  TBody,
  Th,
  Td,
  THead,
  Tr,
} from "@adobe/parliament-ui-components"
import NewtonButton from "../components/NewtonButton"
import { inlineImages } from "../components/inlineImages"

const renderAst = new rehypeReact({
  createElement: createElement,
  components: {
    alert: Alert,
    h1: Heading1,
    h2: Heading2,
    h3: Heading3,
    h4: Heading4,
    h5: Heading5,
    h6: Heading6,
    table: Table,
    tbody: TBody,
    th: Th,
    td: Td,
    thead: THead,
    tr: Tr,
    p: Paragraph,
    ul: List,
    ol: ({ children, ...props }) => (
      <List elementType="ol" {...props}>
        {children}
      </List>
    ),
    pre: Pre,
    inlineCode: InlineCode,
    code: InlineCode,
    a: Link,
    newtonbutton: NewtonButton,
    requestmaker: RequestMaker,
    requestbody: RequestBody,
    query: Query,
    headers: Headers,
    parameter: Parameter,
    jsonschema: JsonSchema,
    ...inlineImages,
  },
}).Compiler

export default renderAst

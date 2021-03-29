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
  Link,
  List,
  Paragraph,
  Table,
  TBody,
  Th,
  Td,
  THead,
  Tr,
} from "@adobe/parliament-ui-components"
import NewtonButton from "./NewtonButton"
import { inlineImages } from "../components/inlineImages"

// If you add a new custom tag here be sure to add it to scripts/markdown-cleaner/cleanHtmlNodes.js as well
export const componentsMapping = {
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
  pre: Pre,
  inlineCode: InlineCode,
  code: InlineCode,
  a: Link,
  newtonbutton: NewtonButton,
  ...inlineImages,
}

/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import styled from "@emotion/styled"

const OpenApiGrid = ({ children, ...props }) => (
  <div
    css={css`
      display: grid;
      grid-template-columns: 100%;
      grid-template-rows: 64px 1fr 30px;
      grid-column-gap: 0px;
      grid-row-gap: 0px;
    `}
    {...props}
  >
    {children}
  </div>
)

const OpenApiGridNav = styled.div`
  grid-area: 1 / 1 / 2 / 1;
  @media screen and (max-width: 767px) {
    display: none;
  }
`

const OpenApiGridHeader = styled.div`
  height: 64px;
  width: auto;
  background-color: white;

  grid-area: 1 / 1 / 2 / 1;
`

const OpenApiGridContent = styled.div`
  grid-area: 2 / 1 / 3 / 1;
`

const OpenApiGridFooter = styled.div`
  background-color: white;
  grid-area: 3 / 1 / 4 / 1;
`

export {
  OpenApiGrid,
  OpenApiGridContent,
  OpenApiGridFooter,
  OpenApiGridNav,
  OpenApiGridHeader,
}

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

const Grid = ({ children, ...props }) => (
  <div
    {...props}
    css={css`
      background-color: var(--spectrum-global-color-gray-50);
      display: grid;
      grid-column-gap: 0px;
      grid-row-gap: 0px;
      grid-template-rows: var(--spectrum-global-dimension-size-800) 1fr;
      @media screen and (min-width: 1201px) {
        grid-template-columns: 256px repeat(12, 1fr);
      }
      @media screen and (min-width: 768px) and (max-width: 1200px) {
        grid-template-columns: 256px repeat(10, 1fr);
      }
      @media screen and (max-width: 767px) {
        grid-template-columns: repeat(10, 1fr);
      }
    `}
  >
    {children}
  </div>
)

const GridHeader = styled.div`
  height: var(--spectrum-global-dimension-size-800);
  width: auto;

  @media screen and (min-width: 1201px) {
    grid-area: 1 / 1 / 2 / 14;
  }
  @media screen and (min-width: 768px) and (max-width: 1200px) {
    grid-area: 1 / 1 / 2 / 12;
  }
  @media screen and (max-width: 767px) {
    grid-area: 1 / 1 / 2 / 11;
  }
`

const GridContent = styled.main`
  padding-top: var(--spectrum-global-dimension-size-300);
  padding-left: var(--spectrum-global-dimension-size-300);
  padding-right: var(--spectrum-global-dimension-size-300);

  @media screen and (min-width: 1201px) {
    grid-area: 2 / 2 / 2 / 11;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
  }
  @media screen and (min-width: 768px) and (max-width: 1200px) {
    grid-area: 2 / 2 / 2 / 13;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
  }
  @media screen and (max-width: 767px) {
    grid-area: 2 / 1 / 3 / 12;
  }
`

const GridRightRail = styled.div`
  padding-left: var(--spectrum-global-dimension-size-200);
  padding-right: var(--spectrum-global-dimension-size-200);

  @media screen and (min-width: 1201px) {
    grid-area: 2 / 11 / 2 / 14;
  }
  @media screen and (max-width: 1200px) {
    display: none;
  }
`

const GridFooter = styled.div`
  @media screen and (min-width: 1201px) {
    grid-area: 3 / 2 / 4 / 14;
  }
  @media screen and (min-width: 768px) and (max-width: 1200px) {
    grid-area: 3 / 2 / 4 / 12;
  }
  @media screen and (max-width: 767px) {
    grid-area: 3 / 1 / 4 / 11;
  }
`

const GridNav = styled.div`
  background-color: var(--spectrum-global-color-gray-75);
  @media screen and (min-width: 768px) {
    grid-area: 2 / 1 / 4 / 2;
  }
  @media screen and (max-width: 767px) {
    display: none;
  }
`

export { Grid, GridHeader, GridContent, GridFooter, GridNav, GridRightRail }

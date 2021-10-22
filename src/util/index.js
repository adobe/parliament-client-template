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

import { withPrefix } from "gatsby"

// TODO: efficiency 🥴
export const pathDir = (path) => (path.split("/").slice(0, -1).join("/"))
export const pageInSameDir = (page, dir) => (page && pathDir(page.path).indexOf(dir) !== -1)
export const pageTitles = (pages) => pages.map((p) => p.title)

export const findSelectedPageNextPrev = (pathname, pages, type = "", defaultHomePage = "/") => {
  const flat = flattenPages(pages)
  const selectedPage = flat.find((page) => {
    return withPrefix(page.path) === pathname
  })

  const previous = flat[flat.indexOf(selectedPage) - 1]
  let next = flat[flat.indexOf(selectedPage) + 1]

  if (!next) {
    next = { path: defaultHomePage, title: `Complete ${type}` }
  }

  return {
    nextPage: next,
    previousPage: previous,
  }
}

export const flattenPages = (pages) => {
  if (pages === null) {
    return []
  }

  let flat = []
  const find = (page) => {
    flat.push(page)

    if (page.pages) {
      page.pages.forEach(find)
    }
  }

  pages.forEach(find)

  flat = flat.flat()
  return flat.filter(
    (page, index) => page.path && page.path !== flat[index + 1]?.path
  )
}

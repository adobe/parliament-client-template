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

import { useEffect, useState } from "react"

/**
 * Simple key/version - BOOL store using localStorage
 *
 * For example, a course would use this to mark whether a user has visited a
 * page or not.
 *
 *   - localStoreKey -- the directory/path of the course
 *   - objKey -- the path of the module that a user progressed from
 *   - version -- version of the module that the user viewed
 *
 * e.g.:
  *
 * {
 *    "/courses/course-md-files": {
 *        "/courses/course-md-files/01_first_module.md": { "latest": true },
 *        "/courses/course-md-files/02_second_module.md": { "latest": false }
 *    }
 * }
 *
 * Returns [stateBool, markCallback] - stateBool would be true/false based on
 * the keys given. So in the example above, assuming that the JSON is located
 * in localStorage:
 *
 * useVersionedLocalStore(
 *   "/courses/course-md-files",
 *   "/courses/course-md-files/01_first_module.md",
 *   "latest"
 * )
 *
 * would return [true, fx=>{...}]
 *
 * TODO: remove this in favor of a proper backend storage solution.
 *       Here to provide the basics for rendering quiz & course UIs
 */
export const useVersionedLocalStore = (localStoreKey, objKey, versionKey) => {
  const version = versionKey ? versionKey : "latest"
  const [initState, setBoolState] = useState(false)

  // waits until after first render when window is available
  useEffect(() => {
    // initial scaffolding
    let localStoreObj = window.localStorage.getItem(localStoreKey)
    let jsonObj = localStoreObj ? JSON.parse(localStoreObj) : {}
    let objVal = jsonObj[objKey] ? jsonObj[objKey] : {}

    // ensure that localstore is initialized
    jsonObj[objKey] = jsonObj[objKey] ? jsonObj[objKey] : {}
    jsonObj[objKey][version] = objVal[version] || false
    window.localStorage.setItem(localStoreKey, JSON.stringify(jsonObj))

    setBoolState(objVal[version] || false)
  }, [localStoreKey, objKey, version])

  // called whenever visited is changed
  useEffect(() => {
    if (!initState) { return }

    let storedState = window.localStorage.getItem(localStoreKey)
    storedState = storedState ? JSON.parse(storedState) : {}
    if (!storedState[objKey]) {
      storedState[objKey] = {}
    }
    storedState[objKey][version] = true
    window.localStorage.setItem(localStoreKey, JSON.stringify(storedState))
  }, [localStoreKey, objKey, version, initState])

  const setStateTrue = () => {
    setBoolState(true)
  }

  return [initState, setStateTrue]
}

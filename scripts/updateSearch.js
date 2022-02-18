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
const fs = require("fs")
const fetch = require("node-fetch")
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
;(async () => {
  if (!process.env.VISIBLE || process.env.VISIBLE !== "false") {
    if (fs.existsSync("./searchIndex.json")) {
      const data = JSON.parse(fs.readFileSync("./searchIndex.json"))

      const response = await fetch(
        `${process.env.SEARCH_URL}/projects/${process.env.JOB_NAME}`,
        {
          method: "PATCH",
          body: JSON.stringify({ id: `${process.env.JOB_NAME}`, data }),
          headers: {
            "Content-Type": "application/json",
            "x-api-key": `${process.env.X_API_KEY}`,
          },
        }
      )
      const json = await response.json()
  
      console.log(json)
    } else {
      console.log("Error: searchIndex.json not found!")
    }
  }
})()

const fs = require("fs")
const fetch = require("node-fetch")
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
;(async () => {
  const data = JSON.parse(fs.readFileSync("./searchIndex.json"))

  const response = await fetch(
    `${process.env.SEARCH_URL}/projects/${process.env.JOB_NAME}`,
    {
      method: "PATCH",
      body: JSON.stringify({ id: `${process.env.JOB_NAME}`, data }),
      headers: { 
        "Content-Type": "application/json",
        "x-api-key": `${process.env.X_API_KEY}`
      },
    }
  )
  const json = await response.json()

  console.log(json)
})()

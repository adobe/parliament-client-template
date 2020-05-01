---
path: "/ack"
title: Companies and properties
template: "recipe"
seo-title: Companies and properties in Adobe Experience Platform Launch
description: Adobe Experience Platform Launch companies and properties
seo-description: Adobe Experience Platform Launch companies and properties
---

# Deleting a File

## Problem

You need to delete a file.

## Solution

Send an HTTP _DELETE_ request to the file's [Primary](https://docs.corp.adobe.com/storage-api/docs/reference/primary-resource-directories.md) URL.

## Discussion

To delete a file, we send a _DELETE_ request to the file's [Primary](https://docs.corp.adobe.com/storage-api/docs/reference/primary-resource-directories.md) URL, with the file's `etag` in the request header. From the response, we retrieve the result indicating whether the request was successful or not.

```js
async function deleteFile(access_token, primary_link, etag) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/vnd.adobecloud.directory+json",
      "If-Match": etag,
      "x-Api-key": process.env.CLIENT_ID,
      Authorization: `Bearer ${access_token}`,
    },
    body: "",
    redirect: "follow",
  }

  let response = await fetch(`${primary_link}`, requestOptions)
  return response.ok
}
```

Hereby, our file at path `/content/assets/testDirectory/file.png` is deleted.

## Runnable Code Example

```js
require("dotenv").config()
const fetch = require("node-fetch")
const { URLSearchParams } = require("url")
const fs = require("fs")
const parseLinkHeaders = require("parse-link-header")

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const USERNAME = process.env.USERNAME
const PASSWORD = process.env.PASSWORD
const USER_ID = process.env.USER_ID
const IMS_ORG = process.env.IMS_ORG

/**
 * Utility function to remove tempalted portion of url.
 *
 * Example: https://platform-cs-stage-va7.adobe.io/content/storage/path/urn:aaid:sc:VA7:148fa764-ed33-5698-816e-d3324700b199/test.psd/:rendition{;page,size}
 * Returns: https://platform-cs-stage-va7.adobe.io/content/storage/path/urn:aaid:sc:VA7:148fa764-ed33-5698-816e-d3324700b199/test.psd/:rendition
 *
 * @param {String} url
 */
function utilRemoveTemplate(url) {
  if (url.includes("{")) {
    return url.split("{")[0]
  } else {
    return url
  }
}

async function fileDelete(filePath) {
  // 1
  const access_token = await authenticate()

  // 2
  const resolve_path = await getResolvePath(access_token)

  // 3
  const primary = await getFileByPath(access_token, resolve_path, filePath)

  // 4
  let success = await deleteFile(access_token, primary.link, primary.etag)
  console.log(`Status: ${success}`)
}

// 1. Authenticate: Get Bearer Token
async function authenticate() {
  // Default auth parameters
  const defaultRequestOptions = {
    method: "POST",
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow",
  }

  // User parameters
  const userParams = new URLSearchParams()
  userParams.append("grant_type", "password")
  userParams.append("client_id", CLIENT_ID)
  userParams.append("client_secret", CLIENT_SECRET)
  userParams.append("username", USERNAME)
  userParams.append("password", PASSWORD)
  userParams.append("scope", "AdobeID,openid")
  userParams.append("response_type", "token")

  const userOptions = { body: userParams, ...defaultRequestOptions }

  // Get user token
  let response = await fetch(
    `https://ims-na1-stg1.adobelogin.com/ims/token/v2`,
    userOptions
  )
  let token = await response.json()

  // Bearer parameters
  const bearerParams = new URLSearchParams()
  bearerParams.append("grant_type", "cluster_at_exchange")
  bearerParams.append("client_id", CLIENT_ID)
  bearerParams.append("client_secret", CLIENT_SECRET)
  bearerParams.append("user_id", USER_ID)
  bearerParams.append("user_token", token.access_token)

  const bearerOptions = { body: bearerParams, ...defaultRequestOptions }

  // Get bearer token
  response = await fetch(
    `https://ims-na1-stg1.adobelogin.com/ims/token/v2`,
    bearerOptions
  )
  token = await response.json()

  return token.access_token
}

// 2. Get `rel/resolve/path` link
async function getResolvePath(access_token) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/vnd.adobecloud.directory+json",
      "x-Api-key": CLIENT_ID,
      Authorization: `Bearer ${access_token}`,
    },
    redirect: "follow",
  }

  let response = await fetch(
    `https://platform-cs-stage.adobe.io/assets`,
    requestOptions
  )
  let data = await response.json()
  let children = data.children
  if (children.length > 0) {
    let root = null
    for (let i = 0; i < children.length; i++) {
      let embedded = children[i]._embedded
      for (const property in embedded) {
        if (embedded[property]["repo:repositoryId"] === IMS_ORG) {
          root = embedded[property]
        }
      }
    }
    let links = root["_links"]
    let relations = Object.keys(links)
    const resolve_path_link = "http://ns.adobe.com/adobecloud/rel/resolve/path"
    if (relations.includes(resolve_path_link)) {
      var resolvePath = links[resolve_path_link]
      return utilRemoveTemplate(resolvePath.href)
    }
  }
}

// 3. Lookup file, retrieve `api:primary` link and `etag`
async function getFileByPath(access_token, resolve_path, filePath) {
  const requestOptions = {
    method: "HEAD",
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/vnd.adobecloud.directory+json",
      "x-Api-key": CLIENT_ID,
      Authorization: `Bearer ${access_token}`,
    },
    redirect: "follow",
  }

  let response = await fetch(`${resolve_path}${filePath}`, requestOptions)
  const _links = parseLinkHeaders(response.headers.get(`link`))
  const create_relation = "http://ns.adobe.com/adobecloud/rel/primary"
  let link = _links[create_relation]
  let eTag = response.headers.get(`etag`)
  return { link: utilRemoveTemplate(link.url), etag: eTag }
}

// 4. Delete the file based on `api:primary` link and `etag`
async function deleteFile(access_token, primary_link, etag) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/vnd.adobecloud.directory+json",
      "If-Match": etag,
      "x-Api-key": process.env.CLIENT_ID,
      Authorization: `Bearer ${access_token}`,
    },
    body: "",
    redirect: "follow",
  }

  let response = await fetch(`${primary_link}`, requestOptions)
  return response.ok
}

fileDelete("/content/assets/testDirectory/file.png")
```

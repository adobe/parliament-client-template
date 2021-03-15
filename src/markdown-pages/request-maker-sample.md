---
path: "/hackathon"
date: "2019-05-04"
title: "Do Not Delete"
template: "markdown"
author: ""
tags: ""
description: ""
slug: ""
---

# Sample REST API

This is a mock API that echoes whatever request you send it. The endpoint is `https://adobeioruntime.net/api/v1/web/io-solutions/default/requestMaker`.

### Request Maker

 <requestmaker method="GET" url="https://adobeioruntime.net/api/v1/web/io-solutions/default/requestMaker">
   <headers>
     <parameters name="Authorization">Bearer your_token</parameters>
     <parameters name="X-Api-Key">your_api_key</parameters>
   </headers>
   <query>
     <parameters name="limit">10</parameters>
     <parameters name="size">2</parameters>
   </query>
   <requestbody type="none"></requestbody>
 </requestmaker>

### Endpoints

| Method    | Resource     | Endpoint        |
| --------- | ------------ | --------------- |
| `GET`     | Request echo | `/requestMaker` |
| `PUT`     | Request echo | `/requestMaker` |
| `POST`    | Request echo | `/requestMaker` |
| `DELETE`  | Request echo | `/requestMaker` |
| `OPTIONS` | Request echo | `/requestMaker` |
| `HEAD`    | Request echo | `/requestMaker` |
| `PATCH`   | Request echo | `/requestMaker` |

### Sample Query Parameters

| Name  | Type   | Description          |
| ----- | ------ | -------------------- |
| `one` | string | The first paramater  |
| `two` | string | The second parameter |

### Sample Request Headers

| Name  | Type   | Description       |
| ----- | ------ | ----------------- |
| `one` | string | The first header  |
| `two` | string | The second header |

### Request Body

| Type                    | Description                                                                 |
| ----------------------- | --------------------------------------------------------------------------- |
| `form-data`             | A series of data blocks delimited by boundary strings                       |
| `x-www-form-urlencoded` | Key-value tuples separated by `&`, with a `=` between the key and the value |
| `raw`                   | Text, JSON, etc.                                                            |
| `binary`                | Images, videos, etc.                                                        |

### Response Headers

| Header           | Description                        |
| ---------------- | ---------------------------------- |
| `content-length` | The size of the response, in bytes |
| `content-type`   | The content type of the response   |

### Response Body

| Property       | Type   | Description                       |
| -------------- | ------ | --------------------------------- |
| `__ow_body`    | string | The request body                  |
| `__ow_headers` | object | The request headers               |
| `__ow_method`  | string | The request method                |
| `__ow_path`    | string | The unmatched path of the request |
| `[parameter]`  | string | The query parameter               |

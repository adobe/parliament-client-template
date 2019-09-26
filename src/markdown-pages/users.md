---
path: "/hypermedia/users"
date: "2019-05-04"
title: "Users"
---

# users

## Description

This link relationship returns a collection of resources. You can easily paginate through this collection using the hypermedia links provided and the link relationships of first, prev, next, and last. Scroll down to view a representation of a single resource embedded within this collection.

## Sandbox Example

You can interact with this resource and run actions against the sandbox API via our HAL Brower.

## Actions

GET
View a list of users
POST
Create a new user
HEAD
Get just the header response
OPTIONS
Get a response explaining which HTTP methods are supported

## Example Representation

```
{
  "_links": {
    "curies": [
      {
        "name": "fx",
        "href": "https://api.foxycart.com/rels/{rel}",
        "templated": true
      }
    ],
    "self": {
      "href": "...",
      "title": "This Collection"
    },
    "first": {
      "href": "...?offset=0",
      "title": "First Page of this Collection"
    },
    "prev": {
      "href": "...?offset=0",
      "title": "Previous Page of this Collection"
    },
    "next": {
      "href": "...?offset=0",
      "title": "Next Page of this Collection"
    },
    "last": {
      "href": "...?offset=0",
      "title": "Last Page of this Collection"
    }
  },
  "_embedded": {
    "fx:users": [...]
  },
  "total_items": "5",
  "returned_items": 5,
  "limit": 20,
  "offset": 0
}
```

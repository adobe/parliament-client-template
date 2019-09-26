---
path: "/hypermedia/user"
date: "2019-05-04"
title: "User"
---

# user

## Description

To modify a user, you must be connected to the API using an OAuth token with user_full_access scope.

A FoxyCart User is someone who manages and configures a FoxyCart Store. It is often the owner of that store, but might also be someone paid to be responsible for aspects of the store. There can be many users per store and any user can access many stores. Before creating a user, you must create a client. When you create a user, you'll get a response back containing an OAuth token giving you access to the user.

If you create custom attributes for a user, they will automatically be included in the response as embedded resources without having to zoom in on them.

## Sandbox Example

You can interact with this resource and run actions against the sandbox API via our HAL Brower.

## Actions

GET
View a user
PATCH
Update a user (send only the properties you want to modify)
PUT
Replace a user (send the entire representation)
DELETE
Delete a user
HEAD
Get just the header response
OPTIONS
Get a response explaining which HTTP methods are supported

## Properties

Property Description Type Constraints
first_name The user's given name. String Required. 50 characters or less.
last_name The user's surname. String Required. 50 characters or less.
email The user's email address. This is used as the login to the FoxyCart admin for this user. Email Required. 100 characters or less.
phone The user's phone number. String 50 characters or less.
affiliate_id This can only be set during user creation. Contact us if you need this value changed later. Integer Can only be set on creation.
is_programmer If this user is a programmer who writes server side code in languages like PHP, .NET, Python, Java, Ruby, etc Boolean true or false, 1 or 0.
is_front_end_developer If this user is a front end developer who writes code in things like HTML, CSS, and maybe some JavaScript. Boolean true or false, 1 or 0.
is_designer If this user is a front end designer who works in wireframes, graphic designs, and user interfaces. Boolean true or false, 1 or 0.
is_merchant If this user is a a merchant or store admin involved in the item and money side of the e-commerce business. Boolean true or false, 1 or 0.
date_created The date this resource was created. Date Read only
date_modified The date this resource was last modified. Date Read only

## Example Representation

```json
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
      "href": "https://api.foxycart.com/users/1",
      "title": "This User"
    },
    "fx:attributes": {
      "href": "https://api.foxycart.com/users/1/attributes",
      "title": "Attributes for This User"
    },
    "fx:default_store": {
      "href": "https://api.foxycart.com/stores/66",
      "title": "Example Store"
    },
    "fx:stores": {
      "href": "https://api.foxycart.com/users/1/stores",
      "title": "Stores for This User"
    }
  },
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "phone": "555-555-5555",
  "affiliate_id": 0,
  "is_programmer": true,
  "is_front_end_developer": false,
  "is_designer": false,
  "is_merchant": true,
  "date_created": "2007-05-23T16:09:12-0700",
  "date_modified": "2013-07-10T22:37:49-0700"
}
```

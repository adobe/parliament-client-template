---
path: "/hypermedia/overview"
date: "2019-05-04"
title: "Overview"
---

# Welcome to the Foxy API

The Foxy Hypermedia API is designed to give you complete control over all aspects of your Foxy accounts, whether working with a single store or automating the provisioning of thousands. Anything you can do within the Foxy administration, you can also do through the API. This means that you can embed Foxy into any application (CMS, LMS, CRM, etc.) and expose as much or as little of Foxy's functionality as desired.

As a hypermedia-driven RESTful API, there will always be loose coupling between your client and our server allowing both to evolve independently. If you have any questions, please contact us.

## Getting Started

The Foxy API uses OAuth 2.0 for authentication and so an OAuth client needs to be created to connect to the API. Check out the Authentication guide for an overview of working with that.

If you prefer to learn by example, take a look at our Tutorials that walk through connecting to the API and updating store resources.

To dive into the API in it’s entirety, head over to the API Reference. The Cheatsheet also provides details on working with the API, including how to sort, filter, paginate responses.

## A RESTful Hypermedia API

As a RESTful API, we make use of HTTP verbs to dictate the type of request you're making to the API.

GET: View a resource or a collection of resources
POST: Create a new resource
PUT: Modify a resource in its entirety
PATCH: Modify some of the properties of a resource
DELETE: Delete a given resource
HEAD: View only the links related to a resource
OPTIONS: View the HTTP methods that are allowed for a resource
Our API is also built using Hypermedia as The Engine of Application State (HATEOAS), also known as the "Hypermedia Constraint", which includes link relationships in the form of URI's within the response that link to related resources. This allows you to navigate through the API by making use of these contextual links that are returned in the responses. As such, instead of needing to code your application to specific URL's, you code to the link relationships within the response, navigating the API via link relationship href URI's much like you would when following links through your web browser.

As an example, when requesting a store through the API, the response will include link relationships to all aspects of the store, such as:

```
{
    "_links": {
        ...
        "fx:customers": {
            "href": "https://api.foxycart.com/stores/41000/customers",
            "title": "Customers for This Store"
        },
        "fx:transactions": {
            "href": "https://api.foxycart.com/stores/41000/transactions",
            "title": "Transactions for This Store"
        },
        "fx:subscriptions": {
            "href": "https://api.foxycart.com/stores/41000/subscriptions",
            "title": "Subscriptions for This Store"
        },
        ...
    },
    ...
}
```

After requesting the store, if you were wanting to then look at the store's transactions, your code would look for the link relationship "fx:transactions" in the response and use its href URI value to work with the transactions collection.

While an API using hypermedia would generally provide a link for each specific action that can be performed on a resource, we've taken a slightly different approach - where the HTTP verb is used to dictate the action you're making. For example, to view a resource, you would perform a GET request to it's URI. To modify that same resource you would instead perform a PUT or PATCH on the same URI, and to delete you would perform a DELETE request. To create a resource, you POST to it's collection URI. This cuts down on the number of link relationships required, and we believe makes the most sense for interacting with our API.

### Who is this for?

The Foxy API can be used by anyone with some knowledge of server-side programming. It's useful for anyone looking to access or modify any information from a Foxy store. Whether you're building a simple standalone script to access the transactions from a store, building an application that Foxy users can connect their stores to, through to integrating Foxy into your application as a whitelabeled ecommerce system.

### Sandbox vs Production

We provide two entry points for the API for sandbox and production. The sandbox entry point is great for playing around with the API and testing the waters. The production entry point on the other hand gives access to the normal Foxy users and stores that you could create from admin.foxycart.com.

This distinction is different than between development and production Foxy stores, which are both accessible from the production API entry point. Any users or stores created through the API's sandbox will not be accessible from the Foxy administation.

---
path: "/hypermedia/cache"
date: "2019-05-04"
title: "Caching"
---

# Caching

As a Hypermedia API, instead of coding to individual endpoints, you navigate through the API using the contextual links called link relationships that are returned with responses, stepping through the API. This can seem a bit "chatty" at first, but the number and size of requests needed can be minimised with proper use of local caching and bookmarks.

## ETags and Local Cache

The API includes an ETag header field with most responses, which acts as a unique identifier for the resource in it's current state at that particular URI. If a change is made to that resource then a new ETag is generated to represent it's updated state. You could think of it as a fingerprint for the resource request, and it provides a way to quickly compare if a given resource is identical on the server to one you may have in local cache. Many responses also include a Last-Modified header representing the last time that the resource was modified.

```
HTTP/1.1 200 OK
Cache-Control: private, must-revalidate
Content-Type: application/hal+json
Date: Mon, 5 Sep 2016 12:00:00 GMT
ETag: W/"381698ed67bf92c4563fif9a949dc91d8d9b0979"
Last-Modified: Fri, 2 Sep 2016 12:00:00 -0700
```

After receiving the ETag in a given response, if you perform a GET request to that same URI, you would pass back the ETag value you previously received as an If-None-Match header. If you'd prefer, you can instead pass an If-Modified-Since header with the Last-Modified value if it was provided. While both may be returned in a response - only one of the values need to be provided.

```
If-None-Match: W/"381698ed67bf92c4563fif9a949dc91d8d9b0979"

If-Modified-Since: Fri, 2 Sep 2016 12:00:00 -0700
```

The server will then compare this identifier with the current server representation of the resource. If it matches, and so the resource hasn't changed, the server will issue a 304 Not Modified response with no body. In this instance, you would use the locally cached version of the resource. If it doesn't match, then the normal 200 OK response will be received with the resource included in the body.

To make proper use of the ETag, you need to cache the resource locally to use if the server responds that it hasn't changed. Generally speaking, the local caching and ETag handling will be taken care of through a library. For example, our PHP FoxyClient library makes use of Guzzle and it's CacheSubscriber plugin which looks after storing responses and handling the respective headers. If you're using a different language for communicating with the API, we definitely recommend making use of a HTTP library with either caching support or plugins that add it.

## Bookmarking

Within the API, there are some common relations that you will be hitting regularly. For example, if you're working with a store, the main store URI and it's relations like transactions, coupons, categories, etc., could be regularly accessed. As a Hypermedia API, we don't suggest hard-coding these URI's, but you could bookmark them to allow you to quickly access them.

Let's use an example of wanting to access a store's transactions. Using an access_token that has a store_full_access scope, you would first connect to the API homepage, then connect to the fx:store URI and finally the fx:transactions URI - for a total of three requests. Using local cache as detailed above would mean subsequent requests would probably return a 304 Not Modified response, but we could still even skip them by using bookmarks.

To make use of bookmarking, you temporarily store the common URI's you access into the users session. So using the transactions example from above - you could first check if the fx:transactions relation exists in the session and load it directly if it is. Otherwise if not, you would make the needed requests and bookmark the URI's to the session as you go for next time.

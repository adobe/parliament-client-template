---
path: "/hypermedia/store"
date: "2019-05-04"
title: "Store"
---

# store

## Description

A FoxyCart Store is your home for managing your online payment system as it relates to FoxyCart's platform. One store will be used per organization selling online. You can create a store for free and use it as long as you like until you read ready to collect live payments from your customers. We also recommend setting up a development store along with your production store so you can test out new features. Before you create a store, you must create a client and a user. When creating a store, you'll get a response back containing an OAuth token giving you access to the store.

If you create custom attributes for your store, they will automatically be included in the response as embedded resources without having to zoom in on them.

The smtp_config value should be a JSON string which includes the following values:
username: Your SMTP server username
password: Your SMTP server password
host: Your SMTP server host
port: Your SMTP server port
security: If your server requires a secure connection, you can use ssl or tls here.
The custom_display_id_config value should be a JSON string which includes the following values:
enabled: A boolean, true or false.
start: The starting value for your custom order id display such as 1.
length: The minimum total length of the auto-incrementing part of the display ID.
prefix: The prefix you'd like your custom display id to being with.
suffix: The suffix you'd like your custom display id to end with.
Sandbox Example
You can interact with this resource and run actions against the sandbox API via our HAL Brower.

## Actions

GET
View a store
PATCH
Update a store (send only the properties you want to modify)
PUT
Replace a store (send the entire representation)
DELETE
Delete a store
HEAD
Get just the header response
OPTIONS
Get a response explaining which HTTP methods are supported

## Properties

Property Description Type Constraints
store_version_uri This is the store version for this store. For more details about this version, see the store_versions property helpers which include changelog information. URL Defaults to the latest version if not provided. store_versions
store_name The name of your store as you'd like it displayed to your customers and our system. String Required. 50 characters or less.
store_domain This is a unique FoxyCart subdomain for your cart, checkout, and receipt. If you install a custom SSL certificate, this will contain a full domain such as store.yourdomain.com. String Required. 50 characters or less.
use_remote_domain Set to true when you plan to use a custom SSL certificate. If set to true, your store_domain must be a full domain. Boolean true or false, 1 or 0.
store_url The URL of your online store. URL Required. 300 characters or less.
receipt_continue_url By default, FoxyCart sends customers back to the page referrer after completing a purchase. Instead, you can set a specific URL here. URL 300 characters or less.
store_email This is the email address of your store. By default, this will be the from address for your store receipts. If you specify a from_email, you can also put in multiple email addresses here, separated by a comma to be used when bcc_on_receipt_email is true. Email Required. 300 characters or less.
from_email Used for when you want to specify a different from email than your store's email address or when your store_email has a list of email addresses. Email 100 characters or less.
bcc_on_receipt_email Set this to true if you would like each receipt sent to your customer to also be blind carbon copied to your store's email address. Boolean true or false, 1 or 0.
use_email_dns Set this to true if you have set up your DNS settings to include and spf record for FoxyCart. See the FoxyCart documentation for more details. Boolean true or false, 1 or 0.
smtp_config If you'd like to configure your own SMTP server for sending transaction receipt emails, you can do so here. The JSON supports the following fields: username,password,host,port,security. The security value can be blank, ssl, or tls JSON 1000 characters or less.
postal_code The postal code of your store. This will be used for calculating shipping costs if you sell shippable items. String Required. 50 characters or less.
region The two character code for states in the United States. Other countries may call this a province. When a two character code isn't available, use the full region name. This will be used for calculating shipping costs if you sell shippable items. String Required. 2 characters if code exists, otherwise 100 characters or less. regions
country Two character ISO 3166-1-alpha-2 code for the country your store is located in. This will be used for calculating shipping costs if you sell shippable items. String Required. countries
locale_code The locale code for your Store's locale. This will be used to format strings for your store. String Defaults to en_US if not supplied. locale_codes
hide_currency_symbol Set to true to prevent the currency symbol from being displayed (example: a points based checkout system). Boolean true or false, 1 or 0.
hide_decimal_characters Set to true to prevent the decimal characters from being displayed (example: a points based checkout system). Boolean true or false, 1 or 0.
use_international_currency_symbol Set true to use the international currency symbol such as USD instead of the regional one like \$. Boolean true or false, 1 or 0.
language The default language for your store's cart, checkout, and receipt strings. String Defaults to english if not supplied. languages
logo_url A url to your store's logo which may be used in your store's templates. URL 100 characters or less.
checkout_type The preferred configuration of your customer checkout experience, such as defaulting to guest checkout or requiring account creation with each checkout. String Defaults to default_account checkout_types
use_webhook Set this to true to POST encrypted XML of your order to the webhook url of your choice. Boolean true or false, 1 or 0.
webhook_url This is the url of the webhook endpoint for processing your store's webhook. See the FoxyCart documentation for more details. URL Required if use_webhook is true. 300 characters or less.
webhook_key This is the key used to encrypt your webhook data. It is also used as the legacy API key and the HMAC cart encryption key. String Required if use_webhook or use_cart_validation is true. 200 characters or less.
use_cart_validation Set to true to use HMAC cart validation for your store. Boolean true or false, 1 or 0.
use_single_sign_on Set this to true to redirect to your server before checkout so you can use our single sign on feature and log in your users automatically to FoxyCart or if you want to validate items before checkout. Boolean true or false, 1 or 0.
single_sign_on_url This is your single sign on url to redirect your users to prior to hitting the checkout page. See the FoxyCart documentation for more details. URL Required if use_single_sign_on is true. 300 characters or less.
customer_password_hash_type When saving a customer to FoxyCart, this is the password hashing method that will be used. String Defaults to phpass. customer_password_hash_types
customer_password_hash_config Configuration settings for the customer_password_hash_type in use. See the FoxyCart documentation for more details. String 100 characters or less.
features_multiship Set to true to turn on FoxyCart's multiship functionality for shipping items to multiple locations in a single order. See the FoxyCart documentation for more details. Boolean true or false, 1 or 0.
products_require_expires_property Set to true to require all front-end add-to-cart interactions have a valid expires property. Boolean true or false, 1 or 0.
app_session_time If your store sells products which collect personal or sensitive information as product attributes, you may want to consider lowering your cart session lifespan. You can leave it as 0 to keep the default which is currently 43200 seconds (12 hours). The maximum allowed time is currently 259200 seconds (72 hours). Integer Time in seconds.
shipping_address_type Used for determining the type of the customer address used when calculating shipping costs. String Defaults to determine_by_company. shipping_address_types
require_signed_shipping_rates Shipping rate signing ensures that the rate the customer selects is carried through and not altered in any way. If you're intending to make use of javascript snippets on your store to alter the price or label of shipping rates or add custom rates dynamically, disable this setting as it will block those rates from being applied. The default is false. Boolean true or false, 1 or 0.
timezone The timezone of your store. This will impact how dates are shown to customers and within the FoxyCart admin. String Defaults to server time America/Los Angeles. timezones
unified_order_entry_password Set a master password here if you would like to be able to check out as your customers without having to know their password. String 100 characters or less.
custom_display_id_config Instead of displaying the Foxy Transaction ID, you can display your own custom display ID on your store's receipt and receipt emails. This JSON config determines how those display ids will work. The JSON supports the following fields: enabled, start, length, prefix, suffix. JSON 500 characters or less.
affiliate_id This can only be set during store creation. Contact us if you need this value changed later. Integer Can only be set on creation.
is_maintenance_mode This settings makes your checkout page completely non-functioning. Your customers will see the maintenance notification language string instead. The default is false. Boolean true or false, 1 or 0.
is_active If this store is in development or if it has an active FoxyCart subscription and can therefore use a live payment gateway to process live transactions. Boolean Read only
first_payment_date The date of the first payment for this FoxyCart store subscription. This can be considered the go live date for this store. Date Read only
date_created The date this resource was created. Date Read only
date_modified The date this resource was last modified. Date Read only

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
      "href": "https://api.foxycart.com/stores/2",
      "title": "This Store"
    },
    "fx:attributes": {
      "href": "https://api.foxycart.com/stores/2/attributes",
      "title": "Attributes for This Store"
    },
    "fx:store_version": {
      "href": "https://api.foxycart.com/property_helpers/store_versions/100",
      "title": "This store version"
    },
    "fx:users": {
      "href": "https://api.foxycart.com/stores/2/users",
      "title": "Users for This Store"
    },
    "fx:user_accesses": {
      "href": "https://api.foxycart.com/stores/2/user_accesses",
      "title": "User Access for This Store"
    },
    "fx:customers": {
      "href": "https://api.foxycart.com/stores/2/customers",
      "title": "Customers for This Store"
    },
    "fx:carts": {
      "href": "https://api.foxycart.com/stores/2/carts",
      "title": "Carts for This Store"
    },
    "fx:transactions": {
      "href": "https://api.foxycart.com/stores/2/transactions",
      "title": "Transactions for This Store"
    },
    "fx:subscriptions": {
      "href": "https://api.foxycart.com/stores/2/subscriptions",
      "title": "Subscriptions for This Store"
    },
    "fx:subscription_settings": {
      "href": "https://api.foxycart.com/store_subscription_settings/2",
      "title": "Subscription Settings for This Store"
    },
    "fx:item_categories": {
      "href": "https://api.foxycart.com/stores/2/item_categories",
      "title": "Item Categories for This Store"
    },
    "fx:taxes": {
      "href": "https://api.foxycart.com/stores/2/taxes",
      "title": "Taxes for This Store"
    },
    "fx:payment_method_sets": {
      "href": "https://api.foxycart.com/stores/2/payment_method_sets",
      "title": "Payment Method Sets for This Store"
    },
    "fx:coupons": {
      "href": "https://api.foxycart.com/stores/2/coupons",
      "title": "Coupons for This Store"
    },
    "fx:template_sets": {
      "href": "https://api.foxycart.com/stores/2/template_sets",
      "title": "Template Sets for This Store"
    },
    "fx:cart_templates": {
      "href": "https://api.foxycart.com/stores/2/cart_templates",
      "title": "Cart Templates for This Store"
    },
    "fx:cart_include_templates": {
      "href": "https://api.foxycart.com/stores/2/cart_include_templates",
      "title": "Cart Include Templates for This Store"
    },
    "fx:checkout_templates": {
      "href": "https://api.foxycart.com/stores/2/checkout_templates",
      "title": "Checkout Templates for This Store"
    },
    "fx:receipt_templates": {
      "href": "https://api.foxycart.com/stores/2/receipt_templates",
      "title": "Receipt Templates for This Store"
    },
    "fx:email_templates": {
      "href": "https://api.foxycart.com/stores/2/email_templates",
      "title": "Email Templates for This Store"
    },
    "fx:error_entries": {
      "href": "https://api.foxycart.com/stores/2/error_entries",
      "title": "Error Entries for This Store"
    },
    "fx:downloadables": {
      "href": "https://api.foxycart.com/stores/2/downloadables",
      "title": "Downloadables for This Store"
    },
    "fx:hosted_payment_gateways": {
      "href": "https://api.foxycart.com/stores/2/hosted_payment_gateways",
      "title": "Hosted Payment Gateways for This Store"
    },
    "fx:fraud_protections": {
      "href": "https://api.foxycart.com/stores/2/fraud_protections",
      "title": "Fraud Protections for This Store"
    }
  },
  "store_version_uri": "https://api.foxycart.com/property_helpers/store_versions/20",
  "store_name": "Example Store",
  "store_domain": "example",
  "use_remote_domain": false,
  "store_url": "https://example.com/catalog",
  "receipt_continue_url": "http://www.example.com/thankyou",
  "store_email": "someone@example.com",
  "from_email": "helpdesk@example.com",
  "bcc_on_receipt_email": false,
  "smtp_config": "{\"username\":\"someone@gmail.com\",\"password\":\"mycomplexpassword\",\"host\":\"smtp.gmail.com\",\"port\":\"465\",\"security\":\"ssl\"}",
  "use_email_dns": false,
  "postal_code": "37211",
  "region": "TN",
  "country": "US",
  "locale_code": "en_US",
  "hide_currency_symbol": false,
  "hide_decimal_characters": false,
  "use_international_currency_symbol": false,
  "language": "english",
  "logo_url": "",
  "checkout_type": "default_account",
  "use_webhook": true,
  "webhook_url": "http://example.com/my_webhook_script",
  "webhook_key": "some super secure password your mom could not not guess",
  "use_cart_validation": false,
  "use_single_sign_on": false,
  "single_sign_on_url": "http://example.com/my_single_sign_on_script",
  "customer_password_hash_type": "phpass",
  "customer_password_hash_config": "8",
  "features_multiship": false,
  "products_require_expires_property": false,
  "app_session_time": 43200,
  "shipping_address_type": "residential",
  "require_signed_shipping_rates": false,
  "timezone": "America/Chicago",
  "unified_order_entry_password": "here I am, buying all your stufz",
  "custom_display_id_config": "{\"enabled\":false,\"start\":\"500\",\"length\":\"8\",\"prefix\":\"pre\",\"suffix\":\"suf\"}",
  "affiliate_id": 0,
  "is_maintenance_mode": false,
  "is_active": false,
  "first_payment_date": null,
  "date_created": "2010-04-24T19:25:02-0700",
  "date_modified": "2013-07-19T11:47:26-0700"
}
```

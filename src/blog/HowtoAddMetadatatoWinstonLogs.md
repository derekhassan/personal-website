---
tags:
    - javascript
title: How to Add Metadata to Winston Logs
description: Learn how to add metadata properties to your existing Winston logging solution.
author: Derek Hassan
permalink: 'blog/{{ title | slugify }}/'
date: 2023-08-20
---

When creating applications, it is a good practice to have some sort of logging. Logs can be useful for debugging, or even tracking certain metrics. To create even more useful logs, you can add custom metadata to your existing Winston logger.

## What is Winston?

Winston is designed to be a simple and universal logging library with support for multiple transports (which are storage devices for your logs). You can find more information on this library on [their npm page](https://www.npmjs.com/package/winston).

## Method 1: Add Metadata when Creating Logger

The first method adds the metadata when you create your logger. The metadata added here will appear with every log within your application. A good use case for this could be your service or application name. In the following example, I’m creating a new Winston logger and adding the metadata property `service`.

```js
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'orderAPI' },
    transports: [new winston.transports.Console()],
});

logger.info('Request received');
```

Here is the output from the log:

```json
{ "level": "info", "message": "Request received", "service": "orderAPI" }
```

## Method 2: Pass an Object as the Second Argument to the Log Method

The second method involves passing an object as the second argument in your log method. This will only get added to that specific log so it can be useful for metadata you want to track only once. In this example, I’m tracking the user’s cart:

```js
logger.info('User added item(s) to cart', {
    cart: [{ item: 'JavaScript Coffee Mug', price: '$4.99' }],
});
```

Here is the output:

```json
{
    "cart": [{ "item": "JavaScript Coffee Mug", "price": "$4.99" }],
    "level": "info",
    "message": "User added item(s) to cart",
    "service": "orderAPI"
}
```

## Method 3: Create a Child Logger

The other method would be to create a child logger. This can be useful for subprocesses where you need to track certain metadata through the entire process. Here I have added an `orderId` as a property in the child logger. That way I can continue to log the `orderId` throughout the subprocess.

```js
const childLogger = logger.child({
    orderId: 1,
});

childLogger.info('Creating invoice');
```

Here is the output:

```json
{
    "level": "info",
    "message": "Creating invoice",
    "orderId": 1,
    "service": "orderAPI"
}
```

## Conclusion

Hopefully you will find this logging metadata helpful while developing your applications!

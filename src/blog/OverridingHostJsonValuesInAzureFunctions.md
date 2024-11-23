---
tags:
    - serverless
    - javascript
title: Overriding host.json Values in Azure Functions For Specific Environments
description: Learn how to override specific host.json settings on a per environment basis
author: Derek Hassan
permalink: 'blog/{{ title | slugify }}/'
date: 2023-05-18
---

Have you ever ran into a situation where you’d like to modify `host.json` settings for only one environment? Maybe you’d like more detailed logs in your local environment or perhaps you’d like to add a custom handler?

It turns out this is a possibility and I had to do some digging to find the solution. To override `host.json` values for a specific environment, you can add values formatted as `AzureFunctionsJobHost__path__to__setting` to application settings where the double underscore (\_\_) refers to the JSON hierarchy.

For instance, if I wanted to change the default log level to “Debug”, I can reference [the sample host.json file](https://learn.microsoft.com/en-us/azure/azure-functions/functions-host-json#sample-hostjson-file) and determine that I need to set `logging.logLevel.default` to “Debug”. Remember that the key always starts with `AzureFunctionsJobHost` and we need to use underscores to represent the JSON hierarchy.

```json
{
    "IsEncrypted": false,
    "Values": {
        "AzureWebJobsStorage": "",
        "FUNCTIONS_WORKER_RUNTIME": "node",
        "AzureFunctionsJobHost__logging__logLevel__default": "Debug"
    }
}
```

Now if I run my function, you’ll notice a much more detailed output:

![Azure functions output after enabling debug log level](src/images/AzureFunctionsDebugOutput.png)

And there you have it! If you’d like more information on this, you can refer to the Microsoft docs on [overriding host.json values](https://learn.microsoft.com/en-us/azure/azure-functions/functions-host-json#override-hostjson-values).

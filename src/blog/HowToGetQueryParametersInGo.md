---
tags:
    - golang
title: How to Get URL Query Parameters in Go
description: Learn 3 different ways to handle URL query parameters in Go with an explanation and code examples.
author: Derek Hassan
permalink: 'blog/{{ title | slugify }}/'
date: 2024-11-24
---

Go provides several methods for getting query parameters from a URL. I’ll be explaining three different methods you can use for your application.

## Method 1: Using the `Query()` Method

The simplest way to get URL query parameters is to use the `Query()` method on the `URL` type which returns a map with the corresponding query keys/values.

### Single-Value Parameters

For query parameters that only contain a single value, you can use the `Get()` method. This retrieves the first value associated with the key as a string. If the key does not exist or is empty, it will return an empty string.

### Multi-Value Parameters

If a query parameter can have multiple values associated with one key (such as an array), you can directly access the map by key (`r.URL.Query()["your_key"]`). This will return a slice of strings containing all the values for that key. If the key is missing, it will return an empty slice.

Here’s an example of this in a route handler:

```go
func home(w http.ResponseWriter, r *http.Request) {
	firstName := r.URL.Query().Get("first_name") // Single value
	lastName := r.URL.Query().Get("last_name")

	filters := r.URL.Query()["filters"] // Multiple values
	for _, filter := range filters {
		// Do something with the filter values
	}

	if firstName == "" { // One of the query parameters is missing or empty
		w.Write([]byte("Hello anonymous."))
	} else {
		w.Write([]byte(fmt.Sprintf("Hello %s!", firstName)))
	}
}
```

## Method 2: Using `url.ParseQuery()`

Alternatively, you could use the method `ParseQuery()` from the [net/url](https://pkg.go.dev/net/url) package to achieve a similar result. This method has the additional benefit of error-checking for malformed value pairs.

### **Single-Value Parameters**

Since the return type is the same as in the first example (`url.Values`), the `Get()` method can be used.

### **Multi-Value Parameters**

And yes, you can similarly access the map directly by key, same as above. 🙂

Here’s another example from our route handler:

```go
func home(w http.ResponseWriter, r *http.Request) {
	params, err := url.ParseQuery(r.URL.RawQuery)
	if err != nil {
		log.Fatal(err)
	}
	firstName := params.Get("first_name") // Single value

	filters := params["filters"] // Multiple values
	for _, filter := range filters {
		// Do something with the filter values
	}

	if firstName == "" { // Param is missing or empty
		w.Write([]byte("Hello anonymous."))
	} else {
		w.Write([]byte(fmt.Sprintf("Hello %s!", firstName)))
	}
}
```

## Method 3: Using `Request.Form`

In addition to the methods above, you could also get query parameters using form data. To do this, we parse with the `ParseForm()` method to populate `r.Form`,

{% aside "warning" %}
This method generally isn’t recommended for strictly query parameter use. This is because for POST, PUT, or PATCH requests, `r.ParseForm` will also read and parse the request body and put those results into `r.Form`. Request body parameters will take precedence over URL query parameters!
{% endaside %}

### **Single-Value Parameters**

`r.Form` is also the same type as the previous two examples, you can reach for the `Get()` method again.

### **Multi-Value Parameters**

Yep, you guessed it, you can directly access the map by key here too!

Here’s another example from our route handler:

```go
func home(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	firstName := r.Form.Get("first_name") // Single value
	filters := r.Form["filters"] // Multiple values

	// ...
}
```

## Which Should You Use in Your Application?

I’d suggest sticking to the first method if you’re working with query parameters in a route handler since the [ServeMux](https://pkg.go.dev/net/http#ServeMux) takes care of sanitizing the request. Otherwise I'd suggest using `url.ParseQuery()`.

---
tags: post
title: How to Pass an Array as a Query String to Express
layout: 'base.njk'
permalink: 'blog/{{ title | slugify }}/'
date: Created
---
# {{ title }}

I ran into a problem the other day where I wanted to send an array of data to a GET endpoint. I could send this data through the request body, but generally speaking, this is not a best practice. Ideally, I'd like to send this as a query param since I was using this for filtering. I searched around and stumbled on [this stack overflow post](https://stackoverflow.com/questions/3061273/send-an-array-with-an-http-get){target="_blank"}. To send an array, you can specify a query string with an empty array `?foo[]=value1`. You can then chain this same query string for each subsequent element: `?foo[]=value1&foo[]=value2`.

I tried this with the Node Express server I was working with, and it turns out Express will automatically parse this as an array for you!

Let's take an example. Fall is approaching and what better example to use than apples? Let's say we have an `/apples` endpoint that allows us to filter on different apple varieties to find price and stock. Here is a simple Express route that handles this request:
```js
app.get('/apples', (req, res) => {
    const apples = [
        {
            type: 'Empire',
            price: '$1.20',
            quantityAvailable: 10,
        },
        {
            type: 'Granny Smith',
            price: '$0.85',
            quantityAvailable: 8,
        },
        {
            type: 'Gala',
            price: '$0.98',
            quantityAvailable: 4,
        },
        {
            type: 'Fuji',
            price: '$0.95',
            quantityAvailable: 3,
        },
        {
            type: 'Honeycrisp',
            price: '$1.50',
            quantityAvailable: 3,
        },
        {
            type: 'Golden Delicious',
            price: '$1.20',
            quantityAvailable: 2,
        },
        {
            type: 'Red Delicious',
            price: '$1.10',
            quantityAvailable: 11,
        },
    ];
    const { filterBy = [] } = req.query;

    console.log(Array.isArray(filterBy)); // true

    const filteredApples = apples.filter((apple) =>
        filterBy.includes(apple.type)
    );
    res.json(filteredApples);
});
```

I want to filter by the following varieties:
- Empire
- Gala
- Granny Smith
- Fuji

To pass an array, I would send the following `GET` request to my server:
```
http://localhost:3000/apples?filterBy[]=Empire&filterBy[]=Gala&filterBy[]=Granny%20Smith&filterBy[]=Fuji
```

And here is the response we receive:
```json
[
  {
    "type": "Empire",
    "price": "$1.20",
    "quantityAvailable": 10
  },
  {
    "type": "Granny Smith",
    "price": "$0.85",
    "quantityAvailable": 8
  },
  {
    "type": "Gala",
    "price": "$0.98",
    "quantityAvailable": 4
  },
  {
    "type": "Fuji",
    "price": "$0.95",
    "quantityAvailable": 3
  }
]
```

And there we have it! No need to parse the array as Express will take care of this for us! Fore more info on the Express `req.query` object, see [the Expressjs docs](https://expressjs.com/en/api.html){target="_blank"}.
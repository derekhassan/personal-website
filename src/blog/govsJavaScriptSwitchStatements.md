---
tags: post
title: "Go vs JavaScript: Switch Statements"
description: Learn the differences between switch statements in Go and JavaScript
author: Derek Hassan
permalink: 'blog/{{ title | slugify }}/'
date: 2023-08-31
---

Both Go and JavaScript feature a `switch` statement, but there are a few distinct differences in behavior between the languages. Let’s take some time to explore those differences.

## Go switch statements do not have fall-through by default

Fall through happens when a `break` statement is omitted and execution continues to the next `case` clause all the way down to the `default` clause regardless of whether there is a value match. In Go, only the matched case is run, and any subsequent cases will be ignored. Let’s take a look at an example:

### JavaScript

```js
const weekday = new Date().getDay()

switch (weekday) {
    case 0:
        console.log('Sunday')
    case 1:
        console.log('Monday')
    case 2:
        console.log('Tuesday')
    case 3:
        console.log('Wednesday')
    case 4:
        console.log('Thursday')
    case 5:
        console.log('Friday')
    case 6:
        console.log('Saturday')
    default:
        console.log('Unknown day')
}
```

Assuming today is Monday, what do you think the JavaScript program will output?

```bash
Monday
Tuesday
Wednesday
Thursday
Friday
Saturday
Unknown day
```

That doesn’t seem like something we want! You’ll observe that once the matching `case` was hit, JavaScript continued to execute all the following cases since we omitted a `break` statement.

To fix our JavaScript program, we’d need to add `break` statements for each case:

```js
const weekday = new Date().getDay()

switch (weekday) {
    case 0:
        console.log('Sunday')
        break
    case 1:
        console.log('Monday')
        break
    case 2:
        console.log('Tuesday')
        break
    case 3:
        console.log('Wednesday')
        break
    case 4:
        console.log('Thursday')
        break
    case 5:
        console.log('Friday')
        break
    case 6:
        console.log('Saturday')
        break
    default:
        console.log('Unknown day')
}
```

```bash
Monday
```

Now that seems to match our desired behavior!

## Go

And now let’s compare that to the Go program:

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	var weekday = time.Now().Weekday()

	switch weekday {
	case time.Sunday:
		fmt.Println("Sunday")
	case time.Monday:
		fmt.Println("Monday")
	case time.Tuesday:
		fmt.Println("Tuesday")
	case time.Wednesday:
		fmt.Println("Wednesday")
	case time.Thursday:
		fmt.Println("Thursday")
	case time.Friday:
		fmt.Println("Friday")
	case time.Saturday:
		fmt.Println("Saturday")
	default:
		fmt.Println("Unknown day")
	}
}
```

```bash
Monday
```

Much better!

For this difference, I prefer Go’s approach as it can be easy to miss a `break` when writing a `switch` statement which in turn can cause some unwanted bugs! There is an [eslint rule](https://eslint.org/docs/latest/rules/no-fallthrough) to warn you on unintentional fall throughs.

## Go switch statements allow multiple expressions in the same `case` statement

In Go, you can have multiple expressions in the same `case` statement so that if one of those expressions matches, the `case` is executed. Although JavaScript doesn’t allow this, a similar result can be achieved by using fall through. Let’s take a look at an example:

### JavaScript

```js
const weekday = new Date().getDay()

switch (weekday) {
    case 0:
    case 6:
        console.log('The weekend!')
        break
    default:
        console.log('Weekday')
}
```

You’ll notice that when either `case: 0` or `case: 1` is met, we’ll see the output “The weekend!”. Assuming today is Monday, here is the output:

```bash
Weekday
```

### Go

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	var weekday = time.Now().Weekday()

	switch weekday {
	case time.Sunday, time.Saturday:
		fmt.Println("The weekend!")
	default:
		fmt.Println("Weekday")
	}
}
```

In Go, the criteria to meet the single `case` can either be Sunday or Saturday. Assuming today is Monday, here is the output:

```bash
Weekday
```

## Go can omit the `switch` expression

In Go, you can omit the `switch` expression to create an alternate `else/if` logic. Although this also isn’t supported in JavaScript, you can do something similar by using `switch (true)`:

### JavaScript

In the following example, the `case` is looking for the statement to be `true`, so it will short circuit on the first `case` that meets this condition, which is similar to a traditional `if/else` block.

```js
const weekday = new Date().getDay()

switch (true) {
    case weekday === 1:
        console.log('Monday')
        break
    default:
        console.log('Not Monday')
}
```

```bash
Monday
```

### Go

Similar to the above example, the first `case` that is `true` will be executed.

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	var weekday = time.Now().Weekday()

	switch {
	case weekday == time.Monday:
		fmt.Println("Monday")
	default:
		fmt.Println("Not Monday")
	}
}
```

## Conclusion

And there you have it! There are the differences between Go and JavaScript `switch` statements. I’m currently in the process of learning Go and I found these differences to be quite interesting. I look forward to sharing any other interesting pieces of information I find on my learning journey!
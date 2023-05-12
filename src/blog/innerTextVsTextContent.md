---
tags: post
title: innerText vs textContent, What's the Difference?
description: Dive into the difference between the two similar methods innerText and textContent
author: Derek Hassan
layout: 'post.njk'
permalink: 'blog/{{ title | slugify }}/'
date: 2022-09-23
---

On the surface, the functionality of `innerText` and `textContent` appear quite similar. So what's the catch? Let's take a look at an example set of HTML elements:

```html
<div id="root">
    <script>
        console.log('Hello World');
    </script>
</div>

<p class="text">
    This is in a paragraph tag. I also have a <span>span</span> in the text!
    Some of this text may be <span style="display: none;">hidden. 🤫</span>
</p>

<button class="hide">I'm Hidden from the user!</button>
```

Now what do you think will be outputted below?

```js
const root = document.querySelector('#root');

console.log(root.textContent);
console.log(root.innerText);
```

<details>
    <summary>Answer</summary>

```js
console.log(root.textContent);
/*
"
    
        console.log('Hello World');
    
"
*/

console.log(root.innerText); // ""
```

As you can see, `textContent` can read text within a nested `<script>` tag and it also includes the whitespace!

</details>

Let's try another test with the same example HTML!

```js
const paragraph = document.querySelector('.text');

console.log(paragraph.textContent);
console.log(paragraph.innerText);
```

<details>
    <summary>Answer</summary>

```js
console.log(paragraph.textContent);
/*
"
    This is in a paragraph tag. I also have a span in the text! Some of this text may be hidden. 🤫
"
*/

console.log(paragraph.innerText);
// "This is in a paragraph tag. I also have a span in the text! Some of this text may be"
```

As you probably guessed from the first example, `textContent` also took whitespace into account. Now what's interesting here is that `innerText` ignore the `<span>` with the `display: none` style. This is because `innerText` takes CSS into account when reading the value. This also means `innerText` will trigger a reflow to update styles.

</details>

And there you have it! Hopefully you learned something new today! Here are some other resources for further exploration:

-   [MDN Docs innerText](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText)
-   [MDN Docs textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)

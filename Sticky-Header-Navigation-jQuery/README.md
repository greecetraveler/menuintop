# Simple Sticky Header
A really simple jQuery script for adding a sticky class to the header on scroll.

`simple-sticky-header.js` works by adding a CSS class to the target once the window has been scrolled past it.  
It also removes the class if you scroll back up.

[**Live demo**](https://oenstrom.github.io/simple-sticky-header/)

## Installation
Download and include `simple-sticky-header.min.js` in your document after including jQuery.  
```html
<script src="path/to/jquery.min.js></script>
<script src="path/to/simple-sticky-header.js"></script>
```

## Usage
Simply call the plugin on the header.
```js
$("#sticky-header").simpleStickyHeader();
```

The default class that gets added to the target is `sticky-header`.  
This can be changed by passing an option to the plugin.
```js
$("#sticky-header").simpleStickyHeader({
    class: "your-class"
});
```

Make sure you have a CSS class for the sticky header.  
Here's basic CSS for making it sticky:
```css
.sticky-header {
    position: fixed;
    top: 0;
    left: 0;
}
```

by Olof Enström

# djs-blinker

A JavaScript library to make blinking an element.

This object add a CSS class to a jQuery element periodically to make it blink. Rather than a CSS class, it can add inline CSS properties.
 
## Installation

```
bower install djs-blinker
```

## Dependencies

This package requires [jQuery](http://jquery.com/).

If you install it with Bower, the dependency will be included.

## Usage

### Basic usage

By default, the element will blink 5 times, with cycles of 600ms by adding the CSS class `djs-blink`.

```javascript
// Create the blinker
var blinker = new djs.Blinker($(".blinked"));

// Start the animtion
blinker.start();

// Start the animtion with an ending callback
blinker.start(function() {
    console.log('Did finish blinking');
});
```

If you want to stop before the end, call `stop`. The ending callback won't be called.

```javascript
blinker.stop();
```

### Infinite blinking

You can make the element blinking infinitely by calling the method `infinite`.

```javascript
// Start infinite blinking
blinker.infinite();

// Stop infinite blinking
blinker.stop();
```

### Custom options

When creating a blinker, you can change some options.

```javascript
// Create the blinker with custom options
var blinker = new djs.Blinker($(".blinked"),  {
    class: 'custom-blink-class',
    duration: 100,
    count: 10,
    css: { color: 'red', opacity: 0.5 }  
});
```

`duration` is in milliseconds.

If you don't want to use the CSS class, you can remove it :

```javascript
// Create the blinker with only inline CSS properties
var blinker = new djs.Blinker($(".blinked"),  {
    class: null,
    css: { color: 'red', opacity: 0.5 }  
});
```

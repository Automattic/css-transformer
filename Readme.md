# css-transformer

JavaScript library tool to hanlde [css3
transform](https://developer.mozilla.org/es/docs/Web/CSS/transform) property.

## Install

```
$ npm install css-transformer
```

## How to use

```html
<div id="my-element" style="transform: translate(100px) rotate(20deg);">
  Nice transform!
</div>
```

```js
var transform = require('css-transfomer');

var el = document.getElementById('my-element');

// get current transform properties from the given element
var prps = transform(el);

// set translate property
prps.translate(200px);
transform(el, prps);
```

```html
<div id="my-element" style="transform: translate(200px) rotate(20deg);">
  Nice transform!
</div>
```

## API

### Transform(Element)

Return the `transform` properties object from the given element

### Transform.build(Object)

Return the `transform` style string from the given transform object

### Transform.set(Element, Object)

Set `transform` property in the given element from the given transform object

## License

MIT – Copyright 2014 Automattic

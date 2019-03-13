# Lazyload Picturefill Background

Responsive background images using [Window.matchMedia()](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) and the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

This project is inspired by [M6Web/picturefill-background](https://github.com/M6Web/picturefill-background)

![Demo gif](demo/demo.gif)

- [Lazyload Picturefill Background](#lazyload-picturefill-background)
  - [Getting Started](#getting-started)
    - [Install](#install)
    - [JS](#js)
    - [HTML](#html)
    - [CSS](#css)
    - [Change default selectors](#change-default-selectors)
  - [Browser support](#browser-support)
  - [License](#license)

## Getting Started

### Install

With npm:

```bash
npm install lazyload-picturefill-background
```

With yarn:

```bash
yarn add lazyload-picturefill-background
```

With CDN:

```html
<script src="https://unpkg.com/lazyload-picturefill-background@1.0.1/dist/lazyload-picturefill-background.min.js"></script>
```

You can as well clone this repository.

### JS

Using ES6 and import

```js
import lazyloadPicturefillBackground from "lazyload-picturefill-background";

new lazyloadPicturefillBackground();
```

If you are not using babel you can use `dist/lazyload-picturefill-background.min.js`

```html
<script src="lazyload-picturefill-background.min.js"></script>
<script>
  new lazyloadPicturefillBackground();
</script>
```

### HTML

The `.is-lazy` selector is optional. Use it if you want to lazyload our `.picturefill-background` elements.

```html
<div class="picturefill-background is-lazy">
  <span class="picturefill-background-source" data-src="small.jpg"></span>
  <span
    class="picturefill-background-source"
    data-src="medium.jpg"
    data-media="(min-width: 400px)"
  ></span>
  <span
    class="picturefill-background-source"
    data-src="large.jpg"
    data-media="(min-width: 640px)"
  ></span>
  <span
    class="picturefill-background-source"
    data-src="big.jpg"
    data-media="(min-width: 800px)"
  ></span>
</div>
```

By default:

- `.picturefill-background`: apply the background-image attribute
- `.is-lazy`: Set observer to lazyload the image _(Optional)_
- `.picturefill-background-source`:
  - `[data-src]`: specify the image path
  - `[data-media]`: apply in specific media settings _(Optional)_

### CSS

Set your CSS as you need:

```css
.picturefill-background {
  background-size: cover;
  background-repeat: no-repeat;
}

.picturefill-background.is-lazy {
  background-color: lime;
}
```

### Change default selectors

```js
import lazyloadPicturefillBackground from "lazyload-picturefill-background";

new lazyloadPicturefillBackground({
  pictureFillBackgroundSelector: ".picturefill-background", //String or node list
  lazySelector: ".is-lazy", //String
  pictureFillBackgroundSourceSelector: ".picturefill-background-source" //String
});
```

## Browser support

Lazyload Picturefill Background will work in all modern browsers. the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) is not supported on IE you can use the [w3c polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill).

The IntersectionObserver polyfill can be included in your project using [polyfill.io](https://polyfill.io/v3/), which will automatically include dependencies where necessary:

```html
<script src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver"></script>
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

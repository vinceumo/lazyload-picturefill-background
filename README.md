# Lazyload Picturefill Background

This project is inspired from [M6Web/picturefill-background](https://github.com/M6Web/picturefill-background)

## Set up

## JS

```js
import lazyloadPicturefillBackground from "lazyload-picturefill-background";

new lazyloadPicturefillBackground();
```

## HTML

The `.is-lazy` selector is optional. Use it if you want to lazyload this one.

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

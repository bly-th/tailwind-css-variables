# tailwind-css-variables

> Generates custom property values from tailwind config

Install the plugin from npm:

```
$ npm install tailwind-css-variables
```

Then add the plugin to your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
  plugins: [
    // ...
    require('tailwind-css-variables'),
    // ...
  ],
};
```

This plugin will generate following CSS:

```css
/* ... */
:root {
  --color-primary: #000;
}
/* ... */
```

## License

tailwind-css-variables is licensed under the MIT License.

## Credits

Created with [create-tailwind-plugin](https://github.com/Landish/create-tailwind-plugin).

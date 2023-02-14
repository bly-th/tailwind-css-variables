const merge = require('lodash/merge');
const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const customPlugin = require('./index');

expect.extend({
  toMatchCss: cssMatcher,
});

function generatePluginCss(overrides) {
  const config = {
    corePlugins: false,
    theme: {},
    plugins: [
      customPlugin({
        colors: 'color',
      }),
    ],
  };

  return postcss(tailwindcss(merge(config, overrides)))
    .process('@tailwind components', {
      from: undefined,
    })
    .then(({ css }) => css);
}

test('css variables can be generated', () => {
  return generatePluginCss({
    theme: {
      colors: {
        primary: '#000',
      },
    },
  }).then(css => {
    expect(css).toMatchCss(`
    :root {
      --color-primary: #000;
    }
    `);
  });
});

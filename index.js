const _ = require('lodash');
const flattenColorPalette =
  require('tailwindcss/lib/util/flattenColorPalette').default;

const flattenFontFamily = obj => {
  return Object.entries(obj).reduce((prevObj, [key, value]) => {
    return {
      ...prevObj,
      [key]: value.join(','),
    };
  }, {});
};

const flattenFontSize = obj => {
  return Object.entries(obj).reduce((prevObj, [key, value]) => {
    const [fontSize, options] = Array.isArray(value) ? value : [value];
    const { lineHeight, letterSpacing } = _.isPlainObject(options)
      ? options
      : {
          lineHeight: options,
        };

    return {
      ...prevObj,
      [key]: fontSize,
      ...(lineHeight === undefined
        ? {}
        : {
            [`${key}-line-height`]: lineHeight,
          }),
      ...(letterSpacing === undefined
        ? {}
        : {
            [`${key}-letter-spacing`]: letterSpacing,
          }),
    };
  }, {});
};

const getFixedKey = key => {
  if (key === 'DEFAULT' || key === 'default') {
    return 'default';
  }
  return key.replace('/', '-').replace('.', '_');
};

module.exports = function (variablesNames) {
  return ({ addComponents, config }) => {
    const variableRoot = {};

    Object.entries(variablesNames).forEach(([key, customName]) => {
      if (!customName) return;
      const tailwindPrefix = config('prefix', '');
      const originalConfig = config(`theme.${key}`, []);

      let modifiedConfig = {};

      switch (key) {
        case 'colors':
          modifiedConfig = flattenColorPalette(originalConfig);
          break;
        case 'fontFamily':
          modifiedConfig = flattenFontFamily(originalConfig);
          break;
        case 'fontSize':
          modifiedConfig = flattenFontSize(originalConfig);
          break;

        default:
          modifiedConfig = originalConfig;
          break;
      }

      Object.entries(modifiedConfig).forEach(([configKey, value]) => {
        const cssVariableName = `--${tailwindPrefix}${customName}-${getFixedKey(
          configKey
        )}`;
        variableRoot[cssVariableName] = value;
      });
    });

    const root = {
      ':root': variableRoot,
    };
    addComponents(root);
  };
};

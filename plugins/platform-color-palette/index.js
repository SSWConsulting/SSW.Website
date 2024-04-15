const plugin = require('tailwindcss/plugin');
const colors = require('./colors');

const platform = Object.keys(colors).reduce((acc, colorClsName) => {
  const color = colors[colorClsName];
  acc[colorClsName] = color.color;
  return acc;
}, {})

module.exports = plugin(function () { }, {
  theme: {
    extend: {
      colors: {
        platform
      }
    }
  }
})
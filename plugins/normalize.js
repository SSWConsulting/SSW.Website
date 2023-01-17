const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ addBase }) {
  addBase({
    'html': {
      fontSize: "14px",
    }
  })
});

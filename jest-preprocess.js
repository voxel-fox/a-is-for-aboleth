const babelOptions = {
  presets: ["babel-preset-gatsby"],
  plugins: [
    [
      "emotion",
      {
        sourceMap: false,
        cssPropOptimization: false
      }
    ]
  ]
};

module.exports = require("babel-jest").createTransformer(babelOptions);

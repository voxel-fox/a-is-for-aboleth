module.exports = {
  presets: [
    ['@babel/preset-env', {
      loose: true,
      modules: false,
      useBuiltIns: 'usage',
      shippedProposals: true,
      targets: {
        browsers: ['>0.25%', 'not dead']
      }
    }],
    ['@babel/preset-react', {
      useBuiltIns: true,
      pragma: 'React.createElement'
    }]
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', {
      loose: true
    }],
    '@babel/plugin-syntax-dynamic-import',
    'babel-plugin-macros',
    ['@babel/plugin-proposal-object-rest-spread', {
      'useBuiltIns': true
    }],
    ['@babel/plugin-transform-runtime', {
      helpers: true,
      regenerator: true
    }]
  ]
}

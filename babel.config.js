module.exports = {
  presets: [
    ['@babel/preset-env'],
    ['@babel/preset-react', {
      useBuiltIns: true,
      pragma: 'React.createElement'
    }]
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    'babel-plugin-macros',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-runtime'
  ]
}

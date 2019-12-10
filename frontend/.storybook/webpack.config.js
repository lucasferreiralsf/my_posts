const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [require.resolve('babel-preset-react-app')],
    },
    // include: [path.resolve(__dirname, '../components'), path.resolve(__dirname, '../stories'), path.resolve(__dirname, '../pages')],
    // exclude: [path.resolve(__dirname, "../")]
  })

  config.resolve.extensions.push('.ts', '.tsx')

  config.plugins.push(
    new ForkTsCheckerWebpackPlugin({
      async: false,
      checkSyntacticErrors: true,
      formatter: require('react-dev-utils/typescriptFormatter'),
    })
  )
  return config
}
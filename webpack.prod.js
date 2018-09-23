const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        __DEVELOPMENT__: false,
      }),
      // optimizations
      new webpack.optimize.OccurrenceOrderPlugin(),
    ],
    externals: {
        // global app config object
        config: JSON.stringify({
            mockBackend: false,
            apiUrl: 'http://localhost:4004'
        })
    }
});

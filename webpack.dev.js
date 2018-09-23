const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: '#inline-source-map',
    devServer: {
      disableHostCheck: true,
      historyApiFallback: true,
      host: '0.0.0.0',
      inline: false,
      port: 3003
    },
    watch: true,
    watchOptions: {
      ignored: /node_modules/
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            mockBackend: true,
            apiUrl: 'https://localhost'
        })
    }
});

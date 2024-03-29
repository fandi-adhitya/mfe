const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const devConfig = {
    mode : 'development',
    output:{    
        publicPath : 'http://localhost:8080/'
    },
    devServer : {
        port : 8080,
        historyApiFallback: true,
        index: '/index.html',
    },
    plugins : [
        new ModuleFederationPlugin({
            name : 'container',
            remotes: {
                marketing_app : 'marketing_app@http://localhost:8081/remoteEntry.js',
                auth_app : 'auth_app@http://localhost:8082/remoteEntry.js'
            },
            shared : packageJson.dependencies
        })
    ]
}

module.exports = merge(commonConfig, devConfig)
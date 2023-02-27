const { merge } = require('webpack-merge')
const path = require('path')

const config = require ('./webpack.config')

//setting the mode of the webpack 
module.exports = merge  (config, {
     //informing the webpack that it is running the build type development, not anything else. 
     mode: 'development',

     //inspect the elements in the html
     devtool:'inline-source-map',

     devsServer: {
          writeToDisk: true
     },

     output: {
          path: path.resolve (__dirname, 'public')
     }
})
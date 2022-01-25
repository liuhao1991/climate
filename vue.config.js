/*
 * @Author: lh@metgs.com
 * @Date: 2021-06-23 10:31:17
 * @LastEditors: lh@metgs.com
 * @LastEditTime: 2022-01-25 15:50:21
 * @Description: ...
 */
const { resolve } = require('path')
const { title } = require('./src/settings')

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  configureWebpack: {
    devtool: 'source-map'
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = title
      return args
    })
    // config.module
    //   .rule("vue")
    //   .use("vue-loader")
    //   .tap((options) => {
    //     options
    //     // modify the options...
    //     return options;
    //   });
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [resolve(__dirname, './src/style/global/util.less')]
    }
  }

}

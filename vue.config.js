const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production'
    ? 'https://cdn.ice-starter.cn/navi/dist/'
    : '/',
  devServer:{
    port: 8080,
    proxy:"http://localhost:8001"
    //proxy:"http://182.61.43.67:8001"
  }
})

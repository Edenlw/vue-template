const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: './',
  devServer: {
    host: '0.0.0.0',
    port: 8888,
    https: false, // https:{type:Boolean}
    open: true,
    disableHostCheck: true // webpack4.0 开启热更新
    // proxy: {
    //   '/api': { // 这里最好有一个 /
    //     target: 'http://123.56.76.225:3000', // 后台接口域名
    //     ws: true, // 如果要代理 websockets，配置这个参数
    //     secure: false, // 如果是https接口，需要配置这个参数
    //     changeOrigin: true, // 是否跨域
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')); // 设置别名，key,value自行定义，比如.set('@@', resolve('src/components'))
    // config
    // .plugin('webpack-bundle-analyzer')
    // .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  },
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  lintOnSave: false
};

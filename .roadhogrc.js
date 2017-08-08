var postcss = require('postcss');
var pxtorem = require('postcss-pxtorem');

/*let mockUrls=[
  '/openapi/v1/radarBatch/querySingleRadarOldInfo'
]

let openapis={}

mockUrls.forEach(function (value, index, array) {
  let mockurl=value.replace('openapi','mock')
  let newproxy={value:{
    target:mockurl,
    changeOrigin:true
  }}
  Object.assign(openapis,newproxy)
})

console.log(openapis);*/

var config = {
  "entry": "src/index.js",
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime",
        ["import", {"libraryName": "antd", "style": true}]
      ]
    },
    "production": {
      "extraBabelPlugins": [
        "transform-runtime",
        ["import", {"libraryName": "antd", "style": true}]
      ]
    }
  },
  "proxy": {
    "/openapi": {
      // "target": "http://10.1.50.79:31103",//施亮本地
      // "target": "http://10.1.50.69:31103",//宋洪宇本地
      // "target": "http://10.0.23.73:31103",//测试机器
      "target": "https://open.xinyan.com",//生产环境
      "changeOrigin": true,
      "pathRewrite": {"^/openapi": "/openapi"}
    }
  },
  "theme": "./theme.config.js",

};
module.exports = config;

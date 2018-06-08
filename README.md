## 让你的CSS中的图片也能动态支持Webp
目前并非所有浏览器都能支持Webp图片，如果图片在HTML中，可以通过JS去进行判断，但是CSS中的图片无法通过JS去判断，通过此插件，可以自动生成Webp图片版的CSS，并且自动将是否支持Webp的判断语法插入到对应的HTML中

## 使用前置条件
webpack + html-webpack-plugin + extract-text-webpack-plugin

## 使用方法

``` javascript
const HtmlWebpackCssWebpPlugin = require('html-webpack-css-webp-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackCssWebpPlugin({
      postfix: 'x-oss-process=image/format,webp' // 此为阿里云OSS webp图片后缀，其他OSS自行查询文档
    })
  ]
}
```

## Options
* postfix：webp图片后缀，例如阿里云OSS webp图片后缀为'x-oss-process=image/format,webp'

## 实现原理
1. 将webpack生成的所有css文件复制一份，命名为xxx.webp.css
2. 将xxx.webp.css中的图片全部加上postfix
3. 基于html-webpack-plugin，将插入的css link标签删掉，并添加一段JS，JS中会判断是否支持webp，如果支持则加载xxx.webp.css，如果不支持，则加载xxx.css
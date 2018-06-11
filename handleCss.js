const fs = require('fs');
const path = require('path');

function handleCss(dir, publicPath, postfix) {
  // 获取生成图片资源路径
  let convertPublicPath = publicPath;
  if (convertPublicPath) {
    const pathDoteArr = ['.', '?', '/'];
    pathDoteArr.map(el => {
      const reg = new RegExp(`\\${el}`, 'g');
      convertPublicPath = convertPublicPath.replace(reg, `\\${el}`);
    });
  } else {
    convertPublicPath = '';
  }
  console.log(convertPublicPath)

  const files = fs.readdirSync(dir);
  files.forEach(function(file) {
    const filePath = `${dir}/${file}`;
    const info = fs.statSync(filePath);
    if (info.isDirectory()) {
      handleCss(filePath);
    } else {
      if (file.match(/\.css$/) && !file.match(/\.webp\.css$/)) {
        let result = fs.readFileSync(filePath, 'utf-8');
        const arr = ['png', 'jpg'];
        arr.map(el => {
          
          // 只匹配webpack配置中的publicpath，第三方的图片资源不做处理
          const reg = new RegExp(`${convertPublicPath}([\\s\\S]*?)\\.${el}`, 'g');
          result.match(reg) && result.match(reg).map(url => {
            if (convertPublicPath || !url.match(/\/\//g)){
              result = result.replace(url, `${url}?${postfix}`);
            }
          })
        });

        fs.writeFileSync(path.join(dir, file.replace(/\.css/, '.webp.css')), result, 'utf8');
      }
    }
  });
}

module.exports = handleCss;

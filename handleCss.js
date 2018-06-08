const fs = require('fs');
const path = require('path');

function handleCss(dir) {
  const files = fs.readdirSync(dir);
  console.log(files)
  files.forEach(function(file, index) {
    const filePath = `${dir}/${file}`;
    const info = fs.statSync(filePath);
    if (info.isDirectory()) {
      handleCss(filePath);
    } else {
      if (file.match(/\.css$/) && !file.match(/\.webp\.css$/)) {
        let result = fs.readFileSync(filePath, 'utf-8');
        const arr = ['png', 'jpg'];
        arr.map(el => {
          const reg = new RegExp(`\\.${el}`, 'g');
          result = result.replace(reg, `.${el}?${this.options.postfix}`);
        });

        fs.writeFileSync(path.join(dir, file.replace(/\.css/, '.webp.css')), result, 'utf8');
      }
    }
  });
}

module.exports = handleCss;

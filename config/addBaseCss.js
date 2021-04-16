// 修改文件
const fs = require('fs');

const str = '@import "../base/style.css";';
const rename = (filePath) => {
    fs.readdir(filePath, (err, files) => {
        // files是名称数组
        files.forEach((filename) => {
            if (filename !== 'base') {
                // 运用正则表达式替换oldPath中不想要的部分
                const path = `${filePath}/${filename}/style.css`;
                const file = fs.readFileSync(path).toString();
                fs.writeFileSync(path, (str + file), 'utf8', err => {
                    if (err) throw err;
                    console.log(`${filename} success done`);
                });
            }
        });
    });
};

rename('./lib');

// 拷贝文件
const path = require('path');
const fs = require('fs');
const { resolve } = path;

// 获取时间
const TimeFn = require('../get_time');
const {
    name, version, author, license
} = require('../package.json');
const banner = `/**
* @${name} v${version}
* (c) 2020-2021 ${author}
* Released under the ${license} License.
* ${TimeFn()}
*/
`;

const copyFile = (url) => {
    fs.readFile(url, (err, data) => {
        fs.writeFile(resolve(__dirname, '../lib/index.js'), (banner + data), err => {
            if (err) {
                console.log(`写入出现错误 ${err.toString()}`);
            } else {
                console.log('完成!');
            }
        })
    })
};

copyFile(resolve(__dirname, '../src/components/index.js'))

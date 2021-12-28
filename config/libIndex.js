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

// 写入index.d.ts
const copyFile = (url, out) => {
    fs.readFile(resolve(__dirname, url), (err, data) => {
        fs.writeFile(resolve(__dirname, out), (banner + data), err => {
            if (err) {
                console.log(`${out}写入出现错误 ${err.toString()}`);
            } else {
                console.log(`${out}完成!`);
            }
        })
    })
};
copyFile('../src/components/index.ts', '../lib/index.d.ts');

const firstToUpperCase = (str) => {
    const arr = str.split('');
    arr[0] = arr[0].toUpperCase();
    return arr.join('');
}
// 写入index.js index.d.ts
const readFile = (url) => {
    fs.readdir(resolve(__dirname, url), (err, data) => {
        const arr = data.filter(d => !d.includes('.'));
        const resultJs = [], resultTs = [];
        arr.forEach(d => {
            resultJs.push(`export { default as ${firstToUpperCase(d)} } from './${d}';`);
            resultTs.push(`export type { Props as ${firstToUpperCase(d)}Props } from './${d}';\nexport { default as ${firstToUpperCase(d)} } from './${d}';`);
        })
        const resJs = `\n${resultJs.join('\n')}\n`;
        fs.writeFile(resolve(__dirname, `${url}/index.js`), (banner + resJs), err => {
            if (err) {
                console.log(`js写入出现错误 ${err.toString()}`);
            } else {
                console.log('js完成!');
            }
        });
        const resTs = `\n${resultTs.join('\n')}\n`;
        /*fs.writeFile(resolve(__dirname, `${url}/index.d.ts`), (banner + resTs), err => {
            if (err) {
                console.log(`ts写入出现错误 ${err.toString()}`);
            } else {
                console.log('ts完成!');
            }
        });*/
    });
};
readFile('../lib');

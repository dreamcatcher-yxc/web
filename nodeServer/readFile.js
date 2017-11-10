const FS = require('fs');
const DEFALT_ENCODING = 'UTF-8';
// 使用异步的方式读取文件。
// FS.readFile('./file/test.txt', DEFALT_ENCODING, (err, data) => {
//     if(!err) {
//         console.log(data);
//         console.log(`length: ${data.length} bytes`);
//     } else {
//         console.log('读取文件失败!');
//     }
// });

// 同步读取文件
// try {
//     let data = FS.readFileSync('./file/test.txt', DEFALT_ENCODING);
//     console.log(data);
// }catch(e) {
//     console.log(e);
// }

// 异步写文件
// let data = 'hello world!';
// FS.writeFile('./file/output.txt', data, err => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log('ok');
//     }
// });

// 同步写文件
// FS.writeFileSync([fileName], [data]);

// 使用 FS.stat 异步获取文件信息.
function readFileStatByAsync(fileName) {
    FS.stat(fileName, (err, stat) => {
        if(err) {
            console.log(err);
        } else {
            for (let key of Object.keys(stat)) {
                console.log(`${key} => ${stat[key]}`);
            }
        }
    });
}

// 同步获取文件信息
function readFileStatBySync(fileName) {
    try {
        let stat = FS.statSync(fileName);
        for (let key of Object.keys(stat)) {
            console.log(`${key} => ${stat[key]}`);
        }
    } catch (e) {
        console.log(e);
    }
}

readFileStatBySync('./file/test.txt');



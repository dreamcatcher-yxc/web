const FS = require('fs');
const Utils  = require('./modules/common');
const DEFALT_ENCODING = 'UTF-8';
const DEFAULT_FILE_NAME = './file/test.txt';

// 使用流的方式读取文件
function readFileByStream(fileName = DEFAULT_FILE_NAME) {
    let rs = FS.createReadStream(fileName, DEFALT_ENCODING);
    rs.on('data', chunk => console.log(`data: ${chunk}`))
      .on('end', () => console.log('end'))
      .on('error', (err) => console.log(`error: ${error}`));
}

// 是用流的方式写文件.
function writeFileByStream(fileName = DEFAULT_FILE_NAME, isBinaryFile = false) {
    let ws = FS.createWriteStream(fileName, DEFALT_ENCODING);
    let data = '这是一段文字';
    if(isBinaryFile)
    ws.write(isBinaryFile ? new Buffer(data, DEFALT_ENCODING) : data);
    ws.end();
    console.log('ok');
}

// 使用 pipe 复制文件.
function pipe(fileName = DEFAULT_FILE_NAME) {
    try {
        let rs = FS.createReadStream(fileName, DEFALT_ENCODING);
        let ws = FS.createWriteStream(`./file/${Utils.getFileName(fileName)}.copy.${Utils.getFilePostIndex(fileName)}`, DEFALT_ENCODING);
        rs.pipe(ws);
        console.log('ok');
    } catch (e) {
        console.log(e);
    }
}

// readFileByStream()
// writeFileByStream(undefined, true);
pipe('./file/a.jpg');
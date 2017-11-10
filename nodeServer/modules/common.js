function sayHello() {
    console.log('hello world!');
}

function getFileName(fileName) {
    let spritLastIndex = fileName.lastIndexOf('/');
    let str = spritLastIndex < 0 ? fileName : fileName.substring(spritLastIndex + 1, fileName.length);
    let dotLastIndex = str.lastIndexOf('.');
    str = dotLastIndex < 0 ? str : str.substring(0, dotLastIndex);
    return str;
}

function getFilePostIndex(fileName) {
    let dotLastIndex = fileName.lastIndexOf('.');
    let postFix = dotLastIndex < 0 ? fileName : fileName.substring(dotLastIndex + 1, fileName.length);
    return postFix;
}

// 使用 module.exports 导出模块, 不用 exports, 具体差异查看教程.
module.exports = {
    sayHello,
    getFileName,
    getFilePostIndex,
};


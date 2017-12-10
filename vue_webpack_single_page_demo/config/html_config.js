const metaData = require("../meta_data");
const fs = require('fs');
const path = require('path');
const rp = (tp) => path.resolve(__dirname, `../${tp}`);
const default_encoding = 'UTF-8';
const [ROOT, SOURCE_PATH, DIST_PATH]= [metaData.ROOT, metaData.HTML_SRC_ROOT, metaData.HTML_DIST_ROOT];

function genMap(fullPath) {
    let template = fullPath.replace(ROOT, '');
    template = template.substring(1, template.length)
    let filename = path.join('pages', fullPath.replace(SOURCE_PATH, ''));
    //console.log(`template: ${template}`);
    //console.log(`filename: ${filename}`);
    return {template, filename};
}

/**
 * 生成源文件映射。
 */
function generateDirMap(filePath, mapArr){
    try {
        let files = fs.readdirSync(filePath);
        files.forEach((filename) => {
            let fullPath = path.join(filePath, filename);
            let stats = fs.statSync(fullPath);
            if(stats.isFile()) {
                // console.log(filedir);
                mapArr.push(genMap(fullPath));
            } else if(stats.isDirectory()){
                generateDirMap(fullPath, mapArr);
            }
        });
    } catch (e) {
        console.log(`读取 ${filePath} 失败, ${e}`);
    }
}

const mapArr = [];
generateDirMap(SOURCE_PATH, mapArr);
// for (let obj of mapArr) {
//     console.log(obj);
// }

module.exports = {
    fileMapArr : mapArr
}
function number2Chinese(number) {
    let chnUnitSections = ['', '万', '亿', '万亿'];
    let chnUnitChar = ['', '十', '百', '千'];
    let chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];

    /**
     * 将每一节转换为数字
     * @param section
     * @return {string}
     */
    function section2Chinese(section) {
        let result = [];
        let unitPos = 0;
        let zero = false;
        while(section > 0) {
            let v = section % 10;
            if(v == 0) {
                if(section == 0 || !zero) {
                    zero = true; // 多个 0 的情况下只算为一个'零'
                    result.splice(0, 0, chnNumChar[v]);
                }
            } else {
                zero = false;
                let strIns = chnNumChar[v];
                strIns += chnUnitChar[unitPos];
                result.splice(0, 0, strIns);
            }
            unitPos++;
            section = parseInt(section / 10);
        }
        return result.join('');
    }

    let result = [];
    let needZero = false;
    let unitPos = 0;

    while (number > 0) {
        let section = number % 10000;
        if(needZero) {
            result.push(0, chnNumChar[0]);
        }
        let strIns = section2Chinese(section);
        strIns += section != 0 ? chnUnitSections[unitPos] : chnUnitSections[0];
        result.splice(0, 0, strIns);
        needZero = section < 1000 && section > 0;
        number = parseInt(number / 10000);
        unitPos++;
    }

    return result.join('');
}

let chnNum = number2Chinese(4294967295);
console.log(chnNum);

function chinese2Number(chinese) {
    let chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    let chnNameValue = [
            {name : '十', value : 10, secUnit : false},
            {name : '百', value : 100, secUnit : false},
            {name : '千', value : 1000, secUnit : false},
            {name : '万', value : 10000, secUnit : true},
            {name : '亿', value : 100000000, secUnit : true}
        ];

    let result = 0;
    let tNum = 0; // 缓存每个单位前一个数(基数)的大小
    let section = 0; // 缓存每一节的大小

    for(let i = 0; i < chinese.length; i++) {
        let ele = chinese[i];
        let tIndex = 0;
        if((tIndex = chnNumChar.findIndex(v => v == ele)) > -1) {
            // 是数字
            tNum = tIndex;
        } else {
            // 是数字单位或者节权位单位
            let unit = chnNameValue.find(v => v.name == ele);
            if(unit.secUnit) {
                // 节权位单位, 计算完成之后 section 重置为 0
                section += (section + tNum) * unit.value;
                result += section;
                section = 0;
            } else {
                // 数字单位
                section += tNum * unit.value;
            }
            tNum = 0; // 单位计算之后数字归零
        }
    }
    return result;
}

console.log(chinese2Number('四十二亿九千四百九十六万七千二百九十五'));
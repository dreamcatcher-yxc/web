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
                    zero = true;
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
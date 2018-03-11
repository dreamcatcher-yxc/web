/**
 * 穷举算法.
 * GOOGLE 等式
 */

/**
 * 根据规则转换出具体数字.
 * @param cis
 * @param pattern
 */
function makeIntegerValue(cis, pattern) {
    let arr = [];
    for(let p of pattern) {
        for(let ci of cis) {
            if(p == ci.c) {
                arr.push(ci.value + '');
                break;
            }
        }
    }
    return parseInt(arr.join(''));
}

/**
 * 当得到一个可能符合等式的结果数组，则输出该等式的。
 * @param cis
 */
function charListReadyFunPtr(cis) {
    let a = 'WWWDOT';
    let b = 'GOOGLE';
    let c = 'DOTCOM';
    let ta = makeIntegerValue(cis, a);
    let tb = makeIntegerValue(cis, b);
    let tc = makeIntegerValue(cis, c);
    if(ta - tb == tc) {
        console.log('【' + ta + ' - ' + tb + ' = ' + tc + '】符合要求!!!');
    } else {
        // console.log('【' + ta + ' - ' + tb + ' = ' + tc + '】不符合要求!!!');
    }
}

/**
 * 判断选择的值是否符合要求
 * @param ci
 * @param cv
 */
function isValueValid(ci, cv) {
    if(cv.used == true) {
        return false;
    }
    if(ci.leading == true) {
        return cv.value != 0;
    }
    return true;
}

function searchingResult(cis, cvs, index, charListReadyFunPtr) {
    if(index == cis.length) {
        charListReadyFunPtr(cis);
    } else {
        for(let i = 0; i < cvs.length; i++) {
            // 减枝
            if(isValueValid(cis[index], cvs[i])) {
                cvs[i].used = true;
                cis[index].value = cvs[i].value;
                searchingResult(cis, cvs, index + 1, charListReadyFunPtr);
                cvs[i].used = false;
            }
        }
    }
}

function main() {
    let cis = [
        {c : 'W', value : -1, leading : true},
        {c : 'D', value : -1, leading : true},
        {c : 'O', value : -1, leading : false},
        {c : 'T', value : -1, leading : false},
        {c : 'G', value : -1, leading : true},
        {c : 'L', value : -1, leading : false},
        {c : 'E', value : -1, leading : false},
        {c : 'C', value : -1, leading : false},
        {c : 'M', value : -1, leading : false}
    ];
    let cvs = [
        {value : 0, used : false},
        {value : 1, used : false},
        {value : 2, used : false},
        {value : 3, used : false},
        {value : 4, used : false},
        {value : 5, used : false},
        {value : 6, used : false},
        {value : 7, used : false},
        {value : 8, used : false},
        {value : 9, used : false}
    ];
    searchingResult(cis, cvs, 0, charListReadyFunPtr);
}

main();

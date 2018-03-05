/**
 * 排序.
 * @param arr
 * @param startIndex
 * @param endIndex
 * @return {*}
 */
function boundary(arr, startIndex, endIndex) {
    let standard = arr[startIndex];
    let leftIndex = startIndex;
    let rightIndex = endIndex;
    while (leftIndex < rightIndex) {
        /**
         * 必须首先从高位从低位开始遍历，因为高位第一个如果满足替换条件，首先替换掉的一定是标兵位置的数字，不会造成排序数组数据的丢失。
         */
        while (leftIndex < rightIndex && arr[rightIndex] >= standard) {
            rightIndex--;
        }
        if(leftIndex < rightIndex) {
            arr[leftIndex++] = arr[rightIndex]
        }
        while (leftIndex < rightIndex && arr[leftIndex] < standard) {
            leftIndex++;
        }
        if(leftIndex < rightIndex) {
            arr[rightIndex--] = arr[leftIndex];
        }
    }
    arr[leftIndex] = standard;
    return leftIndex;
}

/**
 * 快速排序(递归)
 */
function quickSortByRecursion(arr, startIndex, endIndex) {
    if(startIndex >= endIndex) {
        return;
    }
    let bound = boundary(arr, startIndex, endIndex);
    quickSortByRecursion(arr, startIndex, bound - 1);
    quickSortByRecursion(arr, bound + 1, endIndex);
}

let arr = [0, 10, 9, 3, 8, 7, 4, 6];
quickSortByRecursion(arr, 0, arr.length - 1);
console.log(...arr);
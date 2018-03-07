{
    console.log("朴素递归实现")
    function sub(target, begin, end) {
        var t = [];
        for(let i = begin; i < end; i++) {
            t.push(target[i]);
        }
        return t.join('');
    }

    function min(a, b) {
        return a < b ? a : b;
    }

    let count = 0;

    function editDistance(src, dest) {
        count++;
        // 如果有一个字符串为空，则字符串距离为长度之差。
        if(src.length == 0 || dest.length == 0) {
            return Math.abs(src.length - dest.length);
        }
        // 第一个字符相同，将继续计算后面的字符串。
        if(src[0] == dest[0]) {
            return editDistance(sub(src, 1, src.length), sub(dest, 1, dest.length));
        }
        let edIns = editDistance(src, sub(dest, 1, dest.length)) + 1; // source 插入字符(1)
        let edDel = editDistance(sub(src, 1, src.length), dest) + 1; // source 删除字符(2)
        let edRep = editDistance(sub(src, 1, src.length), sub(dest, 1, dest.length)) + 1; // source 替换字符(3)
        return min(min(edIns, edDel), edRep);
    }

    let src = 'java';
    let dest = 'python';
    let distance = editDistance(src, dest);
    console.log(`distance: ${distance}, count: ${count}`);
    /**
     * 上述算法的缺点在于，朴素递归的过程中存在许多不必要的重复计算，假设 d[i,j] 表示 从 src[0,i] 到 dest[0,j] 所需要的编辑长度，
     * 则 (1) 在第一次执行的时候可以记为 d[0,1], (2) 在第一次递归的时候可以记为 d[1,0], (1) 在递归调用之后很可能导致 (2) 又被执行，此时记为 d[1,1](有点抽象，自己思考),
     * (2) 在递归调用之后很可能导致 (1) 又被执行, 此时记为 d[1,1], 从上面可以看到, 此时 d[1,1] 这个距离被调用了两次，两次都要通过递归计算，但是其实计算的就都是一样的，
     * 根本不需要进行这种无用的重复计算，所以需要使用备忘录的方式解决这个问题，既缓存中间已经存在的结果，消除不必要的计算。
     */
}

{
    /**
     * 使用 cache[i,j] 存储 src[0,i] 到 dest[0,j] 的编辑长度。
     */
    console.log('带备忘录, 减少多余的递归调用');
    let count = 0;
    function editDistance(src, dest) {
        let cache = [];

        for(let i = 0; i < src.length + 1; i++) {
            cache.push([]);
            for(let j = 0; j < dest.length + 1; j++) {
                cache[i].push({refCount : 0, distance : 0});
            }
        }

        function min(a, b) {
            return a < b ? a : b;
        }

        function calculate(src, dest, i, j) {
            count++;
            if(cache[i][j].refCount != 0) {
                cache[i][j].refCount++;
                return cache[i][j].distance;
            }
            let distance = 0;
            if((src.length - i) == 0 || (dest.length - j) == 0) {
                distance = Math.abs((src.length - i) - (dest.length - j));
            } else {
                if(src[i] == dest[j]) {
                    distance = calculate(src, dest, i + 1, j + 1);
                } else {
                    let edIns = calculate(src, dest, i, j + 1) + 1; // source 插入字符
                    let edDel = calculate(src, dest, i + 1, j) + 1; // source 删除字符
                    let edRep = calculate(src, dest, i + 1, j + 1) + 1; // source 替换字符
                    distance = min(min(edIns, edDel), edRep);
                }
            }
            cache[i][j].distance = distance;
            cache[i][j].refCount = 1;
            return distance;
        }
        return calculate(src, dest, 0, 0);
    }

    let src = 'java';
    let dest = 'python';
    let distance = editDistance(src, dest);
    console.log(`distance: ${distance}, count: ${count}`);
}

{
    console.log('根据递推关系和边界条件解决上述问题');
    function editDistance(src, dest) {
        function min(a, b) {
            return a < b ? a : b;
        }

        let srcLen = src.length, destLen = dest.length, cache = [];
        for(let i = 0; i <= srcLen; i++) {
            cache.push([]);
            for(let j = 0; j <= destLen; j++) {
                cache[i].push(0);
            }
        }

        for(let i = 0; i <= srcLen; i++) {
            cache[i][0] = i;
        }
        for(let j = 0; j <= destLen; j++) {
            cache[0][j] = j;
        }

        for(let i = 1; i <= srcLen; i++) {
            for(let j = 1; j <= destLen; j++) {
                if(src[i - 1] == dest[j - 1]) {
                    cache[i][j] = cache[i - 1][j - 1];
                } else {
                    let edIns = cache[i][j-1] + 1; // source 插入
                    let edDel = cache[i-1][j] + 1; // source 删除
                    let edRep = cache[i-1][j-1] + 1; // source 替换
                    cache[i][j] = min(min(edIns, edDel), edRep);
                }
            }
        }

        return cache[srcLen][destLen];
    }

    let src = 'abc';
    let dest = 'abd';
    let distance = editDistance(src, dest);
    console.log(`distance: ${distance}`);
    /**
     * 有的时候，如果使用递推很难写出算法实现，可以尝试使用递推+备忘录的方式实现动态规划。
     */
}

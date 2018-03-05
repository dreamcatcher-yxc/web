/**
 *
 * @param tagKnapackProblem: 问题描述
 * @param strategy: 决策函数
 * @constructor
 */
function greedyAlgo(problem, strategy) {
    let idx = 0;
    let selectedWeight = 0;
    while ((idx = strategy(problem.goodsArr, problem.total - selectedWeight)) != -1) {
        // 没有超出
        if((selectedWeight + problem.goodsArr[idx].w) <= problem.total) {
            problem.goodsArr[idx].s = 1;
            selectedWeight += problem.goodsArr[idx].w;
        } else {
            problem.goodsArr[idx].s = 2;
        }
    }

    console.log(...problem.goodsArr.map(g => {
        if(g.s == 1) {
            console.log(`weight: ${g.w}, price: ${g.p} \r\n`);
        }
    }));
}

/**
 * 决策函数(每次从剩余物品中价值最大的商品选择)
 * @param goodss: 所有的商品
 * @param remainCount: 剩余的可以选择价值
 * @return 最佳选择的物品的下标
 */
function strategyByMaxPrice(goodsArr, remainCount) {
    let selectIndex = -1, max = goodsArr[0].p;
    for(let i = 0; i < goodsArr.length; i++) {
        let goods = goodsArr[i];
        if(!goods.s && goods.p > max) {
            max = goods.p;
            selectIndex = i;
        }
    }
    return selectIndex;
}

let problem = {
    // w: 重量, p: 价值, s: 状态标示(0: 可选, 1: 已经选择, 2: 不能选)
    goodsArr : [
        {w : 35, p : 10, s : 0},
        {w : 30, p : 40, s : 0},
        {w : 60, p : 30, s : 0},
        {w : 50, p : 50, s : 0},
        {w : 40, p : 35, s : 0},
        {w : 10, p : 40, s : 0},
        {w : 25, p : 30, s : 0}
    ],
    // 总价值
    total : 100
};

greedyAlgo(problem, strategyByMaxPrice);



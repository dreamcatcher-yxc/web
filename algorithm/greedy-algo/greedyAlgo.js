/**
 *
 * @param tagKnapackProblem: 问题描述
 * @param spFunc: 决策函数
 * @constructor
 */
function greedyAlgo(problem, strategy) {
    let idx = 0;
    let ntc = 0;

    while ((idx = strategy(problem.goods, problem.total - ntc)) != -1) {
        if((ntc + problem.goods[idx].weight) <= problem.total) {
            problem.goods[idx].status = 1;
            ntc += problem.goods[idx].weight;
        } else {
            problem.goods[idx].status = 2;
        }
    }

    console.log(...problem.goods.map(g => `weight: ${g.weight}, price: ${g.price}`));
}

let problem = {
    goods : [],
    total :
};




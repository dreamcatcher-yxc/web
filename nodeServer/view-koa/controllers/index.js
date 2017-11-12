var fn_index = async (ctx, next) => {
    ctx.render('index.html', {});
};


module.exports = {
    'get:/': fn_index,
};
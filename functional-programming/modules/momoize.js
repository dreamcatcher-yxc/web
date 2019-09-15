const memoize = function(f) {
    var cache = {}

    return function() {
        var arg_str = JSON.stringify(arguments)
        var res = cache[arg_str]

        if(!!res) {
            console.log('从缓存中获取')
            return res
        } 
        
        console.log('执行函数')
        cache[arg_str] = f.apply(f, arguments)

        return cache[arg_str]
    }
}

exports.memoize = memoize